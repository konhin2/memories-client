import React, { useState, useContext } from 'react'
import logo from './../../Images/logo.png'

import UserContext from './../../context/Users/UserContext'

import { Link } from 'react-router-dom'


export default function Nav() {


    const [nav, setNav] = useState(false)
    const [mNav, setMNav] = useState(false)


    const userCtx = useContext(UserContext)


    const {
        authStatus,
        user,
        logOut
    } = userCtx
    console.log(user)
    const showNav = (event) => {

        event.preventDefault()
        setNav(!nav)

    }
    const showMobile = (event) => {
        event.preventDefault()
        setMNav(!mNav)
        console.log('funciona')
    }
    return (
        <>
            <nav className="bg-memory-c1">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">


                            {/* MOBILE */}
                            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-memory-c4 focus:outline-none " aria-controls="mobile-menu" aria-expanded="false" onClick={(e) => showMobile(e)}>
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="whiter" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/">
                                    <img className="block lg:hidden h-8 w-10 h-auto" src={logo} alt="Workflow" />
                                    <img className="hidden lg:block h-8 w-10 h-auto" src={logo} alt="Workflow" />
                                </Link>
                            </div>
                            <div className="hidden flex-1 flex items-center sm:ml-6 sm:flex justify-end row-end-1 sm:space-x-8">

                                {

                                    authStatus ?

                                        (
                                            <>
                                                <Link to="/memories" className="border-transparent text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                    Memories
                                                </Link>
                                                <button className="text-white text-sm" onClick={() => { logOut() }}>
                                                    Logout
                                                </button>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <Link to="/" className="border-transparent text-memory-c3 hover:border-memory-c7 hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                    Home
                                                </Link>
                                                <Link to="/login" className="border-transparent text-memory-c3 hover:border-memory-c7 hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                    Login
                                                </Link>
                                                <Link to="/signup" className="border-transparent text-memory-c3 hover:border-memory-c7 hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                    Sign Up
                                                </Link>
                                            </>
                                        )


                                }





                            </div>
                        </div>

                        {
                            authStatus ?

                                (
                                    <>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                            <div className="ml-3 relative">
                                                <div>
                                                    <button
                                                        onClick={(e) => { showNav(e) }}
                                                        type="button" className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">

                                                        <img className="h-8 w-8 rounded-full" src="https://pbs.twimg.com/profile_images/1377113473092444170/KM6L25Ch_400x400.jpg" alt="" />

                                                    </button>
                                                </div>


                                                {

                                                    nav ?

                                                        (
                                                            <>
                                                                <div className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                                                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</Link>
                                                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</Link>
                                                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</Link>
                                                                </div>
                                                            </>

                                                        ) : null

                                                }

                                            </div>
                                        </div>
                                    </>
                                ) : null

                        }

                    </div>
                </div>

                {
                    mNav ? 
                    (
                        <div className="sm:hidden" id="mobile-menu">
                            <div className="pt-2 pb-4 space-y-1 bg-memory-c2">
                                <Link to="/" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                    Home
                                </Link>
                                <Link to="/signup" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                                    Login
                                </Link>
                            </div>
                        </div>
                    ): null
                }

            </nav>
        </>
    )
}