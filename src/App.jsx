import { useState, useEffect } from 'react'
import {TopNav} from './components/topnav/topnav.jsx'

import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [auth, setAuth]= useState({
    token: localStorage.getItem("token")|| '',
    user: localStorage.getItem("user")|| null,
  });
  const [token, setToken]= useState(()=>{
    const token = localStorage.getItem("token");
    if(token){
      return token
    }else{
      return null
    }
  });
  const onLogout= ()=>{
    localStorage.clear();
    setAuth({token: '', user: null});
  }

  const onLoginSuccess= (user, token) =>{
    setAuth({token: token, user: user});
    
  }

  return (
    <>
      <TopNav user={auth.user} logout={onLogout}/>
      <Outlet  context={{user: auth.user, token: auth.token, onLoginSuccess}}/>

    </>
  )
}

export default App
