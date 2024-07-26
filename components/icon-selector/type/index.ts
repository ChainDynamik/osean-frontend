import {
  Anchor,
  Bed,
  Berth,
  Boat,
  Breadth,
  Cabin,
  Calendar,
  Cash,
  Check,
  Checkbox,
  Chevron,
  Company,
  Door,
  Feet,
  Gift,
  Length,
  Location,
  Mainsail,
  Settings,
  Shower,
  WC,
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
    settings: Settings,
    chevron: Chevron,
    cabin: Cabin,
    wc: WC,
    breadth: Breadth,
    mainsail: Mainsail,
    length: Length,
    check: Check,
  },
};
