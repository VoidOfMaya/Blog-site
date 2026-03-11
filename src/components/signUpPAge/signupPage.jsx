
import { useState } from 'react';
import style from './signup.module.css'
import { useNavigate, useOutletContext } from 'react-router-dom';
function SignupPage(){
    const {callError} = useOutletContext();
    const [data, setData] = useState({
        email: null,
        firstName: null,
        lastName: null,
        password: null ,
        confirmPassword: null,
    })
    const [isLoading, setIsLoading]= useState(false);
    
    const redirectTo = useNavigate();
    setIsLoading(true)
    const signup = async(e) => {
        e.preventDefault();
        console.log('submitting')
        console.log(data);
        callError(null) 
        try{
            const res = await fetch('https://blog-api-vdtu.onrender.com/auth/register',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            })
            const result = await res.json();

            if(!res.ok)throw new Error(`valErrors: ${result.error}`|| 'Request error')
            setIsLoading(false)
            redirectTo('/login');
        }catch(err){
           callError(err.message)
           setIsLoading(false) 
        }
    }

    return(
        <>
            <div className={style.signupContainer}>
                <form onSubmit={signup}>
                    <label>Email :</label>
                    <input  type='emaild' 
                            placeholder="email"
                            onChange={(e)=>setData(prev=>({...prev, email: e.target.value}))}
                            required
                            ></input>

                    <label>First name :</label>
                    <input  type='text'
                            placeholder="firstName"
                            onChange={(e)=>setData(prev=>({...prev, firstName: e.target.value}))}
                            min='3'
                            max='12'
                            required
                            ></input>

                    <label>Last name :</label>
                    <input  type='text' 
                            placeholder="lastName"
                            onChange={(e)=>setData(prev=>({...prev, lastName: e.target.value}))}
                            min='3'
                            max='12'
                            required
                            ></input>

                    <label>Password :</label>
                    <input  type='password' 
                            placeholder="password"
                            min='8'
                            required
                            onChange={(e)=>setData(prev=>({...prev, password: e.target.value}))}
                            className={ data.password !== data.confirmPassword? style.invalidField : style.validField}
                            ></input>

                    <label>Confirm password :</label>
                    <input  type='password' 
                            placeholder="confirmPassword"
                            min='8'
                            required
                            onChange={(e)=>setData(prev=>({...prev, confirmPassword: e.target.value}))}
                            className={ data.password !== data.confirmPassword? style.invalidField : style.validField}
                            ></input>
                    
                    {isLoading ? (
                        <>
                            <ButtonLoading />
                        </>
                    ):(
                        <>
                            <button>Sign up!</button>                                
                        </>
                    )}
                </form>                   
            </div>
     
        </>

    )
}
export{
    SignupPage
}