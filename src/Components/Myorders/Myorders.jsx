import React, {useEffect,useState} from 'react'
import './Myorders.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { auth, db} from "../../firebase-config";
import {collection,getDocs,query, where} from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'

const Myorders = () => {
    useEffect(()=>{
      Aos.init({duration: 4000})
   }, [])

   const [Destenation,setDestenation] = useState([]);
   const destenationRef = collection(db,"destenation")
   const [user, loading] = useAuthState(auth);


  useEffect(() => {
    fetchDestenation();
  }, [Destenation,user])

  const fetchDestenation=async()=>{
    const q = query(collection(db, "reservations"),where("Userid", "==",user.uid))
    const data = await getDocs(q);  
    setDestenation(data.docs.map((doc) => (doc.data())))

  }

    return (
      <section id='main' className='main section container'>
        
        <div className="secTitle">
          <h1 className="title">
            My Orders
          </h1>
        </div>

        
        <div className="secContent grid">
          {
          Destenation.map((res,index) => {
            return (
                
                <div key={index} data-aos="fade-up" className="singleDestination">
        
                   <div className="imageDiv">
                   <img src={res.flight.ImageUrl} alt="" />
                   </div>
        
                  <div className="cardInfo">
                   <h4 className="destTitle"> {res.flight.Destination}</h4>
                   <span className="continent flex">
                      <HiOutlineLocationMarker className="icon"/>
                      <span className="name">{res.flight.Location}</span>
                   </span>
        
                   <div className="fees flex">
                      <div className="grade">
                        <span  className="textD">From</span>
                        <span>{res.flight.DepartureDate}</span>
                        {res.flight.TripType==="Roudtrip"? (<><span className="textD">  To  </span><span>{res.flight.ReturnDate}<small> </small> </span></>):
                        (<><span className="textD">  </span><span>One way</span></>)}
                      </div>
                     
                   </div>

                   <div className="price">
                   <span  className="textD">Total amount paid:</span>

                      <h5>{res.flight.Price*res.TicketsAmount}$</h5>
                    </div>

                   <div className="desc">
                   <p>Airline: {res.flight.Description}</p>
                   </div>

                   <div className="desc">
                   <p>Tickets Amount: {res.TicketsAmount}</p>
                   </div>

                  </div>
                </div>
        
              )
            }) 
          }
        </div>
       
      </section>
    )
  }
  
  export default Myorders