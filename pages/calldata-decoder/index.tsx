import { Interface, ParamType } from '@ethersproject/abi';
import { Container, Stack, Flex, SimpleGrid, Card, Box, Divider, useToast, Text, Button, Textarea, Center, Tab, TabPanels, TabList, TabPanel, Tabs } from "@chakra-ui/react";
import {
  ChangeEvent,
  ClipboardEvent,
  ReactElement,
  useMemo,
  useState,
} from 'react';

import { DecodedCalldataTree } from '../../src/components/DecodedCalldataTree';
import { DecodersIcon } from '../../src/components/icons/DecodersIcon';
import { AbiSourceTabs } from '../../src/components/lib/AbiSourceTabs/AbiSourceTabs';
import { Entity } from '../../src/components/lib/Entity';
import { Header } from '../../src/components/lib/Header';
import { TextArea } from '../../src/components/lib/TextArea/TextArea';
import { Spinner } from '../../src/components/Spinner';
import { ToolContainer } from '../../src/components/ToolContainer';
import {
  decodeWithCalldata,
  fetch4BytesBy,
  sigHashFromCalldata,
} from '../../src/lib/decodeBySigHash';
import { decodeCalldata, Decoded } from '../../src/lib/decodeCalldata';
import { parseAbi } from '../../src/lib/parseAbi';
import { handleChangeValidated } from '../../src/misc/handleChangeValidated';
import { WithError } from '../../src/misc/types';
import { hexSchema } from '../../src/misc/validation/schemas/hexSchema';
import { abiValidator } from '../../src/misc/validation/validators/abiValidator';
import { hexValidator } from '../../src/misc/validation/validators/hexValidator';
import Image from 'next/image';

interface MappedDecodedResult {
  fnName?: string;
  fnType?: string;
  decoded: Decoded;
  inputs: ParamType[];
}

// @internal
function CalldataResult({
  loading,
  error,
  decodeResults,
  signatureHash,
  encodedCalldata,
}: CalldataResultProps): ReactElement {
  return (
    loading ? (
      <Spinner className="mx-auto pt-6" />
    ) : decodeResults.length > 0 ? (
      <Card
  alignSelf="center"
  w="100%"
  className="rounded-md border"
  mb={10}
>
  <Stack spacing={4} p={4}>
    {!error && (
      <Flex alignItems="center" justifyContent="center" textAlign="center">
        <Text mt={5} color="blue.400" fontWeight="bold">
          Signature hash
        </Text>
        <Box
          display="flex"
          alignItems="center"
          borderRadius="md"
          border="1px"
          borderColor="gray.600"
          ml={3}
          py={2}
          px={3}
          transition="background-color 0.2s"
          _hover={{ backgroundColor: "gray.700" }}
          _active={{ backgroundColor: "gray.800" }}
        >
          <Box as="b" aria-label="signature hash">
            {signatureHash}
          </Box>
        </Box>
      </Flex>
    )}
    {error ? (
      <Text color="red.500">
        {error} with `{encodedCalldata.slice(0, 12)}`... encoded calldata
      </Text>
    ) : (
      <Stack
        spacing={4}
        justifyContent="center"
        alignContent="center"
        textAlign="center"
      >
        {decodeResults.map((decoded, i) => (
          <Box padding={1} key={i} data-testid={`decodedCalldataTree${i}`}>
            <DecodedCalldataTree
              fnName={decoded.fnName}
              fnType={decoded.fnType}
              decoded={decoded.decoded}
              inputs={decoded.inputs}
            />
          </Box>
        ))}
      </Stack>
    )}
  </Stack>
</Card>
    ) : (
      <Box></Box>
    )
  );
}

export default function CalldataDecoder(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [tab, setTab] = useState<'abi' | '4-bytes'>('4-bytes');
  const [decodeResults, setDecodeResults] = useState<MappedDecodedResult[]>([]);

  const [rawAbi, setRawAbi] = useState<WithError<string>>({ value: '' });
  const [encodedCalldata, setEncodedCalldata] = useState<WithError<string>>({
    value: '',
  });

  const signatureHash = useMemo(
    () => encodedCalldata.value && sigHashFromCalldata(encodedCalldata.value),
    [encodedCalldata],
  );

  const decodeButtonDisabled = !(tab === 'abi'
    ? rawAbi.value &&
      encodedCalldata.value &&
      !rawAbi.error &&
      !encodedCalldata.error
    : encodedCalldata.value && !encodedCalldata.error);

  const decodeIsPossible = encodedCalldata.value && !encodedCalldata.error;

  const decodeWithAbiIsPossible =
    decodeIsPossible && rawAbi.value && !rawAbi.error;

  const flushResults = (): void => {
    if (decodeResults.length > 0) setDecodeResults([]);
  };

  const handleChangeEncodedCalldata = (newValue: string): void =>
    handleChangeValidated({
      newValue,
      validateFn: (newValue) => hexValidator(newValue),
      setState: setEncodedCalldata,
      flushFn: flushResults,
    });

  const handleChangeRawAbi = (newValue: string): void =>
    handleChangeValidated({
      newValue,
      validateFn: (newValue) => abiValidator(newValue),
      setState: setRawAbi,
      flushFn: flushResults,
    });

  async function handleDecodeCalldataWith4Bytes(): Promise<void> {
    console.log('handleDecodeCalldataWith4Bytes called');
    setLoading(true);
    try {
      const decodeResults = await decodeWithCalldata(
        signatureHash!,
        encodedCalldata.value,
      );
      if (!decodeResults) {
        console.log('Signature is wrong or undefined');
        setError('Signature is wrong or undefined');
      } else {
        console.log('Decoding successful', decodeResults);
        const mappedResults = decodeResults.map((decoded) => {
          return {
            fnName: decoded.fragment.name,
            fnType: decoded.fragment.type,
            decoded: decoded.decoded,
            inputs: decoded.fragment.inputs,
          };
        });
        setDecodeResults(mappedResults);
      }
    } finally {
      console.log('Finished decoding');
      setLoading(false);
    }
  }

  function handleDecodeCalldataWithAbi(): void {
    const abi = parseAbi(rawAbi.value);
    if (abi instanceof Error) {
      return setRawAbi({
        ...rawAbi,
        error:
          "Provided ABI was in the wrong format or it didn't matched calldata",
      });
    }
    if (abi instanceof Interface) {
      const decodeResult = decodeCalldata(abi, encodedCalldata.value);
      if (!decodeResult)
        return setRawAbi({
          ...rawAbi,
          error: 'Signature is wrong or undefined',
        });

      const { decoded, fragment } = decodeResult;
      return setDecodeResults([
        {
          inputs: fragment.inputs,
          fnName: fragment.name,
          fnType: fragment.type,
          decoded,
        },
      ]);
    }
  }

  async function handleDecodeCalldata(): Promise<void> {
    console.log('handleDecodeCalldata called');
    setError(undefined);
    if (!signatureHash) {
      console.log('Signature hash is missing, is calldata empty?');
      setError('Signature hash is missing, is calldata empty?');
    } else {
      if (tab === '4-bytes' && decodeIsPossible) {
        console.log('Decoding with 4 bytes');
        return void handleDecodeCalldataWith4Bytes();
      } else if (tab === 'abi' && decodeWithAbiIsPossible)
        console.log('Decoding with ABI');
        return handleDecodeCalldataWithAbi();
    }
  }

  const toast = useToast();

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      
        <Flex align="center" mb={4}>
          <Image alt="logo" src={"https://osean.online/osean200.png"} width={30} height={30} />
          
          <Text ml={2} mt={6} fontWeight="bold">Calldata Decoder</Text>
        </Flex>
        <Box>
          <Textarea
            height={"100px"}
            name="Calldata"
            isInvalid={!!encodedCalldata.error}
            value={encodedCalldata.value}
            placeholder="e.g 0x23b8..3b2"
            onChange={(event) =>
              handleChangeEncodedCalldata(event.target.value)
            }
            onPaste={async (event) => {
              const encodedCalldata = event.clipboardData.getData("Text");
              const sigHash = sigHashFromCalldata(encodedCalldata);
              if (sigHash) {
                await fetch4BytesBy.Signatures(sigHash);
              }
            }}
          />
        </Box>
        <SimpleGrid columns={1} spacing={4}>
      <Box>
        {/* Tab Switcher */}
        <Tabs isFitted>
          <TabList>
            <Tab onClick={() => setTab('4-bytes')}>4 Bytes</Tab>
            <Tab onClick={() => setTab('abi')}>ABI</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             
            </TabPanel>
            <TabPanel>
              {/* ABI Box */}
              <AbiSourceTabs
                rawAbi={rawAbi}
                setDecodeResults={setDecodeResults}
                handleChangeRawAbi={(event) => handleChangeRawAbi(event.target.value)}
                tabState={{ tab, setTab }}
                
              />
              
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </SimpleGrid>
        <div style={{justifyContent: "center", display: "flex", marginBottom:"10px"}}>
        <button
  style={{
    display: 'block',
    width: '300px',
    height: '50px',
    // Add more styles as needed
  }}
  className="btn btn-lg btn-round btn-gradient-blue animated"
  data-animation="fadeInUpShorter"
  data-animation-delay="1.7s"
  disabled={decodeButtonDisabled}
  onClick={handleDecodeCalldata}
>
  Decode
</button>
</div>
<div style={{ paddingTop: '10px', paddingBottom: '3px', textAlign: 'center', width:"100%"}}>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
        {decodeResults.length > 0 ? 'Possible Decoded Results' : 'Decoded output will appear here if any results are found'}
      </p>
    </div>
        
        <CalldataResult
          loading={loading}
          error={error}
          signatureHash={signatureHash}
          encodedCalldata={encodedCalldata.value}
          decodeResults={decodeResults}
        />
    
  </div>
   
  );
}

// @internal
interface CalldataResultProps {
  error?: string;
  loading: boolean;
  signatureHash: string | undefined;
  encodedCalldata: string;
  decodeResults: MappedDecodedResult[];
}
