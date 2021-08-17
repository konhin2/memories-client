import React, { useReducer } from 'react'
import CommentContext from './CommentContext'
import CommentReducer from './CommentReducer'

import axios from 'axios'

const CommentState = (props) => {


    // 1. ESTADO INICIAL
    // SIEMPRE HAGAN UN OBJETO

    const initialState = {
        comments: [
            { 
                postId: '',
                comment: ''
            }
        ]
    }


    // 2. DISPATCHING Y REDUCERS
    const [ globalState, dispatch ] = useReducer(CommentReducer, initialState)


    // 3. FUNCIONES 
    // NOS VAN A AYUDAR A CAPTURAR LOS EVENTOS DE LOS COMPONENTES


    const createComment = async (dataForm) => {
        try {
            
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/comments/create`, dataForm)

            getComments()

        } catch (error) {
            
        }


    }


    const getComments = async () => {

        try {

            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/comments`)
            dispatch({
                type: "GET_COMMENTS",
                payload: res.data
            })

        } catch (error) {

        }
    }

    const updateComment = async (dataForm) => {
        const form = {
            commentId: dataForm._id,
            comment: dataForm.comment,
            img: dataForm.img,
            username: dataForm.username,
            postId: dataForm.postId
        }

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/comments/update`, form)

        getComments()
        
    }


    const deleteComment = async (dataForm) => {

        const form = {
            commentId: dataForm._id
        }

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/comments/delete`, form)

        console.log(res)
        
        getComments()

    } 


    // 4. RETORNO DE ESTADO GLOBAL
    return (
        <CommentContext.Provider
            value={{
                comments: globalState.comments,
                getComments,
                createComment,
                updateComment,
                deleteComment
            }}
        >

            { props.children }            

        </CommentContext.Provider>
    )

}


export default CommentState