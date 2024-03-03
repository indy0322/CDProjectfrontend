import React, { useState,useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapComponent = () => {



    const apiKey = ''
    const [lang, setLang] = useState('ko')
    const [origin,setOrigin] = useState()
    const [destination, setDestination] = useState()
    const [lat,setLat] = useState()
    const [lng,setLng] = useState()
    // Replace 'en' with your desired language code
    const languageCode = lang
    console.log(languageCode)
    const langRef = useRef()


    const defaultCenter = {
        lat: lat,
        lng: lng
    }; // San Francisco as default center
    const defaultZoom = 12;

    

    const [directionsResonse, setDirectionsResponse] = useState(null)


    


    

    const calculateRoute = async () => {
        /*if(originRef.current.value === '' || destinationRef.current.value === ''){
            return
        }*/

        const originR = document.getElementsByClassName('originR')[0]
        const destinationR = document.getElementsByClassName('destinationR')[0]

        const directions = new window.google.maps.DirectionsService()
        const result = await directions.route({
            origin: originR.value,
            destination: destinationR.value,
            travelMode: window.google.maps.TravelMode.TRANSIT
        })
        setDirectionsResponse(result)

    }


    /*const handle2 = () => {
        const originR = document.getElementsByClassName('originR')[0]
        const destinationR = document.getElementsByClassName('destinationR')[0]

        localStorage.removeItem('mapData')
        localStorage.setItem('mapData',JSON.stringify({"originP":originR.value, "destinationP":destinationR.value}))
        window.location.reload()
        console.log(originR.value)
        console.log(destinationR.value)
    }*/


    const Handle =(e)=> {
        console.log(langRef.current.value.split(' ')[0])
        localStorage.removeItem('language')
        localStorage.setItem('language',JSON.stringify({"lang1":e.target.value.split(' ')[0],"lang2":e.target.value.split(' ')[1]}))
        window.location.reload()
        //setLang(e.target.value.split(' ')[0])
    }

    useEffect(async() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        },(err) => {
            console.log(err)
        })

        let lang = JSON.parse(localStorage.getItem('language'))
        if(lang){
            console.log(lang.lang1)
            setLang(lang.lang1)
        }

    },[])

    

    return (
        <>
            <LoadScript googleMapsApiKey={apiKey} language={lang}>
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={defaultCenter}
                zoom={defaultZoom}
            >
                
                {directionsResonse && (
                <DirectionsRenderer
                    directions={directionsResonse}
                    
                />
                )}

                
            </GoogleMap>
            </LoadScript>
            <select ref={langRef} onChange={Handle}>
                    <option value={'ko 한국어'}>한국어</option>
                    <option value={"ja 일본어"}>일본어</option>
                    <option value={"zh-CN 중국어"}>중국어</option>
                    <option value={"ru 러시아어"}>러시아어</option>
            </select>
            <input className='originR' ></input>
            <input className='destinationR'></input>
            <button onClick={calculateRoute}>검색</button>
            
        </>
    );
};

export default MapComponent;


