import { Link, useOutletContext } from 'react-router-dom'
import style from './post.module.css'

function PostCard({id, postName, date, author, preview}){


    return(
        <div className={style.postCard}>
            <Link to={`/post/${id}`}>
            <div style={{display: 'flex'}}>
                <h2 style={{flex: '2'}}>{postName}</h2>
                <div style={{textAlign:"end",color:"gray",fontSize: '1em',flex: '1'}}>@{author}</div>                
            </div>

                <div className={style.date}>date: {date}</div> 
                <div className={style.postBody} dangerouslySetInnerHTML={{__html: preview}}></div>          
            </Link>
        </div>
    )
}

export{
    PostCard
}