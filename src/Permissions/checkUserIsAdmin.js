import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";


export  const checkUserIsAdmin = async user => {
  const docRef = doc(db, "users", user?.uid);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.data().userRoles.includes('admin')) {
        return true;
      }
      else 
      {
        return false;
      }
    } catch(error) {
        console.log(error)
    }
}


