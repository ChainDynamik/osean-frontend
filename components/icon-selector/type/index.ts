import {
  Anchor,
  Bed,
  Berth,
  Boat,
  Calendar,
  Cash,
  Checkbox,
  Company,
  Door,
  Feet,
  Gift,
  Location,
  Shower,
} from "./svgs/svgs";

export const ICON_TYPE: {
  [key: string]: {
    [key: string]: React.ComponentType<any>; // Adjust the type according to your component types
  };
} = {
  SVGS: {
    anchor: Anchor,
    bed: Bed,
    calendar: Calendar,
    feet: Feet,
    gift: Gift,
    location: Location,
    shower: Shower,
    door: Door,
    company: Company,
    checkbox: Checkbox,
    cash: Cash,
    boat: Boat,
    berth: Berth,
  },
};
