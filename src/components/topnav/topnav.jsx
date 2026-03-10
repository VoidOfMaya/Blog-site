import { NavLink,} from 'react-router-dom';
import style from './topnav.module.css';
import menuIcon from '../../assets/icons/menu.svg'

const isPhone =()=>{
    const screen = window.innerWidth;
    screen <= 768? (
       <>
        <img src='../../assets/icons/menu.svg' alt="" />
       </> 
    ):(
        <>
        </>
    );
}
const ifUser =(user, logout)=>{
    if(user){
        return(
            <>
                {isPhone()}
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
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/{user? user.firstName : ''} </div></h1>
            <div className={style.NavLinks}>
                {ifUser(user,logout)}
            </div>

            
        </div>
    )
}

export{
    TopNav    
} 