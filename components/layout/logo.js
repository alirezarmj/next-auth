import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div>
            <Link href={"/"}>
                <h1 className='text-xl md:text-2xl lg:text-3xl font-bold'>Nextjs Auth</h1>
            </Link>
        </div>
    )
}

export default Logo