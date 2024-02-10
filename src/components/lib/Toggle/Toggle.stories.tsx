import { Meta } from '@storybook/react';
import React, { ReactElement, useState } from 'react';
import { isHex } from '../../../lib/decodeHex';

import { ToggleWithSideEffectProps, Bytes32StringToggle, HexDecToggle, Toggle } from './Toggle';

export default {
  title: 'lib/Toggle',
  component: Toggle,
  subcomponents: {
    HexDecToggle: HexDecToggle as React.ComponentType<ToggleWithSideEffectProps<string, string>>,
    Bytes32StringToggle: Bytes32StringToggle as React.ComponentType<ToggleWithSideEffectProps<string, string>>,
  },
} as Meta<typeof Toggle>;

export const Bytes32StringToggleVariant = (): ReactElement => {
  const [state, setState] = useState<{ isState: boolean; inner: string }>({
    isState: false,
    inner: '123',
  });

  return (
    <Bytes32StringToggle
      className="text-white"
      isStateFn={isHex}
      isDisabled={false}
      state={state}
      setState={setState}
    />
  );
};

export const Disabled = (): ReactElement => {
  const [state, setState] = useState<{ isState: boolean; inner: string }>({
    isState: false,
    inner: '123',
  });

  return (
    <div className="flex justify-center">
      <HexDecToggle
        className="text-white"
        isStateFn={isHex}
        isDisabled={true}
        state={state}
        setState={setState}
      />
    </div>
  );
};

export const HexadecimalToDecimal = (): ReactElement => {
  const [state, setState] = useState<{ isState: boolean; inner: string }>({
    isState: false,
    inner: '123',
  });

  return (
    <div className="flex justify-center">
      <HexDecToggle
        className="text-white"
        isStateFn={isHex}
        isDisabled={false}
        state={state}
        setState={setState}
      />
    </div>
  );
};
