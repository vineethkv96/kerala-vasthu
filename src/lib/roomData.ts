import type { RoomType } from "../types";

export const roomTypes: RoomType[] = [
  "Bedroom",
  "Living Room",
  "Kitchen",
  "Dining Room",
  "Pooja Room",
  "Study Room",
  "Bathroom",
  "Store Room",
  "Balcony",
  "Custom Room",
];

export interface RoomRange {
  room: string;
  min: string;
  max: string;
}

export const defaultRoomRanges: RoomRange[] = [
  { room: "Bedroom", min: "10 ft × 10 ft", max: "14 ft × 16 ft" },
  { room: "Master Bedroom", min: "12 ft × 14 ft", max: "16 ft × 18 ft" },
  { room: "Living Room", min: "12 ft × 16 ft", max: "18 ft × 24 ft" },
  { room: "Kitchen", min: "8 ft × 10 ft", max: "12 ft × 14 ft" },
  { room: "Dining Room", min: "10 ft × 12 ft", max: "14 ft × 16 ft" },
  { room: "Pooja Room", min: "4 ft × 4 ft", max: "8 ft × 8 ft" },
  { room: "Bathroom", min: "4 ft × 6 ft", max: "8 ft × 10 ft" },
  { room: "Study Room", min: "8 ft × 10 ft", max: "12 ft × 14 ft" },
];
