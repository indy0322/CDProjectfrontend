import React, { useRef, useState } from 'react';
import 'bulma/css/bulma.css'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";

function Map(){

    const navigate = useNavigate()

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })

    const onClickBackBtn = (e) => {
        navigate(-1)
    }

    return(
        <div>
            <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
            <div className="contentsContainer" style={{position:"fixed", width:"100vw", height:"50vh",alignItems:"center",display:"flex", flexDirection:"column"}}>
                <iframe
                    style={{width:"100vw",height:"50vh"}}
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE}&q=Space+Needle,Seattle+WA`}>
                </iframe>
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