import { useState } from 'react';
import style from './commentCard.module.css'

function CommentCard({data, currentuser, token, updatePage}){
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(data.content);

    const newDate =new Date(data.updatedAt).toLocaleDateString("en-US", {
            weekday: "short",   // Mon, Tue, ...
            year: "numeric",    // 2026
            month: "short",     // Mar
            day: "numeric"      // 2
    });
    const user = JSON.parse(currentuser)
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

                    {/*
                    <button type='button' onClick={editComment}>Edit</button>
                    <button type='button' onClick={deleteComemnt}>Delete</button> 
                    */}                   
                </div>
            )
        }
    }
    const deleteComemnt = async(e) =>{
            e.preventDefault();
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
        const res = await fetch(
        `https://blog-api-vdtu.onrender.com/${data.postId}/comment/${data.id}`,
        {
            method: "PUT", // or PATCH depending on your API
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content: editContent }),
        }
        );

        if (res.ok) {
        setIsEditing(false);
        updatePage();
        }
    }

    return(
        <div className={style.commentCard}>
            {isUser(user)}
            { isEditing? (
                    <textarea value={editContent} onChange={(e)=> setEditContent(e.target.value)}/>
                ):(
                    <p style={{gridArea: 'content'}}>{data.content}</p>
                )
            }
            <h6 style={{gridArea: 'date'}}>{newDate}</h6>
        </div>
    )
}

export{
    CommentCard
}