import axios from 'axios'
import React, { useReducer } from 'react'
import NasaContext from './NasaContext'
import NasaReducer from './NasaReducer'

const NasaState = (props) => {
    const initialState = {
        image: ''
    }

    const [globalState, dispatch] = useReducer(NasaReducer, initialState)
    const getInfo = async () => {
        try {
            const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=GIzbVtzeq1fN6ZBL7dIbGtVCg7QaBGPW6ViapZZD')
            dispatch({
                type: "GET_IMAGE",
                payload: response.data.url
            })
        } catch (e) { }
    }


    return (
        <NasaContext.Provider value={{ image: globalState.image, getInfo }}>
            {props.children}
        </NasaContext.Provider>
    )
}

export default NasaState