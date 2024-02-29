import './App.css';
import Home from "./components/Home/home";
import Sign from "./components/SignIn/SignIn";
import Register from "./components/Register/register"
import React from "react";
import Footer from "./components/Home/footer"
import LandingPage from "./components/User/LandingPage"
import ProfilePage from "./components/User/ProfilePage"
import Messages from "./components/Social/Messages"
import Groups from "./components/Social/Groups"
import Notifications from "./components/Social/Notifications"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Marketplace from './components/Marketplace/marketplace';
import SocialPage from './components/User/SocialPage'
import NavigationPage from './components/User/NavigationPage'
import RoutinePage from './components/User/RoutinePage'
import Details from './components/Marketplace/details'





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
            <Route path="/User/LandingPage/SocialPage" element={<SocialPage/>}/>
            <Route path="/User/LandingPage/NavigationPage" element={<NavigationPage/>}/>
            <Route path="/User/LandingPage/RoutinePage" element={<RoutinePage/>}/>
            <Route path="/User/LandingPage/Marketplace/Details" element={<Details/>}/>
            <Route path="/User/LandingPage/SocialPage/Messages" element={<Messages/>}/>
            <Route path="/User/LandingPage/SocialPage/Groups" element={<Groups/>}/>
            <Route path="/User/LandingPage/SocialPage" element={<Notifications/>}/>


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
