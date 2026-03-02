import { Link, NavLink } from 'react-router-dom';
import style from './topnav.module.css';
import { useState } from "react";


function TopNav(){
    return(
        <div className={style.topnav}>
            <h1 className={style.title}>DevLog</h1>
            <div className={style.NavLinks}>
                <NavLink to={'/'}>home</NavLink>
            </div>

            
        </div>
    )
}

export{
    TopNav    
} 