import React, { useState, useContext } from 'react'
import logo from './../../Images/logo.png'

import UserContext from './../../context/Users/UserContext'


import { Link } from 'react-router-dom'


export default function Nav() {

    const [currentPage, setCurrentPage] = useState('')
    const [nav, setNav] = useState(false)
    const [mNav, setMNav] = useState(false)


    const userCtx = useContext(UserContext)

    const {
        authStatus,
        user,
        logOut
    } = userCtx
    const showNav = (event) => {
        event.preventDefault()
        setNav(!nav)
    }
    const showMobile = (event) => {
        event.preventDefault()
        setMNav(!mNav)
    }
    const closeWindows = () => {
        setNav(false)
        setMNav(false)
    }
    // SET VIEWS BUTTON
    const home = (e) => {
        switch (e.target.name) {
            case 'home':
                return setCurrentPage('home')
            case 'tree':
                console.log('home')
                return setCurrentPage('home')
            case 'login':
                return setCurrentPage('login')
            case 'signup':
                return setCurrentPage('signup')
            case 'memories':
                return setCurrentPage('memories')
            case 'covid19':
                return setCurrentPage('covid19')
            case 'logout':
                return setCurrentPage('')
            default:
                break
        }
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="whiter" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/">
                                    <img className="block lg:hidden h-8 w-10 h-auto" src={logo} alt="Workflow" name='tree' to="/" onClick={(e) => home(e)}/>
                                    <img className="hidden lg:block h-8 w-10 h-auto" src={logo} alt="Workflow" name='tree' to="/" onClick={(e) => home(e)}/>
                                </Link>
                            </div>
                            <div className="hidden flex-1 flex items-center sm:ml-6 sm:flex justify-end row-end-1 sm:space-x-8">

                                {

                                    authStatus ?

                                        (
                                            <>
                                                {
                                                    currentPage === 'home' ?
                                                        (
                                                            <Link to="/" className="border-transparent text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                                Home
                                                            </Link>
                                                        ) :
                                                        (
                                                            <Link to="/" name='home' className="border-transparent text-white hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" onClick={(e) => home(e)}>
                                                                Home
                                                            </Link>
                                                        )
                                                }
                                                {
                                                    currentPage === 'memories' ?
                                                        (
                                                            <Link to="/memories" className="border-transparent text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                                Memories
                                                            </Link>
                                                        ) :
                                                        (
                                                            <Link name='memories' to="/memories" className="border-transparent text-white hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" onClick={(e) => home(e)}>
                                                                Memories
                                                            </Link>
                                                        )
                                                }
                                                {
                                                    currentPage === 'covid19' ?
                                                        (
                                                            <Link to="/covid19" className="border-transparent text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                                Tracking Covid 19
                                                            </Link>
                                                        ) :
                                                        (
                                                            <Link name='covid19' to="/covid19" className="border-transparent text-white hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" onClick={(e) => home(e)}>
                                                                Tracking Covid 19
                                                            </Link>
                                                        )
                                                }
                                            </>
                                        ) :
                                        (
                                            <>
                                                {
                                                    currentPage === 'home' ?
                                                        (
                                                            <Link to="/" className="border-transparent text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                                Home
                                                            </Link>
                                                        ) :
                                                        (
                                                            <Link name='home' to="/" className="border-transparent text-white hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" onClick={(e) => home(e)}>
                                                                Home
                                                            </Link>
                                                        )
                                                }
                                                {
                                                    currentPage === 'login' ?
                                                        (
                                                            <Link to="/login" className="border-transparent text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                                Login
                                                            </Link>
                                                        ) :
                                                        (
                                                            <Link name='login' to="/login" className="border-transparent text-white hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" onClick={(e) => home(e)}>
                                                                Login
                                                            </Link>
                                                        )
                                                }
                                                {
                                                    currentPage === 'signup' ?
                                                        (
                                                            <Link to="/signup" className="border-transparent text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                                                Sign Up
                                                            </Link>
                                                        ) :
                                                        (
                                                            <Link name='signup' to="/signup" className="border-transparent text-white hover:text-memory-c6 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" onClick={(e) => home(e)}>
                                                                Sign Up
                                                            </Link>
                                                        )
                                                }

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
                                                    {
                                                        user ?
                                                            (
                                                                <button
                                                                    onClick={(e) => showNav(e)}
                                                                    type="button" className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-memory-c4" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                                                    <img className="h-8 w-8 rounded-full" src={user.imgOwner} alt="" />
                                                                </button>
                                                            ) : null
                                                    }

                                                </div>


                                                {
                                                    nav ?
                                                        (
                                                            <>
                                                                <div className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

                                                                    <Link to={`/profile/${user.username}`}className="block px-4 py-2 text-sm text-gray-700 hover:text-memory-c1" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                                                                    <button name='logout' className="block px-4 py-2 text-sm text-gray-700 hover:text-memory-c1" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={(e) => {
                                                                        logOut()
                                                                        closeWindows()
                                                                        home(e)
                                                                    }}>Sign out</button>
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
                                    {
                                        authStatus ?
                                            (
                                                <>
                                                    {
                                                        currentPage === 'home' ?
                                                            (
                                                                <Link to="/" className="text-memory-c6 hover:bg-memory-c3 border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => closeWindows()}>
                                                                    Home
                                                                </Link>
                                                            ) :
                                                            (
                                                                <Link name='home' to="/" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={(e) => {
                                                                    home(e)
                                                                    closeWindows()
                                                                }}>
                                                                    Home
                                                                </Link>
                                                            )
                                                    }
                                                    {
                                                        currentPage === 'memories' ?
                                                            (
                                                                <Link to="/memories" className="text-memory-c6 hover:bg-memory-c3 border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => closeWindows()}>
                                                                    Memories
                                                                </Link>
                                                            ) :
                                                            (
                                                                <Link name='memories' to="/memories" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={(e) => {
                                                                    home(e)
                                                                    closeWindows()
                                                                }}>
                                                                    Memories
                                                                </Link>
                                                            )
                                                    }
                                                    {
                                                        currentPage === 'covid19' ?
                                                            (
                                                                <Link to="/covid19" className="text-memory-c6 hover:bg-memory-c3 border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => closeWindows()}>
                                                                    Covid 19
                                                                </Link>
                                                            ) :
                                                            (
                                                                <Link name='covid19' to="/covid19" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={(e) => {
                                                                    home(e)
                                                                    closeWindows()
                                                                }}>
                                                                    Covid 19
                                                                </Link>
                                                            )
                                                    }
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    {
                                                        currentPage === 'home' ?
                                                            (
                                                                <Link to="/" className="text-memory-c6 hover:bg-memory-c3 border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => closeWindows()}>
                                                                    Home
                                                                </Link>
                                                            ) :
                                                            (
                                                                <Link name='home' to="/" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={(e) => {
                                                                    home(e)
                                                                    closeWindows()
                                                                }}>
                                                                    Home
                                                                </Link>
                                                            )
                                                    }
                                                    {
                                                        currentPage === 'login' ?
                                                            (
                                                                <Link to="/login" className="text-memory-c6 hover:bg-memory-c3 border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => closeWindows()}>
                                                                    Login
                                                                </Link>
                                                            ) :
                                                            (
                                                                <Link name='login' to="/login" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={(e) => {
                                                                    home(e)
                                                                    closeWindows()
                                                                }}>
                                                                    Login
                                                                </Link>
                                                            )
                                                    }
                                                    {
                                                        currentPage === 'signup' ?
                                                            (
                                                                <Link to="/signup" className="text-memory-c6 hover:bg-memory-c3 border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => closeWindows()}>
                                                                    Sign up
                                                                </Link>
                                                            ) :
                                                            (
                                                                <Link name='signup' to="/signup" className="border-transparent text-memory-c6 hover:bg-memory-c3 hover:border-memory-c4 hover:text-memory-c6 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={(e) => {
                                                                    home(e)
                                                                    closeWindows()
                                                                }}>
                                                                    Sign up
                                                                </Link>
                                                            )
                                                    }
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        ) : null
                }
            </nav>
        </>
    )
}