import React, {useEffect} from 'react'
import './singup.css'
import video from "../../Assets/video3.mp4";
import {BiUserCircle} from 'react-icons/bi'
import {FiFacebook} from 'react-icons/fi'
import {RiLockPasswordFill} from 'react-icons/ri'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiOutlineFileDone} from 'react-icons/ai'
import {MdDriveFileRenameOutline} from 'react-icons/md'
import {SiTripadvisor} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Singup = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

const handleSubmit = (event) =>  {
  event.preventDefault();
  console.log(UserNameRef.current.value)
  console.log(PassWordRef.current.value)
  console.log(FnameRef.current.value)
  console.log(LnameRef.current.value)
  console.log(dateRef.current.value)

}

const UserNameRef = React.useRef(null)
const PassWordRef = React.useRef(null)
const FnameRef = React.useRef(null)
const LnameRef = React.useRef(null)
const dateRef = React.useRef(null)

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

        <from data-aos="fade-down" className="cardDiv grid" onSubmit = {handleSubmit}>

          <div className="UserNameInput">
            <label htmlFor="UserName">Enter your username:</label>
            <div className="input flex">
            <input type="text" placeholder='Enter username here...' ref={UserNameRef}/>
            <BiUserCircle className="icon"/>
            </div>
          </div>

          <div className="PassWordInput">
            <label htmlFor="PassWord">Enter your password:</label>
            <div className="input flex">
            <input type="password" placeholder='Enter password here...' ref={PassWordRef}/>
            <RiLockPasswordFill className="icon"/>
            </div>
          </div>

          <div className="FnameInput">
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
          </div>


          <div className="submit flex">
           <AiOutlineFileDone className="icon"/>
           <span type="submit" onClick={handleSubmit} >Submit</span>
          </div>

        </from>

        {/* <div data-aos="fade-up" className="homeFooterIcons flex">
         <div className="rightIcons">
          <FiFacebook className="icon"/>
          <AiOutlineInstagram className="icon"/>
          <SiTripadvisor className="icon"/>
         </div>
         <div className="leftIcons">
            <BsListTask className="icon"/>
            <TbApps className="icon"/>
         </div>
        </div> */}
      </div>
    </section>
  )
}

export default Singup