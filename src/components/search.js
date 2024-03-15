import React, { useRef, useState, useEffect } from 'react';
import 'bulma/css/bulma.css'
import './MainPage.css'; // 스타일 파일 불러오기
//import SearchResultPage from './SearchResultPage';
import axios from 'axios';
//import './save.js';
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import {Translator, Translate} from 'react-auto-translate';

function Search() {

    useEffect(() => {
        let lang = JSON.parse(localStorage.getItem('language'))
        if(lang){
            //console.log(lang.lang1)
            setGoogleLang(lang.lang1)
        }
    },[])

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('한국어'); // 기본 언어 선택
    const [googleLang, setGoogleLang] = useState('ko')
    const searchRef = useRef()

    const navigate = useNavigate()
    

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        // Tour API 호출 함수 호출
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        // 선택된 언어에 따라 언어 변경 작업 수행
    };

    const onClickRecommendTag = (e) => {
        const searchInput = document.getElementsByClassName('searchInput')[0]
        searchInput.value = e.target.innerHTML
        modalClose()
    }

    const fetchTourAPI = async () => {
        try {
            await axios.get(`http://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=APPTest&_type=json&serviceKey=diRGobceZJ1dqnSFtFN9%2FahQNFIu%2BmELvY6Tup4OXCBdRQW%2F0sC8OpZWQoi5i5HDqz7ey0OLtjgP4088F5Yaqw%3D%3D&keyword=${searchRef.current.value} `)
                .then(async (res) => {
                    console.log(res.data.response.body.items.item)
                    setSearchResults(res.data.response.body.items.item)
                })
            }     // Tour API 응답에서 결과를 추출하여 설정
        catch (error) {
            console.error('Error fetching tour data:', error);
        }
    };

    const fetchTourAPI2 = async (place) => {
        try {
            await axios.get(`http://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=APPTest&_type=json&serviceKey=diRGobceZJ1dqnSFtFN9%2FahQNFIu%2BmELvY6Tup4OXCBdRQW%2F0sC8OpZWQoi5i5HDqz7ey0OLtjgP4088F5Yaqw%3D%3D&keyword=${place} `)
                .then(async (res) => {
                    console.log(res.data.response.body.items.item)
                    setSearchResults(res.data.response.body.items.item)
                })
            }     // Tour API 응답에서 결과를 추출하여 설정
        catch (error) {
            console.error('Error fetching tour data:', error);
        }
    };

    const modalOpen = () => {
        const modal = document.getElementsByClassName("modal")[0]
        modal.classList.add("is-active")
        
    }

    const modalClose = () => {
        const modal = document.getElementsByClassName("modal")[0]
        modal.classList.remove("is-active")
    }


    const handleSearch = async () => {
        console.log(searchRef.current.value)
        setSearchResults([])
        // 검색 버튼을 클릭할 때마다 Tour API를 호출합니다.
        const logo = document.getElementsByClassName("a-logo")[0]
        const tip = document.getElementsByClassName("a-tip")[0]
        const card = document.getElementsByClassName("card")[0]

        logo.style.display = "none"
        tip.style.display = "none" 
        card.style.display = "block"

        /*if(googleLang != 'ko'){
            try{
                await axios.get(`https://translation.googleapis.com/language/translate/v2?key=${process.env.REACT_APP_GOOGLE}&q=${searchRef.current.value}&target=ko&source=${googleLang}`)
                    .then((res) => {
                        console.log(res.data.data.translations[0].translatedText)
                        fetchTourAPI2(res.data.data.translations[0].translatedText)
                    })
            }catch(err){
                console.error(err)
            }
        }*/

        fetchTourAPI();
    };

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





    return (
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
                <div style={{display:"flex",justifyContent:"center", marginTop:"5vh"}}>
                    <img src="/images/logo.png" alt="korea easy trip Logo" className="app-logo a-logo" style={{width:"20vw"}} />
                </div>
                <div class="columns" style={{alignItems:"center",justifyContent:"center",display:"flex"}}>
                    <input className="input is-info searchInput" type="text" ref={searchRef} style={{width:"40vw"}}></input>
                    <button className="button is-outlined is-success" onClick={handleSearch}>검색</button>
                </div>
                
                <div class="column" style={{alignItems:"center",justifyContent:"center",display:"flex",marginTop:"1vh"}}> 
                    <div className="travel-tips a-tip"style= {{textAlign:"Left", width:"50vw" }}>
                        
                        <ul>
                            <article class="message is-dark">
                                <div class="message-header">
                                    <p>한국 여행 할때는!</p>
                                    
                                </div>
                                <div class="message-body" style={{border:"solid black"}}>
                                    지하철 이용이 편리합니다. T-money 카드를 이용해보세요.
                                </div>
                            </article>

                            <article class="message is-dark">
                                <div class="message-header">
                                    <p>한국 여행 할때는!</p>
                                    
                                </div>
                                <div class="message-body" style={{border:"solid black"}}>
                                    한국의 전통음식을 맛보기 위해 꼭 한 번 한식당을 방문해보세요.
                                </div>
                            </article>
                            
                            
                        </ul>
                    </div>
                </div>
                

                <div class="card">
                    
                    {searchResults.map((spot) => (
                            <div style={{alignItems:"center",justifyContent:"center",display:"flex"}}>
                                <div key={spot.contentid}>
                                    <div className="card-image" style={{margin:"2vh"}}>
                                    
                                        {spot.firstimage ? 
                                        <figure className="image" >
                                            <img src={spot.firstimage} alt="IMG" style={{width:"40vw"}}></img> 
                                        </figure> : 
                                        <figure className="image is-4by3">
                                            <img src="/images/nothing.png" alt="IMG"></img> 
                                        </figure>}
                                        

                                    </div>

                                    <div className="search-result">
                                        
                                        <p className="title is-4">{spot.title}</p>
                                        <p className="subtitle is-6">@{spot.addr1}</p>
                                    </div>

                                    
                                    <div className="content">
                                        <button className="button is-warning" onClick={() => {
                                                localStorage.removeItem('tourData')
                                                localStorage.setItem('tourData',JSON.stringify({"contentid":spot.contentid,"addr":spot.addr1,"firstimage":spot.firstimage,"cat1":spot.cat1,"cat2":spot.cat2,"cat3":spot.cat3,"mapx":spot.mapx,"mapy":spot.mapy,"title":spot.title}))
                                                window.location.href = `/introduce/${spot.contentid}`
                                            }} style={{marginTop:"2vh"}}>정보보기</button>
                                    </div>
                                        
                                        

                                </div>
                            </div>
            
                    ))}
                </div>

                
            </div>}










            {isMobile && <div className="main-page">
                <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
                <div style={{alignItems:"center",justifyContent:"center",display:"flex", marginTop:"5vh"}}>
                    <img src="/images/logo.png" alt="korea easy trip Logo" className="app-logo a-logo" style={{width:"60vw"}} />
                </div>
                <div className="search-container" style={{marginBottom:"3vh"}}>
                    <div class="columns" style={{margin:"0"}}>
                        <input className="input is-info searchInput" type="text" ref={searchRef} style={{width:"70vw"}}></input>
                        <button className="button is-outlined is-success" onClick={handleSearch}>검색</button>
                    </div>
                </div>

                <span class="tag is-success" style={{width:"70vw", fontSize:"4vw"}} onClick={modalOpen}>추천 지역</span>
                
                <div class="card">
                <Translator
                    //cacheProvider={cacheProvider}
                    from='ko'
                    to={googleLang}
                    googleApiKey={process.env.REACT_APP_GOOGLE}
                >
                {searchResults.map((spot) => (
                        <>
                            <div key={spot.contentid}>
                                <div className="card-image">
                                
                                    {spot.firstimage ? <figure className="image is-4by3">
                                        <img src={spot.firstimage} alt="IMG"></img> 
                                    </figure> : <figure className="image is-4by3">
                                        <img src="/images/nothing.png" alt="IMG"></img> 
                                    </figure>}
                                    

                                </div>

                                <div className="search-result">
                                    
                                    <p className="title is-4"><Translate>{spot.title}</Translate></p>
                                    <p className="subtitle is-6">@{spot.addr1}</p>
                                </div>

                                </div><div className="content">
                                    
                                    <button className="button is-warning" onClick={() => {
                                        localStorage.removeItem('tourData')
                                        localStorage.setItem('tourData',JSON.stringify({"contentid":spot.contentid,"addr":spot.addr1,"firstimage":spot.firstimage,"cat1":spot.cat1,"cat2":spot.cat2,"cat3":spot.cat3,"mapx":spot.mapx,"mapy":spot.mapy,"title":spot.title}))
                                        window.location.href = `/introduce/${spot.contentid}`
                                    }} style={{marginTop:"2vh"}}>정보보기</button>

                            </div>
                        </>
        
                ))}
                </Translator>
                </div>
                

                <div class="column" style={{alignItems:"center",justifyContent:"center",display:"flex",padding:"0",marginTop:"5vh"}}>
                    <div className="travel-tips a-tip"style= {{textAlign:"Left", width:"80vw" }}>
                        
                        <ul>
                            <article class="message is-dark">
                                <div class="message-header">
                                    <p>한국 여행 할때는!</p>
                                    
                                </div>
                                <div class="message-body" style={{border:"solid black"}}>
                                    지하철 이용이 편리합니다. T-money 카드를 이용해보세요.
                                </div>
                            </article>

                            
                            
                            
                        </ul>
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


                <div className="modal">
                    <div className="modal-background modalBackground" onClick={modalClose}></div>
                    <div className="modal-content">
                        <div className="box" style={{width:"90vw",margin:"5vw", display:"flex", flexDirection:"column"}}>
                            <div>
                                <button class="delete deleteBtn" aria-label="close" style={{float:"right"}} onClick={modalClose}></button>
                            </div>
                            
                            <div class="tags" style={{alignItems:"center",justifyContent:"center",display:"flex"}}>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}><Translate>서울</Translate></span>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}>인천</span>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}>수원</span>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}>대전</span>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}>대구</span>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}>부산</span>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}>울산</span>
                                <span class="tag" style={{margin:"4vw", width:"10vw", fontSize:"5vw"}} onClick={onClickRecommendTag}>광주</span>
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
                        
            </div>}
        </div>
    );
}

export default Search;