import React, { useEffect, useState } from 'react';

//컴퓨터로는 가능할것 같지만, 안드로이드 폰에서는 작동되지 않음.
const MapWithLanguageSetting = () => {
  let map;

  useEffect(async() => {
    let lang = JSON.parse(localStorage.getItem('language'))
    var script
    if(lang){
        // Google Maps 스크립트 로드
        script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=initMap&language=${lang.lang1}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);   
    }

    // 내 위치 가져오기
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      },
      (error) => {
        console.error('Error getting user location:', error);
        // 기본 위치 (예: 서울)를 사용하거나 에러 처리를 추가할 수 있습니다.
        const defaultLocation = { lat: 37.5665, lng: 126.9780 };
        initMap(defaultLocation);
      }
    );
  } else {
    console.error('Geolocation is not supported by your browser');
    // 기본 위치 (예: 서울)를 사용하거나 에러 처리를 추가할 수 있습니다.
    //const defaultLocation = { lat: 37.5665, lng: 126.9780 };
    //initMap(defaultLocation);
  }

    return () => {
      // 컴포넌트 언마운트 시 Google Maps 스크립트 제거
      document.head.removeChild(script);
    };
  }, []); // useEffect가 처음에만 실행되도록 빈 배열을 전달

  const [lat,setLat] = useState()
  const [lng,setLng] = useState()


  const initMap = (userLocation) => {
    
    const mapOptions = {
      center: userLocation,
      zoom: 10,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    };

    // 지도 생성
    map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    // 사용자 위치에 마커 추가
    new window.google.maps.Marker({
      position: userLocation,
      map: map,
      title: 'Your Location',
    });
  };


  if(lng && lat){
    const userLocation = {
        lat: lat,
        lng: lng,
    };
    initMap(userLocation);
  }

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default MapWithLanguageSetting;