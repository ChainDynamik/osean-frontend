import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";

interface FetchOffersQuery {
  tripStart?: string;
  tripEnd?: string;
  currency?: string;
  minLength?: string;
  maxLength?: string;
  minBerths?: string;
  maxBerths?: string;
  minYear?: string;
  maxYear?: string;
  productFilters?: string[];
  kindFilters?: string[];
  passengersOnBoard?: string;
  countries?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    tripStart,
    tripEnd,
    currency,
    minLength,
    maxLength,
    minBerths,
    maxBerths,
    minYear,
    maxYear,
    productFilters,
    kindFilters,
    passengersOnBoard,
    countries,
  } = req.query as unknown as FetchOffersQuery;

  const dateFrom = tripStart ? tripStart : "2024-08-17";
  const dateTo = tripEnd ? tripEnd : "2024-08-24";

  let queryString = `${BOOKING_MANAGER_API_ROOT}/offers?dateFrom=${dateFrom}T00%3A00%3A00&dateTo=${dateTo}T00%3A00%3A00`;

  if (currency) {
    queryString += `&currency=${currency}`;
  }
  if (minLength) {
    queryString += `&minLength=${minLength}`;
  }
  if (maxLength) {
    queryString += `&maxLength=${maxLength}`;
  }
  if (minBerths) {
    queryString += `&minBerths=${minBerths}`;
  }
  if (maxBerths) {
    queryString += `&maxBerths=${maxBerths}`;
  }
  if (minYear) {
    queryString += `&minYearOfBuild=${minYear}`;
  }
  if (maxYear) {
    queryString += `&maxYearOfBuild=${maxYear}`;
  }
  if (productFilters && productFilters.length > 0) {
    queryString += `&productName=${productFilters}`;
  }
  if (kindFilters && kindFilters.length > 0) {
    queryString += `&kind=${kindFilters.join(",")}`;
  }
  if (passengersOnBoard) {
    queryString += `&passengersOnBoard=${passengersOnBoard}`;
  }
  if (countries && countries.length > 0) {
    queryString += `&countries=${countries.join(",")}`;
  }

  try {
    const request = await axios.get(queryString, {
      headers: {
        Authorization: `Bearer ${process.env.BOOKING_MANAGER_API_KEY}`,
      },
    });
    const offers = request.data;
    res.status(200).json(offers);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Error fetching offers" });
  }
}
