import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Loading } from "../loading/load";
import style from './postPage.module.css'
import { CommentCard } from "../comment/comment";


function PostPage(){

    const [data, setData] = useState({post: []});
    const [loading, setLoading] = useState(true);

    const {id} = useParams();
    
    useEffect(()=>{

         fetch(`https://blog-api-vdtu.onrender.com/${id}`)
        .then(response=>{
            if(response.status >= 400) {
                throw new Error('A server error has occured error code: ' + response.status )
            }
            return response.json();
        })
        .then( data =>{
            setData(data)
        })
        .catch(error => console.error(error))
        .finally(()=> {setLoading(false)});

    },[])   
    const postObj = data.post[0];
    const newDate =new Date(postObj.updatedAt).toLocaleDateString("en-US", {
        weekday: "short",   // Mon, Tue, ...
        year: "numeric",    // 2026
        month: "short",     // Mar
        day: "numeric"      // 2
    });
    if(loading){
        return <Loading />
    }
    return(
        <>
            <div className={style.postContainer}>
                <div className={style.postHeader}>
                    <h1>{postObj.title}</h1> 
                    <h6>{newDate}</h6>  
                </div>
                
                <p>{postObj.content}</p>
            </div>
            <div className={style.commentContainer}>
                <h4>Comments:</h4>
                <CommentCard post={postObj} />
            </div>
            <div>
                <form>
                    <label>comment:-</label>
                    <input type="textarea"></input>
                    <button>comment</button>
                </form>
            </div>
            

        </>
    )
}

export{
    PostPage
}