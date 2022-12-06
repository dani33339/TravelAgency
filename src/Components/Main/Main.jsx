import React, {useEffect,useState} from 'react'
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiClipboardList} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {db} from "../../firebase-config";
import {collection,getDocs,} from "firebase/firestore";

const Main = () => {

  //raed
  const destenationRef = collection(db,"destenation")
  const [Destenation,setDestenation] = useState([]);

  useEffect(() => {
    fetchDestenation();
  }, [])

  const fetchDestenation=async()=>{
      const data = await getDocs(destenationRef) 
      setDestenation(data.docs.map((doc) => (doc.data())));
  }


  useEffect(()=>{
    Aos.init({duration: 4000})
 }, [])
  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          Most visited destinations
        </h3>
      </div>

      <div className="secContent grid">
        {
          Destenation.map(({id, imageUrl, destTitle, location, Departure,Return, fees, description})=>{
            return (
              
              <div key={id} data-aos="fade-up" className="singleDestination">
        
              <div className="imageDiv">
              <img src={imageUrl} alt="" />
              </div>
   
             <div className="cardInfo">
              <h4 className="destTitle"> {destTitle}</h4>
              <span className="continent flex">
                 <HiOutlineLocationMarker className="icon"/>
                 <span className="name">{location}</span>
              </span>
   
              <div className="fees flex">
                 <div className="grade">
                   <span  className="textD">From<small> </small> </span>
                   <span>{Departure}<small> </small> </span>
                   <span className="textD">  To  <small> </small> </span>
                   <span>{Return}<small> </small> </span>
                 </div>
                 
                 <div className="price">
                    
                   <h5>{fees}$</h5>
                 </div>
              </div>
   
              <div className="desc">
               <p>{description}</p>
              </div>
      
                 <button className='btn flex'>DETAILS <HiClipboardList className="icon"/> </button>
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