import { Link, NavLink, useLocation } from 'react-router-dom';
import style from './topnav.module.css';
import { useState } from "react";


function TopNav(){
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/ </div></h1>
            <div className={style.NavLinks}>
                <NavLink to={'/'}>home</NavLink>
                <NavLink to={'/login'}>Log in</NavLink>
            </div>

            
        </div>
    )
}

export{
    TopNav    
} 