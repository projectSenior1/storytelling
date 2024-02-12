import React,{  useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Addstory from "./components/Addstory.jsx";
import Storydetails from "./components/Storydetails.jsx";
import Sign from "./components/Sign.jsx";
import Log from "./components/Log.jsx";
import "./App.css";
import Category from "./components/Category.jsx";
import Cookies from "js-cookie";
import Nav from "./components/Nav.jsx";
import UsersStories from "./components/UsersStories.jsx";



function App() {
const id=Cookies.get("id")
console.log(id);
  useEffect(()=>{

  },[])

console.log("this is id",id)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/UserStories" element={<UsersStories  />} /> 
        {/* userstory={userstory} */}
          <Route path="/addstory" element={<Addstory id={id}/>} /> 
          <Route path="/details/:title" element={<Storydetails id={id}/>  }/>

        <Route path="/home" element={<Home id={id}/>}/>
         <Route path="/Categoryy" elements ={<Category/>}/>
          <Route path="/details/:title" element={<Storydetails/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Log" element={<Log />} />
          <Route path="/Nav" element={<Nav />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
