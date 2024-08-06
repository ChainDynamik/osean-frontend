import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { cn } from "../../util";
import BookingsDetailsModal from "../BookingsDetailsModal/BookingsDetailsModal";
import { useMoralis } from "react-moralis";
import { Reservation } from "../../pages/offers";
import Moralis from "moralis-v1";
import PreviewImage from "../PreviewImage/PreviewImage";
import Image from "next/image";

const tableHeader = [
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
];

// Dummy data
const dummyBookings = [
  {
    boatId: "BKG001",
    courseName: "React for Beginners",
    courseDate: "2024-08-01",
    status: "Paid",
  },
  {
    boatId: "BKG001",
    courseName: "React for Beginners",
    courseDate: "2024-08-01",
    status: "Paid",
  },
  {
    boatId: "BKG002",
    courseName: "Advanced JavaScript",
    courseDate: "2024-08-10",
    status: "Awaiting payment...",
  },
  {
    boatId: "BKG003",
    courseName: "UI/UX Design Essentials",
    courseDate: "2024-08-15",
    status: "Paid",
  },
  {
    boatId: "BKG004",
    courseName: "Python Data Science",
    courseDate: "2024-09-01",
    status: "Paid",
  },
  {
    boatId: "BKG005",
    courseName: "Full-Stack Development",
    courseDate: "2024-09-10",
    status: "Awaiting payment...",
  },
];

export type Offer = {
  objectId: string;
  offer: Reservation;
  status: string;
  quote: any;
  user: Moralis.User;
  createdAt: Date;
  updatedAt: Date;
};

const BookingsTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState(dummyBookings);
  const [detailsModalIsOpen, setdetailsModalIsOpen] = useState(false);

  const { Moralis, isInitialized, user } = useMoralis();

  const [bookings, setBookings] = useState<Offer[]>([]);
  const [yachtImages, setYachtImages] = useState({});

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  async function fetchUserSavedInfo() {
    setName(user?.get("name"));
    setSurName(user?.get("surname"));
    setAddress(user?.get("address"));
    setCity(user?.get("city"));
    setEmailAddress(user?.get("email"));
    setTelegram(user?.get("telegram"));
    setPhoneNumber(user?.get("phone"));
  }

  async function getBookings() {
    const query = new Moralis.Query("Order");
    query.equalTo("user", user);
    query.include("offer");
    query.include("quote");
    const results = await query.find();
    const resultsJson = results.map((result) => result.toJSON());
    setBookings(resultsJson);

    // Fetch yacht images for all bookings
    const images = {};
    for (const booking of resultsJson) {
      if (booking.offer?.yachtId) {
        const imageUrl = await fetchYachtImage(booking);
        images[booking.objectId] = imageUrl;
      }
    }
    setYachtImages(images);
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
        const mainImage = images.find((img) => img.description === "Main image");
        // Strip spaces from the URL

        const url = mainImage?.url.replace(/\s/g, "%20");

        console.log("Yacht image URL:", url);

        return url;
      }
    } catch (error) {
      console.error("Error fetching yacht image:", error);
    }

    return null;
  };
  console.log(bookings);

  const handleSearch = (text: string) => {
    const filteredResults = dummyBookings.filter((booking) =>
      booking.courseName.toLowerCase().includes(text.toLowerCase())
    );
    setSearch(text);
    setResults(filteredResults);
  };

  useEffect(() => {
    if (isInitialized && user) {
      getBookings();
      fetchUserSavedInfo();
    }
  }, [isInitialized, user]);

  return (
    <motion.div className="w-full min-h-full mt-10 scroll-container">
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
        {results.length === 0 && (
          <div className="text-black font-bold absolute text-2xl top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
            <p>{!search ? "No Previous Booking(s)" : "No search result(s)"}</p>
          </div>
        )}
        <TableContainer
          className={cn("w-full border-2 border-[#cccccc] overflow-y-scroll", {
            "h-[250px]": results.length === 0,
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
                    className="bg-primary "
                  >
                    {name}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {bookings.map((booking) => (
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
                    <div className="py-4">
                      <PreviewImage src="/images/top-boats/boat-eight.jpg">
                        <Image
                          src={yachtImages[booking.objectId] || "/images/top-boats/boat-eight.jpg"}
                          width={80}
                          height={80}
                          className="rounded-full mx-auto aspect-square"
                          alt="boat"
                        />
                      </PreviewImage>
                    </div>
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
                      image={yachtImages[booking.objectId]}
                    >
                      <p className="font-semibold text-sm mb-0 py-4">{booking.objectId}</p>
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
                      image={yachtImages[booking.objectId]}
                    >
                      <p className="font-semibold text-sm mb-0 py-4">{booking.offer?.yacht}</p>
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
                      image={yachtImages[booking.objectId]}
                    >
                      <p className="font-semibold text-sm mb-0 py-4">{booking.offer?.dateFrom}</p>
                    </BookingsDetailsModal>
                  </Td>
                  {/* <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    fontSize="1.2rem"
                    border="2px solid #cccccc"
                  >
                    <BookingsDetailsModal id={booking.objectId}>
                      <p className="font-semibold text-sm mb-0 py-4">{booking.offer.dateTo}</p>
                    </BookingsDetailsModal>
                  </Td> */}
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
                    >
                      <p className="font-semibold text-sm mb-0 py-4">{booking.offer?.startBase}</p>
                    </BookingsDetailsModal>
                  </Td>
                  {/* <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    border="2px solid #cccccc"
                    minWidth="200px"
                  >
                    <BookingsDetailsModal id={booking.objectId}>
                      <p className="font-semibold text-sm mb-0 py-4">{booking.offer.endBase}</p>
                    </BookingsDetailsModal>
                  </Td> */}
                  <Td
                    textAlign="center"
                    color="black"
                    fontWeight={500}
                    p={0}
                    border="2px solid #cccccc"
                    minWidth="200px"
                  >
                    <BookingsDetailsModal id={booking.objectId}>
                      {/* format should be Awaiting Admin Validation from awaiting_admin_validation */}
                      <p
                        className="font-semibold text-sm mb-0 py-4 text-capitalize
                      "
                      >
                        {booking.status.replace(/_/g, " ")}
                      </p>
                    </BookingsDetailsModal>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {bookings.length < 1 && <p className="mx-auto text-3xl w-fit py-16 text-black">No Existing Bookings</p>}
      </motion.div>
    </motion.div>
  );
};

export default BookingsTable;
