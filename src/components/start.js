import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'
import 'bulma/css/bulma.css';
import { useNavigate } from "react-router-dom";
import {Translator, Translate} from 'react-auto-translate';



function Start() {

    useEffect(() => {
        let lang = JSON.parse(localStorage.getItem('language'))
        if(lang){
            //console.log(lang.lang1)
            setGoogleLang(lang.lang1)
        }
    },[])

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })

    const [googleLang, setGoogleLang] = useState('ko')

    const navigate = useNavigate()

    const modalClose = () => {
        const modal = document.getElementsByClassName("modal")[0]

        modal.classList.remove("is-active")
    }

    const modalOpen = () => {
        const modal = document.getElementsByClassName("modal")[0]
        const certLabel = document.getElementsByClassName("certLabel")[0]
        const cert = document.getElementsByClassName("cert")[0]

        modal.classList.add("is-active")
        certLabel.style.display = "none"
        cert.style.display = "none"
    }

    const onClickBackBtn = (e) => {
        navigate(-1)
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

        localStorage.removeItem('language')
        //localStorage.setItem('language',e.target.id.split(' ')[0])
        localStorage.setItem('language',JSON.stringify({"lang1": e.target.id.split(' ')[0],"lang2": e.target.id.split(' ')[1]}))
        setGoogleLang(e.target.id.split(' ')[0])
    }



    const onClickModalContentLanguage = () => {
        const contentsLanguage = document.getElementsByClassName("modalcontentsLanguage")[0]
        const isActive = document.getElementsByClassName("is-active")[1]
        const languageOpen = document.getElementsByClassName("modallanguageOpen")[0]
        if(languageOpen){
            contentsLanguage.classList.remove("is-active")
            contentsLanguage.classList.remove("modallanguageOpen")
        }else if(!languageOpen){
            contentsLanguage.classList.add("is-active")
            contentsLanguage.classList.add("modallanguageOpen")
        }

    }

    const onClickModalChangeLanguage = (e) =>{
        const contentLanguageTitle = document.getElementsByClassName("modalcontentLanguageTitle")[0]
        contentLanguageTitle.innerHTML = e.target.innerHTML
    }

    return(
        <div>
            {isDesktop && <div style={{height:"100vh",background:"linear-gradient(lightCyan, skyBlue, deepSkyBlue)"}}>

                <div className="logoImageContainer" style={{alignItems:"center",justifyContent:"center",display:"flex",paddingTop:"10vh",marginBottom:"3vw"}}>
                    <figure className="image" style={{height:"30vh"}}>
                        <img style={{width:"25vw", height:"30vh"}} src="/images/logo.png"/>
                    </figure>
                </div>
                <p style={{fontSize:"2vw", margin:"2vw", fontWeight:"bold",color:"white"}}>사용할 언어를 선택해주세요</p>
                <div className="contentsLanguage languageOpen dropdown" >
                    <div className="dropdown-trigger">
                        <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={onClickContentLanguage}>
                            <span className="contentLanguageTitle">한국어</span>
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu3" role="menu" style={{width:"100%"}}>
                        <div className="dropdown-content" style={{width:"20vw",height:"30vh",overflowY:"scroll"}}>
                            <a href="#" class="dropdown-item" style={{width:"8vw",padding:"1vw"}} id='ko 한국어' onClick={onClickChangeLanguage}>
                                한국어
                            </a>
                            <a className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id='ja 日本語' onClick={onClickChangeLanguage}>
                                日本語
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id='en English' onClick={onClickChangeLanguage}>
                                English
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id="zh-CN 中文" onClick={onClickChangeLanguage}>
                                中文
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id="ru Русский" onClick={onClickChangeLanguage}>
                                Русский
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                Português
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} onClick={onClickChangeLanguage}>
                                Español
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="emailPasswordContainer" style={{width:"30vw",marginRight:"35vw",marginLeft:"35vw",marginTop:"1vw", marginBottom:"1vw"}}>
                    <label className="label" style={{float:"left",color:"white"}}>이메일</label>
                    <input class="email input is-info" type="text" placeholder="Email" style={{marginBottom:"1vw"}}></input>
                    <label className="label" style={{float:"left",color:"white"}}>비밀번호</label>
                    <input className="password input is-info" type="text" placeholder="Password" ></input>
                </div>
                <div class="buttons" style={{alignItems:"center",justifyContent:"center"}}>
                    <button className="button is-info" onClick={() => {window.location.href = '/main'}}>로그인</button>
                    <button className="button is-success" onClick={modalOpen}>회원가입</button>
                </div>

                <div className="modal">
                    <div className="modal-background modalBackground" onClick={modalClose}></div>
                    <div className="modal-content" style={{alignItems:"center",justifyContent:"center",display:"flex",overflow:"hidden"}}>
                        <div className="box" style={{width:"30vw", display:"flex", flexDirection:"column"}}>
                            <div>
                                <button class="delete deleteBtn" aria-label="close" style={{float:"right"}} onClick={modalClose}></button>
                            </div>
                            <label className="label" style={{textAlign:"left"}}>이메일</label>
                            <input class="email input is-info" type="text" placeholder="Email" style={{marginBottom:"2vw"}}></input>
                            <label className="label" style={{textAlign:"left"}}>비밀번호</label>
                            <input className="password input is-info" type="text" placeholder="Password" style={{marginBottom:"2vw"}}></input>



                            <label className="label" style={{textAlign:"left"}}>사용언어 선택</label>
                            <div className="modalcontentsLanguage modallanguageOpen dropdown" style={{margin:"1vw"}}>
                                <div className="dropdown-trigger">
                                    <button className="button is-link" aria-haspopup="true" style={{width:"10vw"}} aria-controls="dropdown-menu3" onClick={onClickModalContentLanguage}>
                                        <span className="modalcontentLanguageTitle">한국어</span>
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div style={{marginLeft:"5vw"}}>
                                    <button className="registerBtn button is-danger" onClick={() => {
                                        const certLabel = document.getElementsByClassName("certLabel")[0]
                                        const cert = document.getElementsByClassName("cert")[0]

                                        certLabel.style.display = "block"
                                        cert.style.display = "block"
                                    }}>인증번호 발송</button>
                                </div>

                                <div className="dropdown-menu" id="dropdown-menu3" role="menu" style={{width:"100%"}}>
                                    <div className="dropdown-content" style={{width:"10vw",height:"10vh",overflowY:"scroll"}}>
                                        <a href="#" class="dropdown-item" style={{width:"8vw",padding:"1vw"}} id='ko 한국어' onClick={onClickModalChangeLanguage}>
                                            한국어
                                        </a>
                                        <a className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id='ja 日本語' onClick={onClickModalChangeLanguage}>
                                            日本語
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id='en English' onClick={onClickModalChangeLanguage}>
                                            English
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id="zh-CN 中国人" onClick={onClickModalChangeLanguage}>
                                            中文
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} id="ru Русский" onClick={onClickModalChangeLanguage}>
                                            Русский
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} onClick={onClickModalChangeLanguage}>
                                            Português
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"8vw",padding:"1vw"}} onClick={onClickModalChangeLanguage}>
                                            Español
                                        </a>
                                    </div>
                                </div>
                            </div>



                            <div className="certLabel" style={{width:"100vw"}}>
                                <label className="label" style={{textAlign:"left"}}>인증번호</label>
                            </div>
                            <div className="cert" style={{float:"left"}}> 
                                <input className="password input is-danger" type="text" placeholder="Certifiacation" style={{marginBottom:"2vw",width:"19vw",float:"left"}}></input>
                            </div>
                            <div>
                                <button className="registerBtn button is-success" style={{marginTop:"2vw"}}>회원가입</button>
                            </div>
                            
                        </div>
                    </div>
                </div>  
            </div>}








            {isMobile && <div style={{height:"100vh",background:"linear-gradient(lightCyan, skyBlue, deepSkyBlue)"}}>
                <Translator
                    //cacheProvider={cacheProvider}
                    /*from='ko'
                    to={googleLang}
                    googleApiKey={process.env.REACT_APP_GOOGLE}*/
                >
                <div className="logoImageContainer" style={{alignItems:"center",justifyContent:"center",display:"flex",paddingTop:"15vh",marginBottom:"10vw"}}>
                    <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
                    <figure className="image" style={{height:"20vh"}}>
                        <img style={{width:"60vw", height:"20vh"}} src="/images/logo.png"/>
                    </figure>
                </div>
                <p style={{fontSize:"4vw", margin:"5vw", fontWeight:"bold",color:"white"}}><Translate>사용할 언어를 선택해주세요</Translate></p>
                <div className="contentsLanguage languageOpen dropdown" style={{margin:"2vw"}}>
                    <div className="dropdown-trigger">
                        <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={onClickContentLanguage}>
                            <span className="contentLanguageTitle">한국어</span>
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu3" role="menu" style={{width:"100%"}}>
                        <div className="dropdown-content" style={{width:"25vw",height:"20vh",overflowY:"scroll"}}>
                            <a href="#" class="dropdown-item" style={{width:"15vw",padding:"1vw"}} id='ko 한국어' onClick={onClickChangeLanguage}>
                                한국어
                            </a>
                            <a className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id='ja 日本語' onClick={onClickChangeLanguage}>
                                日本語
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id='en English' onClick={onClickChangeLanguage}>
                                English
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id="zh-CN 中文" onClick={onClickChangeLanguage}>
                                中文
                            </a>
                            <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id="ru Русский" onClick={onClickChangeLanguage}>
                                Русский
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
                </Translator>
                {/*<div style={{marginTop:"4vh"}}>
                    <button className="button is-success" aria-haspopup="true" aria-controls="dropdown-menu3"><img src="/images/go.png" style={{height:"4vh"}}></img></button>
                </div>*/}
                <div className="emailPasswordContainer" style={{width:"90vw",margin:"5vw",display:"flex", flexDirection:"column"}}>
                    <label className="label" style={{textAlign:"left",color:"white"}}>이메일</label>
                    <input class="email input is-info" type="text" style={{marginBottom:"2vw",width:"100vw"}}></input>
                    <label className="label" style={{textAlign:"left",color:"white"}}>비밀번호</label>
                    <input className="password input is-info" type="text" style={{width:"100vw"}}></input>
                </div>
                <div class="buttons" style={{alignItems:"center",justifyContent:"center"}}>
                    <button className="button is-link" onClick={() => {window.location.href = '/main'}}>로그인</button>
                    <button className="button is-success" onClick={modalOpen}>회원가입</button>
                </div>



                <div className="modal">
                    <div className="modal-background modalBackground" onClick={modalClose}></div>
                    <div className="modal-content">
                        <div className="box" style={{width:"90vw",margin:"5vw", display:"flex", flexDirection:"column"}}>
                            <div>
                                <button class="delete deleteBtn" aria-label="close" style={{float:"right"}} onClick={modalClose}></button>
                            </div>
                            <label className="label" style={{textAlign:"left"}}>이메일</label>
                            <input class="email input is-info" type="text" style={{marginBottom:"2vw"}}></input>
                            <label className="label" style={{textAlign:"left"}}>비밀번호</label>
                            <input className="password input is-info" type="text" style={{marginBottom:"2vw"}}></input>


                            <label className="label" style={{textAlign:"left"}}>사용언어 선택</label>
                            <div className="modalcontentsLanguage modallanguageOpen dropdown" style={{margin:"2vw"}}>
                                <div className="dropdown-trigger">
                                    <button className="button is-link" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={onClickModalContentLanguage}>
                                        <span className="modalcontentLanguageTitle">한국어</span>
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div style={{marginLeft:"12vw"}}>
                                    <button className="registerBtn button is-danger" onClick={() => {
                                        const certLabel = document.getElementsByClassName("certLabel")[0]
                                        const cert = document.getElementsByClassName("cert")[0]

                                        certLabel.style.display = "block"
                                        cert.style.display = "block"
                                    }}>인증번호 발송</button>
                                </div>

                                <div className="dropdown-menu" id="dropdown-menu3" role="menu" style={{width:"100%"}}>
                                    <div className="dropdown-content" style={{width:"25vw",height:"10vh",overflowY:"scroll"}}>
                                        <a href="#" class="dropdown-item" style={{width:"15vw",padding:"1vw"}} id='ko 한국어' onClick={onClickModalChangeLanguage}>
                                            한국어
                                        </a>
                                        <a className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id='ja 日本語' onClick={onClickModalChangeLanguage}>
                                            日本語
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id='en English' onClick={onClickModalChangeLanguage}>
                                            English
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id="zh-CN 中文" onClick={onClickModalChangeLanguage}>
                                            中文
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} id="ru Русский" onClick={onClickModalChangeLanguage}>
                                            Русский
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickModalChangeLanguage}>
                                            Português
                                        </a>
                                        <a href="#" className="dropdown-item" style={{width:"15vw",padding:"1vw"}} onClick={onClickModalChangeLanguage}>
                                            Español
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            

                            <label className="label certLabel" style={{textAlign:"left", display:"none"}}>인증번호</label>
                            <div className="cert" style={{display:"none"}}>
                                <input className="password input is-danger" type="text" style={{marginBottom:"2vw",width:"40vw",float:"left"}}></input>
                            </div>
                            <div>
                                <button className="registerBtn button is-success" style={{marginTop:"2vw"}}>회원가입</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Start