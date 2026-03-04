import style from './commentCard.module.css'

function CommentCard({post, currentuser}){
    return post.comments.map(comment =>{
        const newDate =new Date(comment.updatedAt).toLocaleDateString("en-US", {
            weekday: "short",   // Mon, Tue, ...
            year: "numeric",    // 2026
            month: "short",     // Mar
            day: "numeric"      // 2
        });
        const user = JSON.parse(currentuser)
        const isUser = (user) =>{
            if( user.id === comment.userId){
                return(
                    <div className={style.editComments} style={{gridArea: 'buttons'}}>
                        <button type='button' >Edit</button>
                        <button type='button' >Delete</button>                    
                    </div>
                )
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