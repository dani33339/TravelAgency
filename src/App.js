
import './app.css';
import React from "react";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Singup from './Components/Sing-up/Singup';


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


      </Switch>
    </div>
    <Footer/>
    </>
    </Router>
  )
}

export default App