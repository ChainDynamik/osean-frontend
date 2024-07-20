export const isProduction = process.env.NODE_ENV === "production";

// export const BOOKING_MANAGER_API_ROOT = isProduction
//   ? "https://www.booking-manager.com/api/v2"
//   : "https://cors-anywhere.herokuapp.com/https://www.booking-manager.com/api/v2";
export const BOOKING_MANAGER_API_ROOT =
  "https://cors-anywhere.herokuapp.com/https://www.booking-manager.com/api/v2";
