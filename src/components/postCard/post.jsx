import { Link, useOutletContext } from 'react-router-dom'
import style from './post.module.css'

function PostCard({id, postName, date}){
    const{updateRoute}= useOutletContext();

    return(
        <div className={style.postCard}>
            <Link to={`/post/${id}`}
                onClick={()=>updateRoute(id)}>
                <h2>{postName}</h2>
                <div className={style.date}>date: {date}</div>            
            </Link>
        </div>
    )
}

export{
    PostCard
}