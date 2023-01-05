import React, {useEffect,useRef,useState} from 'react'
import './Order.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { db,} from "../../firebase-config";
import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import { useHistory, useLocation } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { uid } from 'uid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../firebase-config";



const Order = (props) => {

  const { state: des } = useLocation();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [TicketsAmount, setTicketsAmount] = useState("1");
  const [CardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [id, setid] = useState("");
  const TicketsAmountRef = useRef(); 
  const FirstNameRef = useRef(); 
  const LastNameRef = useRef(); 
  const [user, loading] = useAuthState(auth);
  const [isFrontOfCardVisible, setIsFrontOfCardVisible] = useState(true);
  const [PaymentMethod,setPaymentMethod] = useState("Credit card");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [cardholder, setcardholder] = useState("");
  useEffect(()=>{
    Aos.init({duration: 4000})
    TicketsAmountRef.current=TicketsAmount
    FirstNameRef.current=FirstName;
    LastNameRef.current=LastName;
  }, [TicketsAmount,FirstName,LastName,user])

  let history = useHistory();

  const onChange = (event) => {
    setTicketsAmount(event.target.value);
  };
  
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleSubmit = async (props) => {
    if (des.Nseats-TicketsAmountRef.current<0)
      {
        alert("There are not enough seats on this flight only "+TicketsAmountRef.current+" left"); 
        return
      }
    console.log(props)
    const getdes = doc(db, 'destenation', des.uuid);
    await updateDoc(getdes, {
      Nseats: des.Nseats-TicketsAmountRef.current,
    });

    var desWithoutreservations = Object.assign({}, des);
    console.log(des)
    delete desWithoutreservations.reservations; 
    console.log(desWithoutreservations)

    var ruid = uid();
    await setDoc(doc(db, "reservations", ruid), {
      FirstName :FirstNameRef.current,
      LastName :LastNameRef.current,
      TicketsAmount: TicketsAmountRef.current,
      timeStamp: serverTimestamp(),
      flight : desWithoutreservations, 
      Userid: user.uid
    });

    await updateDoc(getdes, {
      reservations: [...des.reservations, {"FirstName":FirstNameRef.current,"LastName":LastNameRef.current,"TicketsAmount":TicketsAmountRef.current,"ruid":ruid}]
    });


    const getuser = doc(db, 'users', user.uid);
    const userData = await getDoc(getuser) 

    await updateDoc(getuser, {
      reservation: [...userData.data().reservation, ruid]
    });

    if (props==="card")
      if(isSubscribed){
        
        await updateDoc(getuser, {
          card: [...userData.data().card,{"CardNumber":CardNumber,"expiryDate":expiry,"cvc":cvc}]
        });
      }
      alert("Transaction completed by " + FirstName+" "+LastName + " thank you for your purchase. you are being rederect to the main page "); 
    await sleep(1000);
    history.push("/Myorders");
  }

  const ischecked = event =>{
    
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
    } else {
      console.log('⛔️ Checkbox is NOT checked');
    }
    setIsSubscribed(current => !current);
    
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
                    <span> at {des.DepartureTime}</span>
                    {des.TripType==="Roudtrip"? (<><span className="textD">  To </span><span>{des.ReturnDate} </span>
                    <span> at {des.ReturnTime}</span></>):
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
                <label htmlFor="ticketsAmount">choose amount of tickets:</label>
                  <div className="input flex">
                  <select onChange={onChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  </select>
                  </div>
              </div>  

                <div className="addItem">
                  <label htmlFor="firstname">Enter your first name:</label>
                    <div className="inputorder flex">
                      <input type="text"  placeholder='Enter first name here...' onChange={(event) => {setFirstName(event.target.value);}}
                       onKeyPress={
                        (event) => 
                        { 
                          if(!(event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122)){
                            event.preventDefault();
                          }
    
                          }
                        }
                        />
                  </div>
                </div> 


                <div className="addItem">
                  <label htmlFor="lastname">Enter your last name:</label>
                    <div className="inputorder flex">
                      <input type="text"  placeholder='Enter last name here...'  onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    onKeyPress={
                      (event) => 
                      { 
                        if(!(event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122)){
                          event.preventDefault();
                        }
  
                        }
                      }
                      />
                  </div>
                </div> 

                <div className="addItem">
                <label htmlFor="payment method">Choose payment method:</label>
                  <div className="input flex "> 
                  <h4 id='creditcard'>Credit card</h4>
                  
                  <input type="radio" value="Credit card" name="Triptype" defaultChecked onChange={e=>setPaymentMethod(e.target.value)}/> 
                  <h4 id='creditcard'>PayPal</h4>
                  <input type="radio" value="PayPal" name="Triptype" onChange={e=>setPaymentMethod(e.target.value)}/>
                  </div>
              </div>   

        <div >         
          {PaymentMethod==="PayPal" ? (

        <PayPalScriptProvider
          options={{ "client-id": process.env.REACT_APP_clientId}}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: des.Price*TicketsAmountRef.current,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              const name = details.payer.name.given_name;
              alert("Transaction completed by " + name + " thank you for your purchase. you are being rederect to the main page "); 
              handleSubmit("paypal");
            }}
            onError={()=> {
              alert("An Error occured with your payment"); 
            }}

            onCancel={() => {
              alert("Please make sure to finish the payment"); 
            }}
          />
        </PayPalScriptProvider>):
        (
          <div>
              <form className="card-form">
              <div className="form-group ">
                  <input
                   onKeyPress={
                    (event) => 
                    { 
                      if(!(event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122)){
                        event.preventDefault();
                      }

                      }
                    }
                    maxlength={16}
                    type="text"
                    className="inputorder"
                    placeholder="Cardholder Name"
                    value={cardholder}
                    onChange={(e) => setcardholder(e.target.value)}
                  />
                  <input
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    maxlength={9}
                    type="text"                   
                    className="inputorder"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                  />
                  <input
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    type="text"
                    maxlength={16}
                    className="CardNumber"
                    placeholder="Card Number"
                    value={CardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="expiry-and-cvc-container ">
                    <input
                       onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxlength={5}
                      datatype="DD MM"
                      type="text"
                      className="Date"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    
      
                    <input
                       onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      maxlength={3}
                      type="text"
                      className="cvc"
                      placeholder="CVC"
                      value={cvc}
                      
                      onChange={(e) => setCvc(e.target.value)}
                    />
                    
                  </div>

                </div>   
                <div className="savecard">SAVE CARD
                  <input type="checkbox" id='my-checkbox' onChange={ischecked}></input>
                  <span className="checkmark"></span>          
                </div>
             
              </form>

                
            <button  className="btn">
            <a onClick={ () => {  
              
            handleSubmit("card");
              }}>Submit</a> 
          </button> 
      </div>
          
        )}
                </div>              
          </div>
        </div>
       
    </section>
    
  )
  }
  
  export default Order