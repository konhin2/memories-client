import React, { useContext, useEffect, useState } from 'react'

import LikeContext from './../../context/Likes/LikeContext'

export default function Like(props) {
    const likeCtx = useContext(LikeContext)
    const {
        likes,
        getLikes,
        createLike,
        deleteLike,
    } = likeCtx
    const [newLike, setNewLike] = useState({
        postId: props.postId,
        username: props.username,
    })
    const [state, setState] = useState('')
    useEffect(() => {
        const handleLikes = async () => {
            await getLikes()
            const getLike = await likes.filter(like => like.postId === props.postId && like.username === props.username)[0]

            if (getLike) {
                setState(true)
                setNewLike(getLike)
            } else {
                setState(false)
            }
        }
        handleLikes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likes])
    // FUNCIONES
    const likeF = (event) => {
        event.preventDefault()
        setNewLike({
            ...newLike,
            like: true,
        })
        createLike(newLike)
    }
    const unlikeF = (event) => {
        event.preventDefault()
        deleteLike(newLike)
    }
    return (
        <>
            {
                state === '' ?
                    null
                    :
                    (
                        <div className="mt-3 inline-flex items-center h-10 transition-colors duration-150">
                            {
                                state === true ?
                                    (
                                        <button
                                            onClick={(e) => { unlikeF(e) }}
                                        >
                                            <svg className="block w-8 h-8 mr-3 fill-current text-red-500 cursor-pointer hover:text-red-500" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </button>
                                    ) :
                                    (
                                        <button
                                            onClick={(e) => { likeF(e) }}
                                        >
                                            <svg className="block w-8 h-8 mr-3 fill-current text-gray-300 cursor-pointer hover:text-red-500" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </button>
                                    )
                            }

                            <span className='block text-gray-500'>{likes.length}</span>
                        </div>
                    )
            }

        </>
    )
}
