import { useEffect, useState } from "react";
import OpenAI from "openai";
import Service from "../services/services";
import MicRecorder from 'mic-recorder-to-mp3'
import axios from "axios";


//tts 기능 현재 완성본, openai를 사용해야 함 nodejs 서버와 연계해야 함. (바이너리 파일을 blob으로 바꾸고 그 blob을 주소로 바꾸어 주소를 오디오로 실행하는 것이 정답)
function Tts() {

    useEffect(() => {
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              setBlocked(false)
              //this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');
              setBlocked(true)
              //this.setState({ isBlocked: true })
            },
        );
    },[])

    const [lang, setLang] = useState('ko')
    const [sentence, setSentence] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [blobURL, setBlobURL] = useState('')
    const [isBlocked, setBlocked] = useState(false)
    const [file, setFile] = useState()

    /*var state = {
        isRecording: false,
        blobURL: "",
        isBlocked: false
    }*/

    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }))

    const start = async () => {
        if (isBlocked) {
          console.log('Permission Denied');
        } else {
          await Mp3Recorder
            .start()
            .then(() => {
                setIsRecording(true)
              //this.setState({ isRecording: true });
            }).catch((e) => console.error(e));
        }
    };

    const stop = async () => {
        await Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const blobUrl = URL.createObjectURL(blob)
            console.log(blobUrl)
            setBlobURL(blobUrl)
            setIsRecording(false)
            const file = new File(buffer, 'audio.mp3', {
                type: blob.type,
                lastModified: Date.now()
            });
            setFile(file)
            //this.setState({ blobURL, isRecording: false });
          }).catch((e) => console.log(e));
    };

    const speechtotext = async () => {
        const formData = new FormData()
        formData.append("model","whisper-1")
        formData.append("file",file)

        await axios.post('https://api.openai.com/v1/audio/transcriptions',formData,{
            headers: {
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${process.env.CHAT}`
            }
        })
        .then((res) => {
            console.log(res)
        })
        
        /*const openai = new OpenAI({
            apiKey: '',//process.env.CHATGPTKEY,
            dangerouslyAllowBrowser: true
        })

        const transcription = await openai.audio.transcriptions.create({
            file: blobURL,
            model: "whisper-1",
            language: "ko"
        });
        
        console.log(transcription)*/
    }

    
    //
    

    const Handle = async() => {
        const openai = new OpenAI({
            apiKey: '',//process.env.CHATGPTKEY,
            dangerouslyAllowBrowser: true
        })
    
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: "hello"
        })

        const file = await mp3.arrayBuffer()
        const reader = new FileReader(file)
    
        //console.log(await mp3.arrayBuffer())

    }

    const audioCall = async () => {
        const aaa = await Service.audioMp3({speak: sentence})
        console.log(aaa)
        const tmp = new Audio(aaa)
        tmp.play()
        
        setTimeout(() => {
            URL.revokeObjectURL(aaa)
            console.log('삭제됨')
        },2000)
    }

    const onChangeSentence = (e) => {
        setSentence(e.target.value)
    }
    

    return(
        <div>
            <select>
                    <option value={'ko'}>한국어</option>
                    <option value={"ja"}>일본어</option>
                    <option value={"zh-CN"}>중국어</option>
                    <option value={"ru"}>러시아어</option>
            </select>
            <button onClick={Handle}>재생</button>
            <button onClick={audioCall}>호출</button>
            <input onChange={onChangeSentence}></input>

            {isRecording ? <button onClick={stop} disabled={!isRecording}>Stop</button> : <button onClick={start} disabled={isRecording}>Record</button>}
            
            <audio src={blobURL} controls="controls" />
            <button onClick={speechtotext}>글씨변형</button>
            
            
        </div>
    )
}

export default Tts;