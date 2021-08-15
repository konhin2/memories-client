import React, { useContext, useEffect, useState } from 'react'
import PostContext from './../../context/Posts/PostContext'

import { useParams, Link } from 'react-router-dom'

export default function Memory() {
    const [data, setData] = useState()
    const ctxPost = useContext(PostContext)
    const {
        posts,
        getPosts
    } = ctxPost
    const { id } = useParams()
    useEffect(() => {
        getPosts()
        const getPost = posts.filter(post => post._id === id)[0]
        setData(getPost)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts])
    return (
        <>
            {
                data ?
                    (
                        <div class="relative bg-gray-100" style={{ height: `calc(100vh - 64px)` }}>
                            <div class="lg:absolute lg:inset-0">
                                <div class="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
                                    <img class="h-56 w-full object-cover lg:absolute lg:h-full" src={data.imageURL} alt="" />
                                </div>
                            </div>
                            <div class="relative pt-5 pb-8 px-4 sm:pt-5 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
                                <div class="lg:col-start-2 lg:pl-8">
                                    <div class="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0">
                                        <Link to='/memories' class="leading-6 text-indigo-600 font-semibold tracking-wide uppercase">Go Back</Link>
                                        <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h3>
                                        <p class="mt-8 text-lg text-gray-500 text-justify">{data.content}</p>
                                        <div className="mt-6 flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <p>
                                                            <img className="h-10 w-10 rounded-full" src={data.imgOwner} alt="" />
                                                        </p>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-memory-c6">
                                                            <span>
                                                                {data.username}
                                                            </span>
                                                        </p>
                                                        <div className="flex space-x-1 text-sm text-gray-500">
                                                            <time datetime="2020-03-16">
                                                                {data.createdAt.substr(0, 10)}
                                                            </time>
                                                        </div>
                                                    </div>
                                                </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) :
                    (
                        <p>Loading...</p>
                    )
            }

        </>
    )
}
