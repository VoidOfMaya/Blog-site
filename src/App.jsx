import { useState, useEffect } from 'react'
import {TopNav} from './components/topnav/topnav.jsx'
import { PostCard } from './components/postCard/post.jsx';
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
      <TopNav />
      <PostCard key={1} postName={'Hello World!, this is a test post'} date={'01-01-2025'} />
      <PostCard key={2} postName={'Why cats make the perfect Ai agents'} date={'01-01-2025'}/>
      <PostCard key={3} postName={'Some random post with no substance'} date={'01-01-2025'}/>
    </>
  )
}

export default App
