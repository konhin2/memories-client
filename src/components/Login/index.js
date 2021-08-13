import React, {useContext, useState} from 'react'
import UseContext from './../../context/Users/UserContext'
import logo from './../../Images/logo-c.png'

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const userCtx = useContext(UseContext)
    const {
        loginUser,
    } = userCtx
    const handleChange = (event) =>{
        event.preventDefault()
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const sendData = (event) => {
        event.preventDefault()
        return loginUser(data)
    }
    return (
        <>
            <div className="flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" style={{height:`calc(100vh - 64px)`}}>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-24 w-auto" src={logo} alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-memory-c6">
                            Welcome back!
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={(e)=>{sendData(e)}}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="email" className="sr-only">Tu correo</label>
                                <input id="email" name="email" type="email" autocomplete="email" required className="bg-gray-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-memory-c6 rounded-t-md focus:outline-none focus:ring-memory-c4 focus:border-memory-c4 focus:z-10 sm:text-sm" placeholder="Email" 
                                    onChange={(e)=>{handleChange(e)}}
                                />
                            </div>
                            <div>
                                <label for="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autocomplete="current-password" 
                                required className="bg-gray-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-memory-c6 rounded-b-md focus:outline-none focus:ring-memory-c4 focus:border-memory-c4 focus:z-10 sm:text-sm" 
                                placeholder="Password" 
                                onChange={(e)=>{handleChange(e)}}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-memory-c2 border-memory-c2 rounded bg-gray-50" />
                                <label for="remember-me" className="ml-2 block text-sm text-memory-c6">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-memory-c6 bg-memory-c4 hover:bg-memory-c5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                                    <svg className="h-5 w-5 text-memory-c6 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}