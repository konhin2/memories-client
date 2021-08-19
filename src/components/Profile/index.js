import React, { useContext, useState } from 'react'

import UserContext from './../../context/Users/UserContext'
import NasaContext from './../../context/NASA/NasaContext'

import axios from 'axios'

export default function Profile() {
    const [loading, setLoading] = useState(false)
    const userCtx = useContext(UserContext)
    const {
        user,
        updateUser
    } = userCtx
    const nasaCtx = useContext(NasaContext)
    const { image } = nasaCtx
    const [newUser, setNewUser] = useState({
        username: user.username,
        imgOwner: user.imgOwner,
    })
    // Funciones
    const uploadImage = async (event) => {
        event.preventDefault()
        const files = event.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'memories')
        data.append('cloud_name', 'dounpryi9')
        setLoading(true)
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/dounpryi9/upload', data)
            setNewUser({
                ...newUser,
                imgOwner: res.data.url
            })
            setLoading(false)
        }
        catch (err) { console.log(err) }

    }
    const sendData = (event) => {
        updateUser(newUser)
        setNewUser({
            username: user.username,
            imgOwner: user.imgOwner,
        })
    }
    return (
        <>
            <div>
                <div>
                    <img className="h-32 w-full object-cover lg:h-48" src={image} alt="" />
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                            <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={user.imgOwner} alt="" />
                        </div>
                        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 truncate">
                                    {user.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {user.username}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                            Email
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                            {user.email}
                        </dd>
                    </div>
                    <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">
                            Joined Date
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                            {user.createdAt.substr(0, 10)}
                        </dd>
                    </div>
                </dl>
            </div>
            <div className="mt-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <form className="space-y-6" onSubmit={e => sendData(e)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Change your profile picture
                        </label>
                        {
                            newUser.imgOwner === user.imgOwner ?
                                (
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-memory-c5 hover:text-memory-c4">
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
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-memory-c5 hover:text-memory-c4">
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
                    </div>
                </form>
            </div>
        </>
    )
}
