import { useEffect, useRef, useState } from 'react'
import './App.css'
import Markdown from 'react-markdown'
import MainPage from './sites/Main'
import FirstPage from './sites/FirstPost'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import spinner from './assets/Loading-PNG-Images.png'
function App() {
  const navigate = useNavigate()
  const [Iron, setIron] = useState("1-iron")
  const [Status, setStatus] = useState(0)
  const [ChatMessage, setChatMessage] = useState("")
  const [Image, setImage] = useState()
  const [Chats, setChats] = useState([])
  const [UserID, setUserID] = useState()
  const chatref = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(Status == 1 || chatref){
      chatref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [Chats]);

  useEffect(()=> {
    if(Status == 0){
      navigate('/')
    } else{
      navigate('/home')
    }
  },[Status])
  useEffect(()=> {
    if(!UserID){
      setUserID(Math.floor(Math.random() * 900000) + 100000)
    }
    if(Status == 0){
      navigate('/')
    } else{
      navigate('/home')
    }
  },[])
  return (
    <>
    <div className='flex justify-center items-center md:p-4 h-[100vh] bg-[#B7D8B9]'>
    <div className='w-full h-[100%] bg-[#41633e] flex items-center justify-center overflow-hidden font-[cause] max-w-[650px] md:rounded-3xl md:overflow-hidden md:shadow-2xl'>
       <div className={`${loading ? "flex" : "hidden"} absolute w-full h-full bg-[#41633e] z-50 text-white items-center justify-center flex-col gap-3`}>
        <img src={spinner} id="spinner" className='w-[100px] aspect-[1/1]'/>
        <p className='text-white' id='loadingtekst'></p>
      </div>
       <Routes>
        <Route path="/" element={<FirstPage Iron={Iron} Status={Status} setStatus={setStatus} Image={Image} setChats={setChats} Chats={Chats} UserID={UserID} setImage={setImage} setIron={setIron} setLoading={setLoading}/>} />
        <Route path="/home" element={<MainPage Status={Status} setChats={setChats} Chats={Chats} ChatMessage={ChatMessage} UserID={UserID} setChatMessage={setChatMessage} Iron={Iron} Image={Image} chatref={chatref}/>} />
       </Routes>
       <span id='Made-by' className='fixed bottom-[10px] left-0 right-0 w-full text-center text-white md:bottom-[25px]'>Made by <a href="http://ves3.no" className='hover:text-green-700'>Ves3</a></span>
      </div>
      </div>
    </>
  )
}
export async function FirstPost(Iron, Status, setStatus, Image, setChats, Chats, UserID, setLoading){
  const data = new FormData()
  console.log("starter")
  data.append("Iron", Iron)
  data.append("Status", String(Status))
  data.append("Image", Image)
  data.append("UserID", UserID)
  console.log("skal sende")
  setLoading(true)
  const AiMessage = await fetch(
    "https://golfapi.ves3.no/airesponse", 
    {
      method: 'POST',
      body: data
  }
  ) 
  if(AiMessage.ok){
    const Message = await AiMessage.json()
  setChats([...Chats,  Message])
  setStatus(1)
  console.log(Message)
  } else{
    const errorText = await AiMessage.text()
    console.log("Backend error:", errorText)
    return
  }
  setLoading(false)
}
export async function Post(Status, setChats, Chats, ChatMessage, UserID, setChatMessage){
    var chat = {Writer: "User", messageText: ChatMessage}
    console.log(chat)
    console.log(Chats)
    setChats([...Chats, chat])
    const data = new FormData()
    data.append("Chat", ChatMessage)
    data.append("Status", String(Status))
    data.append("UserID", UserID)
    setChatMessage("")
    const AiMessage = await fetch(
      "https://golfapi.ves3.no/airesponse", 
      {
        method: 'POST',
        body: data
    }
    ) 
    const Message = await AiMessage.json()
    setChats(prev => [...prev, Message])
}

export default App
