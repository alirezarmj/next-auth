import axios from 'axios';
import { useRef, useState } from 'react';
import {signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';



const LoginSignup = () => {
    const router=useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const emailInput = useRef();
    const passInput = useRef();

    async function handlerSubmit(e) {
        e.preventDefault();
        const enteredEmail = emailInput.current.value;
        const enteredPass = passInput.current.value;

        //Optional Validation
        
        if (isLogin) {
            //Log user in
            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail, //These email and password will send to [...nextauth] file with in credentials provider without axios because of signIn function
                password: enteredPass
            })
            if(result.error==='No user Found'){

                toast.error(' No user Found', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }else if(result.error==='Could not log you in !'){
                toast.error('Password is not correct', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
            if(!result.error){

                router.replace('/profile')  //profile means change password page

                toast.success('Login Successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
            console.log(result.error)
        } else {
            if (!enteredEmail || !enteredEmail.includes('@') || !enteredPass || enteredPass.trim().length < 7) {
                return;
            }
            try {
                const response = await axios.post('/api/auth/signup', ({ email: enteredEmail, password: enteredPass }))
                console.log(response.data)
            } catch (error) {
                console.log(error.response.status)
            }
        }


    }

    const loginHandler = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <div className='w-full mx-auto flex flex-col items-center py-20'>
            <div className='lg:w-[400px] md:w-[300px] w-[250px] mx-auto  bg-cyan-800 rounded-md  p-3'>
                <form onSubmit={handlerSubmit}  className=' mx-auto flex flex-col gap-4  px-8 pt-8 pb-2  items-center'>
                    <h1 className='text-2xl font-bold text-white'>{isLogin ? 'Login' : 'Sign Up'}</h1>
                    <div className='flex flex-col gap-1 w-full '>
                        <label htmlFor="email" className='text-center font-bold text-white'>Your Email</label>
                        <input type="email" id='email' ref={emailInput} className='rounded-lg p-1' />
                    </div>
                    <div className='flex flex-col gap-1 w-full text-center'>
                        <label htmlFor="password" className='text-center font-bold text-white'>Your Password</label>
                        <input type="password" id='password' ref={passInput} className='rounded-lg p-1' />
                    </div>
                    <button className='px-8 p-2 rounded-lg text-white bg-fuchsia-600 text-sm md:text-lg'>{isLogin ? "Login" : "Create Account"}</button>
                </form>
                <button className={isLogin ? ' text-fuchsia-600 text-center flex justify-center mx-auto border px-2 border-fuchsia-400' : 'text-fuchsia-600 flex justify-center mx-auto'} onClick={loginHandler}>{isLogin ? "Create new account" : "Login with existing account"}</button>
            </div>


        </div>
    )
}

export default LoginSignup