import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

var fillters;

export function SetSearch(TripType, Location, Destination, deapartdate, returndate) {
    fillters = TripType
    
  }

  // ImageUrl: url,
  // TripType: TripType,
  // Destination: Destination ,
  // Location: Location,
  // Departure: DepartureDate,
  // ReturnDate : ReturnDate,
  // Price: Price,
  // Description:Description

export const fetchFlightsData = async () => {
    // console.log(fillters);
    const destenationRef = collection(db,"destenation")
    const data = await getDocs(destenationRef) 
    return data;

};



