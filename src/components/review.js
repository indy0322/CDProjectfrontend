import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import testService from "../services/services";
import {Translator, Translate} from 'react-auto-translate';
import 'bulma/css/bulma.css'


function Review() {

    useEffect(() => {
        console.log(params)

        //const tourname = document.getElementsByClassName("tourname")[0]
        //const nickname = document.getElementsByClassName("nickname")[0]

        //tourname.defaultValue = params.tourId
        //nickname.defaultValue = "kim"
        setNickName("kim")
        setTourName(params.tourId)

        //console.log(tourname.value)

        let lang = JSON.parse(localStorage.getItem('language'))
        if(lang){
            //console.log(lang.lang1)
            setGoogleLang(lang.lang1)
        }
    },[])
    
    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })

    const params = useParams()
    const navigate = useNavigate()
    
    const [tourName, setTourName] = useState()
    const [nickName, setNickName] = useState()
    const [reviewContent, setReviewContent] = useState()
    const [googleLang, setGoogleLang] = useState('ko')


    const onClickReviewRegister = () => {
        testService.reviewRegister({nickname:nickName, tourname:tourName, review:reviewContent})
        //navigate(-1)
    }

    const onChangeReview = (e) => {
        setReviewContent(e.target.value)
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

    
    const onClickBackBtn = (e) => {
        navigate(-1)
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
                            <div className="contentsLanguage languageOpen dropdown">
                                <div className="dropdown-trigger">
                                    <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={onClickContentLanguage}>
                                        <span className="contentLanguageTitle">한국어</span>
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu3" role="menu" style={{width:"100%"}}>
                                    <div className="dropdown-content" style={{width:"6vw",height:"30vh",overflowY:"scroll"}}>
                                        <a href="#" class="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            한국어
                                        </a>
                                        <a className="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            日本語
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            English
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            中文
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            Русский
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            عربي    
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            Português
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"6vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                            Español
                                        </a>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="contentsContainer" style={{top:"8vh",position:"fixed", alignItems:"center"}}>
                <div className="field" style={{marginBottom:"5vh", marginTop:"5vh"}}>
                    <label className="label">관광지명</label>
                    <div className="control" style={{width:"50vw",marginLeft:"25vw",marginRight:"25vw"}}>
                        <span class="tourname tag" style={{marginBottom:"1vh",width:"50vw",height:"5vh",fontSize:"1vw", border:"solid"}}><Translate>{tourName}</Translate></span>
                        
                    </div>
                </div>
                <div className="field" style={{marginBottom:"5vh"}}>
                    <label className="label">닉네임</label>
                    <div className="control" style={{width:"50vw",marginLeft:"25vw",marginRight:"25vw"}}>
                        <span class="tag" style={{marginBottom:"1vh",width:"50vw",height:"5vh",fontSize:"1vw",border:"solid"}}>{nickName}</span>
                        
                    </div>
                </div>
                <div className="field" style={{marginBottom:"10vh"}}>
                    <label className="label">내용</label>
                    <div className="control" style={{width:"50vw",marginLeft:"25vw",marginRight:"25vw"}}>
                        <textarea className="textarea" style={{border:"solid"}} onChange={onChangeReview}></textarea>
                    </div>
                </div>
                <div class="field is-grouped" style={{alignItems:"center",justifyContent:"center"}}>
                    <div class="control">
                        <button class="button is-link" onClick={onClickReviewRegister}>리뷰 등록</button>
                    </div>
                </div>
            </div>
            </div>}



            


            {isMobile && <div>
                <Translator
                    //cacheProvider={cacheProvider}
                    /*from='ko'
                    to={googleLang}
                    googleApiKey={process.env.REACT_APP_GOOGLE}*/
                >
                <div className="contentsContainer" style={{top:"10vh",position:"fixed"}}>
                    <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
                    <div className="field">
                        <label className="label">관광지명</label>
                        <div className="control" style={{width:"90vw",margin:"5vw"}}>
                            <span class="tourname tag" style={{marginBottom:"1vh",width:"90vw",height:"5vh",fontSize:"5vw", border:"solid"}}><Translate>{tourName}</Translate></span>
                            {/*<input className="tourname input is-success" type="text" disabled/>*/}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">닉네임</label>
                        <div className="control" style={{width:"90vw",margin:"5vw"}}>
                            <span class="tag" style={{marginBottom:"1vh",width:"90vw",height:"5vh",fontSize:"5vw",border:"solid"}}>{nickName}</span>
                            {/*<input className="nickname input is-success" type="text" disabled/>*/}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">내용</label>
                        <div className="control" style={{width:"90vw",margin:"5vw"}}>
                            <textarea className="textarea" onChange={onChangeReview} style={{border:"solid"}}></textarea>
                        </div>
                    </div>
                    <div class="field is-grouped" style={{alignItems:"center",justifyContent:"center"}}>
                        <div class="control">
                            <button class="button is-link" onClick={onClickReviewRegister}>리뷰 등록</button>
                        </div>
                    </div>
                </div>
                </Translator>

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

export default Review;