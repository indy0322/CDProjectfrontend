import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'
import 'bulma/css/bulma.css'
import { useNavigate, useParams } from "react-router-dom";
import {Translator, Translate} from 'react-auto-translate';
import OpenAI from "openai";


function Introduce() {

    useEffect(async () => {
        let tourData = JSON.parse(localStorage.getItem('tourData'))
        if(tourData){
            const tourImage = document.getElementsByClassName('tourImage')[0]
            tourImage.src = tourData.firstimage
            setTourimage(tourData.firstimage)
        }
        /*const explainTextarea = document.getElementsByClassName('explainTextarea')[0]
        explainTextarea.innerHTML = ""*/

    },[])

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })
    
    const navigate = useNavigate();
    const param = useParams()

    const [tourLang, setTourLang] = useState()
    const [tourimage, setTourimage] = useState()

    const onOpenClose = () => {
        //setInnerState(!innerState)
        const reviewContainer = document.getElementsByClassName("reviewContainer")[0]
        const stateClose = document.getElementsByClassName("close")[0]
        const stateOpen = document.getElementsByClassName("open")[0]
        const review = document.getElementsByClassName("review")[0]
        const btn = document.getElementsByClassName("btn")[0]
        if(stateClose){
            review.style.height = "20vh"
            reviewContainer.style.height = '33vh'
            reviewContainer.classList.remove("close")
            reviewContainer.classList.add("open")
            btn.innerHTML = "close"
        }
        else if(stateOpen){
            review.style.height = "0vh"
            reviewContainer.style.height = '13vh'
            reviewContainer.classList.remove("open")
            reviewContainer.classList.add("close")
            btn.innerHTML = "open"
        }
    }

    const onClickHeart = () => {
        const heartBtn = document.getElementsByClassName("heartBtn")[0]
        const heartFull = document.getElementsByClassName("heartFull")[0]
        const heartEmpty = document.getElementsByClassName("heartEmpty")[0]
        if(heartFull){
            heartBtn.innerHTML = "🤍"
            heartBtn.classList.remove("heartFull")
            heartBtn.classList.add("heartEmpty")
        }
        else if(heartEmpty){
            heartBtn.innerHTML = "❤️"
            heartBtn.classList.remove("heartEmpty")
            heartBtn.classList.add("heartFull")
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

    const onClickTourExplainBtn = () => {
        const tourExplainBtn = document.getElementsByClassName('tourExplainBtn')[0]
        //const reviewRightBtn = document.getElementsByClassName('reviewRightBtn')[0]
        const explainTextareaContainer = document.getElementsByClassName('explainTextareaContainer')[0]

        tourExplainBtn.style.display = "none"
        //reviewRightBtn.style.marginTop = "2vw"
        explainTextareaContainer.style.display = "block"
    }
    
    const onClickChangeLanguage = (e) =>{
        const contentLanguageTitle = document.getElementsByClassName("contentLanguageTitle")[0]
        contentLanguageTitle.innerHTML = e.target.innerHTML
    }

    const onClickReviewBtn = (e) => {
        window.location.href = "/review/경복궁"
        //navigate("/review/경복궁")
    }

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

    const modalOpen = () => {
        const modal = document.getElementsByClassName("modal")[0]

        modal.classList.add("is-active")
    }

    const modalClose = () => {
        const modal = document.getElementsByClassName("modal")[0]

        modal.classList.remove("is-active")
    }


    return(
        <div>
            {isDesktop && <div className="isDesktop">
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

            <div className="imageContainer" style={{height:"50vh",width:"50vw",top:"8vh",position:"fixed"}}>        
                <figure className="image" style={{height:"50vh"}}>
                    <img className="tourImage" style={{width:"50vw", height:"50vh",top:"8vh",position:"fixed"}} src="http://tong.visitkorea.or.kr/cms/resource/33/2678633_image2_1.jpg"/>
                </figure>
                <span className="heartBtn heartFull" type="button" style={{top:"8vh",left:"1vw",position:"fixed",fontSize:"3vw"}} onClick={onClickHeart}>❤️</span>
            </div>

            <div className="contentsContainer" style={{backgroundColor:"white",top:"8vh",right:"0",position:"fixed", width:"50vw", height:"50vh"}}>
                <div className="explainTextareaContainer" style={{width:"48vw",top:"15vh",right:"0",position:"fixed",margin:"1vw", display:"none"}}>
                    <textarea className="explainTextarea textarea is-danger" disabled rows={9} style={{fontSize:"20px"}}>관광지 설명</textarea>
                </div>
                <div>
                    <button className="button is-link tourExplainBtn" onClick={onClickTourExplainBtn} style={{width:"20vw",top:"30vh",right:"15vw",position:"fixed",margin:"1vw"}}>관광지 소개</button>
                </div>

                <div style={{margin:"2vw",right:"25vw", top:"7vh",position:"fixed"}}>
                    <button className="button is-danger" style={{width:"10vw"}}>관광지 지도</button>
                </div>

                <div className="contentsLanguage languageOpen dropdown" style={{margin:"2vw", top:"7vh",position:"fixed"}}>
                    <div className="dropdown-trigger">
                        <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={onClickContentLanguage} style={{width:"10vw"}}>
                            <span className="contentLanguageTitle">한국어</span>
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                        <div className="dropdown-content" style={{width:"20vw",height:"30vh",overflowY:"scroll"}}>
                            <a href="#" class="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                한국어
                            </a>
                            <a className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                중국어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                영어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                일본어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                러시아어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                대만어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                포르투갈어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                스페인어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                베트남어
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                그 외
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{top:"58vh",right:"0",position:"fixed"}}>
                <button className="button is-dark reviewBtn" onClick={onClickReviewBtn} style={{margin:"2vw"}} >리뷰작성</button>
            </div>

            <div className="reviewContainer" style={{height:"30vh",width:"100vw",backgroundColor:"skyblue",bottom:"0",position:"fixed",overflowY:"scroll"}}>
                <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                    (닉네임) 좋은 관광지~~~
                </div>
                <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                    (닉네임) 별로임
                </div>
                <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                    (닉네임) 그럭저럭 괜찮아
                </div>
                <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                    (닉네임) 서비스가 그닥...
                </div>
                <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                    (닉네임) 좋은 관광지~~~
                </div>
            </div>
            </div>}






            {isMobile && <div className="isMobile">
            <div className="imageContainer" style={{height:"40vh",width:"100vw",top:"0",position:"fixed"}}>        
                <figure className="image" style={{height:"40vh"}}>
                    <img className="tourImage" style={{width:"100vw", height:"40vh",top:"0",position:"fixed"}} src="http://tong.visitkorea.or.kr/cms/resource/33/2678633_image2_1.jpg"/>
                </figure>
                <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
                <span className="mapBtn" type="button" style={{top:"32vh", right:"2vw",position:"fixed",fontSize:"10vw"}}>🗺️</span>
                <span className="heartBtn heartFull" type="button" style={{top:"0",right:"2vw",position:"fixed",fontSize:"10vw"}} onClick={onClickHeart}>❤️</span>
            </div>

            <div className="contentsContainer" style={{backgroundColor:"white",top:"40vh", position:"fixed", width:"100vw", height:"50vh",alignItems:"center",display:"flex", flexDirection:"column"}}>
                {/*<button className="button is-dark reviewRightBtn" onClick={onClickReviewBtn} style={{marginTop:"10vh",marginBottom:"2vw"}}>리뷰작성</button>*/}
                <button className="button is-link tourExplainBtn" onClick={onClickTourExplainBtn} style={{marginTop:"10vw"}}>관광지 소개</button>
                
                <div className="explainTextareaContainer" style={{width:"90vw",marginTop:"5vh",display:"none"}}>
                    <textarea className="explainTextarea textarea is-danger" disabled rows={9}>경복궁 소개 내용</textarea>
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

            <div className="reviewContainer close" style={{height:"13vh",width:"100vw",backgroundColor: "rgba(0,0,0,0)",bottom:"0",position:"fixed", transition: "height 0.5s"}}>
                <button className="btn open button is-light" style={{color:"red", height:"3vh",width:"20vw"}} onClick={onOpenClose}>open</button>
                <div className="review" style={{backgroundColor:"skyblue",height:"0vh",width:"100vw",bottom:"10vh",position:"fixed", transition:"height 0.5s", overflowY:"scroll"}}>
                    <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                        (닉네임) 좋은 관광지~~~
                    </div>
                    <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                        (닉네임) 별로임
                    </div>
                    <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                        (닉네임) 그럭저럭 괜찮아
                    </div>
                    <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                        (닉네임) 서비스가 그닥...
                    </div>
                    <div className="box" style={{margin:"1vw", fontWeight:"bold"}}>
                        (닉네임) 좋은 관광지~~~
                    </div>
                </div>
            </div>
            <div className="bottomNav" style={{height:"10vh",width:"100vw",backgroundColor:"white",bottom:"0",position:"fixed",alignItems:"center",justifyContent:"center",display:"flex"}}>
                <img type="button" src="/images/main.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/blackheart.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/translate.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/map.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
                <img type="button" src="/images/user.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}} onClick={modalOpen}></img>
            </div>

            <div className="modal">
                    <div className="modal-background modalBackground" onClick={modalClose}></div>
                    <div className="modal-content">
                        <div className="box" style={{width:"80vw",margin:"10vw"}}>
                            <button class="delete deleteBtn" aria-label="close" style={{float:"right"}} onClick={modalClose}></button>
                    
                            <button class="button is-success" style={{margin:"1vw",padding:"2vw"}}>회원정보</button>
                            <button class="button is-success" style={{margin:"1vw",padding:"2vw"}}>로그아웃</button>
                            
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Introduce