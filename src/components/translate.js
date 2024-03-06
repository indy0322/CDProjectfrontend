import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import './translate.css';

function Translate() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedLanguage1, setSelectedLanguage1] = useState('Default Language');
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedLanguage2, setSelectedLanguage2] = useState('Korean');
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

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
  
  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title">Translator</h1>
          <div className="columns is-mobile column">
            <div className="column">
              <div className={`dropdown ${isDropdownOpen1 ? 'is-active' : ''}`}>
                <div className="dropdown-trigger">
                  <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown1}>
                    <span>{selectedLanguage1}</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Korean')}>Korean</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('English')}>English</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Chinese')}>Chinese</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('French')}>French</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Japanese')}>Japanese</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect1('Spanish')}>Spanish</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="dropdown-toggle" onClick={toggleLanguagesOrder}>
                  <img src="/images/양방향.png" alt="Toggle Language Order" className="image is-32x32" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className={`dropdown ${isDropdownOpen2 ? 'is-active' : ''}`}>
                <div className="dropdown-trigger">
                  <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown2}>
                    <span>{selectedLanguage2}</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Korean')}>Korean</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('English')}>English</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Chinese')}>Chinese</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('French')}>French</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Japanese')}>Japanese</a>
                    <a href="#" className="dropdown-item" onClick={() => LanguageSelect2('Spanish')}>Spanish</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-full">
              <div className="field">
                <label className="label">Before</label>
                <div className="control">
                  <textarea className="textarea" placeholder="Input Text" value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-full">
              <div className="field">
                <label className="label">After</label>
                <div className="control">
                  <textarea className="textarea" value={outputText} readOnly></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="field has-addons-centered">
            <div className="control">
              <button className="is-rounded button is-medium is-primary" onClick={translate}>
                translate
              </button>
            </div>
            <div className="control">
              <img type="" id="a-image" src="/images/mic.png" alt="Microphone" className="image is-32x32" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Translate;