import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
//import testService from "../../services/testServices";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {Translator, Translate} from 'react-auto-translate';
import 'bulma/css/bulma.css'
import { GoogleMap,LoadScript,DirectionsService,DirectionsRenderer } from '@react-google-maps/api';






function TestMapNew() {

    useEffect(() => {
        let lang = JSON.parse(localStorage.getItem('language'))
        console.log(lang.lang1)
        console.log(lang.lang2)
        
        setGoogleLang(lang.lang1)

        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        },(err) => {
            console.log(err)
        })
    })

    const langRef = useRef()
    const [googlelang, setGoogleLang] = useState('')
    const [lat,setLat] = useState()
    const [lng,setLng] = useState()
    const apikey = ''//process.env.REACT_APP_GOOGLEKEY
   


    const [directionsResonse, setDirectionsResponse] = useState(null)

    const originRef = useRef()

    const destinationRef = useRef()

    const center = {
        lat: lat,
        lng: lng
    }

    
    

    

    

    

    

    const calculateRoute = async () => {
        if(originRef.current.value === '' || destinationRef.current.value === ''){
            return
        }
        const directions = new window.google.maps.DirectionsService()
        const result = await directions.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: window.google.maps.TravelMode.TRANSIT
        })
        setDirectionsResponse(result)

    }
    const Handle =(e)=> {
        
    }

    return(
        <div>
            
            <LoadScript googleMapsApiKey={apikey} language={googlelang}>
                <GoogleMap 

                    center={center}
                    zoom={12}
                    mapContainerStyle={{height:'400px',width:"100%"}}
                >
                    {directionsResonse && <DirectionsRenderer directions={directionsResonse}/>}
                </GoogleMap>
            </LoadScript>
            
            
            
            <div>
                <input className='originR' ></input>
                <input className='destinationR'></input>
                <button onClick={calculateRoute}>검색</button>
            </div>

            <select ref={langRef} onChange={Handle}>
                    <option value={'ko 한국어'} ref={langRef}>한국어</option>
                    <option value={"ja 일본어"}>일본어</option>
                    <option value={"zh-CN 중국어"}>중국어</option>
                    <option value={"ru 러시아어"}>러시아어</option>
            </select>
        </div>
    )
}

export default TestMapNew