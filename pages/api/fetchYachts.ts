// pages/api/fetchYachts.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { companyId } = req.query;

  let queryString = `${BOOKING_MANAGER_API_ROOT}/yachts?currency=EUR&inventory=EUR`;
  if (companyId) {
    queryString += `&companyId=${companyId}`;
  }

  try {
    const request = await axios.get(queryString, {
      headers: {
        Authorization: `Bearer ${process.env.BOOKING_MANAGER_API_KEY}`,
      },
    });

    const yachts = request.data;
    res.status(200).json(yachts);
  } catch (error) {
    console.error("Error fetching yachts:", error);
    res.status(500).json({ error: "Error fetching yachts" });
  }
}
