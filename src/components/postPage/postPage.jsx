import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, useOutletContext, replace } from "react-router-dom"
import { Loading } from "../loading/load";
import style from './postPage.module.css'
import { CommentCard } from "../comment/comment";


function PostPage(){
    //state based
    const [data, setData] = useState({post: []});
    const [comment, setComment]= useState({'content': ''})
    const [loading, setLoading] = useState(true);

    //rout bassed 
    const {token} = useOutletContext();
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    //data handling
    const getData = async() =>{
        try{
            await  fetch(`https://blog-api-vdtu.onrender.com/${id}`)
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
        }catch(err){
            console.log(err)
        }

    }
    const handleNewComment = async(e)=>{
        e.preventDefault();
        try{
            const res = await fetch(`https://blog-api-vdtu.onrender.com/${id}/comment`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body:JSON.stringify({"content": comment,}), 
            })
            console.log(res.json)
            await getData();
        }catch(err){
            console.log(err);
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
                <h2>Comments:</h2>
                <CommentCard post={postObj}/>
            </div>
            <div>
                <form 
                className={style.CommentForm}
                onSubmit={handleNewComment}
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
            </div>
            

        </>
    )
}

export{
    PostPage
}