import style from './commentCard.module.css'

function CommentCard({post}){
    return post.comments.map(comment =>{
        const newDate =new Date(comment.updatedAt).toLocaleDateString("en-US", {
            weekday: "short",   // Mon, Tue, ...
            year: "numeric",    // 2026
            month: "short",     // Mar
            day: "numeric"      // 2
        });
        return(
            <div className={style.commentCard}>
                <p>{comment.content}</p>
                <h6>{newDate}</h6>
            </div>
        )
    })
}

export{
    CommentCard
}