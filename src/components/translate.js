import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import './translate.css';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

function Translate() {

  useEffect(() => {
    let lang = JSON.parse(localStorage.getItem('language'))
    if(lang){
        setSelectedLanguage1(lang.lang2)
    }
  },[])

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedLanguage1, setSelectedLanguage1] = useState('한국어');
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedLanguage2, setSelectedLanguage2] = useState('English');
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
  const isMobile = useMediaQuery({ query: '(max-width:768px)' })

  const navigate = useNavigate()

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const LanguageSelect1 = (language) => {
    setSelectedLanguage1(language);
    setIsDropdownOpen1(false);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const LanguageSelect2 = (language) => {
    setSelectedLanguage2(language);
    setIsDropdownOpen2(false);
  };

  const toggleLanguagesOrder = () => {
    const tempLanguage = selectedLanguage1;
    setSelectedLanguage1(selectedLanguage2);
    setSelectedLanguage2(tempLanguage);
  };

  const translate = () => {
    setOutputText(inputText);
  };

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
  
  return (
    <div>
      {isDesktop && <div className='Translate'>
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

        <section className="section" style={{padding:"1vh"}}>
          <div className="container">
            <div className="columns is-mobile column">
              <div className="column">
                <div className={`dropdown ${isDropdownOpen1 ? 'is-active' : ''}`} style={{marginRight:"2vw"}}>
                  <div className="dropdown-trigger">
                    <button className="button" style={{border:"solid", width:"20vw"}} aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown1}>
                      <span>{selectedLanguage1}</span>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu"> 
                    <div className="dropdown-content" style={{width:"20vw",height:"20vh",overflowY:"scroll"}}>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('한국어')}>한국어</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('English')}>English</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('中文')}>中文</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('French')}>Français</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('日本語')}>日本語</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Русскийn')}>Русский</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Español')}>Español</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Português')}>Português</a>
                    </div>
                  </div>
                </div>

                <img src='/images/transArrow.png' style={{width:"3vw"}} onClick={toggleLanguagesOrder}></img>

                <div className={`dropdown ${isDropdownOpen2 ? 'is-active' : ''}`} style={{marginLeft:"2vw"}}>
                  <div className="dropdown-trigger">
                    <button className="button" style={{border:"solid", width:"20vw"}} aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown2}>
                      <span>{selectedLanguage2}</span>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content" style={{width:"20vw",height:"20vh",overflowY:"scroll"}}>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('한국어')}>한국어</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('English')}>English</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('中文')}>中文</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('French')}>Français</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('日本語')}>日本語</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Русскийn')}>Русский</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Español')}>Español</a>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Português')}>Português</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span class="tag is-link" style={{marginBottom:"1vh"}}>입력</span>
            <div className="columns">
              <div className="column is-full">
                <div className="field" style={{alignItems:"center",justifyContent:"center",display:"flex"}}>
                  <div className="control" style={{width:"50vw"}}>
                    <textarea className="textarea is-info" value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <span class="tag is-danger" style={{marginBottom:"1vh"}}>출력</span>
            <div className="columns">
              <div className="column is-full">
                <div className="field" style={{alignItems:"center",justifyContent:"center",display:"flex"}}>
                  <div className="control" style={{width:"50vw"}}>
                    <textarea className="textarea is-info" value={outputText} readOnly></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns" style={{margin:"1vw",alignItems:"center",justifyContent:"center",display:"flex"}}>
              <button class="button is-primary"style={{width:"15vw",height:"8vh"}}><img src='/images/speaker.png' style={{width:"4vw"}}></img></button>
              <button class="button is-primary"style={{width:"15vw",height:"8vh",marginRight:"3vw",marginLeft:"3vw"}}><img src='/images/trans.png' style={{width:"4vw"}}></img></button>
              <button class="button is-primary"style={{width:"15vw",height:"8vh"}}><img src='/images/mic.png' style={{width:"4vw"}}></img></button>  
            </div>
          </div>
        </section>

        


      </div>}




    
      {isMobile && 
        <div className="Translate">
          <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
          <section className="section">
            <div className="container">
              <div className="columns is-mobile column">
                <div className="column">
                  <div className={`dropdown ${isDropdownOpen1 ? 'is-active' : ''}`} style={{marginRight:"2vw"}}>
                    <div className="dropdown-trigger">
                      <button className="button" style={{border:"solid", width:"30vw"}} aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown1}>
                        <span>{selectedLanguage1}</span>
                      </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu"> 
                      <div className="dropdown-content" style={{width:"30vw",height:"20vh",overflowY:"scroll"}}>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('한국어')}>한국어</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('English')}>English</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('中文')}>中文</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('French')}>Français</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('日本語')}>日本語</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Русскийn')}>Русский</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Español')}>Español</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Português')}>Português</a>
                      </div>
                    </div>
                  </div>

                  <img src='/images/transArrow.png' style={{width:"10vw"}} onClick={toggleLanguagesOrder}></img>

                  <div className={`dropdown ${isDropdownOpen2 ? 'is-active' : ''}`} style={{marginLeft:"2vw"}}>
                    <div className="dropdown-trigger">
                      <button className="button" style={{border:"solid", width:"30vw"}} aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown2}>
                        <span>{selectedLanguage2}</span>
                      </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                      <div className="dropdown-content" style={{width:"30vw",height:"20vh",overflowY:"scroll"}}>
                      <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('한국어')}>한국어</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('English')}>English</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('中文')}>中文</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('French')}>Français</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('日本語')}>日本語</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Русскийn')}>Русский</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Español')}>Español</a>
                        <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Português')}>Português</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="tag is-link" style={{marginBottom:"1vh"}}>입력</span>
              <div className="columns">
                <div className="column is-full">
                  <div className="field">
                    <div className="control">
                      <textarea className="textarea is-info" value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              <span class="tag is-danger" style={{marginBottom:"1vh"}}>출력</span>
              <div className="columns">
                <div className="column is-full">
                  <div className="field">
                    <div className="control">
                      <textarea className="textarea is-info" value={outputText} readOnly></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns" style={{margin:"1vw"}}>
                <button class="button is-primary"style={{width:"25vw",height:"8vh"}}><img src='/images/speaker.png' style={{width:"15vw"}}></img></button>
                <button class="button is-primary"style={{width:"25vw",height:"8vh",marginRight:"3vw",marginLeft:"3vw"}}><img src='/images/trans.png' style={{width:"15vw"}}></img></button>
                <button class="button is-primary"style={{width:"25vw",height:"8vh"}}><img src='/images/mic.png' style={{width:"15vw"}}></img></button>  
              </div>
            </div>
          </section>

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
            <img type="button" src="/images/user.png" style={{width:"12vw",marginLeft:"3vw",marginRight:"3vw"}}></img>
          </div>
        </div>
      }
    </div>
  );
}

export default Translate;