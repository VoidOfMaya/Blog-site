import { useState, useEffect } from 'react'
import {TopNav} from './components/topnav/topnav.jsx'

import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [user, setUser]= useState(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      return user
    }else{
      return null
    }
  });
  const [token, setToken]= useState(()=>{
    const token = localStorage.getItem("token");
    if(token){
      return token
    }else{
      return null
    }
  });

  const onLoginSuccess= (user, token) =>{
    setUser(user);
    setToken(token);
  }

  return (
    <>
      <TopNav user={user}/>
      <Outlet  context={{user, token, onLoginSuccess}}/>

    </>
  )
}

export default App
