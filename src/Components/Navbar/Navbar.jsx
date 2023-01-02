import './navbar.css'
import { MdAirplaneTicket } from "react-icons/md"
import { AiFillCloseCircle } from "react-icons/ai"
import { TbGridDots } from "react-icons/tb"
import { useState } from 'react';
import {Link} from 'react-router-dom'

import {
    signOut
  } from "firebase/auth";
import { auth } from "../../firebase-config";

import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUserData } from "../../utils/fetchLocalStorageData";


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
    const [user, loading] = useAuthState(auth);


    var userData=null;
    if (user)
        userData = fetchUserData();


    const logout = async () => {
        await signOut(auth);
        localStorage.clear();
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
                        <a href="/" className="navLink">Home</a>
                        </li>
                        
                        {user && userData.userRoles.includes('admin') &&
                        <li className="navItem">
                            <a href="admin" className="navLink">admin</a>
                        </li>}

                        {/* <li className="navItem">
                            <a href="#" className="navLink">Packages</a>
                        </li> */}
{/* 
                        <li className="navItem">
                            <a href="#" className="navLink">About</a>
                        </li> */}

                        {user ? (
                            
                            <><li className="navItem">
                                <a href="Myorders" className="navLink">My Orders</a>
                            </li><>

                            <li className="navItem">
                                <a> Hello: {userData.FirstName}</a>
                            </li>
                            <button className="btn"
                                onClick={logout}> Log out
                            </button></></>
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