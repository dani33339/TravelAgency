import React, {useEffect} from 'react'
import './singup.css'
import video from "../../Assets/video1.mp4";
import {BiUserCircle} from 'react-icons/bi'
import {RiLockPasswordFill} from 'react-icons/ri'
import {AiOutlineFileDone} from 'react-icons/ai'
import {MdDriveFileRenameOutline} from 'react-icons/md'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useHistory } from 'react-router-dom'
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth,db } from "../../firebase-config";


const Singup = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [birthday, setbirthday] = useState("");
  const userRoles = ['user'];
  
  let history = useHistory();
  
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
        await setDoc(doc(db, "users", user.user.uid), {
          email :registerEmail, 
          FirstName :FirstName,
          LastName :LastName,
          birthday:birthday ,
          timeStamp: serverTimestamp(),
          userRoles,
          reservation : [],
          
        });
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

          <div className="FnameInput">
            <label htmlFor="Fname">Enter your First name:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter First name here...' onChange={(event) => {
            setFirstName(event.target.value);
          }}/>
            <MdDriveFileRenameOutline className="icon"/>
            </div>
          </div>

          <div className="LnameInput">
            <label htmlFor="Lname">Enter your Last name:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter Last name here...' onChange={(event) => {
            setLastName(event.target.value);
          }}/>
            <MdDriveFileRenameOutline className="icon"/>
            </div>
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select your birthday date :</label>
            <div className="input flex">
            <input type="date" onChange={(event) => {
            setbirthday(event.target.value);
          }}/>
            </div>
          </div>


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