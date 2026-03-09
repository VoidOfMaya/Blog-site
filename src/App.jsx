import { useState, useEffect } from 'react'
import {TopNav} from './components/topnav/topnav.jsx'
import { ErrorMsg } from '../../Author-dashboard/src/Components/usefullError/usefullErr.jsx';

import './App.css'
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const [error, setError]= useState(null)
  const [auth, setAuth]= useState({
    token: localStorage.getItem("token")|| '',
    user: localStorage.getItem("user")|| null,
  });

  const redirectTo = useNavigate();
  const onLogout= ()=>{
    localStorage.clear();
    setAuth({token: '', user: null});
    redirectTo('/login');
  }

  const onLoginSuccess= (user, token) =>{
    setAuth({token: token, user: user});
    redirectTo('/');
  }
  //keynote: call error should be called twice on each request
  //1st: at the start befor the fetch api and with null passed to it
  //2nd: the actuall error call
  //this makes sure that the error state is always reset to null and awaits
  //a new error message 
  const callError =(msg)=>{
    setError(msg)
  }

  return (
    <>
      <TopNav user={auth.user} logout={onLogout}/>
      <Outlet  context={{
        user: auth.user, 
        token: auth.token, 
        onLoginSuccess,
        callError,
        }}/>
      {error && <ErrorMsg message={error} />}
    </>
  )
}

export default App
