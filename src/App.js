
import './App.css';
import React from "react";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import {BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import Singup from './Components/Sing-up/singup';
import Singin from './Components/Sing-in/singin';
import Admin from './Components/Admin/Admin'
import Order from './Components/Order/Order';
import ProtectedRoute from './Permissions/ProtectedRoute';
import { fetchUserData } from './utils/fetchLocalStorageData';

const App = () => {

  var userData = fetchUserData();
  var admin=false;

if (userData)
{
  if(userData.userRoles.includes('admin'))
    admin=true;
}

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
{/* 
        <Route path="/Admin">
          <Admin/>
        </Route> */}

        <ProtectedRoute path="/admin" component={Admin} isAuth={admin} />
        
        <Route path="/Order">
          <Order/>
        </Route>

      </Switch>
    </div>
    <Footer/>
    </>
    </Router>
  )
}

export default App