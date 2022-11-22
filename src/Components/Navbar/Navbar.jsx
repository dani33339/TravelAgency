import React from "react";
import './navbar.css'
import { MdAirplaneTicket } from "react-icons/md"
import { AiFillCloseCircle } from "react-icons/ai"
import { TbGridDots } from "react-icons/tb"
import { useState } from 'react';
import {Link} from 'react-router-dom'


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
                            <a href="#" className="navLink">Home</a>
                        </li>

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

                        <li className="navItem">
                            <a href="#" className="navLink">Sing-in</a>
                        </li>

                        <button className="btn">
                            <Link to="/Sing-up">Sing-up</Link>
                        </button>
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