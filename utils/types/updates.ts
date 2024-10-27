import { Timestamp } from "firebase/firestore";

export type Updates = {
  id: string;
  description: string;
  time: Timestamp;
  title: string;
};
