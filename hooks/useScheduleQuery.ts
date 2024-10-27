import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Schedule } from "@/utils/types/schedule";

const useScheduleQuery = (): UseQueryResult<Schedule, Error> => {
  return useQuery({
    queryKey: ["scheduleData"],
    queryFn: async (): Promise<Schedule> => {
      const collectionRef = collection(db, "schedule");
      const querySnapshot = await getDocs(collectionRef);
      const data: Schedule = {};

      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data() as Schedule[string];
      });

      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default useScheduleQuery;
