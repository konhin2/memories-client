import React, { useReducer } from 'react'
import PostContext from './PostContext'
import PostReducer from './PostReducer'

import axiosClient from './../../config/axios'

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
            
            await axiosClient.post(`/api/posts/create`, dataForm)

            getPosts()

        } catch (error) {
            
        }


    }


    const getPosts = async () => {

        try {

            const res = await axiosClient.get(`/api/posts`)

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
            imageURL: dataForm.imageURL,
            username: dataForm.username,
            imgOwner: dataForm.imgOwner,
        }
        console.log('update', form)
        await axiosClient.post(`/api/posts/update`, form)

        getPosts()
        
    }


    const deletePost = async (dataForm) => {

        const form = {
            postId: dataForm._id
        }

        const res = await axiosClient.post(`/api/posts/delete`, form)

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