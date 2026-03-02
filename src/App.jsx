import { useState, useEffect } from 'react'
import {TopNav} from './components/topnav/topnav.jsx'

import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [user, setUser]= useState();
  const [postId,setPostId] = useState('home')

  const updateRoute =(id)=>{
    setPostId(id)
  }

  return (
    <>
      <TopNav route={postId}/>
      <Outlet context={{updateRoute}}/>

    </>
  )
}

export default App
