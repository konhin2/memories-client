import React, { useReducer } from 'react'
import PostContext from './PostContext'
import PostReducer from './PostReducer'

import axios from 'axios'

const PostState = (props) => {


    // 1. ESTADO INICIAL
    // SIEMPRE HAGAN UN OBJETO

    const initialState = {
        posts: [
        ]
    }


    // 2. DISPATCHING Y REDUCERS
    const [ globalState, dispatch ] = useReducer(PostReducer, initialState)


    // 3. FUNCIONES 
    // NOS VAN A AYUDAR A CAPTURAR LOS EVENTOS DE LOS COMPONENTES


    const createPost = async (dataForm) => {
        try {
            
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/posts/create`, dataForm)

            getPosts()

        } catch (error) {
            
        }


    }


    const getPosts = async () => {

        try {

            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`)

            const updatedPosts = res.data

            dispatch({
                type: "GET_POSTS",
                payload: updatedPosts
            })

        } catch (error) {

        }
    }

    const updatePost = async (dataForm) => {

        const form = {
            postId: dataForm._id,
            title: dataForm.title,
            content: dataForm.content,
            imageURL: dataForm.imgURL,
            username: dataForm.username,
            imgOwner: dataForm.imgOwner,
        }

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/posts/update`, form)

        getPosts()
        
    }


    const deletePost = async (dataForm) => {

        const form = {
            postId: dataForm._id
        }

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/posts/delete`, form)

        console.log(res)
        
        getPosts()

    } 


    // 4. RETORNO DE ESTADO GLOBAL
    return (
        <PostContext.Provider
            value={{
                posts: globalState.posts,
                getPosts,
                createPost,
                updatePost,
                deletePost
            }}
        >

            { props.children }            

        </PostContext.Provider>
    )

}


export default PostState