import { NavLink,} from 'react-router-dom';
import style from './topnav.module.css';


const ifUser =(user, logout)=>{
    if(user){
        return(
            <>
                <NavLink to={'/'}>home</NavLink>
                <div onClick={()=>{logout()}}>log out</div>
                <a>create Post</a>
            </>
        )

    }else{
        return(
            <>
                <NavLink to={'/'}>home</NavLink>
                <NavLink to={'/login'}>Log in</NavLink>
            </>
        )            
    }
}
function TopNav({user, logout}){
    const userdata = JSON.parse(user)
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/{user? userdata.firstName : ''} </div></h1>
            <div className={style.NavLinks}>
                {ifUser(user,logout)}
            </div>

            
        </div>
    )
}

export{
    TopNav    
} 