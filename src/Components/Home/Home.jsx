import React, {useEffect} from 'react'
import './home.css'
import video from "../../Assets/video3.mp4";
import {GrLocation} from 'react-icons/gr'
import {AiOutlineSearch} from 'react-icons/ai'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useState } from 'react';
import { SetSearch } from '../../utils/FlightsData';

const Home = () => {

  const [TripType,setTripType] = useState("Roudtrip");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Depart, setDepart] = useState("");
  const [Return, setReturn] = useState("");

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const SetFillters = () => {
    SetSearch(TripType,From,To,Depart,Return)
};

  return (
    <section id='home' className='home'>
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted type="video/mp4"></video>

      <div data-aos="fade-down" className="homeContent container">
        <div className="textDiv">
        <span  className="smallText">
          Our Flight
        </span>
        <h1 data-aos="fade-down" className="homeTitle">
          Search your Flight
        </h1>
        </div>

        <div data-aos="fade-down" className="cardDiv grid">

        <div className="FromInput">
            <label htmlFor="city">Trip type:</label>
            <div className="triptypeOptions flex">
            <input type="radio" value="Roudtrip" name="Triptype" defaultChecked onChange={e=>setTripType(e.target.value)}/> Roudtrip
          <input type="radio" value="One way" name="Triptype" onChange={e=>setTripType(e.target.value)}/> One way
            </div>
          </div>

          <div className="FromInput">
            <label htmlFor="city">From:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter name here...' value={From} onChange={(event) => {setFrom(event.target.value);}}/>
            <GrLocation className="icon"/>
            </div>
          </div>

          
          <div className="ToInput">
            <label htmlFor="city">To:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter name here...' value={To} onChange={(event) => {setTo(event.target.value);}}/>
            <GrLocation className="icon"/>
            </div>
          </div>


          <div className="DepartInput">
            <label htmlFor="city">Depart:</label>
            <div className="input flex">
            <input type="date" />
           
            </div>
          </div>

          {TripType==="Roudtrip" &&
          <div className="ReturnInput">
            <label htmlFor="city">Return:</label>
            <div className="input flex">
            <input type="date" />
           
            </div>  
          </div>
          }

          <div className="searchOptions flex">
          <span onClick={SetFillters}>Search</span>
           <AiOutlineSearch className="icon"/>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Home