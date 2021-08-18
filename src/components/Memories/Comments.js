import React, { useContext, useEffect, useState } from 'react'

import CommentContext from './../../context/Comments/CommentContext'
import UserContext from './../../context/Users/UserContext'

export default function Comments(props) {
    // CONTEXT USER
    const userCtx = useContext(UserContext)
    const { user } = userCtx
    // CONTEXT COMMENTS 
    const commentsCtx = useContext(CommentContext)
    const {
        comments,
        getComments,
        createComment,
        updateComment,
        deleteComment
    } = commentsCtx
    // Comentarios exclusivos del post
    const [commentsState, setCommentsState] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [dots, setDots] = useState({
        _id:''
    })
    const [chars, setChars] = useState(100)
    // CRUD
    const [newComment, setNewComment] = useState({
        comment: '',
        username: user.username,
        img: user.imgOwner,
        postId: props.postId,
    })
    useEffect(() => {
        const postComments = async () => {
            await getComments()
            const filtedeComments = await comments.filter(comment => comment.postId === props.postId)
            setCommentsState(filtedeComments.reverse())
        }
        postComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments])
    // FUNCIONES
    const handleChange = (event) => {
        event.preventDefault()
        if (event.target.value.length > newComment.comment.length) {
            setChars(chars-1)
        } else if(event.target.value.length < newComment.comment.length) {
            setChars(chars+1)
        }
        setNewComment({
            ...newComment,
            [event.target.name]: event.target.value
        })
        
    }
    const sendCreate = (e) => {
        e.preventDefault()
        createComment(newComment)
        setNewComment({
            comment: '',
            username: user.username,
            img: user.imgOwner,
            postId: props.postId,
        })
    }
    // Edit
    const activeEdit = (event, element) => {
        event.preventDefault()
        setEditMode(true)
        setNewComment(element)
    }
    const sendEdit = (event) => {
        event.preventDefault()
        updateComment(newComment)
        setEditMode(false)
        setNewComment({
            comment: '',
            username: user.username,
            img: user.imgOwner,
            postId: props.postId,
        })
    }
    // Delete
    const activeDelete = (event, element) => {
        event.preventDefault()
        deleteComment(element)
    }
    // Mostrar opciones
    const show = (e, element) => {
        e.preventDefault()
        setDots({
            _id: element._id
        })
    }
    const hide = (event) => {
        event.preventDefault()
        setDots({
            _id: ''
        })
    }
    return (
        <>
            <div className="flex items-center w-auto h-8">
                <button className="duration-300 inline-flex items-center justify-center w-7 h-7 mr-1 text-memory-c6 transition-colors duration-150 hover:text-white hover:bg-memory-c2 rounded-full" >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20" onClick={e => props.onClick(e)}>
                        {
                            props.value ?
                                (
                                    <path d="M13.889,11.611c-0.17,0.17-0.443,0.17-0.612,0l-3.189-3.187l-3.363,3.36c-0.171,0.171-0.441,0.171-0.612,0c-0.172-0.169-0.172-0.443,0-0.611l3.667-3.669c0.17-0.17,0.445-0.172,0.614,0l3.496,3.493C14.058,11.167,14.061,11.443,13.889,11.611 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.692-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.383,10c0-4.07-3.312-7.382-7.383-7.382S2.618,5.93,2.618,10S5.93,17.381,10,17.381S17.383,14.07,17.383,10"></path>
                                ) :
                                (
                                    <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                                )
                        }

                    </svg>
                </button>
                <p className='text-memory-c6 '>Comments ({commentsState.length})</p>
            </div>
            {
                props.value ?
                    (
                        <>

                            <div className="w-full">
                                <form className="bg-white max-w-xl rounded-lg px-4 pt-2 shadow-lg  p-3" onSubmit={editMode ?
                                    (e) => sendEdit(e)
                                    :
                                    (e) => sendCreate(e)
                                }>
                                    <div className="flex flex-wrap justify-center -mx-3 mb-6">
                                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                                            {
                                                100 - chars > 0 ?
                                                (
                                                    <textarea minLength='1' maxLength='100' className="text-memory-c6 bg-gray-100 rounded border border-memory-c2 resize-none w-full h-20 py-2 px-3 placeholder-gray-400 focus:outline-none focus:bg-white" name="comment" placeholder='Type Your Comment' value={newComment.comment} required onChange={e => handleChange(e)}></textarea>
                                                ):
                                                (
                                                    <textarea minLength='1' maxLength='100' className="text-memory-c6 bg-gray-100 rounded border border-memory-c4 resize-none w-full h-20 py-2 px-3 placeholder-gray-400 focus:outline-none focus:bg-white" name="comment" placeholder='Type Your Comment' value={newComment.comment} required onChange={e => handleChange(e)}></textarea>
                                                )
                                            }
                                            
                                        </div>
                                        <div className="w-full flex items-center md:w-full px-3">
                                            <div className="flex justify-left items-center w-1/2 text-gray-700 px-2 mr-auto">
                                                <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-xs md:text-sm pt-px">Chars left: {chars}</p>
                                            </div>
                                            <div className="-mr-1">
                                                <input type='submit' className="duration-200 cursor-pointer bg-memory-c2 text-white font-medium py-1 px-4 rounded-lg tracking-wide mr-1 hover:bg-memory-c7 hover:text-memory-c1" value='POST' />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="p-3 antialiased mx-auto max-w-screen-sm">

                                <div className="space-y-4">
                                    {
                                        commentsState.length === 0 ?
                                            "No Comments"
                                            :
                                            commentsState.map((comment, i) => {
                                                return (
                                                    <div className="flex" key={i}>
                                                        <div className="flex-shrink-0 mr-3">
                                                            <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={comment.img} alt={comment.username} />
                                                        </div>
                                                        <div className="flex-1 border rounded-lg px-4 pt-2 pb-2 sm:px-6 sm:pb-4 leading-relaxed">
                                                            <div className='flex items-center justify-between block mb-2'>
                                                                <div>
                                                                    <strong>{comment.username}</strong> <span className="text-xs text-gray-400">{comment.createdAt.substr(0, 10)}</span>
                                                                </div>
                                                                {
                                                                    user.username === comment.username ?
                                                                        !(dots._id === comment._id) ?
                                                                            (
                                                                                <button onClick={e => show(e, comment)} className='duration-200 mt-2 text-memory-c6 hover:text-memory-c1'>...</button>
                                                                            ) :
                                                                            (
                                                                                <div className='' onMouseLeave={e => hide(e)}>
                                                                                    <button className="duration-200 inline-flex items-center justify-center w-8 h-8 mr-4 text-white transition-colors duration-150 bg-memory-c2 rounded-full hover:bg-memory-c1" onClick={(e) => activeEdit(e, comment)}>
                                                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                                                                                    </button>
                                                                                    <button type="button" className="duration-200 w-8 h-8 mr-4 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-memory-c5 hover:bg-memory-c8" onClick={(e) => activeDelete(e, comment)}>
                                                                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                                            <path fillRule="evenodd" d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306" clipRule="evenodd" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            )
                                                                        : null
                                                                }
                                                            </div>
                                                            <p className="text-sm">
                                                                {comment.comment}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }

                                </div>
                            </div>
                        </>
                    ) : null
            }
        </>
    )
}
