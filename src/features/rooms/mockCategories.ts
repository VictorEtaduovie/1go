export interface RoomCategoryItem {
  id: string;
  name: string;
  icon: string;
}

export const mockCategories: RoomCategoryItem[] = [
  { id: "fun", name: "Fun", icon: "happy-outline" },
  { id: "life", name: "Life", icon: "heart-outline" },
  { id: "advice", name: "Advice", icon: "bulb-outline" },
  { id: "football", name: "Football", icon: "football-outline" },
  { id: "music", name: "Music", icon: "musical-notes-outline" },
  { id: "tech", name: "Technology", icon: "hardware-chip-outline" },
  { id: "business", name: "Business", icon: "briefcase-outline" },
  { id: "local", name: "Local", icon: "location-outline" },
];
