import { Loading } from "../loading/load";
import { useState, useEffect } from "react";
import { PostCard } from "../postCard/post";
import style from "./homepage.module.css"

function Homepage(){
    
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
            const newDate =new Date(post.publishedAt).toLocaleDateString("en-US", {
                weekday: "short",   // Mon, Tue, ...
                year: "numeric",    // 2026
                month: "short",     // Mar
                day: "numeric"      // 2
            });
            return(
            <PostCard 
            key={post.id} 
            id={post.id}
            postName={post.title} 
            date={newDate}
            />
            )
        })
    }
    if(loading){
        return <Loading />
    }
    return(
        <div className={style.postContainer}>
            <div className={style.posts}>
                {populatePosts(blogData)}                
            </div>

        </div>
    )
}
export{
    Homepage
}