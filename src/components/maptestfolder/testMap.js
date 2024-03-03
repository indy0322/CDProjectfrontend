import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapComponent = () => {

    useEffect(async() => {
        let lang = JSON.parse(localStorage.getItem('language'))
        console.log(lang.lang1)
        console.log(lang.lang2)
        
        setGoogleLang(lang.lang1)
        
    },[])

    const apiKey =''// process.env.REACT_APP_GOOGLEKEY;


    const [lat,setLat] = useState()
    const [lng,setLng] = useState()
    const [googlelang, setGoogleLang] = useState()
    let languageCode = googlelang

  navigator.geolocation.getCurrentPosition(async(position) => {
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)

    },(err) => {
        console.log(err)
    })

   
  
  
  

  const defaultCenter = { lat: lat, lng: lng }; // San Francisco as default center
  const defaultZoom = 12;

  const [directions, setDirections] = useState(null);


    const calculateRoute = async () => {
        const origin = document.getElementsByClassName('origin')[0]
        const destination = document.getElementsByClassName('destination')[0]
   
        const directions = new window.google.maps.DirectionsService()
        const result = await directions.route({
            origin: origin.value,
            destination: destination.value,
            travelMode: window.google.maps.TravelMode.TRANSIT
        })
        setDirections(result)

    }
    

    //문제생길시 여기부터 고친다. 로컬스토리지에 language를 지웠다가 만들고 새로고침하는 부분이 문제임
    const Handle = async(e) => {
        localStorage.removeItem('language')
        localStorage.setItem('language',JSON.stringify({"lang1":e.target.value.split(' ')[0], "lang2":e.target.value.split(' ')[0]}))
        window.location.reload('/map1')
    }

  return (
    <div>
    {languageCode &&<LoadScript googleMapsApiKey={apiKey} language={languageCode}>
        
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={defaultCenter}
        zoom={defaultZoom}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            
          />
        )}

        
      </GoogleMap>
    </LoadScript>}

            <div>
                <input className='origin' ></input>
                <input className='destination'></input>
                <button onClick={calculateRoute}>검색</button>
            </div>

            <select onChange={Handle}>
                    <option value={'ko 한국어'}>한국어</option>
                    <option value={"ja 일본어"}>일본어</option>
                    <option value={"zh-CN 중국어"}>중국어</option>
                    <option value={"ru 러시아어"}>러시아어</option>
            </select>
    </div>
  );
};

export default MapComponent;