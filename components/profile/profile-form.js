// import { getSession } from "next-auth/react";
// import { useEffect, useState } from "react"

import axios from "axios";
import { useRef } from "react"
import { toast } from "react-toastify";

// import { getSession } from "next-auth/react"


const ProfileForm = () => {
  // const [isLoading, setIsLoading] = useState(true)


  // useEffect(() => {
  //   getSession().then(session => {
  //     if (!session) {
  //       window.location.href=('/login')
  //     } else {
  //       setIsLoading(false)
  //     }
  //   })
  // }, [])

  // if (isLoading) {
  //   return <p className="text-xl text-center p-6">Loading...</p>
  // }
  const oldPassRef = useRef();
  const newPassRef = useRef();
  async function submitHandler(e) {
    e.preventDefault();
    const enteredOldpass = oldPassRef.current.value;
    const enteredNewpass = newPassRef.current.value;
    if (!enteredNewpass || enteredNewpass.trim().length < 6) {
      toast.error('Invalid input-password should also be at least 6 characters long', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    try {
      const response = await axios.patch('/api/user/change-password',
        {
          oldPassword: enteredOldpass,
          newPassword: enteredNewpass
        })
        toast.success('Password Changed Successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      // console.log(response.data)
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(' Invalid Password', {
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
    }
  }




  return (
    <div className='w-full flex flex-col items-center py-10'>
      <h1 className='lg:text-6xl md:text-4xl text-2xl p-8 '>Your User Profile</h1>
      <form autoComplete='off' onSubmit={submitHandler} className=' flex flex-col items-center lg:w-[400px] md:w-[300px] w-[200px] gap-6'>
        <div className='flex flex-col gap-1 w-full text-center'>
          <label htmlFor="oldPassword" className='text-center font-bold'>Old Password</label>
          <input ref={oldPassRef} type="password" id='oldPassword' className='rounded-lg p-1' />
        </div>
        <div className='flex flex-col gap-1 w-full '>
          <label htmlFor="newPassword" className='text-center font-bold'>New Password</label>
          <input ref={newPassRef} type="password" id='newPassword' className='rounded-lg p-1' />
        </div>
        <button className='px-4 p-2 rounded-lg text-white bg-fuchsia-900'>Change Password </button>
      </form>
    </div>
  )
}





export default ProfileForm