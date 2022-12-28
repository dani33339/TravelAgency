import React, {useEffect,useState} from 'react'
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiClipboardList} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useHistory } from 'react-router-dom'
import Order from '../Order/Order'
import {Link} from 'react-router-dom'



const Main = (props) => {
  const destenationRef = collection(db,"destenation")
  const [Destenation,setDestenation] = useState([]);

  let history = useHistory();

  
  useEffect(() => {
    fetchFlights();
    Aos.init({duration: 4000})
  }, [props.Filters])

  async function fetchFlights(){

    const data = await getDocs(destenationRef) 
    setDestenation(data.docs.map((doc) => (doc.data())));

    if (props.Filters)
    {
      var result
      if (props.Filters.TripType)
      {
         result = Destenation.filter(des => des.TripType===props.Filters.TripType);
      }

      if (props.Filters.Location)
      {
          result = result.filter(des => des.Location===props.Filters.Location);
      }


      if (props.Filters.Destination)
      {
          result = result.filter(des => des.Destination===props.Filters.Destination);
      }  
 
      if (props.Filters.DepartureDate)
      {
          result = result.filter(des => des.DepartureDate===props.Filters.DepartureDate);
      }  

      if (props.Filters.ReturnDate)
      {
          result = result.filter(des => des.ReturnDate===props.Filters.ReturnDate);
      }  
      setDestenation(result)
    }
  }


  const Order = async (des) => {
    history.push({
      pathname: 'Order',
      state: des
  });   }


  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          Most visited destinations
        </h3>
      </div>

      <div className="secContent grid">
        {
          Destenation.map((des,index) => {
            return (
              
              <div key={index} data-aos="fade-up" className="singleDestination">
        
              <div className="imageDiv">
              <img src={des.ImageUrl} alt="" />
              </div>
   
             <div className="cardInfo">
              <h4 className="destTitle"> {des.Destination}</h4>
              <span className="continent flex">
                 <HiOutlineLocationMarker className="icon"/>
                 <span className="name">From {des.Location}</span>
              </span>
   
              <div className="fees flex">
                 <div className="grade">
                   <span  className="textD">Departure<small> </small> </span>
                   <span>{des.DepartureDate}<small> </small> </span>
                   {des.TripType==="Roudtrip"? (<><span className="textD">  To  <small> </small> </span><span>{des.ReturnDate}<small> </small> </span></>):
                        (<><span className="textD"> </span><span>One way<small> </small> </span></>)}
                 </div>
                 
                 <div className="price">
                    
                   <h5>{des.Price}$</h5>
                 </div>
              </div>
   
              <div className="desc">
               <p>Airline: {des.Description}</p>
              </div>
                 <button className='btn flex'>Order <HiClipboardList className="icon" onClick={() => Order(des)}/> </button>
                </div>
              </div>
      
            )
          }) 
        }
      </div>
     
    </section>
  )
}

export default Main