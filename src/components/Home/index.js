import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import NasaContext from '../../context/NASA/NasaContext'
import UserContext from './../../context/Users/UserContext'
import {Link} from 'react-router-dom'

export default function Home() {
    const nasaCtx = useContext(NasaContext)
    const {
        image,
    } = nasaCtx
    const userCtx = useContext(UserContext)
    const {
        authStatus
    } = userCtx
    return (
        <div className="overflow-hidden bg-no-repeat bg-cover ajusteHome " style={{ backgroundImage: `url(${image})` }}>
            <div className="relative sm:pb-24">
                <main className="mt-8 sm:mt-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="lg:flex lg:items-center lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                                <div className='rounded-lg p-5' style={{ backgroundColor: `rgba(135,134,235,0.5)` }}>
                                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                                        <span className="md:block ">Even through your hardest days,</span>
                                        <span className="md:block text-memory-c4">remember we are all made of stardust.</span>
                                    </h1>
                                    <p className="mt-3 text-base text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Take a moment and listen to the beautiful voice of Aurora, it will transport you!
                                        If you have any memories to share please click the button below, you will be surprised how good it feels.
                                    </p>
                                    <div className='flex justify-center'>
                                    {
                                        authStatus ?
                                        (
                                            <Link to="/memories" class="mt-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-memory-c6 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Get Started
                                        </Link>
                                        ):
                                        (
                                            <Link to="/login" class="mt-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-memory-c6 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Get Started
                                        </Link>
                                        )
                                    }
                                    </div>
                                    <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">Created with:</p>
                                    <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                                        <div className="flex flex-wrap items-start justify-center">
                                            <div className="flex justify-center px-1">
                                                <img className="h-9 sm:h-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png" alt="StaticKit" />
                                            </div>
                                            <div className="px-5 flex align-center justify-center px-1">
                                                <img className="h-11 sm:h-11" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png" alt="Tuple" />
                                            </div>
                                            <div className="flex justify-center px-1">
                                                <img className="h-9 sm:h-10" src="https://mediaweb.nubentos.com/wp-content/uploads/2017/12/08185743/favicon-192x192.png" alt="Workcation" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                                <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=Fc7XWW_Ehb8'
                                        width="100%"
                                        controls
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
