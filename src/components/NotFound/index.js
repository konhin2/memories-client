import React, {useContext} from 'react'
import { Link,} from 'react-router-dom'
import NasaContext from '../../context/NASA/NasaContext'

export default function NotF() {
    const context = useContext(NasaContext)
    const {
        image,
    } = context
    return (
        <main className="bg-cover bg-top sm:bg-top" style={{backgroundImage:`url(${image})`, height:`calc(100vh - 64px)`}}>
            <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
                <p className="text-sm font-semibold text-white text-opacity-80 uppercase tracking-wide">404 error</p>
                <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Uh oh! I think you’re lost.</h1>
                <p className="mt-2 text-lg font-medium text-white text-opacity-90">It looks like the page you’re looking for doesn't exist.</p>
                <div className="mt-6">
                    <Link to='/' className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white text-opacity-90 bg-memory-c5 bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50">
                        Go back home
                    </Link>
                </div>
            </div>
        </main>
    )
}
