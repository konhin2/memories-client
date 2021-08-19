import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

import Marker from './Marker'

export default function Covid19() {
    const [markers, setMarkers] = useState([])
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
            setMarkers(
                res.data
            )
        }
        getData()
    })
    return (
        <div style={{ height: `calc(100vh - 64px)`, width: '100%' }}>
            {
                markers.length > 0 ?
                    (
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDvyF-KKWMyNqXY0MeHug4QuJTc_3DURnI' }}
                            defaultCenter={{ lat: 0, lng: 0 }}
                            defaultZoom={3}
                            options={{
                                styles: [
                                    {
                                        "featureType": "all",
                                        "elementType": "labels.text.fill",
                                        "stylers": [
                                            {
                                                "color": "#ffffff"
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "all",
                                        "elementType": "labels.text.stroke",
                                        "stylers": [
                                            {
                                                "color": "#000000"
                                            },
                                            {
                                                "lightness": 13
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "administrative",
                                        "elementType": "geometry.fill",
                                        "stylers": [
                                            {
                                                "color": "#000000"
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "administrative",
                                        "elementType": "geometry.stroke",
                                        "stylers": [
                                            {
                                                "color": "#144b53"
                                            },
                                            {
                                                "lightness": 14
                                            },
                                            {
                                                "weight": 1.4
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "landscape",
                                        "elementType": "all",
                                        "stylers": [
                                            {
                                                "color": "#08304b"
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "poi",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#0c4152"
                                            },
                                            {
                                                "lightness": 5
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "road.highway",
                                        "elementType": "geometry.fill",
                                        "stylers": [
                                            {
                                                "color": "#000000"
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "road.highway",
                                        "elementType": "geometry.stroke",
                                        "stylers": [
                                            {
                                                "color": "#0b434f"
                                            },
                                            {
                                                "lightness": 25
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "road.arterial",
                                        "elementType": "geometry.fill",
                                        "stylers": [
                                            {
                                                "color": "#000000"
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "road.arterial",
                                        "elementType": "geometry.stroke",
                                        "stylers": [
                                            {
                                                "color": "#0b3d51"
                                            },
                                            {
                                                "lightness": 16
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "road.local",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#000000"
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "transit",
                                        "elementType": "all",
                                        "stylers": [
                                            {
                                                "color": "#146474"
                                            }
                                        ]
                                    },
                                    {
                                        "featureType": "water",
                                        "elementType": "all",
                                        "stylers": [
                                            {
                                                "color": "#021019"
                                            }
                                        ]
                                    }
                                ]
                            }}
                        >
                            {
                                markers.length > 0 ?
                                    markers.map((elem, i) => {
                                        return <Marker
                                            key={i}
                                            code={elem.countrycode}
                                            country={elem.countryregion}
                                            deaths={elem.deaths}
                                            updated={elem.lastupdate}
                                            cases={elem.confirmed}
                                            recovered={elem.recovered}
                                            lat={elem.location.lat}
                                            lng={elem.location.lng}

                                        />
                                    })
                                    : null
                            }
                        </GoogleMapReact>
                    )
                    :
                    (
                        <section>
                            <div class="loader">

                            </div>
                        </section>
                    )
            }
        </div>
    )
}
