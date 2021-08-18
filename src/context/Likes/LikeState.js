import React, { useReducer } from 'react'
import LikeContext from './LikeContext'
import LikeReducer from './LikeRedoucer'

import axiosClient from './../../config/axios'

const LikeState = (props) => {


    // 1. ESTADO INICIAL
    // SIEMPRE HAGAN UN OBJETO

    const initialState = {
        likes: [
            { 
                postId: '',
                username: '',
                like: false
            }
        ]
    }


    // 2. DISPATCHING Y REDUCERS
    const [ globalState, dispatch ] = useReducer(LikeReducer, initialState)


    // 3. FUNCIONES 
    // NOS VAN A AYUDAR A CAPTURAR LOS EVENTOS DE LOS COMPONENTES


    const createLike = async (dataForm) => {
        try {
            
            await axiosClient.post(`/api/likes/create`, dataForm)

            getLikes()

        } catch (error) {
            
        }


    }
    const getLikes = async () => {

        try {

            const res = await axiosClient.get(`/api/likes`)
            dispatch({
                type: "GET_LIKES",
                payload: res.data
            })

        } catch (error) {

        }
    }

    const deleteLike = async (dataForm) => {

        const form = {
            likeId: dataForm._id
        }
        const res = await axiosClient.post(`/api/likes/delete`, form)
        console.log(res)
        getLikes()

    } 


    // 4. RETORNO DE ESTADO GLOBAL
    return (
        <LikeContext.Provider
            value={{
                likes: globalState.likes,
                getLikes,
                createLike,
                deleteLike
            }}
        >

            { props.children }            

        </LikeContext.Provider>
    )

}


export default LikeState