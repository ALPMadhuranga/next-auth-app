'use client'
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
  return (
    <div className='bg-slate-200 w-full h-20 mt-0'>
        <ul className='flex justify-end p-6 gap-10'>

            <div className='hover:bg-slate-400 p-2 rounded-md underline text-xl'>
                <Link href="/">
                    <li>Home</li>
                </Link>
            </div>
            <div className='flex gap-10'>
                <Link href="/dashboard" className='hover:bg-slate-400 p-2 rounded-md underline text-xl'>
                    <li>Dashboard</li>
                </Link>
                {!session ? (
                <>
                    <Link href="/login" className='hover:bg-slate-400 p-2 rounded-md text-xl underline'>
                        <li>Login</li>
                    </Link>
                    <Link href="/register" className='hover:bg-slate-400 p-2 rounded-md text-xl underline'>
                        <li>Register</li>
                    </Link>
                </>
                ) : (
                    <>
                    {session.user?.email}
                        <li>
                            <button className='p-1 px-5 mt-1 bg-slate-400 hover:bg-slate-600 rounded-3xl hover:text-white' onClick={() => signOut()}>Logout</button>
                        </li>
                    </>
                )}
            </div>
        </ul>
    </div>
  )
}

export default Navbar