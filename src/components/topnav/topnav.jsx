import { Link, NavLink } from 'react-router-dom';
import style from './topnav.module.css';
import { useState } from "react";


function TopNav({route}){
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog <div className={style.titleRout}>/ {route}</div></h1>
            <div className={style.NavLinks}>
                <NavLink to={'/'}>home</NavLink>
            </div>

            
        </div>
    )
}

export{
    TopNav    
} 