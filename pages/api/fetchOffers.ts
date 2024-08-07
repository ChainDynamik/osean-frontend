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
  minYearOfBuild?: string;
  maxYearOfBuild?: string;
  productName?: string;
  kind?: string;
  passengersOnBoard?: string;
  country?: string;
  yachtId?: string;
  baseFromId?: string;
  minCabins?: string;
  dateFrom?: string;
  dateTo?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    currency,
    minLength,
    maxLength,
    minBerths,
    maxBerths,
    minYearOfBuild,
    maxYearOfBuild,
    productName,
    kind,
    passengersOnBoard,
    country,
    yachtId,
    baseFromId,
    dateFrom,
    dateTo,
    minCabins,
  } = req.query as unknown as FetchOffersQuery;

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
  if (minYearOfBuild) {
    queryString += `&minYearOfBuild=${minYearOfBuild}`;
  }
  if (maxYearOfBuild) {
    queryString += `&maxYearOfBuild=${maxYearOfBuild}`;
  }
  if (productName) {
    queryString += `&productName=${productName}`;
  }
  if (minCabins) {
    queryString += `&minCabins=${minCabins}`;
  }
  if (kind) {
    // Kind is formattted as such: type1,type2,type3. Transform this string into an array
    const kindArray = kind.split(",");
    for (const kindElement of kindArray) {
      queryString += `&kind=${kindElement}`;
    }
  }
  if (passengersOnBoard) {
    queryString += `&passengersOnBoard=${passengersOnBoard}`;
  }
  if (country) {
    // Countries is formattted as such: country1,country2,country3. Transform this string into an array
    const countriesArray = country.split(",");
    for (const country of countriesArray) {
      queryString += `&country=${country}`;
    }
  }
  if (yachtId) {
    queryString += `&yachtId=${yachtId}`;
  }
  if (baseFromId) {
    // Countries is formattted as such: country1,country2,country3. Transform this string into an array
    const basesIdArray = baseFromId.split(",");
    for (const base of basesIdArray) {
      queryString += `&baseFromId=${base}`;
    }
  }

  console.log("BACKEND", queryString);

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
