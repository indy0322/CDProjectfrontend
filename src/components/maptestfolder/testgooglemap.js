import {useEffect, useState} from "react";
import { Loader } from "@googlemaps/js-api-loader";
import OpenAI from "openai";



//구글지도는 언어를 선택할 시, 페이지를 새로고침해서 다시 언어를 설정해주어야 한다. 현재 아래 페이지는 미완성
function Testgooglemap() {
    
    useEffect(() => {
        let lang = JSON.parse(localStorage.getItem('language'))
        if(lang){
            console.log(lang.lang1)
            console.log(lang.lang2)
        }else{

        }
        navigator.geolocation.getCurrentPosition(async(position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
            initMap(position.coords.latitude,position.coords.longitude)
        },(err) => {
            console.log(err)
        })   
        

    })
    

    const [lat,setLat] = useState()
    const [lng,setLng] = useState()

    var loader = new Loader({
        apiKey:'',//process.env.REACT_APP_GOOGLEKEY,
        version:'weekly',
        language:'ko'
    })
    const initMap = async (lat,lng) => {

        const mapOptions = {
            center: {
            lat: -34.397,
            lng: 150.644
            },
            zoom: 4
        };

        loader.load().then((google) => {
            var directionsRenderer = new google.maps.DirectionsRenderer()
            var map = new google.maps.Map(document.getElementById("map"), mapOptions)
            directionsRenderer.setMap(map)

        var directionsService = new google.maps.DirectionsService()

            var request = {
                origin: "경복궁",
                destination: {lat:37.041, lng:127.1547},
                travelMode: google.maps.TravelMode.TRANSIT
            };

            directionsService.route(request, function(response, status){
                if(status == 'OK'){
                    directionsRenderer.setDirections(response)
                }
            })
        })
    
        /*loader.importLibrary('maps').then(({Map}) => {
            new Map(document.getElementById("map"), mapOptions);
        }).catch((e) => {
            // do something
        });*/

    }
    initMap(lat,lng)

    
    
    //const [lang, setLang] = useState('')

    

   
    

    
    

    

    

    const Handle = () => {

        /*loader.load().then((google) => {
            var directionsRenderer = new google.maps.DirectionsRenderer()
            var directionsService = new google.maps.DirectionsService()

            var request = {
                origin: "경복궁",
                destination: "광화문",
                travelMode: google.maps.TravelMode.TRANSIT
            };

            directionsService.route(request, function(response, status){
                if(status == 'OK'){
                    directionsRenderer.setDirections(response)
                }
            })
        })*/
        
        /*loader.importLibrary('routes').then(async ({DirectionsRenderer, DirectionsService}) => {
            
            var request = {
                origin: "경복궁",
                destination: "광화문",
                travelMode: window.google.maps.TravelMode.TRANSIT
              };

              new DirectionsRenderer().route(request, function(result, status){
                if(status == 'OK'){
                    new DirectionsService().setDirections(result)
                }
            })
        })*/
    }

    

    return(
        <div>
            <div id="map" style={{width:"50vw", height:"50vh"}}></div>
            <select onChange={Handle}>
                    <option value={'ko'}>한국어</option>
                    <option value={"ja"}>일본어</option>
                    <option value={"zh-CN"}>중국어</option>
                    <option value={"ru"}>러시아어</option>
            </select>
            <button onClick={Handle}>경로</button>
        </div>
        
    )
}

export default Testgooglemap;