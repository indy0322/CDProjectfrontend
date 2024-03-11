import React, { useRef, useState } from 'react';
import 'bulma/css/bulma.css'
import './MainPage.css'; // 스타일 파일 불러오기
//import SearchResultPage from './SearchResultPage';
import axios from 'axios';
//import './save.js';
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";

function Search() {

    const isDesktop = useMediaQuery({ query: '(min-width:769px)' })
    const isMobile = useMediaQuery({ query: '(max-width:768px)' })

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('한국어'); // 기본 언어 선택
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


    const handleSearch = () => {
        setSearchResults([])
        // 검색 버튼을 클릭할 때마다 Tour API를 호출합니다.
        const a = document.getElementsByClassName("a-logo")[0]
        const b = document.getElementsByClassName("a-tip")[0]
        const c = document.getElementsByClassName("search-result-title")[0]
        const d = document.getElementsByClassName("card")[0]
        //const e = document.getElementsByClassName("app-name")[0]

        a.style.display = "none"
        b.style.display = "none"
        c.style.display = "block"
        d.style.display = "block"
        //e.style.display = "none"

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





    return (
         <div>
            {isMobile && <div className="main-page">
                <img className="backBtn" type="button" style={{top:"2vw", left:"2vw",position:"fixed", width:"10vw"}} onClick={onClickBackBtn} src="/images/back.png"></img>
                <div style={{display:"flex",justifyContent:"center", marginTop:"5vh"}}>
                    <img src="/images/logo.png" alt="korea easy trip Logo" className="app-logo a-logo" style={{width:"60vw"}} />
                </div>
                <div class="column">
                    <div className="search-container">
                        <div class="columns">
                            <input className="input" type="text" ref={searchRef} style={{width:"70vw"}}></input>

                            <button className="button is-outlined" onClick={handleSearch}>검색</button>
                    
                    
                        </div>
                            <div className="search-result-title" style= {{textAlign: "Left" }}>
                                <h1>검색 결과</h1>
                                <h2>_______________________________________</h2>
                            </div>
                    </div>
                </div>
                
                {/* <div className="setSearchResults">
                    
                    {searchResults.map((spot) => (
                        <div key={spot.contentid} 
                        
                        className="search-result">
                            
                            <h3>{spot.title}</h3>
                            
                        </div>
                    ))}

                </div>  */}
                <div class="card">
                    
                {searchResults.map((spot) => (
                        <>
                            <div key={spot.contentid}>
                                <div className="card-image">
                                
                                    <figure className="image is-4by3">
                                        <img src={spot.firstimage} alt="IMG"></img> 
                                    </figure>
                                    

                                </div>

                                <div className="search-result">
                                    
                                    <p className="title is-4">{spot.title}</p>
                                    <p className="subtitle is-6">@{spot.addr1}</p>
                                </div>

                                </div><div className="content">
                                    
                                    <button className="button is-light" onClick={() => {
                                        localStorage.removeItem('tourData')
                                        localStorage.setItem('tourData',JSON.stringify({"contentid":spot.contentid,"addr":spot.addr1,"firstimage":spot.firstimage,"cat1":spot.cat1,"cat2":spot.cat2,"cat3":spot.cat3,"mapx":spot.mapx,"mapy":spot.mapy,"title":spot.title}))
                                        window.location.href = `/introduce/${spot.contentid}`
                                    }}>Explore</button>

                            </div>
                        </>
        
                ))}
                </div>
                

                
                <div className="spacer"></div>
                <div class="column">
                <div className="travel-tips a-tip"style= {{textAlign: "Left" }}>
                    
                    <ul>
                        <article class="message is-dark">
                            <div class="message-header">
                                <p>한국 여행 할때는!</p>
                                
                            </div>
                            <div class="message-body">
                                지하철 이용이 편리합니다. T-money 카드를 이용해보세요.
                            </div>
                        </article>

                        <article class="message is-dark">
                            <div class="message-header">
                                <p>한국 여행 할때는!</p>
                                
                            </div>
                            <div class="message-body">
                                한국의 전통음식을 맛보기 위해 꼭 한 번 한식당을 방문해보세요.
                            </div>
                        </article>
                        
                        
                    </ul>
                </div>
                


                {/* <div className="contentsLanguage languageOpen dropdown" style={{margin:"2vw"}}>
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
                        </div> */}

                        
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