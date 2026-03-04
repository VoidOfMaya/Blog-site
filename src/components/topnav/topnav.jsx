import { NavLink,} from 'react-router-dom';
import style from './topnav.module.css';


const ifUser =(user, logout)=>{
    if(user){
        return(
            <>
                <NavLink to={'/'} 
                className={style.navButton}>home</NavLink>

                <div onClick={()=>{logout()}} 
                className={style.navButton}>log out</div>
                
                <a className={style.navButton}>Author dashboard</a>
            </>
        )

    }else{
        return(
            <>
                <NavLink to={'/'} 
                className={style.navButton}>home</NavLink>
                <NavLink to={'/login'} 
                className={style.navButton}>Log in</NavLink>
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