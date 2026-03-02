import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Loading } from "../loading/load";



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
    console.log(postObj)
    if(loading){
        return <Loading />
    }
    return(
        <>
            <h1>Post Page {id}</h1>
            <Link to={'/'}>return home</Link>

            <div className="post-container">
                <div className="title-container">
                    <h1>{postObj.title}</h1> 
                    <h6>{postObj.updatedAt.toLocaleString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</h6>  
                </div>
                
                <p>{postObj.content}</p>
            </div>
            

        </>
    )
}

export{
    PostPage
}