import { Loading } from "../loading/load";
import { useState, useEffect } from "react";
import { PostCard } from "../postCard/post";
import style from "./homepage.module.css"
import { useOutletContext } from "react-router-dom"

function Homepage(){
    const {callError, authHandler} = useOutletContext();
    const [blogData, setBlogData] = useState({posts: []});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        callError(null) 
        try{
            fetch(`${import.meta.env.VITE_API_URL}`)
            .then(response=>{
            authHandler(response.status);
            if(response.status >= 400) {
                throw new Error('A server error has occured error code: ' + response.status )
            }
            return response.json();
            })
            .then( data =>{
                setBlogData(data)
            })
            .catch(error => {throw new Error(error)})
            .finally(()=> {setLoading(false)});

        }catch(err){
            callError(err.message)
        }

  },[])
    function populatePosts(data){
        
        return data.posts.map(post=>{
            const newDate =new Date(post.publishedAt).toLocaleDateString("en-US", {
                weekday: "short",   // Mon, Tue, ...
                year: "numeric",    // 2026
                month: "short",     // Mar
                day: "numeric"      // 2
            });
            const authorName = `${post.author.firstName} ${post.author.lastName}`
            return(
            <PostCard 
            key={post.id} 
            id={post.id}
            postName={post.title} 
            date={newDate}
            author={authorName}
            preview={post.content}
            />
            )
        })
    }
    if(loading){
        return <Loading/>
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