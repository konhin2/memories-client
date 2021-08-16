import React, { useContext, useEffect, useState } from 'react'
import PostContext from './../../context/Posts/PostContext'
import UserContext from './../../context/Users/UserContext'

import { useParams, Link } from 'react-router-dom'

import axios from 'axios'

export default function Memory() {
    // Constantes para validación
    const ctxUser = useContext(UserContext)
    const { user } = ctxUser
    const [validation, setValidation] = useState(false)
    // Constantes each memory
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [editMode, setEditMode] = useState(false)
    const ctxPost = useContext(PostContext)
    const {
        posts,
        getPosts,
        updatePost,
        deletePost
    } = ctxPost
    const { id } = useParams()
    // Modo edición
    let [words, setWords] = useState(200)
    const [error, setError] = useState(null)
    const [newMemories, setNewMemories] = useState(null)
    useEffect(() => {

        const singlePost = async () => {
            await getPosts()
            const getPost = await posts.filter(post => post._id === id)[0]
            setData(getPost)
            setNewMemories(getPost)
            if (getPost.username === user.username) {
                setValidation(true)
            }
            const checkWords = () => {
                if (getPost.content === '') {
                    return setWords(200)
                }
                const WordCounter = (str) => {
                    return str.trim().split(/\s+/).length;
                }
                setWords(200 - WordCounter(getPost.content))
            }
            checkWords()
        }
        singlePost()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // FUNCIONES
    const changeEditMode = (event) => {
        event.preventDefault()
        setEditMode(!editMode)
    }
    // ANTERIORES
    const cancelF = (e) => {
        e.preventDefault()
        setError(null)
        setEditMode(false)
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
            setWords(200 - WordCounter(event.target.value))
        }
    }
    const uploadImage = async (event) => {
        event.preventDefault()
        const files = event.target.files[0]
        const dataC = new FormData()
        dataC.append('file', files)
        dataC.append('upload_preset', 'memories')
        dataC.append('cloud_name', 'dounpryi9')
        setLoading(true)
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dounpryi9/upload', dataC)
            setNewMemories({
                ...newMemories,
                imageURL: res.data.url
            })
            setLoading(false)
        }
        catch (err) { console.log(err) }

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
        updatePost(newMemories)
        setData(newMemories)
        setEditMode(false)
        setError(null)
    }
    const deletePostBtn = (event) => {
        deletePost(newMemories)
    }
    if (editMode && validation) {
        return (
            <>
                {
                    data ?
                        (
                            <div className="space-y-6 p-5">
                                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                    <div className="md:grid md:grid-cols-3 md:gap-6">
                                        <div className="md:col-span-1">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Edit your Memory</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                This information will be displayed publicly so be careful what you share.
                                            </p>
                                        </div>
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <form className="space-y-6" onSubmit={(e) => sendData(e)}>
                                                <div className="grid grid-cols-3 gap-6">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <label for="title" className="block text-sm font-medium text-gray-700">
                                                            Title
                                                        </label>
                                                        <div className="mt-1 flex rounded-md shadow-sm">
                                                            {
                                                                newMemories.title.length < 4 || newMemories.title.length > 30 ?
                                                                    (
                                                                        <input onChange={e => handleChange(e)} type="text" name="title" id="title" className="focus:outline-none p-1 focus:ring-memory-c4 focus:border-memory-c4 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-gray-300" placeholder="Wonderful memory!" value={newMemories.title} min='4' max='30' />
                                                                    )
                                                                    :
                                                                    (
                                                                        <input onChange={e => handleChange(e)} type="text" name="title" id="title" className="focus:outline-none p-1 focus:ring-memory-c2 focus:border-memory-c2 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-memory-c2" placeholder="Wonderful memory!" value={newMemories.title} min='4' max='30' />
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
                                                                ) :
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
                        :
                        (
                            <p>Loading...</p>
                        )
                }

            </>
        )
    } else {
        return (
            <>
                {
                    data ?
                        (
                            <div className="relative bg-gray-100" style={{ height: `calc(100vh - 64px)` }}>
                                <div className="lg:absolute lg:inset-0">
                                    <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
                                        <img className="h-56 w-full object-cover lg:absolute lg:h-full" src={data.imageURL} alt="" />
                                    </div>
                                </div>
                                <div className="relative pt-5 pb-8 px-4 sm:pt-5 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
                                    <div className="lg:col-start-2">
                                        <div className="sm:pl-8 text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0">
                                            <Link to='/memories' className="leading-6 text-memory-c5 font-semibold tracking-wide uppercase hover:text-memory-c4">Go Back</Link>
                                            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-memory-c6 sm:text-4xl">{data.title}</h3>
                                            <p className="mt-8 leading-6 text-sm text-gray-500 text-justify">{data.content}</p>
                                            <div className='mt-6 flex justify-between items-center'>
                                                <div className="flex items-center">
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
                                                {
                                                    validation ?
                                                        (
                                                            <div>
                                                                <button className=" inline-flex items-center justify-center w-10 h-10 mr-4 text-white transition-colors duration-150 bg-memory-c2 rounded-full hover:bg-memory-c1" onClick={(e) => changeEditMode(e)}>
                                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                                                                </button>
                                                                <Link to='/memories' onClick={(e) => deletePostBtn(e)} type="button" className="mr-4 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-memory-c5 hover:bg-memory-c8">
                                                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path fill-rule="evenodd" d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306" clip-rule="evenodd" />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        ) : null
                                                }
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

}
