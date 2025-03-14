"use client"

import React from 'react'
import Link from 'next/link'

import { useSession, signOut } from 'next-auth/react'
import { User } from "next-auth";
import { Button } from './ui/button';

const Navbar = () => {
    const { data: session } = useSession()

    const user: User = session?.user as User


    return (
        <nav className='p-4 md:p-6 shadow-md'>
            <div className='container max-auto flex flex-row justify-between items-center'>
                <a className='text-xl font-bold' href="#">MystryText</a>
                {
                    session ? (
                        <>
                            <span className='mr-4 font-bold text-lg hover:scale-105 transition-all duration-300'>{user?.username || user?.email}</span>
                            <Button className='w-full md:w-auto' onClick={() => signOut()}>Logout</Button>
                        </>
                    ) : (
                        <Link href="/sign-in">
                            <Button className='w-full md:w-full'>Login</Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar