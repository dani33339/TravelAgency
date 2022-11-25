
import './App.css';
import React from "react";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import {BrowserRouter as Router, Route , Switch, Navigate } from 'react-router-dom';
import Singup from './Components/Sing-up/singup';
import Singin from './Components/Sing-in/singin';


const App = () => {
  return (
    <Router>
    <>
    <Navbar/>
    <div className = 'content'>
      <Switch>
        
        <Route exact path="/">
          <Home/>
          <Main/>
        </Route>

        <Route path="/Sing-up">
          <Singup/>
        </Route>

        <Route path="/Sing-in">
          <Singin/>
        </Route>


      </Switch>
    </div>
    <Footer/>
    </>
    </Router>
  )
}

export default App