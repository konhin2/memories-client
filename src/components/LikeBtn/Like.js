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
    const [state, setState] = useState('')
    const [liked, setLiked] = useState(false)
    const [numbers, setNumbers] = useState(0)
    const [object, setObject] = useState(null)
    useEffect(() => {
        const Load = async () => {
            await getLikes()
            const allLikes = await likes.filter(like => like.postId === props.postId)
            const likeVerified = allLikes.filter(like => like.username === props.username)
            setNumbers(allLikes.length)

            if (likeVerified.length > 0) {
                setState(true)
                setObject(likeVerified[0])
            } else {
                setState(false)
            }
        }
        Load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state,liked])
    // FUNCIONES 
    const likeF = async (e) => {
        e.preventDefault()
        await createLike({
            postId: props.postId,
            username: props.username,
            like: true,
        })
        setLiked(true)
        setState(true)
    }
    const unlikeF = async (e) => {
        e.preventDefault()
        await deleteLike({
            _id: object._id,
        })
        setLiked(false)
        setState(false)
    }
    return (
        <>
            <div className="mt-3 inline-flex items-center h-10 transition-colors duration-150">
                {
                    liked || state?
                        (
                            <button
                                onClick={(e) => { unlikeF(e) }}
                            >
                                <svg className="block w-8 h-8 mr-3 fill-current text-red-500 cursor-pointer" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
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

                <span className='block text-gray-500'>
                    {
                        numbers ?
                            `${numbers}` :
                            '0'
                    }
                </span>
            </div>

        </>
    )
}
