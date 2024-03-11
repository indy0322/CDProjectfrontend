import React, { useRef, useState } from 'react';
import 'bulma/css/bulma.css'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";

function Main(){

    const navigate = useNavigate()

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })

    const onClickBackBtn = (e) => {
        navigate(-1)
    }
    
    return(
        <div>
            {isDesktop && <div>
                <nav class="navbar" role="navigation" aria-label="main navigation" style={{height:"8vh"}}>
                    <div class="navbar-brand">
                        <a class="navbar-item" href="https://bulma.io">
                        <img src="/images/logo.png" width="50" height="28"/>
                        </a>

                        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item">
                                Home
                            </a>
                            <a class="navbar-item">
                                Map
                            </a>
                            <a class="navbar-item">
                                Translation
                            </a>
                            <a class="navbar-item">
                                Wishlist
                            </a>
                        </div>

                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                <a class="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a class="button is-link">
                                    Log in
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="logoImageContainer" style={{alignItems:"center",justifyContent:"center",display:"flex",paddingTop:"10vh",marginBottom:"3vw"}}>
                    <figure className="image" style={{height:"20vh"}}>
                        <img style={{width:"15vw", height:"15vh"}} src="/images/logo.png"/>
                    </figure>
                </div>
                <div className='contentContainer'>
                    <div className='translateBtn'>
                        <button className="button is-info" style={{width:"70vw", height:"20vh", fontSize:"4vw"}} onClick={() => {
                            window.location.href = "/translate"
                        }}>통역</button>
                    </div>
                    <div className='tourSearchBtn' style={{marginTop:"5vh"}}>
                        <button className="button is-success" style={{width:"70vw", height:"20vh", fontSize:"4vw"}} onClick={() => {
                            window.location.href = "/search"
                        }}>관광지 검색</button>
                    </div>
                    
                </div>
            </div>}




            {isMobile && <div>
                <div className="logoImageContainer" style={{alignItems:"center",justifyContent:"center",display:"flex",paddingTop:"10vh",marginBottom:"10vw"}}>
                    <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
                    <figure className="image" style={{height:"20vh"}}>
                        <img style={{width:"60vw", height:"20vh"}} src="/images/logo.png"/>
                    </figure>
                </div>
                <div className='contentContainer'>
                    <div className='translateBtn'>
                        <button className="button is-info" style={{width:"90vw", height:"20vh", fontSize:"8vw"}} onClick={() => {
                            window.location.href = "/translate"
                        }}>통역</button>
                    </div>
                    <div className='tourSearchBtn' style={{marginTop:"5vh"}}>
                        <button className="button is-success" style={{width:"90vw", height:"20vh", fontSize:"8vw"}} onClick={() => {
                            window.location.href = "/search"
                        }}>관광지 검색</button>
                    </div>
                    
                </div>
            </div>}
        </div>
    )
}

export default Main