import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import testService from "../../services/testServices";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {Translator, Translate} from 'react-auto-translate';
import 'bulma/css/bulma.css'
import { GoogleMap,LoadScript,DirectionsService,DirectionsRenderer,useJsApiLoader } from '@react-google-maps/api';
//import GoogleMapReact from "google-map-react";


function TestMap() {

    useEffect(async () => {
        /*let lang = JSON.parse(localStorage.getItem('language'))
        let aa = lang.lang1
        const mapscript = document.createElement('script')
        mapscript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEKEY}&language=${aa}&callback=initMap`
        mapscript.async = true
        mapscript.id = "mapscript"
        document.body.appendChild(mapscript)*/

        if(window.google && window.google.maps){
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(directionsServiceOptions, directionsCallback);
        }else{
            console.error("google map api 로드안됨.")
        }
    },[])

    const [googleLang, setGoogleLang] = useState('')
    
    const apiKey = ''
    const languageCode = 'en'

    const defaultCenter = {
        lat: 37.5760222,
        lng: 126.9769000
    }

    const [directions, setDirections] = useState(null)

    const directionsServiceOptions = {
        origin: "경복궁",
        destination: "광화문",
        travelMode: 'TRANSIT'
    };
    
    const directionsCallback = (response, status) => {
        if (status === 'OK') {
          // Render directions on the map
          setDirections(response);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
    };

    
    return(
        <div>
            <div>
                <select>
                    <option value={'ko 한국어'}>한국어</option>
                    <option value={"ja 일본어"}>일본어</option>
                    <option value={"zh-CN 중국어"}>중국어</option>
                    <option value={"ru 러시아어"}>러시아어</option>
                </select>
            </div>
            <div id="map" style={{height:'400px',width:"100%"}}>
                <LoadScript googleMapsApiKey={apiKey} language={languageCode}>
                    <GoogleMap
                        mapContainerStyle={{height:'400px',width:"100%"}}
                        zoom={12}
                        center={defaultCenter}
                    >
                        
                        {directions && <DirectionsRenderer directions={directions}/>}
                    </GoogleMap>
                </LoadScript>
                
                {/*(googleLang && lat && lng && originPosition) &&
                    <GoogleMapReact
                        bootstrapURLKeys={{key:`${process.env.REACT_APP_GOOGLEKEY}`,language:googleLang}}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals={true}
                        onGoogleApiLoaded={({map,maps}) => apilsLoaded(map,maps)}
                    >
                        
                    </GoogleMapReact>
    */}   
            </div>
            <input className="originPosition" ></input>
            <input className="destinationPosition" ></input>
            <button className="searchBtn" >검색</button>
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