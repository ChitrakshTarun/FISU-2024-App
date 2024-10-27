import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Player } from "@/utils/types/player";

const usePlayerDataQuery = (passportNumber: string): UseQueryResult<Player | null, Error> => {
  return useQuery({
    queryKey: ["playerProfile", passportNumber],
    queryFn: async (): Promise<Player | null> => {
      const docRef = doc(db, "players", passportNumber);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        throw new Error("Profile not found");
      }

      const { usrpswd, haspasp, islogged, ...profileData } = docSnapshot.data() as Player & { haspasp: boolean, islogged: boolean, usrpswd?: string };
      return profileData;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default usePlayerDataQuery;
