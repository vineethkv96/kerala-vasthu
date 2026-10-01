import {
  BookOpen,
  Calculator,
  Home,
  Ruler,
  Save,
  Scaling,
} from "lucide-react";

export type PageId =
  | "home"
  | "room"
  | "ayadi"
  | "converter"
  | "reference"
  | "saved";

export interface NavItem {
  id: PageId;
  label: string;
  icon: typeof Home;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "room", label: "Room Size", icon: Ruler },
  { id: "ayadi", label: "Ayadi", icon: Calculator },
  { id: "converter", label: "Converter", icon: Scaling },
  { id: "reference", label: "Reference", icon: BookOpen },
  { id: "saved", label: "Saved", icon: Save },
];
