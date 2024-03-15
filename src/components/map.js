import React, { useEffect, useRef, useState } from 'react';
import 'bulma/css/bulma.css'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";

function Map(){

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async(position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        
        },(err) => {
            console.log(err)
        })

        let lang = JSON.parse(localStorage.getItem('language'))
        if(lang){
            //console.log(lang.lang1)
            setLang(lang.lang1)
        }
    },[])

    const navigate = useNavigate()

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })

    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [lang, setLang] = useState()

    const onClickBackBtn = (e) => {
        navigate(-1)
    }

    return(
        <div>
            <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
            <div className="contentsContainer" style={{position:"fixed", width:"100vw", height:"90vh",alignItems:"center",display:"flex", flexDirection:"column"}}>
                <div>
                    {(lat && lng) && <iframe
                        className='tourMap'
                        style={{width:"100vw",height:"50vh"}}
                        loading="lazy"
                        allowfullscreen
                        referrerpolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE}&q=${lat},${lng}&language=${lang}`}>
                    </iframe>}
                </div>
                
                <div>
                    <div style={{textAlign:"right",margin:"2vw"}}>
                        <span type="button" className="tag is-success" >현재위치</span> 
                    </div>
                    
                    <div>
                        <span className="tag is-black" style={{marginBottom:"1vh"}}>출발지</span>
                        <input className="input is-primary" type="text" style={{width:"90vw"}}></input>
                        <span className="tag is-warning" style={{margin:"1vh"}}>도착지</span>
                        <input className="input is-link" type="text" style={{width:"90vw"}}></input>

                        <button className="button is-danger" style={{marginTop:"2vh", width:"90vw"}}>경로 검색</button>
                    </div>
                    
                </div>
            </div>
            <div className="bottomNav" style={{height:"10vh",width:"100vw",backgroundColor:"white",bottom:"0",position:"fixed",alignItems:"center",justifyContent:"center",display:"flex"}}>
                <img type="button" src="/images/main.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/blackheart.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/translate.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/map.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/user.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
            </div>
        </div>
    )
}

export default Map;