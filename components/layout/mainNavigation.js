import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import { signOut, useSession } from 'next-auth/react'
const MainNavigation = () => {
    const { data: session, status } = useSession()
    function logOutHandler() {
        signOut()
    }

    return (
        <div className='w-full h-[90px] bg-cyan-800 mx-auto text-white p-4 '>
            <div className='max-w-[1200px] mx-auto h-full flex justify-between items-center'>
                <Logo />
                <ul className='flex items-center text-lg  gap-4'>
                    {!session && (<li><Link href={"/login"}>Login</Link></li>)}
                    {session && (<li><Link href={"/profile"}>Profile</Link></li>)}
                    {session && (<li><button onClick={logOutHandler} className='border border-white px-4 py-2 rounded-md duration-500 hover:bg-fuchsia-200 hover:duration-500 hover:text-cyan-800' href={"/logout"}>Logout</button></li>)}
                </ul>
            </div>
        </div>
    )
}

export default MainNavigation