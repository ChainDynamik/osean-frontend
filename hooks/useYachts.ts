import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BookingManagerYacht } from "../types/booking-manager/core";
import { BOOKING_MANAGER_API_ROOT } from "../helpers";

const useYachts = () => {
  const [yachts, setYachts] = useState<BookingManagerYacht[]>([]);

  const fetchChrisBoats = useCallback(async () => {
    try {
      let url = "/api/fetchYachts?companyId=2672";

      const response = await axios.get<BookingManagerYacht[]>(url);
      const yachts = response.data;
      console.log("chrisBoats", yachts);
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
