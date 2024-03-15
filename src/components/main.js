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

    const onClicklanguageBtn = () => {
        const languageContainer = document.getElementsByClassName("languageContainer")[0]
        const languageContainerBtn = document.getElementsByClassName("languageContainerBtn")[0]
        const langBtnOpen = document.getElementsByClassName("langBtnOpen")[0]
        const langBtnClose = document.getElementsByClassName("langBtnClose")[0]
    
        if(langBtnOpen){
            languageContainer.style.width = "0"
            languageContainerBtn.style.width = "4vw"
            languageContainerBtn.classList.remove("langBtnOpen")
            languageContainerBtn.classList.add("langBtnClose")
            
        }
        else if(langBtnClose){
            languageContainer.style.width = "30vw"
            languageContainerBtn.style.width = "35vw"
            languageContainerBtn.classList.add("langBtnOpen")
            languageContainerBtn.classList.remove("langBtnClose")
            
        }
    
      }
    
      const onClickContentLanguage = () => {
        const contentsLanguage = document.getElementsByClassName("contentsLanguage")[0]
        const isActive = document.getElementsByClassName("is-active")[0]
        const languageOpen = document.getElementsByClassName("languageOpen")[0]
        if(languageOpen){
            contentsLanguage.classList.remove("is-active")
            contentsLanguage.classList.remove("languageOpen")
        }else if(!languageOpen){
            contentsLanguage.classList.add("is-active")
            contentsLanguage.classList.add("languageOpen")
        }
    
      }
    
      const onClickChangeLanguage = (e) =>{
        const contentLanguageTitle = document.getElementsByClassName("contentLanguageTitle")[0]
        contentLanguageTitle.innerHTML = e.target.innerHTML
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

                <div className="languageContainerBtn langBtnClose" style={{zIndex:"1", backgroundColor: "rgba(0,0,0,0)",top:"40vh",right:"0", position:"fixed", width:"4vw",height:"8vh",transition: "width 0.5s"}}>
                    <button className="languageBtn open button is-success" style={{color:"red", height:"8vh",width:"1vw",padding:"2vw",float:"left",writingMode:"vertical-rl",fontSize:"3vw"}} onClick={onClicklanguageBtn}>언어</button>
                </div>
                <div className="languageContainer" style={{zIndex:"2", backgroundColor:"white",top:"40vh",right:"0", position:"fixed", width:"0vw",height:"8vh",transition: "width 0.5s"}}>

                    <div className="contentsLanguage languageOpen dropdown" style={{margin:"2vw"}}>
                        <div className="dropdown-trigger">
                            <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={onClickContentLanguage}>
                                <span className="contentLanguageTitle">한국어</span>
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu3" role="menu" style={{width:"100%"}}>
                            <div className="dropdown-content" style={{width:"25vw",height:"30vh",overflowY:"scroll"}}>
                                <a href="#" class="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    한국어
                                </a>
                                <a className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    日本語
                                </a>
                                <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    English
                                </a>
                                <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    中文
                                </a>
                                <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    Русский
                                </a>
                                <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    عربي    
                                </a>
                                <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    Português
                                </a>
                                <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                    Español
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Main