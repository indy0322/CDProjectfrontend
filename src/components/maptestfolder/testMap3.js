import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
//import testService from "../../services/testServices";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {Translator, Translate} from 'react-auto-translate';
import 'bulma/css/bulma.css'
//import { GoogleMap,LoadScript,DirectionsService,DirectionsRenderer,useJsApiLoader } from '@react-google-maps/api';
import GoogleMapReact from "google-map-react";


function TestMap() {
    useEffect(async () => {
        /*let lang = JSON.parse(localStorage.getItem('language'))
        let aa = lang.lang1
        const mapscript = document.createElement('script')
        mapscript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEKEY}&language=${aa}&callback=initMap`
        mapscript.async = true
        mapscript.id = "mapscript"
        document.body.appendChild(mapscript)*/
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        },(err) => {
            console.log(err)
        })
 
        let lang = JSON.parse(localStorage.getItem('language'))
        if(lang){
            console.log(lang.lang1)
            console.log(lang.lang2)
            setGoogleLang(lang.lang1)
        }
        

        let place = JSON.parse(localStorage.getItem('mapData'))
        if(place){
            setOriginPosition(place.originPlace)
            setDestinationPosition(place.destinationPlace)
        }
        localStorage.removeItem('mapData')
        

    },[])
    
    
    const [googleLang, setGoogleLang] = useState('')

    const [lat,setLat] = useState()
    const [lng,setLng] = useState()
    const [originPosition, setOriginPosition] = useState()
    const [destinationPosition, setDestinationPosition] = useState()
    

    const handleLang = (e) => {
        localStorage.removeItem('language')
        localStorage.setItem('language',JSON.stringify({"lang1": e.target.value.split(' ')[0],"lang2": e.target.value.split(' ')[1]}))
        setGoogleLang(e.target.value.split(' ')[0])
        window.location.reload()
        /*const oldMapscript = document.getElementById('mapscript')
        document.body.removeChild(oldMapscript)
        const mapscript = document.createElement('script')
        mapscript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEKEY}&language=${e.target.value}&callback=initMap`
        mapscript.async = true
        mapscript.id = "mapscript"
        document.body.appendChild(mapscript)*/

        //setLang(e.target.value)
    }
    

    const onClickSearch = async () => {
        
        /*if(originRef.current.value === '' || destinationRef.current.value === ''){
            return
        }
        const directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: window.google.maps.TravelMode.TRANSIT
        })
        setDirectionsResponse(results)*/
        localStorage.removeItem("mapData")
        localStorage.setItem('mapData',JSON.stringify({"originPlace": originRef.current.value, "destinationPlace":destinationRef.current.value}))

        setOriginPosition(originRef.current.value)
        setDestinationPosition(destinationRef.current.value)
        window.location.reload()
        

        
    }
    

    
    const defaultProps = {
        center: {
            lat: lat, lng:lng
        },
        zoom: 15
    };

    const originRef = useRef()
    const destinationRef = useRef()


    const apilsLoaded = (map,maps) => {
        const directionsService = new window.google.maps.DirectionsService()
        const directionsRenderer = new window.google.maps.DirectionsRenderer()

        directionsRenderer.setMap(map)

        const origin = originPosition//{lat:lat, lng:lng}
        const destination = destinationPosition

        directionsService.route({
            origin:origin,
            destination:destination,
            travelMode:window.google.maps.TravelMode.TRANSIT
        },
        (result,status) => {
            if(status === window.google.maps.DirectionsStatus.OK){
                directionsRenderer.setDirections(result)
            }
            else{
                console.error(`error fetching directions ${result}`)
            }
        })
    }

    
    

    
    return(
        <div>
            <div>
                <select onChange={handleLang}>
                    <option value={'ko 한국어'}>한국어</option>
                    <option value={"ja 일본어"}>일본어</option>
                    <option value={"zh-CN 중국어"}>중국어</option>
                    <option value={"ru 러시아어"}>러시아어</option>
                </select>
            </div>
            <div id="map" style={{height:'400px',width:"100%"}}>
                {/*<LoadScript googleMapsApiKey={googleKey} language={languageCode}>
                    <GoogleMap
                        mapContainerStyle={{height:'400px',width:"100%"}}
                        zoom={12}
                        center={defaultCenter}
                    >
                        
                        {directions && <DirectionsRenderer directions={directions}/>}
                    </GoogleMap>
    </LoadScript>*/}
                
                {(googleLang && lat && lng) &&
                    <GoogleMapReact
                        bootstrapURLKeys={{key:'',language:googleLang}}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        onGoogleApiLoaded={({map,maps}) => apilsLoaded(map,maps)}
                    >
                        
                    </GoogleMapReact>
                }   
            </div>
            <input className="originPosition" ref={originRef}></input>
            <input className="destinationPosition" ref={destinationRef}></input>
            <button className="searchBtn" onClick={onClickSearch}>검색</button>
            {/*isLoaded ? (
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                language={'zh-CN'}
                Load
              >
                
                <></>
              </GoogleMap>
            ):<></>*/}
                
        </div>
    )
}

export default TestMap