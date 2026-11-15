import foodSvg from "../assets/food.svg";
import othersSvg from "../assets/others.svg";
import servicesSvg from "../assets/services.svg";
import transportSvg from "../assets/transport.svg";
import accommodation from "../assets/accommodation.svg";

export const CATEGORIES = {
  food: {
    name: "food",
    icon: foodSvg,
  },
  other: {
    name: "others",
    icon: othersSvg,
  },
  services: {
    name: "services",
    icon: servicesSvg,
  },
  transport: {
    name: "transport",
    icon: transportSvg,
  },
  accomodation: {
    name: "accomodation",
    icon: accommodation,
  },
};

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<
  keyof typeof CATEGORIES
>;
