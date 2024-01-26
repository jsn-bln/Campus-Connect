import './App.css';
import Home from "./components/Home/home";
import Sign from "./components/SignIn/SignIn";
import Register from "./components/Register/register"
import React from "react";
import Footer from "./components/Home/footer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"





function App() {
  return (
    <React.Fragment>
      <Router>

        <div className="App-header">
          <Routes>
            <Route path="*" element={<Home/>}/>
            <Route path="/SignIn" element={<Sign/>}/>
            <Route path="/Register" element={<Register/>}/>

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