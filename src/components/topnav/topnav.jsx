import { NavLink,} from 'react-router-dom';
import style from './topnav.module.css';

const  logout = () =>{
    
}

const ifUser =(user)=>{
    if(user){
        return(
            <>
                <NavLink to={'/'}>home</NavLink>
                <div>log out</div>
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
function TopNav({user}){
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/{user? user.firstName : ''} </div></h1>
            <div className={style.NavLinks}>
                {ifUser(user)}
            </div>

            
        </div>
    )
}

export{
    TopNav    
} 