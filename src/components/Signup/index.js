import React, {useState, useContext} from 'react'
import logo from './../../Images/logo-c.png'
import UserContext from './../../context/Users/UserContext'

export default function Register() {
    const userCtx = useContext(UserContext)
    const {registerUser} = userCtx

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const handleChange = (event) => {
        event.preventDefault()
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }
    const sendData = (event) => {
        event.preventDefault()
        registerUser(data)
    }
    return (
        <>
            <div className="bg-gray-100 bg-white flex" style={{height:`calc(100vh - 64px)`}}>
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img className="mx-auto h-24 w-auto" src={logo} alt="Workflow" />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-memory-c6">
                                Sign Up to Memories
                            </h2>
                        </div>

                        <div className="mt-8">

                            <div className="mt-6">
                                <form className="space-y-6" onSubmit={(e)=> sendData(e)}>

                                    <div>
                                        <div className="mt-1">
                                            <input 
                                                placeholder='Username'
                                                id="username" 
                                                name="username" 
                                                type="text" 
                                                required 
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 text-memory-c6 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-memory-c4 focus:border-memory-c4 sm:text-sm bg-gray-50" 
                                                onChange={(e)=>handleChange(e)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mt-1">
                                            <input 
                                                placeholder='Email'
                                                id="email" 
                                                name="email" 
                                                type="email" className="appearance-none block w-full px-3 py-2 border border-gray-300 text-memory-c6 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-memory-c4 focus:border-memory-c4 sm:text-sm bg-gray-50" 
                                                onChange={(e)=>handleChange(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="mt-1">
                                            <input 
                                                placeholder="Password"
                                                id="password" name="password" type="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 text-memory-c6 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-memory-c4 focus:border-memory-c4 sm:text-sm bg-gray-50" 
                                                onChange={(e)=>handleChange(e)}
                                            />
                                        </div>
                                    </div>                                    

                                    <div>
                                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-memory-c6 bg-memory-c4 hover:bg-memory-c5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1">
                    <img className="absolute inset-0 h-full w-full object-cover" src="https://www.nationalgeographic.com.es/medio/2015/03/15/74z2593_1800x1125.jpg" alt="" />
                </div>
            </div>

        </>
    )
}