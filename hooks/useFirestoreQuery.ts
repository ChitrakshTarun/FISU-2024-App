import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

type AppData<T> = {
  [key: string]: T;
};

const useFirestoreQuery = <T>(collectionName: string, documentId?: string): UseQueryResult<AppData<T>, Error> => {
  return useQuery({
    queryKey: ["appData", collectionName, documentId || "all"],
    queryFn: async (): Promise<AppData<T> | T> => {
      if (documentId) {
        const docRef = doc(db, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          return docSnapshot.data() as T;
        } else {
          throw new Error("Document not found");
        }
      } else {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        const data: AppData<T> = {};
        querySnapshot.forEach((doc) => {
          data[doc.id] = doc.data() as T;
        });
        return data;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export default useFirestoreQuery;
