export type RoomCategory =
  | "Nearby"
  | "Fun"
  | "Life"
  | "Flirt"
  | "Music"
  | "Career"
  | "Random";

export type Room = {
  id: string;
  title: string;
  category: RoomCategory;
  description: string;
  participants: number;
  hostName: string;
  hostInitials: string;
  location: string;
  isTrending?: boolean;
  isNearby?: boolean;
  accent: string;
  participantInitials: string[];
};

export const mockRooms: Room[] = [
  {
    id: "room-001",
    title: "Late Night Conversations",
    category: "Random",
    description: "Come in, say hello and meet someone new.",
    participants: 28,
    hostName: "Maya",
    hostInitials: "MY",
    location: "Lagos",
    isTrending: true,
    accent: "#7C3AED",
    participantInitials: ["JD", "KA", "TO", "ME"],
  },
  {
    id: "room-002",
    title: "What Are You Thinking?",
    category: "Life",
    description:
      "Real conversations about life, choices and everything between.",
    participants: 19,
    hostName: "Daniel",
    hostInitials: "DA",
    location: "Abuja",
    isTrending: true,
    accent: "#2563EB",
    participantInitials: ["AB", "JO", "NI", "SE"],
  },
  {
    id: "room-003",
    title: "Just Vibes",
    category: "Fun",
    description: "No agenda. Just good energy and interesting people.",
    participants: 41,
    hostName: "Chris",
    hostInitials: "CH",
    location: "Port Harcourt",
    isNearby: true,
    accent: "#06B6D4",
    participantInitials: ["EM", "RO", "VI", "TA"],
  },
  {
    id: "room-004",
    title: "Career & Ambition",
    category: "Career",
    description: "Talk work, goals, business and the next big move.",
    participants: 14,
    hostName: "Sarah",
    hostInitials: "SA",
    location: "Ibadan",
    accent: "#F59E0B",
    participantInitials: ["OL", "KE", "MI", "AD"],
  },
  {
    id: "room-005",
    title: "Music Corner",
    category: "Music",
    description: "Artists, playlists, new sounds and music discoveries.",
    participants: 33,
    hostName: "Tobi",
    hostInitials: "TO",
    location: "Enugu",
    isTrending: true,
    accent: "#EC4899",
    participantInitials: ["AY", "DA", "LU", "JO"],
  },
];
