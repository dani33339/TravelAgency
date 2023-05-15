
import './App.css';
import React from "react";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import {BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import Singup from './Components/Sign-up/Signup';
import Singin from './Components/Sign-in/Signin';
import Admin from './Components/Admin/Admin'
import Order from './Components/Order/Order';
import ProtectedRoute from './Permissions/ProtectedRoute';
import { fetchUserData } from './utils/fetchLocalStorageData';
import Myorders from './Components/Myorders/Myorders';

const App = () => {

  var userData = fetchUserData();
  var adminState=false;

if (userData)
{
  if(userData.userRoles.includes('admin'))
  adminState=true;
}


  return (
    <Router>
    <>
    <Navbar/>
    <div className = 'content'>
      <Switch>
        <Route exact path="/">
          <Home/>       
        </Route>

        <Route path="/Sign-up">
          <Singup/>
        </Route>

        <Route path="/Sign-in">
          <Singin/>
        </Route>

        <ProtectedRoute path="/admin" component={Admin} isAuth={adminState} />

        <ProtectedRoute path="/Order" component={Order} isAuth={userData} />

        <ProtectedRoute path="/Myorders" component={Myorders} isAuth={userData} />

      </Switch>
    </div>
    <Footer/>
    </>
    </Router>
  )
}

export default App