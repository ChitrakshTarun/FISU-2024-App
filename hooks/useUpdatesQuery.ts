import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Updates } from "@/utils/types/updates";

const useUpdatesQuery = () => {
  return useQuery({
    queryKey: ["updates"],
    queryFn: async () => {
      const updatesCollectionRef = collection(db, "updates");
      const updatesCollectionSnap = await getDocs(updatesCollectionRef);
      return updatesCollectionSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Updates[];
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default useUpdatesQuery;
