import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function Mmmap() {

    const [directions, setDirections] = useState(null);
    

    // 원하는 경로의 출발지와 목적지 좌표
    const origin = { lat: 37.7749, lng: -122.4194 }; // 샌프란시스코
    const destination = { lat: 34.0522, lng: -118.2437 }; // 로스앤젤레스

    // DirectionsService 콜백 함수
    const directionsCallback = (response) => {
        if (response !== null && response.status === 'OK') {
        setDirections(response);
        } else {
        console.error('Error fetching directions');
        }
    };

    // DirectionsService를 사용하여 특정 경로 가져오기

    const apiKey =''//process.env.REACT_APP_GOOGLEKEY;
    
    useEffect(async () => {
        const directionsService = new window.google.maps.DirectionsService();

        await directionsService.route(
            {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            },
            directionsCallback
        );
    })
    
    return(
        <div>
            <LoadScript googleMapsApiKey={apiKey} language={'ko'}>
        
                <GoogleMap
                    mapContainerStyle={{ height: '400px', width: '100%' }}
                >
                    {directions !== null && (
                        <DirectionsRenderer
                        directions={directions}
                        
                        />
                    )}
        
                
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default Mmmap