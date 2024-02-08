import './App.css';
import Home from "./components/Home/home";
import Sign from "./components/SignIn/SignIn";
import Register from "./components/Register/register"
import React from "react";
import Footer from "./components/Home/footer"
import LandingPage from "./components/User/LandingPage"
import ProfilePage from "./components/User/ProfilePage"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Marketplace from './components/Marketplace/marketplace';





function App() {
  return (
    <React.Fragment>
      <Router>

        <div className="App-header">
          <Routes>
            <Route path="*" element={<Home/>}/>
            <Route path="/SignIn" element={<Sign/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/User/LandingPage" element={<LandingPage/>}/>
            <Route path="/User/LandingPage/ProfilePage" element={<ProfilePage/>}/>
            <Route path="/User/LandingPage/Marketplace" element={<Marketplace/>}/>



          </Routes>
          
        </div>

        <div>
          <Footer/>
        </div>
      </Router>
    </React.Fragment>
       
      
  );
}

export default App;
