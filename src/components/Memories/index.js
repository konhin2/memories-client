import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import PostContext from './../../context/Posts/PostContext'
import UserContext from './../../context/Users/UserContext'

import axios from 'axios'

export default function Memories() {
    const [loading, setLoading] = useState(false)
    const [activeCreate, setActiveCreate] = useState(false)
    const [error, setError] = useState(null)
    let [words, setWords] = useState(200)
    const ctxPost = useContext(PostContext)
    const {
        posts,
        getPosts,
        createPost
    } = ctxPost
    const ctxUser = useContext(UserContext)
    const { user } = ctxUser
    const [newMemories, setNewMemories] = useState({
        title: '',
        content: '',
        imageURL: 'https://media.nationalgeographic.org/assets/photos/000/312/31249.jpg',
        username: user.username,
        imgOwner: user.imgOwner,
    })
    // USE EFFECT
    useEffect(() => {
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Functions
    const createMode = (event) => {
        event.preventDefault()
        setActiveCreate(!activeCreate)
    }
    const cancelF = (e) => {
        e.preventDefault()
        setNewMemories({
            title: '',
            content: '',
            imageURL: 'https://media.nationalgeographic.org/assets/photos/000/312/31249.jpg',
            username: user.username,
            imgOwner: user.imgOwner,
        })
        setError(null)
        setWords(200)
        setActiveCreate(false)
    }
    const sendData = (event) => {
        event.preventDefault()
        if (!newMemories.title || !newMemories.content) {
            return setError('Please fill in all fields!')
        } else if (newMemories.title.length < 4) {
            return setError('Title must be at least 4 characters!')
        } else if (newMemories.title.length > 30) {
            return setError('Title must be at most 30 characters!')
        } else if (200 - words < 4) {
            return setError('Please add at least 4 words!')
        } else if (200 - words > 200) {
            return setError('Please add at most 200 words!')
        }
        createPost(newMemories)
        setNewMemories({
            title: '',
            content: '',
            imageURL: 'https://media.nationalgeographic.org/assets/photos/000/312/31249.jpg',
            username: user.username,
            imgOwner: user.imgOwner,
        })
        setError(null)
        setWords(200)
        setActiveCreate(false)
    }
    const handleChange = (event) => {
        event.preventDefault()
        setNewMemories({
            ...newMemories,
            [event.target.name]: event.target.value
        })
        if (event.target.name === 'content') {
            if (event.target.value === '') {
                return setWords(200)
            }
            const WordCounter = (str) => {
                return str.trim().split(/\s+/).length;
            }
            setWords(200-WordCounter(event.target.value))
        }
    }
    const uploadImage = async (event) => {
        event.preventDefault()
        const files = event.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'memories')
        data.append('cloud_name', process.env.CLOUD_NAME)
        setLoading(true)
        try {
            const res = await axios.post(process.env.CLOUDINARY_API, data)
            setNewMemories({
                ...newMemories,
                imageURL: res.data.url
            })
            setLoading(false)
        }
        catch (err) { console.log(err) }

    }
    if (activeCreate) {
        return (
            <div className="space-y-6 p-5" >
                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add a Memory</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form className="space-y-6" onSubmit={e => sendData(e)}>
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label for="title" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            {
                                                newMemories.title.length < 4 || newMemories.title.length > 30 ?
                                                (
                                                    <input onChange={e => handleChange(e)} type="text" name="title" id="title" className="focus:outline-none p-1 focus:ring-memory-c4 focus:border-memory-c4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-gray-300" placeholder="Wonderful memory!" value={newMemories.title} min='4' max='30'/>
                                                )
                                                :
                                                (
                                                    <input onChange={e => handleChange(e)} type="text" name="title" id="title" className="focus:outline-none p-1 focus:ring-memory-c2 focus:border-memory-c2 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-memory-c2" placeholder="Wonderful memory!" value={newMemories.title} min='4' max='30'/>
                                                )
                                            }
                                            
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label for="content" className="block text-sm font-medium text-gray-700">
                                        Content
                                    </label>
                                    <div className="mt-1">
                                        {
                                            200 - words < 4 || words < 0 ?
                                            (
                                                <textarea onChange={e => handleChange(e)} id="content" name="content" rows="3" className="p-1 shadow-sm focus:ring-memory-c4 focus:border-memory-c4 block w-full sm:text-sm border border-gray-300 rounded-md focus:outline-none " placeholder="Share your feels or story..." value={newMemories.content}></textarea>
                                            ):
                                            (
                                                <textarea onChange={e => handleChange(e)} id="content" name="content" rows="3" className="p-1 shadow-sm focus:ring-memory-c2 focus:border-memory-c2 block w-full sm:text-sm border border-memory-c2 rounded-md focus:outline-none " placeholder="Share your feels or story..." value={newMemories.content}></textarea>
                                            )
                                        }
                                        
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Words Left: {words < 0 ? 0 : words}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Cover photo
                                    </label>
                                    {
                                        newMemories.imageURL === 'https://media.nationalgeographic.org/assets/photos/000/312/31249.jpg' ?
                                            (
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        <div className="flex text-sm text-gray-600">
                                                            <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-memory-c5 hover:text-memory-c4 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => uploadImage(e)} />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            PNG, JPG, GIF up to 10MB
                                                        </p>
                                                    </div>
                                                </div>
                                            ) :
                                            (
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-memory-c2 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <svg className="mx-auto h-12 w-12 text-memory-c2" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        <div className="flex text-sm text-gray-600">
                                                            <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-memory-c5 hover:text-memory-c4">
                                                                <span>Upload a file</span>
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => uploadImage(e)} />
                                                            </label>
                                                            <p className="pl-1">or drag and drop</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            PNG, JPG, GIF up to 10MB
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                    }

                                </div>
                                <div className="flex justify-between flex-row-reverse">
                                    <div className="flex justify-end">
                                        <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-memory-c6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={(e) => cancelF(e)}>
                                            Cancel
                                        </button>
                                        {
                                            !loading ?
                                                (
                                                    <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-memory-c5 hover:text-memory-c6 hover:bg-memory-c4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-memory-c4">
                                                        Save
                                                    </button>
                                                ) :
                                                (
                                                    <div type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 cursor-pointer">
                                                        Loaging...
                                                    </div>
                                                )
                                        }

                                    </div>
                                    {
                                        error ?
                                            (
                                                <p className='text-memory-c1'>{error}</p>
                                            )
                                            : null
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="relative bg-gray-100 pt-5 px-4 sm:px-6 lg:pt-12 lg:px-8">
                <div className="relative max-w-7xl mx-auto" >
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-memory-c6 sm:text-4xl">
                            Leaving a trace!
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            “Your illness does not define you. Your strength and courage does.”
                        </p>
                        <button type="button" className="mt-5 inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-memory-c5 hover:bg-memory-c4" onClick={(e) => createMode(e)}>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                        {
                            posts.length > 0 ?
                                posts.map((post, i) => {
                                    return (
                                        <div className="mb-4 flex flex-col rounded-lg shadow-lg overflow-hidden" key={i}>
                                            <div className="flex-shrink-0">
                                                <img className="h-48 w-full object-cover" src={post.imageURL} alt="" />
                                            </div>
                                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-memory-c5">
                                                        <Link to={`/memories/${post._id}`} className="hover:underline">
                                                            See Memory
                                                        </Link>
                                                    </p>
                                                    <div className="block mt-2">
                                                        <p className="text-xl font-semibold text-memory-c6">
                                                            {post.title}
                                                        </p>
                                                        <p className="mt-3 text-base text-gray-500">
                                                            {post.content.slice(0, 100)}...
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <p>
                                                            <img className="h-10 w-10 rounded-full" src={post.imgOwner} alt="" />
                                                        </p>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-memory-c6">
                                                            <span>
                                                                {post.username}
                                                            </span>
                                                        </p>
                                                        <div className="flex space-x-1 text-sm text-gray-500">
                                                            <time datetime="2020-03-16">
                                                                {post.createdAt.substr(0, 10)}
                                                            </time>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : "No Memories Yet!"
                        }
                    </div>
                </div>
            </div>
        )
    }

}
