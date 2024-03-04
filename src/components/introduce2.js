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
        }
        /*const explainTextarea = document.getElementsByClassName('explainTextarea')[0]
        explainTextarea.innerHTML = ""*/

    },[])

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })
    
    const navigate = useNavigate();
    const param = useParams()

    const [tourLang, setTourLang] = useState()

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
                    <img src="#" width="112" height="28"/>
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
                    <img style={{width:"50vw", height:"50vh",top:"8vh",position:"fixed"}} src="http://tong.visitkorea.or.kr/cms/resource/33/2678633_image2_1.jpg"/>
                </figure>
                <span className="heartBtn heartFull" type="button" style={{top:"8vh",left:"1vw",position:"fixed",fontSize:"3vw"}} onClick={onClickHeart}>❤️</span>
            </div>

            <div className="contentsContainer" style={{backgroundColor:"white",top:"8vh",right:"0",position:"fixed", width:"50vw", height:"50vh"}}>
                <div style={{width:"48vw",top:"15vh",right:"0",position:"fixed",margin:"1vw"}}>
                    <textarea className="explainTextarea textarea is-danger" disabled rows={9} style={{fontSize:"20px"}}>경복궁은 대한민국 서울에 위치한 대표적인 궁궐로, 조선 시대에 건립된 역사적인 건물입니다. 이 궁궐은 1395년에 처음으로 건립되었으며, 조선 왕조의 정부 중심지로 사용되었습니다. 경복궁은 조선 왕조의 주요 궁궐 중 하나로 꼽히며, 대한민국에서 가장 큰 궁궐로 알려져 있습니다.
경복궁은 그 자체로 아름다운 건축물과 정원, 돌담, 다양한 문화 유산을 갖추고 있어 많은 방문객들에게 사랑을 받고 있습니다. 대표적인 건물로는 경회루(경복궁에서 가장 큰 건물), 국립고궁박물관, 혜화문, 국립민속박물관 등이 있습니다.
경복궁은 궁궐 자체뿐만 아니라 그 주변에 위치한 창경궁, 창덕궁, 종묘 등과 함께 서울의 대표적인 관광 명소 중 하나로 손꼽힙니다. 또한, 매년 여름에는 경복궁에서 전통적인 한복을 입은 인원들이 모여 참여하는 '한복 퍼레이드'와 같은 다양한 행사들이 개최되어 관광객들에게 특별한 경험을 선사하고 있습니다.</textarea>
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