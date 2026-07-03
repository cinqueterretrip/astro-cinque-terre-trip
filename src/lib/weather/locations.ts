import type { Location } from "./types";

/**
 * The five villages of Cinque Terre.
 * Coordinates from official geographic data.
 * Extend this array to add more locations — no other file needs changing.
 */
export const LOCATIONS: Location[] = [
  {
    id: "riomaggiore",
    name: "Riomaggiore",
    latitude: 44.0996,
    longitude: 9.7375,
  },
  {
    id: "manarola",
    name: "Manarola",
    latitude: 44.1068,
    longitude: 9.7281,
  },
  {
    id: "corniglia",
    name: "Corniglia",
    latitude: 44.121,
    longitude: 9.7064,
  },
  {
    id: "vernazza",
    name: "Vernazza",
    latitude: 44.1352,
    longitude: 9.6836,
  },
  {
    id: "monterosso",
    name: "Monterosso al Mare",
    latitude: 44.1462,
    longitude: 9.6506,
  },
];

export const DEFAULT_LOCATION_ID = "manarola";
