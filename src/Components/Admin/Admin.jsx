import React, {useEffect,useState} from 'react'
import './admin.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {HiClipboardList} from 'react-icons/hi'
import barcelona from '../../Assets/barcelona.jpg'
import berlin from '../../Assets/berlin.jpg'
import toronto from '../../Assets/toronto.jpg'
import craimea from '../../Assets/craimea.jpg'
import moscow from '../../Assets/moscow.jpg'
import paris from '../../Assets/paris.jpg'
import prague from '../../Assets/prague.jpg'
import tokyo from '../../Assets/tokyo.jpg'
import newyork from '../../Assets/newyork.jpg'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {GrFormAdd} from 'react-icons/gr'
import { db, storage} from "../../firebase-config";
import {collection, doc,getDocs,setDoc} from "firebase/firestore";
import {uid} from "uid";

import {ref,uploadBytes, getDownloadURL} from "firebase/storage";


const Data = [
    {
    id:1,
    imgSrc: barcelona,
    destTitle: 'Barcelona',
    location: 'Spain',
    grade: 'CULTURAL RELAX ',
    fees: 'From $700',
    description: 'Perfect beaches, world-famous tapas, and Gaudí—the Catalan capital is a Mediterranean dream.' 
    },
  
  
    {
    id:2,
    imgSrc: berlin,
    destTitle: 'Berlin',
    location: 'Germany',
    grade: 'HISTORY GRAFFITI ',
    fees: 'From $700',
    description: 'Berlin is an edgy city, from its fashion to its architecture to its charged political history. The Berlin Wall is a sobering reminder of the hyper-charged postwar atmosphere, and yet the graffiti art.' 
    },
  
  
    {
    id:3,
    imgSrc: toronto,
    destTitle: 'Toronto',
    location: 'Canda',
    grade: 'SHOPING THEATER ',
    fees: 'From $700',
    description: "We've heard Toronto described as New York City run by the Swiss, and it's true—you can find world-class theater, shopping and restaurants here, but the sidewalks are clean and the people are friendly. The best place to start is literally at the top—the CN Tower, the tallest freestanding structure in the Western Hemisphere."  
    },
  
  
    {
    id:4,
    imgSrc: craimea,
    destTitle: 'Cappadocia',
    location: 'Turkey ',
    grade: 'CULTURAL RELAX ',
    fees: '$800',
    description: '  According to the World Tourism Ranking, 45 Million people visit Turkey each year, and from that about 2 Million come to visit Cappadocia. This place is known for its luxurious stays and adventurous activities '  
    },
  
  
    {
    id:5,
    imgSrc: moscow,
    destTitle: 'Guanajuato',
    location: 'Mexico',
    grade: 'CULTURAL RELAX ',
    fees: '$1100',
    description: 'A city in central Mexico, Guanajuato is known for its history of silver mining and colonial architecture. The houses in the city are very attractively painted with the most bright colors available. Always welcome.'  
    },
  
  
    {
    id:6,
    imgSrc: paris,
    destTitle: 'Cinque Terre',
    location: 'Italy ',
    grade: 'CULTURAL RELAX ',
    fees: '$840',
    description: 'The vibrant hues of the houses are its benchmark and explain the beauty of this place. Also, if you are a foodie and love seafood, you will be exhilarated with the choice you are about to get here. Happy exploring great food! '  
    },
  
  
    {
    id:7,
    imgSrc: prague,
    destTitle: 'Angkor Wat',
    location: 'Cambodia',
    grade: 'CULTURAL RELAX ',
    fees: '$790',
    description: 'Angkot wat represents the entire range of Khmer art from the 9th to the 15th century. This temple is considered the heart and soul of Cambodia. This place is known for its luxurious stays and adventurous activities'  
    },
  
  
    {
    id:8,
    imgSrc: tokyo,
    destTitle: 'Taj Mahal',
    location: 'India',
    grade: 'CULTURAL RELAX ',
    fees: '$900',
    description: 'An immense mausoleum of white marble, built-in Agra by Mughal emperor Shah Jahan in memory of his wife Mumtaz, the monument is breathtakingly beautiful. This place is known for its luxurious stays and adventurous activities' 
    },
  
  
    {
    id:9,
    imgSrc: newyork,
    destTitle: 'Bali Island',
    location: 'Indonesia',
    grade: 'CULTURAL RELAX ',
    fees: '$500',
    description: 'Bali is an Indonesian Island and one of the best holiday destinations in the Indonesian archipelago. Bali is known for its volcanic mountains, history, art & culture, food, temples and beautiful sandy beaches.' 
    },
  ]


const Admin = () => {
    useEffect(()=>{
      Aos.init({duration: 4000})
   }, [])

   const [imgSrc, setimgSrc] = useState(null);
   const [destTitle, setdestTitle] = useState("");
   const [location, setlocation] = useState("");
   const [Departure, setDeparture] = useState("");
   const [Return, setReturn] = useState("");
   const [fees, setfees] = useState("");
   const [description, setdescription] = useState("");
   //
   const [Destenation,setDestenation] = useState([]);
   const destenationRef = collection(db,"destenation")
  

   //uploadImage

   const handleImageChange = (e) => {
    if(e.target.files[0]){
      setimgSrc(e.target.files[0]);
    }
   }

   const handleSubmit = () => {
    const imageRef = ref(storage, `image/${imgSrc.name}`);
    uploadBytes(imageRef, imgSrc)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) =>{
            const uuid = uid()
              setDoc(doc(db,"destenation",uuid),{
              uuid,
              imageUrl: url,
              destTitle: destTitle ,
              location: location,
              Departure: Departure,
              Return : Return,
              fees: fees,
              description:description
            });
      
         })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        // setimgSrc(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };



  //  read

  useEffect(() => {
    fetchDestenation();
  }, [])

  const fetchDestenation=async()=>{
      const data = await getDocs(destenationRef) 
      setDestenation(data.docs.map((doc) => (doc.data())));
  }
  
  
  
  // ניקוי שדות
  const clearinput = () =>{
    // setimgSrc('');
    setdestTitle("");
    setlocation('');
    setlocation('');
    setlocation('');
    setfees('');
    setdescription('');
  }

 
  

   
  //delete
   const DeleteDestenation = (Data) => {

   }


   const [active, setActive] = useState('addBar')

    //function to toggle addbar
    const showadd = () => {
        setActive('addBar activeaddbar')
    }
    //function to remove addbar
    const removeaddbar = () => {
        setActive('addBar')
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
      {/* תפריט הוספה של היעדים */}
      <header className="header flex">
        <div className={active}>
            <ul  lassName="addLists flex">

              <div className="addItem">
                <label htmlFor="imgSrc">choose photo:</label>
                  <div className="input flex">
                    <input type="file" onChange={handleImageChange}/>
                </div>
              </div>   

              <div className="addItem">
                <label htmlFor="destTitle">Enter your destanation:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter destanation here...' value={destTitle} onChange={(event) => {
                    setdestTitle(event.target.value);
                  }}/>
                </div>
              </div> 

               <div className="addItem">
                <label htmlFor="location">Enter your location:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter location here...' value={location} onChange={(event) => {
                    setlocation(event.target.value);
                  }}/>
                </div>
              </div> 
              
              <div className="addItem">
                <label htmlFor="grade">Departure Date:</label>
                  <div className="input flex">
                    <input type="date"  placeholder='Enter grade here...' value={Departure} onChange={(event) => {
                    setDeparture(event.target.value);
                  }}/>
                </div>
              </div>

              <div className="addItem">
                <label htmlFor="grade">Return Date:</label>
                  <div className="input flex">
                    <input type="date"  placeholder='Enter grade here...' value={Return} onChange={(event) => {
                    setReturn(event.target.value);
                  }}/>
                </div>
              </div>

              <div className="addItem">
                <label htmlFor="price">Enter your price:</label>
                  <div className="input flex">
                    <input type="number"  placeholder='Enter price here...' value={fees} onChange={(event) => {
                    setfees(event.target.value);
                  }}/>
                </div>
              </div>

              <div className="addItem">
                <label htmlFor="description">Enter your description:</label>
                  <div className="input flex">
                    <input type="textarea"   placeholder='Enter description here...'  value={description} onChange={(event) => {
                    setdescription(event.target.value);
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
            </ul>

            <div onClick={removeaddbar} className="closeaddbar">
                <AiFillCloseCircle className="icon" />
            </div>

        </div>
      </header>


        {/* כרטיסים עם היעדים */}
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

                    <div id='card_btn'>
                      <button className='btn flex'>EDIT <HiClipboardList className="icon" /> </button>
                      <button className='btn flex'>DELETE <HiClipboardList className="icon" onClick={() => DeleteDestenation(Data)}/> </button>
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