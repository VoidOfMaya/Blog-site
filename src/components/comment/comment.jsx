import { useState } from 'react';
import { useOutletContext } from 'react-router-dom'
import style from './commentCard.module.css'

function CommentCard({data, currentuser, token, updatePage, author}){
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(data.content);
    const { callError} = useOutletContext();
    const newDate =new Date(data.updatedAt).toLocaleDateString("en-US", {
            weekday: "short",   // Mon, Tue, ...
            year: "numeric",    // 2026
            month: "short",     // Mar
            day: "numeric"      // 2
    });
    const user = currentuser
    const isUser = (user) =>{
        if (user === null) return
        if( user.id === data.userId){
            return(
                <div className={style.editComments} style={{gridArea: 'buttons'}}>
                    {isEditing? (
                        <>
                            <button onClick={editComment}>Update</button>
                            <button onClick={()=> {
                                setIsEditing(false)
                                setEditContent(data.content)
                                }}>cancel</button>
                        </>
                    ):(
                        <>
                            <div>
                                <button type='button' onClick={()=>setIsEditing(true)}>Edit</button>
                                <button type='button' onClick={deleteComemnt}>Delete</button>
                            </div>
                        </>
                    )}                  
                </div>
            )
        }
    }
    const deleteComemnt = async(e) =>{
            e.preventDefault();
            callError(null) 
            const confirmed = confirm("are you sure you wish to delete this comment?!")
            if(!confirmed) return;
            try{
                const res = await fetch(`https://blog-api-vdtu.onrender.com/${data.postId}/comment/${data.id}`,{
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                if (!res.ok) {
                    console.log("Delete failed");
                    return;
                }
                updatePage();

            }catch(err){
                console.log(err);
            }

    }
    const editComment = async(e) =>{
        e.preventDefault();
        callError(null) 
        try {
            if(data.content === editContent) throw new Error('no edits detected!')
            await fetch(
                `https://blog-api-vdtu.onrender.com/${data.postId}/comment/${data.id}`,
                {
                    method: "PUT", // or PATCH depending on your API
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ content: editContent }),
                }
            )
            .then(response=>{
                if(!response.ok) throw new Error('failed to Edit comment')
                
                setIsEditing(false);
                updatePage();
            })        
        } catch (err) {
            callError(err.message)
        }
    }
    return(
        <div className={style.commentCard}>
            {isUser(user)}
            { isEditing? (
                    <textarea   value={editContent} 
                                onChange={(e)=> setEditContent(e.target.value)}
                                style={{border: "1px solid gray", borderRadius: '10px', padding: '5px'}}
                                />
                ):(
                    <>
                        <h4 style={{gridArea: 'author'}}>@{author}</h4>
                        <p style={{gridArea: 'content'}}>{data.content}</p>
                    </>
                )
            }

            <h6 style={{gridArea: 'date'}}>{newDate}</h6>  
 

        </div>
    )
}

export{
    CommentCard
}