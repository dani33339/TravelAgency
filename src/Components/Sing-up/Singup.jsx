import React, {useEffect} from 'react'
import './singup.css'
import video from "../../Assets/video1.mp4";
import {BiUserCircle} from 'react-icons/bi'
import {RiLockPasswordFill} from 'react-icons/ri'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiOutlineFileDone} from 'react-icons/ai'
import {MdDriveFileRenameOutline} from 'react-icons/md'
import {SiTripadvisor} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useHistory } from 'react-router-dom'


import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../../firebase-config";



const Singup = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState({});

  let history = useHistory();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      history.push("/");
    } catch (error) {
      console.log(error.message);
      <h4>somthing went wrong please try again</h4>
    }
  };

  return (
    <section id='Sing-up' className='Sing-up'>
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted type="video/mp4"></video>

      <div data-aos="fade-down" className="Sing-upContent container">
        <div className="textDiv">
        <span  className="smallText">
          Sing-up Page
        </span>
        <h1 data-aos="fade-down" className="Sing-upTitle">
          Create Account right now
        </h1>
        </div>

        <from data-aos="fade-down" className="cardDiv grid" onSubmit = {register}>

          <div className="emailInput">
            <label htmlFor="emailName">Enter your email:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter email here...' onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}/>
            <BiUserCircle className="icon"/>
            </div>
          </div>

          <div className="PassWordInput">
            <label htmlFor="PassWord">Enter your password:</label>
            <div className="input flex">
            <input type="password"  placeholder='Enter password here...'  onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}/>
            <RiLockPasswordFill className="icon"/>
            </div>
          </div>

          {/* <div className="FnameInput">
            <label htmlFor="Fname">Enter your First name:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter First name here...' ref={FnameRef}/>
            <MdDriveFileRenameOutline className="icon"/>
            </div>
          </div>

          <div className="LnameInput">
            <label htmlFor="Lname">Enter your Last name:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter Last name here...' ref={LnameRef}/>
            <MdDriveFileRenameOutline className="icon"/>
            </div>
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select your birthday date :</label>
            <div className="input flex">
            <input type="date" ref={dateRef}/>
            </div>
          </div> */}


          <div className="submit flex">
           <AiOutlineFileDone className="icon"/>
           <span type="submit" onClick={register} >Submit</span>
          </div>

        </from>
      </div>
    </section>
  )
}

export default Singup