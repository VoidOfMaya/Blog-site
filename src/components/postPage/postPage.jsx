import { useEffect, useState } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom"
import { Loading } from "../loading/load";
import style from './postPage.module.css'
import { CommentCard } from "../comment/comment";


function PostPage(){
    //state based
    const [data, setData] = useState({post: []});
    const [comment, setComment]= useState({'content': ''})
    const [loading, setLoading] = useState(true);

    //rout bassed 
    const {token, user, callError, authHandler} = useOutletContext();
    const {id} = useParams();

    
    //data handling
    const getData = async() =>{
        callError(null) 
        try{
            await  fetch(`${import.meta.env.VITE_API_URL}/${id}`)
            .then(response=>{
                authHandler(response.status)
                if(response.status >= 400) {
                    throw new Error('A server error has occured error code: ' + response.status )
                }
                return response.json();
            })
            .then( data =>{
                setData(data)
            })
            .catch(error => {throw new Error(error)})
            .finally(()=> {setLoading(false)});            
        }catch(err){
            callError(err.message)
        }

    }
    const handleNewComment = async(e)=>{
        
        e.preventDefault();
        callError(null);
         
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}/comment`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body:JSON.stringify({"content": comment,}), 
            })
            await getData();
        }catch(err){
            callError(err.message)
        }

    }
    //conditional renders
    const ifUser = (user)=>{
        if(user){
            return(
                <form 
                className={style.CommentForm}
                onSubmit={handleNewComment}
                style={{marginBottom: '2em'}}
                > 
                    <textarea 
                    name="comment" 
                    type="textarea"
                    placeholder="add comment here ..." 
                    required
                    className={style.commentInput}
                    max='500'
                    min='1'
                    onChange={(e)=>setComment(e.target.value)}
                    >
                    </textarea>
                    <button className={style.commentButton}>comment</button>
                </form>
            )
        }else{
            return(
                <h4>have some thoughts you want to share? 
                    <Link to={'/login'} style={{color: 'blue',}}> log in </Link> 
                     and let us know what youre thinking about
                </h4>
            )
        }
    }
    useEffect(()=>{
        getData()
    },[])
    if(loading){
        return <Loading />
    }   
    const postObj = data.post[0];
    const newDate =new Date(postObj.updatedAt).toLocaleDateString("en-US", {
        weekday: "short",   // Mon, Tue, ...
        year: "numeric",    // 2026
        month: "short",     // Mar
        day: "numeric"      // 2
    });
    const authorName = `${postObj.author.firstName} ${postObj.author.lastName}`

    const comments = postObj.comments
    const populateComments = () =>{
        return comments.map(comment=>{
            const commentAuthor = `${comment.author.firstName} ${comment.author.lastName}`
            return(
                <CommentCard key={comment.id}
                             data={comment} 
                             currentuser={user} 
                             token={token} 
                             updatePage={getData}
                             author ={commentAuthor}
                             />
            )
        })
    }
    
    return(
        <>
            <div className={style.postContainer}>
                <div className={style.postHeader}>
                    <h1>
                        {postObj.title}
                        <p style={{display: 'inline',textAlign:"end",color:"gray"}}>@{authorName}</p>
                    </h1> 
                    
                    <h4 style={{color: 'gray'}}>{newDate}</h4>  
                </div>
                
                <div className={style.postBody} dangerouslySetInnerHTML={{__html: postObj.content}}>
                 
                </div>
            </div>
            <div className={style.commentContainer}>
                <h2>Comments:</h2>
                {populateComments()}
            </div>
            <div style={{display: 'grid'}}>
                {ifUser(user)}
            </div>
            

        </>
    )
}

export{
    PostPage
}