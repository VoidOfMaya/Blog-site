import { NavLink,} from 'react-router-dom';
import style from './topnav.module.css';
import menuIcon from '../../assets/icons/home-outline.svg'
import { useState, useEffect } from 'react';

const ifUser =(user, logout, state)=>{
    if(user){
        return(
            <div className={state? style.isPhone: style.isDesk}>
                <NavLink to={'/'} 
                className={style.navButton}>home</NavLink>

                <div onClick={()=>{logout()}} 
                className={style.navButton}>log out</div>
                
                <a className={style.navButton}>Author dashboard</a>
            </div>
        )

    }else{
        return(
            <div className={state? style.isPhone: style.isDesk}>
                <NavLink to={'/'} 
                className={style.navButton}>home</NavLink>
                <NavLink to={'/login'} 
                className={style.navButton}>Log in</NavLink>
            </div>
        )            
    }
}
function TopNav({user, logout}){
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [active, setActive]= useState(false);

    useEffect(()=>{
        const handleResize = () =>{
            setIsMobile(window.innerWidth <= 768)
        }
        window.addEventListener('resize', handleResize)
        return()=> window.removeEventListener("resize", handleResize);
    },[])
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/{user? user.firstName : ''} </div></h1>
            <div className={style.NavLinks}>

                {isMobile?(
                    <div onClick={()=> setActive(!active)} className={style.menuToggle}>
                        <img src={menuIcon} className={style.menuIcon}></img> 
                        <div style={active? {display: 'block'}:{display: 'none'}}>
                            {ifUser(user,logout,isMobile)}
                        </div>
                    </div>
                ):(
                    <>
                        {ifUser(user,logout, isMobile)}
                    </>
                )}
            </div>

            
        </div>
    )
}

export{
    TopNav    
} 