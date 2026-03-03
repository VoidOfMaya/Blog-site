import { useState, useEffect } from "react"
import style from "./login.module.css"
function LoginPage(){
    const [emai, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const handleSubmit= async (e) =>{
        e.preventDefault();
        const res = await fetch('https://blog-api-vdtu.onrender.com/auth/login',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({"email": emai, "password": password})
        })
        const data = await res.json();
        console.log(data);
    }
    return(
        <main className={style.loginPage}>
            <h1>log in</h1>
            <div className={style.loginContainer}>
                <form onSubmit={handleSubmit}>
                    <label>Email: </label>
                    <input type="text"
                           placeholder="Example@Example.com" 
                           required
                           onChange={(e)=>setEmail(e.target.value)}
                           ></input>
                    <label>Password: </label>
                    <input type="password" 
                           placeholder="password" 
                           required
                           onChange={(e)=>setPassword(e.target.value)}
                           ></input>
                    <button>log in</button>
                </form>
                <h5>dont have an account yet? <a>you can sign up here!</a></h5>
            </div>

        </main>
    )
}

export{
    LoginPage
}