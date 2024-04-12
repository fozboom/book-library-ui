import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='bg-gray-800'>
            <div className='h-16 px-8 flex items-center'>
                <p className='text-white font-bold flex-auto'>Book Library</p>
                <nav>
                    <ul className='flex space-x-4'>
                        <li>
                            <Link href="/books"><p className='text-white cursor-pointer'>Books</p></Link>
                        </li>
                        <li>
                            <Link href="/authors"><p className='text-white cursor-pointer'>Authors</p></Link>
                        </li>
                        <li>
                            <Link href="/publishers"><p className='text-white cursor-pointer'>Publishers</p></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar