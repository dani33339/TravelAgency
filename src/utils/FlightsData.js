import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { fetchFilterData } from "./fetchLocalStorageData";



export function SetSearch(TripType, Location, Destination, DepartureDate, ReturnDate) {
    var fillters = [];
    fillters[0]= TripType;
    fillters[1]= Location;
    fillters[2]= Destination;
    fillters[3]= DepartureDate;
    fillters[4]= ReturnDate;

    localStorage.setItem("fillters", JSON.stringify(fillters));

    // console.log(fillters);

  }

export const fetchFlightsData = async () => {
  const fillters = fetchFilterData();
  console.log(fillters)
  if (fillters[0] && fillters[1] && fillters[2]&& fillters[3] && fillters[4])
  // if (fillters[0] && fillters[1] )
  {
    const q = query(collection(db, "destenation"),where("TripType", "==", fillters[0]),(where("Location", "==", fillters[1]),
    (where("Destination", "==", fillters[2]),(where("DepartureDate", "==", fillters[3]),(where("ReturnDate", "==", fillters[4]))))));

    // const q = query(collection(db, "destenation").where(("TripType", "==", fillters[0])
    // .where("Location", "==", fillters[1])));

    const data = await getDocs(q);  
    // console.log("hi");

    return data;
  }
  
  const destenationRef = collection(db,"destenation")
    const data = await getDocs(destenationRef) 
    return data;

};



