import React, { useState } from 'react'
import MarkerIMG from './../../Images/marker.png'

export default function Marker(props) {
    const [marker, setMarker] = useState(false)
    const display = (event) => {
        event.preventDefault()
        setMarker(!marker)
    }
    const hideAuto = () => setMarker(false)
    return (
        <>
            {
                marker ? (
                    <div className="z-50 absolute right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                        <p className="block px-4 py-2 text-sm text-memory-c6">Country: {props.country}</p>
                        <p className="block px-4 py-2 text-sm text-memory-c6">Cases: {props.cases}</p>
                        <p className="block px-4 py-2 text-sm text-memory-c6">Deaths: {props.deaths}</p>
                        <p className="block px-4 py-2 text-sm text-memory-c6">Recovered: {props.recovered}</p>
                        <p className="block px-4 py-2 text-sm text-memory-c6">Updated: {props.updated.substr(0, 10)}</p>
                    </div>
                ) : null
            }
            <button className='absolute text-memory-c2' onClick={(e)=>display(e)} onMouseLeave={()=>hideAuto()}>
                <img className='puntero' src={MarkerIMG} title={props.country} alt={props.country}/>
            </button>
        </>
    )
}
