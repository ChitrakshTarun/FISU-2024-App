import { Timestamp } from "firebase/firestore";

export type Schedule = {
  [date: string]: {
    [id: string]: {
      title: string;
      allDay: boolean;
      startTime?: Timestamp;
      endTime?: Timestamp;
    };
  };
};
