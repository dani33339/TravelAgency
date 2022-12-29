import React, {useEffect} from 'react'
import './home.css'
import video from "../../Assets/video3.mp4";
import {GrLocation, GrPowerReset} from 'react-icons/gr'
import {AiOutlineSearch} from 'react-icons/ai'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useState } from 'react';
import Main from '../Main/Main';

const Home = () => {

  const [TripType,setTripType] = useState("Roudtrip");
  const [Location, setLocation] = useState("");
  const [Destination, setDestination] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ReturnDate, setReturnDate] = useState("");

  const [Filters,setFilters] = useState(null);

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  
  const SetSearch = () => {
    setFilters(null); //reset old filters
    setFilters({TripType,Location,Destination,DepartureDate,ReturnDate})
  };


  const ResetSetSearch = () => {
    setFilters(null); //reset old filters
    setTripType("Roudtrip");
    setLocation("");
    setDestination("");
    setDepartureDate("");
    setReturnDate("");
  };

  return (
    
    <><section id='home' className='home'>
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted type="video/mp4"></video>

      <div data-aos="fade-down" className="homeContent container">
        <div className="textDiv">
          <span className="smallText">
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
              <input type="radio" value="Roudtrip" name="Triptype" defaultChecked onChange={e => setTripType(e.target.value)} /> Roudtrip
              <input type="radio" value="One way" name="Triptype" onChange={e => setTripType(e.target.value)} /> One way
            </div>
          </div>

          <div className="FromInput">
            <label htmlFor="city">From:</label>
            <div className="input flex">
              <input type="text" placeholder='Enter name here...' value={Location} onChange={(event) => { setLocation(event.target.value); } } />
              <GrLocation className="icon" />
            </div>
          </div>


          <div className="ToInput">
            <label htmlFor="city">To:</label>
            <div className="input flex">
              <input type="text" placeholder='Enter name here...' value={Destination} onChange={(event) => { setDestination(event.target.value); } } />
              <GrLocation className="icon" />
            </div>
          </div>


          <div className="DepartInput">
            <label htmlFor="city">Depart:</label>
            <div className="input flex">
              <input type="date" value={DepartureDate} onChange={(event) => { setDepartureDate(event.target.value); } } />
            </div>
          </div>

          {TripType === "Roudtrip" &&
            <div className="ReturnInput">
              <label htmlFor="city">Return:</label>
              <div className="input flex">
                <input type="date" value={ReturnDate} onChange={(event) => { setReturnDate(event.target.value); } } />

              </div>
            </div>}
          
            <div className="searchOptions flex">
              <span onClick={SetSearch}>Search</span>
              <AiOutlineSearch className="icon" />
            </div>

            <div className="ResetsearchOptions flex">
              <span onClick={ResetSetSearch}>Reset Search</span>
              <GrPowerReset className="icon" />
            </div>
          
        </div>
        
      </div>

      
    </section><Main Filters = {Filters}/></> 
    
  )
  
}

export default Home