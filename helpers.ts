export const isProduction = process.env.NODE_ENV === "production";
export const BOOKING_MANAGER_API_ROOT = "https://www.booking-manager.com/api/v2";
import Moralis from "moralis-v1";

// export const BOOKING_MANAGER_API_ROOT =
//   "https://cors-anywhere.herokuapp.com/https://www.booking-manager.com/api/v2";

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchBoatsDataFromDb(modelIds: number[]) {
  const query = new Moralis.Query("Yacht");
  query.containedIn("bookingManagerId", modelIds);
  query.limit(100_000);
  const result = await query.find();

  if (result) {
    return result.map((res) => res.toJSON());
  } else {
    return null;
  }
}

export async function fetchBoatDataFromDb(modelId: string) {
  const query = new Moralis.Query("Yacht");
  query.equalTo("bookingManagerId", Number(modelId));
  const result = await query.first();

  if (result) {
    return result.toJSON();
  } else {
    return null;
  }
}

export function truncateAddress(address: string, length = 6): string {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}
