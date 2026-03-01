import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [blogData, setBlogData] = useState();
  const [loading, setLoading] = useState(true);
    useEffect(()=>{
    fetch('https://blog-api-vdtu.onrender.com')
    .then(response=>{
      if(response.status >= 400) {
          throw new Error('A server error has occured error code: ' + response.status )
      }
      return response.json();
      })
    .then( data =>{
      setBlogData(data)
    })
    .catch(error => console.error(error))
    .finally(()=> {setLoading(false)});


  },[])

  return (
    <>
      <h1>Blogies</h1>
      
    </>
  )
}

export default App
