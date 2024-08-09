import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { cn } from "../../util";
import BookingsDetailsModal from "../BookingsDetailsModal/BookingsDetailsModal";
import { useMoralis } from "react-moralis";
import { Reservation } from "../../pages/offers";
import Moralis from "moralis-v1";
import PreviewImage from "../PreviewImage/PreviewImage";
import Image from "next/image";
import Fuse from "fuse.js";

export type Offer = {
  objectId: string;
  offer: Reservation;
  status: string;
  quote: any;
  user: Moralis.User;
  createdAt: Date;
  updatedAt: Date;
};

const BookingsTable: React.FC = ({ tableId }: { tableId?: string }) => {
  const [search, setSearch] = useState<string>("");
  const [filteredBookings, setFilteredBookings] = useState<Offer[]>([]);
  const { Moralis, isInitialized, user } = useMoralis();
  const [bookings, setBookings] = useState<Offer[]>([]);
  const [yachtImages, setYachtImages] = useState({});

  const [tableHeader, setTableHeader] = useState([
    {
      name: "Boat IMG",
    },
    {
      name: "Booking ID",
    },
    {
      name: "Boat Name",
    },
    {
      name: "Trip Start",
    },
    {
      name: "Start Base",
    },
    {
      name: "Payment Status",
    },
  ]);

  useEffect(() => {
    if (isInitialized && user) {
      getBookings();
    }
  }, [isInitialized, user]);

  async function getBookings() {
    const theadBuffer = [...tableHeader];
    const isAdmin = user?.get("isAdmin");

    let resultsJson = [];

    if (isAdmin) {
      const newArray = appendItemInArrayAtPosition(
        theadBuffer,
        { name: "Name" },
        1
      );
      setTableHeader(newArray);
      const bookingsBuffer = await Moralis.Cloud.run("getAllOrders");
      resultsJson = bookingsBuffer;
      setBookings(bookingsBuffer);
    } else {
      const query = new Moralis.Query("Order");
      query.equalTo("user", user);
      query.include("offer");
      query.include("quote");
      query.descending("createdAt");
      const results = await query.find();
      resultsJson = results.map((result) => result.toJSON());
      setBookings(resultsJson);
    }

    // Fetch yacht images for all bookings
    const images = {};
    for (const booking of resultsJson) {
      if (booking.offer?.yachtId) {
        const imageUrl = await fetchYachtImage(booking);
        images[booking.objectId] = imageUrl;
      }
    }
    setYachtImages(images);
    setFilteredBookings(resultsJson);
  }

  const fetchYachtImage = async (booking: any) => {
    if (!booking.offer?.yachtId) return null;

    const Yacht = Moralis.Object.extend("Yacht");
    const query = new Moralis.Query(Yacht);
    query.equalTo("bookingManagerId", booking.offer.yachtId);

    try {
      const yacht = await query.first();
      if (yacht) {
        const images = yacht.get("images");
        const mainImage = images.find(
          (img) => img.description === "Main image"
        );
        const url = mainImage?.url.replace(/\s/g, "%20");
        return url;
      }
    } catch (error) {
      console.error("Error fetching yacht image:", error);
    }

    return null;
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      // If the search input is empty, reset to show all bookings
      setFilteredBookings(bookings);
    } else {
      const fuse = new Fuse(bookings, {
        keys: ["objectId", "offer.yacht", "offer.startBase", "status"],
        threshold: 0, // Adjust this value to fine-tune the search sensitivity
      });

      const results = fuse.search(text);
      const filteredResults = results.map((result) => result.item);
      setFilteredBookings(filteredResults);
    }
  };

  return (
    <motion.div
      id={tableId}
      className="w-full min-h-full mt-10 scroll-container"
    >
      <motion.div className="relative w-fit mb-4">
        <input
          type="text"
          id="search"
          className="text-black border-2 pr-9 px-4 py-1 mb-4 border-border rounded-2xl bg-transparent"
          placeholder="Search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </motion.div>

      <motion.div className="w-full relative">
        {filteredBookings.length === 0 && (
          <div className="text-black font-bold absolute text-2xl top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
            <p>{!search ? "No Previous Booking(s)" : "No search result(s)"}</p>
          </div>
        )}
        <TableContainer
          className={cn("w-full border-2 border-[#cccccc] overflow-y-scroll", {
            "h-[250px]": filteredBookings.length === 0,
          })}
        >
          <Table colorScheme="white">
            <Thead>
              <Tr>
                {tableHeader.map(({ name }) => (
                  <Th
                    key={name}
                    textAlign="center"
                    whiteSpace="nowrap"
                    color="white"
                    textTransform="capitalize"
                    fontSize="1.2rem"
                    fontWeight={500}
                    minWidth="100px"
                    py={8}
                    className="bg-primary"
                  >
                    {name}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {filteredBookings.map((booking) => (
                <Tr
                  key={booking.objectId}
                  className="hover:bg-primary/20 transition-all duration-200 ease-in cursor-pointer"
                >
                  <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    fontSize="1.2rem"
                    border="2px solid #cccccc"
                  >
                    <div className="flex h-[130px] justify-center items-center px-3">
                      <div className="py-4 ">
                        <PreviewImage src="/images/top-boats/boat-eight.jpg">
                          <Image
                            src={
                              yachtImages[booking.objectId] ||
                              "/images/top-boats/boat-eight.jpg"
                            }
                            width={80}
                            height={80}
                            className="rounded-full mx-auto aspect-square"
                            alt="boat"
                          />
                        </PreviewImage>
                      </div>
                    </div>
                  </Td>
                  {user?.get("isAdmin") && (
                    <Td
                      textAlign="center"
                      color="black"
                      fontWeight={500}
                      p={0}
                      fontSize="1.2rem"
                      border="2px solid #cccccc"
                    >
                      <BookingsDetailsModal
                        id={booking.objectId}
                        offer={booking}
                        image={
                          yachtImages[booking.objectId] ||
                          "/images/top-boats/boat-eight.jpg"
                        }
                      >
                        <div className="flex h-[130px] justify-center items-center px-3">
                          <p className="font-semibold text-sm mb-0 py-4 ">
                            {booking?.user?.get("name")}{" "}
                            {booking?.user?.get("surname")}
                          </p>
                        </div>
                      </BookingsDetailsModal>
                    </Td>
                  )}
                  <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    fontSize="1.2rem"
                    border="2px solid #cccccc"
                  >
                    <BookingsDetailsModal
                      id={booking.objectId}
                      offer={booking}
                      image={
                        yachtImages[booking.objectId] ||
                        "/images/top-boats/boat-eight.jpg"
                      }
                    >
                      <div className="flex h-[130px] justify-center items-center px-3">
                        <p className="font-semibold text-sm mb-0 py-4 ">
                          {booking.objectId}
                        </p>
                      </div>
                    </BookingsDetailsModal>
                  </Td>
                  <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    fontSize="1.2rem"
                    border="2px solid #cccccc"
                  >
                    <BookingsDetailsModal
                      id={booking.objectId}
                      offer={booking}
                      image={
                        yachtImages[booking.objectId] ||
                        "/images/top-boats/boat-eight.jpg"
                      }
                    >
                      <div className="flex h-[130px] justify-center items-center px-3">
                        <p className="font-semibold text-sm mb-0 py-4 ">
                          {booking.offer?.yacht}
                        </p>
                      </div>
                    </BookingsDetailsModal>
                  </Td>
                  <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    fontSize="1.2rem"
                    border="2px solid #cccccc"
                  >
                    <BookingsDetailsModal
                      id={booking.objectId}
                      offer={booking}
                      image={
                        yachtImages[booking.objectId] ||
                        "/images/top-boats/boat-eight.jpg"
                      }
                    >
                      <div className="flex h-[130px] justify-center items-center px-3">
                        <p className="font-semibold text-sm mb-0 py-4 ">
                          {booking.offer?.dateFrom}
                        </p>
                      </div>
                    </BookingsDetailsModal>
                  </Td>
                  <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    fontSize="1.2rem"
                    border="2px solid #cccccc"
                  >
                    <BookingsDetailsModal
                      id={booking.objectId}
                      offer={booking}
                      image={
                        yachtImages[booking.objectId] ||
                        "/images/top-boats/boat-eight.jpg"
                      }
                    >
                      <div className="flex h-[130px] justify-center items-center px-3">
                        <p className="font-semibold text-sm mb-0 py-4 ">
                          {booking.offer?.startBase}
                        </p>
                      </div>
                    </BookingsDetailsModal>
                  </Td>
                  <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    border="2px solid #cccccc"
                    minWidth="200px"
                  >
                    <BookingsDetailsModal
                      id={booking.objectId}
                      offer={booking}
                      image={
                        yachtImages[booking.objectId] ||
                        "/images/top-boats/boat-eight.jpg"
                      }
                    >
                      <div className="flex h-[130px] justify-center items-center px-3">
                        <p className="font-semibold text-sm mb-0 py-4  text-capitalize">
                          {booking.status.replace(/_/g, " ")}
                        </p>
                      </div>
                    </BookingsDetailsModal>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {bookings.length < 1 && (
          <p className="mx-auto text-3xl w-fit py-16 text-black">
            No Existing Bookings
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingsTable;
