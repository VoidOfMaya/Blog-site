import style from './commentCard.module.css'

function CommentCard({post}){
    return post.comments.map(comment =>{
        return(
            <div className={style.commentCard}>
                <p>{comment.content}</p>
                <h6>{comment.updatedAt}</h6>
            </div>
        )
    })
}

export{
    CommentCard
}