import style from './commentCard.module.css'

function CommentCard({post, currentuser, token, updatePage}){
    return post.comments.map(comment =>{
        const newDate =new Date(comment.updatedAt).toLocaleDateString("en-US", {
            weekday: "short",   // Mon, Tue, ...
            year: "numeric",    // 2026
            month: "short",     // Mar
            day: "numeric"      // 2
        });
        const user = JSON.parse(currentuser)
        const isUser = (user) =>{
            if (user === null) return
            if( user.id === comment.userId){
                return(
                    <div className={style.editComments} style={{gridArea: 'buttons'}}>
                        <button type='button' >Edit</button>
                        <button type='button' onClick={deleteComemnt}>Delete</button>                    
                    </div>
                )
            }
        }
        const deleteComemnt = async(e) =>{
            e.preventDefault();
            const confirmed = confirm("are you sure you wish to delete this comment?!")
            if(!confirmed) return;
            try{
                const res = await fetch(`https://blog-api-vdtu.onrender.com/${post.id}/comment/${comment.id}`,{
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
        return(
            <div className={style.commentCard} key={comment.id}>
                {isUser(user)}
                <p style={{gridArea: 'content'}}>{comment.content}</p>
                <h6 style={{gridArea: 'date'}}>{newDate}</h6>
            </div>
        )
    })
}

export{
    CommentCard
}