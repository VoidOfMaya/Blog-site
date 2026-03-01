import style from './post.module.css'

function PostCard({postName, date}){
    return(
        <div className={style.postCard}>
            <h2>{postName}</h2>
            <div>date: {date}</div>
        </div>
    )
}

export{
    PostCard
}