import { useState, useEffect } from 'react'
import {TopNav} from './components/topnav/topnav.jsx'
import { PostCard } from './components/postCard/post.jsx';
import './App.css'

function App() {

  const [blogData, setBlogData] = useState({posts: []});
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
function populatePosts(data){
  return data.posts.map(post=>{
    return(
      <PostCard key={post.id} postName={post.title} date={post.publishedAt} />
    )
  })
}
  return (
    <>
      <TopNav />

      <div className='postContainer'>
        {populatePosts(blogData)}
      </div>

    </>
  )
}

export default App
