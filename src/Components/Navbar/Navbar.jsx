import React, { useEffect } from "react";
import './navbar.css'
import { MdAirplaneTicket } from "react-icons/md"
import { AiFillCloseCircle } from "react-icons/ai"
import { TbGridDots } from "react-icons/tb"
import { useState } from 'react';
import {Link} from 'react-router-dom'

import {
    onAuthStateChanged,
    signOut
  } from "firebase/auth";
  import { auth, db } from "../../firebase-config";
import { checkUserIsAdmin } from "../../Permissions/checkUserIsAdmin";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {

    const [active, setActive] = useState('navBar')

    //function to toggle navbar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }
    //function to remove navbar
    const removeNavbar = () => {
        setActive('navBar')
    }

    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState();

    onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    });

   onAuthStateChanged(auth, async (user) => {
        setAdmin(await checkUserIsAdmin(user));
    });

    const [userData,setUserData] = useState([]);
    

    useEffect(() => {
        if (user)
            fetchUserData();
      }, [])
    
      const fetchUserData=async()=>{
        const UserRef = doc(db, "users", user?.uid);
        const data = await getDoc(UserRef);
        setUserData(data.data());
      }


    console.log(userData.FirstName);

    const logout = async () => {
        await signOut(auth);
        window.location.reload(false);
    };


    return (
        <section className="navBarSection">
            <header className="header flex">

                <div className="logoDiv">
                    <Link to="/" className="logo">
                        <h1><MdAirplaneTicket className="icon" />Travel.</h1>
                    </Link>
                </div>

                <div className={active}>
                    <ul onClick={removeNavbar} className="navLists flex">

                        <li className="navItem">
                            <Link to="/">Home</Link>
                        </li>
                        
                        {admin &&
                        <li className="navItem">
                            <a href="#" className="navLink">admin</a>
                        </li>}

                        <li className="navItem">
                            <a href="#" className="navLink">Packages</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">shop</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">About</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Contact</a>
                        </li>

                        {user ? (
                            <>
                            <li className="navItem">
                            <a href="#" className="navLink">  Hello: {userData.FirstName}</a>
                            </li>
                            <button className="btn"
                                onClick={logout}> Log out
                            </button></>
                             ):(
                                <>
                                <button className="btn">
                                <Link to="/Sing-in">Sing-in</Link>
                            </button>
    
                            <button className="btn">
                                <Link to="/Sing-up">Sing-up</Link>
                            </button></>
                            )}

                    </ul>


                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    )
}

export default Navbar