import React, {useEffect,useState} from 'react'
import './admin.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {HiClipboardList} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {GrFormAdd} from 'react-icons/gr'
import { db, storage} from "../../firebase-config";
import {collection, deleteDoc, doc,getDocs,setDoc} from "firebase/firestore";
import {uid} from "uid";
import {ref,uploadBytes, getDownloadURL} from "firebase/storage";

const Admin = () => {
    useEffect(()=>{
      Aos.init({duration: 4000})
   }, [])

   const [ImgSrc, setImgSrc] = useState(null);
   const [TripType,setTripType] = useState("Roudtrip");
   const [Destination, setDestination] = useState("");
   const [Location, setLocation] = useState("");
   const [DepartureDate, setDepartureDate] = useState("");
   const [DepartureTime, setDepartureTime] = useState("");
   const [ReturnDate, setReturnDate] = useState("");
   const [ReturnTime, setReturnTime] = useState("");
   const [Price, setPrice] = useState("");
   const [Description, setDescription] = useState("");
   const [Nseats, setNseats] = useState("");
   const [Reservations, setReservations] = useState([]);

   //
   const [Destenation,setDestenation] = useState([]);
   const destenationRef = collection(db,"destenation")
  
   const [Currentdes, setCurrentdes] = useState(null)  

   //uploadImage

   const handleImageChange = (e) => {
    if(e.target.files[0]){
      setImgSrc(e.target.files[0]);
    }
   }

   const handleSubmit = () => {
    const imageRef = ref(storage, `image/${ImgSrc.name}`);
    uploadBytes(imageRef, ImgSrc)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) =>{
            var uuid;
            if (Currentdes)
            {
              uuid = Currentdes.uuid;
            }
            else{
              uuid = uid();
            }
              await setDoc(doc(db,"destenation",uuid),{
              uuid,
              ImageUrl: url,
              TripType: TripType,
              Destination: Destination ,
              Location: Location,
              DepartureDate: DepartureDate,
              DepartureTime: DepartureTime,
              ReturnDate: ReturnDate,
              ReturnTime: ReturnTime,
              Price: Price,
              Description: Description,
              Nseats: Nseats,
              reservations : Reservations,  
            });
            console.log("flight added successfully")
            alert("flight added successfully"); 
            window.location.reload(false);
         })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        alert("Error somthing went wrong please try again"); 
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchDestenation();
  }, [])

  const fetchDestenation=async()=>{
      const data = await getDocs(destenationRef) 
      setDestenation(data.docs.map((doc) => (doc.data())));
  }
  
  // field clean
  const clearinput = () =>{
    setImgSrc('');
    setDestination("");
    setLocation('');
    setDepartureDate('');
    setDepartureTime('');
    setLocation('');
    setReturnDate('');
    setReturnTime('');
    setPrice('');
    setDescription('');
    setNseats('');
    setReservations([]);
    setCurrentdes(null)
  }

   
  //delete
   const DeleteDestenation = async (uuid) => {
    await deleteDoc(doc(db, "destenation", uuid));
    window.location.reload(false);
   }

   const [active, setActive] = useState('addBar')

    //function to toggle addbar
    const showadd = (des=null) => {
      if (des.uuid)
      {
        setCurrentdes(des)
        setTripType(des.TripType);
        setImgSrc(des.ImageUrl);
        setDestination(des.Destination);
        setLocation(des.Location);
        setDepartureDate(des.DepartureDate);
        setDepartureTime(des.DepartureTime);
        setReturnDate(des.ReturnDate);
        setReturnTime(des.ReturnTime);
        setPrice(des.Price);
        setDescription(des.Description);
        setNseats(des.Nseats);
        setReservations(des.reservations);
      }
        setActive('addBar activeaddbar')
    }
    //function to remove addbar
    const removeaddbar = () => {
        clearinput();
        setActive('addBar')
    }

    const disableDates=()=>{
      var today,dd,mm,yyyy;
      today=new Date();
      dd=today.getDate()+1;
      mm=today.getMonth()+1;
      yyyy=today.getFullYear();
      return yyyy+"-"+mm+"-"+dd;
    }

    return (
      <section id='main' className='main section container'>
        
        <div className="secTitle">
          <h1 className="title">
            destinations additing
          </h1>
        </div>

        
      <button id='addbtn' className='btn flex'  onClick={showadd}>ADD <GrFormAdd className="icon"/> </button>
      <h1>{}</h1>
      {/* menu for adding flights*/}
      <header className="header flex">
        <div className={active}>
            {/* <ul  lassName="addLists flex"> */}

            <div className="addItem">
                <label htmlFor="TripType">choose TripType:</label>
                  <div className="input flex"> 
                  Roudtrip
                  <input type="radio" value="Roudtrip" name="Triptype" defaultChecked onChange={e=>setTripType(e.target.value)}/> 
                  One_way
                  <input type="radio" value="One way" name="Triptype" onChange={e=>setTripType(e.target.value)}/>
                  </div>
              </div>   


              <div className="addItem">
                <label htmlFor="imgSrc">choose photo:</label>
                  <div className="input flex">
                    <input type="file" onChange={handleImageChange}/>
                </div>
              </div>   
              
               <div className="addItem">
                <label htmlFor="location">Enter your location:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter location here...' value={Location} onChange={(event) => {
                    setLocation(event.target.value);
                  }}/>
                </div>
              </div> 


              <div className="addItem">
                <label htmlFor="destTitle">Enter your destanation:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter destanation here...' value={Destination} onChange={(event) => {
                    setDestination(event.target.value);
                  }}/>
                </div>
              </div> 
        
              <div className="addItem">
                <label htmlFor="grade">Departure Date:</label>
                  <div className="input flex">
                    <input type="date"  placeholder='Enter grade here...' value={DepartureDate} min={disableDates()} onChange={(event) => {
                    setDepartureDate(event.target.value);
                  }}/>
                </div>
              </div>

              <div className="addItem">
                <label htmlFor="grade">Departure Time:</label>
                  <div className="input flex">
                    <input type="time"  placeholder='Enter grade here...' value={DepartureTime} onChange={(event) => {
                    setDepartureTime(event.target.value);
                  }}/>
                </div>
              </div>

              {TripType==="Roudtrip" &&

              <><div className="addItem">
                <label htmlFor="grade">Return Date:</label>
                <div className="input flex">
                  <input type="date" placeholder='Enter grade here...' value={ReturnDate} min={DepartureDate} onChange={(event) => {
                    setReturnDate(event.target.value)
                  } } />
                </div>
              </div><div className="addItem">
                  <label htmlFor="grade">Return Time:</label>
                  <div className="input flex">
                    <input type="time" placeholder='Enter grade here...' value={ReturnTime} onChange={(event) => {
                      setReturnTime(event.target.value)
                    } } />
                  </div>
                </div></>
            }

              <div className="addItem">
                <label htmlFor="price">Enter your price:</label>
                  <div className="input flex">
                    <input type="number"  placeholder='Enter price here...' value={Price} onChange={(event) => {
                    setPrice(event.target.value);
                  }}/>
                </div>
              </div>

              <div className="addItem">
                <label htmlFor="description">Enter your description:</label>
                  <div className="input flex">
                    <input type="textarea"   placeholder='Enter description here...'  value={Description} onChange={(event) => {
                    setDescription(event.target.value);
                  }}/>
                </div>
              </div>

              <div className="addItem">
                <label htmlFor="nseats">Enter number of seats:</label>
                  <div className="input flex">
                    <input type="number"  placeholder='Enter number here...' value={Nseats} onChange={(event) => {
                    setNseats(event.target.value);
                  }}/>
                </div>
              </div>

              <button  className="btn">
                <a onClick={ () => {
                 
                  clearinput()
                  removeaddbar()
                  handleSubmit()
                  }}>Submit</a>
               </button>
            {/* </ul> */}

            <div onClick={removeaddbar} className="closeaddbar">
                <AiFillCloseCircle className="icon" />
            </div>

        </div>
      </header>


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
                      <span className="name">{des.Location}</span>
                   </span>
        
                   <div className="fees flex">
                      <div className="grade">
                        <span  className="textD">From</span>
                        <span>{des.DepartureDate}</span>
                        <span> at {des.DepartureTime} </span>
                        {des.TripType==="Roudtrip"? (<><span className="textD">  To  </span><span>{des.ReturnDate}<small> </small> </span>
                        <span> at {des.ReturnTime} </span></>):
                        (<><span className="textD">  </span><span>One way</span></>)}
                      </div>
                     
                   </div>

                   <div className="price">
                      <h5>{des.Price}$</h5>
                    </div>

                   <div className="desc">
                   <p>Airline: {des.Description}</p>
                   </div>

                    <div id='card_btn'>
                      <button className='btn flex' onClick={() => showadd(des)}>EDIT <HiClipboardList className="icon" /> </button>
                      <button className='btn flex' onClick={() => DeleteDestenation(des.uuid)}>DELETE <HiClipboardList className="icon" /> </button>
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
  
  export default Admin