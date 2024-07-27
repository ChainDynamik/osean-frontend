"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { useMoralis } from "react-moralis";
import Icon from "../icon-selector/icon-selector";
import InvoiceModal from "../AdminInvoiceModal/AdminInvoiceModal";

// Dummy enrollments data
const dummyEnrollments = [
  {
    user: {
      roles: ["student"],
      username: "student1",
      email: "student1@example.com",
      customerId: "cus_123",
      setupSecret: "secret_123",
      _email_verify_token: "token_123",
      emailVerified: true,
      createdAt: "2023-07-01T00:00:00.000Z",
      updatedAt: "2023-07-01T00:00:00.000Z",
      ACL: {
        "role:admin": { read: true, write: true },
        "*": { read: true },
      },
      objectId: "U001",
      __type: "Object",
      className: "_User",
    },
    course: {
      name: "Course 1",
      durationInDays: 30,
      createdAt: "2023-07-01T00:00:00.000Z",
      updatedAt: "2023-07-01T00:00:00.000Z",
      displayName: "Course 1",
      totalSpots: 20,
      availableSpots: 15,
      enrollCostUsd: 100,
      startDate: {
        __type: "Date",
        iso: "2023-08-01T00:00:00.000Z",
      },
      endDate: {
        __type: "Date",
        iso: "2023-08-31T00:00:00.000Z",
      },
      objectId: "C001",
      __type: "Object",
      className: "Course",
    },
    fullName: "Student One",
    gender: "Male",
    dateOfBirth: "2000-01-01",
    email: "student1@example.com",
    contactNumber: "1234567890",
    address: "123 Street, City, Country",
    emergencyContactName: "Parent One",
    emergencyContactNumber: "0987654321",
    comments: "",
    createdAt: "2023-07-01T00:00:00.000Z",
    updatedAt: "2023-07-01T00:00:00.000Z",
    isPaid: true,
    invoiceURL: "/images/invoice1.jpg",
    objectId: "E001",
  },
  {
    user: {
      roles: ["student"],
      username: "student2",
      email: "student2@example.com",
      customerId: "cus_124",
      setupSecret: "secret_124",
      _email_verify_token: "token_124",
      emailVerified: true,
      createdAt: "2023-07-02T00:00:00.000Z",
      updatedAt: "2023-07-02T00:00:00.000Z",
      ACL: {
        "role:admin": { read: true, write: true },
        "*": { read: true },
      },
      objectId: "U002",
      __type: "Object",
      className: "_User",
    },
    course: {
      name: "Course 2",
      durationInDays: 60,
      createdAt: "2023-07-02T00:00:00.000Z",
      updatedAt: "2023-07-02T00:00:00.000Z",
      displayName: "Course 2",
      totalSpots: 30,
      availableSpots: 25,
      enrollCostUsd: 200,
      startDate: {
        __type: "Date",
        iso: "2023-09-01T00:00:00.000Z",
      },
      endDate: {
        __type: "Date",
        iso: "2023-10-31T00:00:00.000Z",
      },
      objectId: "C002",
      __type: "Object",
      className: "Course",
    },
    fullName: "Student Two",
    gender: "Female",
    dateOfBirth: "2001-02-01",
    email: "student2@example.com",
    contactNumber: "1234567891",
    address: "456 Street, City, Country",
    emergencyContactName: "Parent Two",
    emergencyContactNumber: "0987654322",
    comments: "",
    createdAt: "2023-07-02T00:00:00.000Z",
    updatedAt: "2023-07-02T00:00:00.000Z",
    isPaid: false,
    invoiceURL: "",
    objectId: "E002",
  },
  // Add more dummy enrollments as needed
];

const tableHeader = [
  {
    name: "Booking ID",
  },
  {
    name: "Course Name",
  },
  {
    name: "Course Date",
  },
  {
    name: "Student Name",
  },
  {
    name: "Payment status",
  },
  {
    name: "Upload Invoice",
  },
  {
    name: "Download Invoice",
  },
];

const AdminsBookingsTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState(dummyEnrollments);

  const { isInitialized } = useMoralis();

  const handleSearch = (text: string) => {
    const fuse = new Fuse(dummyEnrollments, {
      keys: ["objectId", "course.displayName", "fullName"],
      threshold: 0.3,
    });

    setSearch(text);
    const searchResults = fuse.search(text).map((result) => result.item);
    setResults(searchResults.length ? searchResults : []);
  };

  const membersData = !search ? dummyEnrollments : results;

  useEffect(() => {
    if (isInitialized) {
      // fetchEnrollments();  // Comment out the fetch function since we're using dummy data
    }
  }, [isInitialized]);

  return (
    <motion.div className="w-full min-h-full mt-10 scroll-container">
      <Box position="relative" w="fit-content" mb={4}>
        <Input
          type="text"
          id="search"
          placeholder="Search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          pr="9"
          px="4"
          py="1"
          borderColor="gray.300"
          borderRadius="xl"
          bg="transparent"
        />
        <Icon
          iconType="search"
          className="w-4 absolute text-secondary right-4 top-0 translate-y-1/2"
        />
      </Box>

      <motion.div className="w-full relative">
        {results.length === 0 && (
          <Box
            color="black"
            fontWeight="bold"
            fontSize="2xl"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Text>
              {!search ? "No Previous Booking(s)" : "No search result(s)"}
            </Text>
          </Box>
        )}
        <TableContainer
          border="2px"
          borderColor="gray.300"
          maxH="600px"
          overflowY="auto"
          overflowX="auto"
        >
          <Table>
            <Thead bg="gray.700">
              <Tr>
                {tableHeader.map(({ name }) => (
                  <Th
                    key={name}
                    color="white"
                    border="2px"
                    borderColor="gray.300"
                    textTransform="capitalize"
                    fontSize="1.2rem"
                    fontWeight="500"
                    minWidth="100px"
                  >
                    {name}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody bg="gray.100">
              {membersData.map((enrollment) => {
                const noUploadedInvoice =
                  !enrollment.invoiceURL || enrollment.invoiceURL === "";
                return (
                  <Tr
                    key={enrollment.objectId}
                    _hover={{ bg: "gray.200" }}
                    cursor="pointer"
                  >
                    <Td
                      align="center"
                      color="black"
                      fontWeight="500"
                      fontSize="1.2rem"
                      border="2px"
                      borderColor="gray.300"
                    >
                      {enrollment.objectId}
                    </Td>

                    <Td
                      align="center"
                      color="black"
                      fontWeight="500"
                      fontSize="1.2rem"
                      border="2px"
                      borderColor="gray.300"
                    >
                      {enrollment.course.displayName}
                    </Td>

                    <Td
                      align="center"
                      color="black"
                      fontWeight="500"
                      fontSize="1.2rem"
                      border="2px"
                      borderColor="gray.300"
                      minWidth="200px"
                    >
                      {new Date(
                        enrollment.course.startDate.iso
                      ).toLocaleString()}
                    </Td>

                    <Td
                      align="center"
                      color="black"
                      fontWeight="500"
                      fontSize="1.2rem"
                      border="2px"
                      borderColor="gray.300"
                      minWidth="200px"
                    >
                      {enrollment.fullName}
                    </Td>

                    <Td
                      align="center"
                      color="black"
                      fontWeight="500"
                      fontSize="1.2rem"
                      border="2px"
                      borderColor="gray.300"
                      minWidth="200px"
                    >
                      {enrollment.isPaid ? "Paid" : "Awaiting payment"}
                    </Td>

                    <Td
                      align="center"
                      color="black"
                      fontWeight="500"
                      fontSize="1.2rem"
                      border="2px"
                      borderColor="gray.300"
                      minWidth="100px"
                    >
                      {!enrollment.invoiceURL && (
                        <InvoiceModal
                          studentEnrollmentId={enrollment.objectId}
                          fetchEnrollments={() => {}}
                        >
                          <Button
                            colorScheme={enrollment.invoiceURL ? "red" : "blue"}
                            className="mx-auto whitespace-nowrap font-medium"
                          >
                            {enrollment.invoiceURL
                              ? "Delete Invoice"
                              : "Upload Invoice"}
                          </Button>
                        </InvoiceModal>
                      )}
                      {enrollment.invoiceURL && (
                        <Button
                          colorScheme={enrollment.invoiceURL ? "red" : "blue"}
                          className="mx-auto whitespace-nowrap font-medium"
                        >
                          {enrollment.invoiceURL
                            ? "Delete Invoice"
                            : "Upload Invoice"}
                        </Button>
                      )}
                    </Td>

                    <Td
                      align="center"
                      color="black"
                      fontWeight="500"
                      fontSize="1.2rem"
                      border="2px"
                      borderColor="gray.300"
                      minWidth="100px"
                    >
                      <Box className="flex items-center justify-center">
                        {noUploadedInvoice && <Text>No Invoice Uploaded</Text>}
                        {!noUploadedInvoice && (
                          <a
                            href={enrollment.invoiceURL}
                            download="payment invoice"
                            target="_blank"
                          >
                            <Icon
                              iconType={"download"}
                              className="w-10 transition-all duration-300 ease-in-out hover:fill-secondary"
                            />
                          </a>
                        )}
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </motion.div>
    </motion.div>
  );
};

export default AdminsBookingsTable;
