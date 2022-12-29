import React, {useEffect,useState} from 'react'
import './Order.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { db,} from "../../firebase-config";
import {collection, doc, updateDoc} from "firebase/firestore";
import { useHistory, useLocation } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Order = (props) => {
  useEffect(()=>{
    Aos.init({duration: 4000})
  }, [])

  const { state: des } = useLocation();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [TicketsAmount, setTicketsAmount] = useState("1");

  let history = useHistory();


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
  
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  console.log(process.env.REACT_APP_clientId);
  console.log(process.env.REACT_APP_apiKey);

  const handleSubmit = async () => {
    await sleep(4000);
    const getdes = doc(db, 'destenation', des.uuid);
    console.log(TicketsAmount)
    await updateDoc(getdes, {
      Nseats: des.Nseats-TicketsAmount,
    });
    history.push("/");
  }

  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          Order your flight now
        </h3>
      </div>

      <div className="secContent grid">

                      
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
                    <span  className="textD">Departure: </span>
                    <span>{des.DepartureDate}</span>
                    {des.TripType==="Roudtrip"? (<><span className="textD">  To </span><span>{des.ReturnDate} </span></>):
                          (<><span className="textD"> </span><span>One way</span></>)}
                  </div>   
                </div>
    
                <div className="desc">
                <p>Airline: {des.Description}</p>
                </div>

                <div className="price">
                      
                      <h5>Total sum: {des.Price*TicketsAmount}$</h5>
                    </div>

              <div className="addItem">
                  <label htmlFor="TripType">choose amount of tickets:</label>
                    <div className=" flex">
                    <select value={TicketsAmount} onChange={onChange}>
                    {options.map((option,index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                    ))}
                    </select>
                    </div>
                </div>   

                <div className="addItem">
                  <label htmlFor="location">Enter your first name:</label>
                    <div className="inputorder flex">
                      <input type="text"  placeholder='Enter first name here...' onChange={(event) => {setFirstName(event.target.value);}}/>
                  </div>
                </div> 


                <div className="addItem">
                  <label htmlFor="destTitle">Enter your destanation:</label>
                    <div className="inputorder flex">
                      <input type="text"  placeholder='Enter last name here...'  onChange={(event) => {
                      setLastName(event.target.value);
                    }}/>
                  </div>
                </div> 

        <div >
        <PayPalScriptProvider
          options={{ "client-id": process.env.REACT_APP_clientId}}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: des.Price*TicketsAmount,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              const name = details.payer.name.given_name;
              alert("Transaction completed by " + name); 
              
              handleSubmit();
            }}
          />
        </PayPalScriptProvider>
                </div>

          
                {/* <button  className="btn">
                  <a onClick={ () => {  
                    
                  handleSubmit();
                    }}>Submit</a>
                </button> */}

        
        

          </div>
        </div>
      
     
    </section>
  )
  }
  
  export default Order