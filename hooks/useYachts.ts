import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BookingManagerYacht } from "../types/booking-manager/core";
import { BOOKING_MANAGER_API_ROOT } from "../helpers";

const useYachts = () => {
  const [yachts, setYachts] = useState<BookingManagerYacht[]>([]);

  const fetchChrisBoats = useCallback(async () => {
    try {
      const request = await axios.get(
        `${BOOKING_MANAGER_API_ROOT}/yachts?currency=EUR&inventory=EUR`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BOOKING_MANAGER_API_KEY}`,
          },
        }
      );

      const yachts: BookingManagerYacht[] = request.data;

      setYachts(yachts);
    } catch (error) {
      console.error("Error fetching boats:", error);
    }
  }, []);

  useEffect(() => {
    fetchChrisBoats();
  }, [fetchChrisBoats]);

  const getBoatById = useCallback(
    (id: number): BookingManagerYacht | undefined => {
      return yachts.find((boat) => boat.id === id);
    },
    [yachts]
  );

  return { yachts, fetchChrisBoats, getBoatById };
};

export default useYachts;
