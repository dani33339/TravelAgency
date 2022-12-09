import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

var fillters;

export function SetSearch(triptype, from, to, deapartdate, returndate) {
    fillters = triptype
    
  }

export const fetchFlightsData = async () => {
    // console.log(fillters);
    const destenationRef = collection(db,"destenation")
    const data = await getDocs(destenationRef) 
    return data;

};



