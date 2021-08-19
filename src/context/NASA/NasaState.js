import axios from 'axios'
import React, {useReducer, useEffect} from 'react'
import NasaContext from './NasaContext'
import NasaReducer from './NasaReducer'

const NasaState = (props) => {
    // eslint-disable-next-line
    const initialState = {
        image:''
    }

    const [globalState, dispatch] = useReducer(NasaReducer, initialState)
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=GIzbVtzeq1fN6ZBL7dIbGtVCg7QaBGPW6ViapZZD')
                dispatch({
                    type: "GET_IMAGE",
                    payload: response.data.url
                })
            } catch (e) {}
        }
        getInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialState])
    

    return (
        <NasaContext.Provider value={{image:globalState.image}}>
            {props.children}
        </NasaContext.Provider>
    )
}

export default NasaState