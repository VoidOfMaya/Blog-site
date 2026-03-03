import { useState, useEffect } from 'react'
import {TopNav} from './components/topnav/topnav.jsx'

import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [user, setUser]= useState();

  return (
    <>
      <TopNav/>
      <Outlet />

    </>
  )
}

export default App
