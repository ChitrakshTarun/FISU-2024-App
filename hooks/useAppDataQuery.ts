import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// Generic type for the data structure
type AppData<T> = {
  [key: string]: T;
};

const useAppDataQuery = <T>(collectionName: string): UseQueryResult<AppData<T>, Error> => {
  return useQuery({
    queryKey: ["appData", collectionName],
    queryFn: async (): Promise<AppData<T>> => {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      const data: AppData<T> = {};

      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data() as T;
      });

      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default useAppDataQuery;
