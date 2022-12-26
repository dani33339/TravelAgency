import React, {useEffect,useState} from 'react'
import './Order.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {HiClipboardList} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {GrFormAdd} from 'react-icons/gr'
import { db, storage} from "../../firebase-config";
import {collection, doc,getDocs,setDoc} from "firebase/firestore";
import {uid} from "uid";

import {ref,uploadBytes, getDownloadURL} from "firebase/storage";
import { useLocation } from 'react-router-dom'

const Order = (props) => {
  useEffect(()=>{
    Aos.init({duration: 4000})
  }, [])

  const { state } = useLocation();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [TicketsAmount, setTicketsAmount] = useState("1");


  const options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ];

  const onChange = (event) => {
    setTicketsAmount(event.target.value);
  };


  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          Order your flight now
        </h3>
      </div>

      <div className="secContent grid">

                      
              <div className="imageDiv">
              <img src={state.ImageUrl} alt="" />
              </div>
   
             <div className="cardInfo">
              <h4 className="destTitle"> {state.Destination}</h4>
              <span className="continent flex">
                 <HiOutlineLocationMarker className="icon"/>
                 <span className="name">From {state.Location}</span>
              </span>
   
              <div className="fees flex">
                 <div className="grade">
                   <span  className="textD">Departure<small> </small> </span>
                   <span>{state.DepartureDate}<small> </small> </span>
                   {state.TripType==="Roudtrip"? (<><span className="textD">  To  <small> </small> </span><span>{state.ReturnDate}<small> </small> </span></>):
                        (<><span className="textD"> </span><span>One way<small> </small> </span></>)}
                 </div>
                 
                 <div className="price">
                    
                   <h5>{state.Price}$</h5>
                 </div>
              </div>
   
              <div className="desc">
               <p>Airline: {state.Description}</p>
              </div>

              <div className="price">
                    
                    <h5>Total sum:{state.Price*TicketsAmount}$</h5>
                  </div>

              <div className="Orderdetails">
        <div >

            <div className="addItem">
                <label htmlFor="TripType">choose amount of tickets:</label>
                  <div className="input flex">
                  <select value={TicketsAmount} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
                  </div>
              </div>   

               <div className="addItem">
                <label htmlFor="location">Enter your first name:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter first name here...' onChange={(event) => {setFirstName(event.target.value);}}/>
                </div>
              </div> 


              <div className="addItem">
                <label htmlFor="destTitle">Enter your destanation:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter last name here...'  onChange={(event) => {
                    setLastName(event.target.value);
                  }}/>
                </div>
              </div> 
        
              <button  className="btn">
                <a onClick={ () => {
                 

                  }}>Submit</a>
               </button>

        </div>
      </div>

                 {/* <button className='btn flex'>Order <HiClipboardList className="icon" /> </button> */}
                </div>
              </div>
      
     
    </section>
  )
  }
  
  export default Order