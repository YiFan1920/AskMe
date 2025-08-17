import React, { useState } from 'react'
import "./App.css"
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import Bubble from "./Bubble";


const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(true);
  const [messages, setMessages] = useState([])
  const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_SECRET_API_KEY});
  
  const hitRequest = async () =>{
    if(message){
      console.log(message)
      const newMessages = [
        ...messages,
        {type: "userMsg", text: message},
      ]
      setMessages(newMessages);
      generateResponse(newMessages)
      setMessage("")
      setisResponseScreen(true)
    }
    else{
      alert("You must write somthing... !")
    }
  };
  async function generateResponse(msg) {
    if(!msg.at(-1).text) return;
    const prompt = `Answer briefly (max 50 words): ${msg.at(-1).text}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const newMessages = [
      ...messages, 
      msg.at(-1),
      {type: "responseMsg", text: response.text}
    ]
    setMessages(newMessages);
    console.log(response.text);
  };
  const newChat = () =>{
    setisResponseScreen(false);
    setMessages([]);
  };

  return (
    <>
    <div className =" w-screen min-h-screen overflow-x-hidden text-black font-inter">
      <div className="absolute inset-0 overflow-hidden -z-10">
      <Bubble color="rgb(254,173,216)" />
      <Bubble color="rgb(164,150,246)" />
      <Bubble color="rgb(197, 132, 237)" />
    </div>
      {
        isResponseScreen?
        <div className="middle h-[80vh]">
          <div className="header w-[100vw] pt-[25px] flex justify-between items-center px-[200px]">
            <h2 className='text-2xl'>AskMe</h2>
            <button id='newChatBtn' onClick={newChat} className='bg-red-500 p-[10px] rounded-[30px] cursor-pointer text-[16px] px-[20px]'>New Chat</button>
          </div>

          <div className="messages">
            {
              messages?.map((msg, index) =>{
                return (
                    <div key={index} className={msg.type}><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                  )
              })
            }
          </div>
        </div>
        :
      <div className="middle w-full h-[80vh] md:h-[70vh] flex flex-col items-center justify-center px-4 py-4">
        <h1 className="text-[60px] md:text-[70px] mb-8 font-borel text-[#333333]">AskMe</h1>
        <div className="w-full overflow-x-auto">
        <div className="flex justify-center gap-4 min-w-max text-white">
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between">
          <p className='text-[18px]'>What is coding?<br/>
            How can we learn it.</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between">
          <p className='text-[18px]'>What will the weather<br/>
          be like tomorrow?</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between">
          <p className='text-[18px]'>How many planets<br />
            are there in our<br />
            solar system?</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between">
          <p className='text-[18px]'>How is the job market <br />
            for CS students <br />
            right now? </p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        </div>
      </div>
      </div>
      }
      <div className={`bottom w-[100vw] flex flex-col justify-between items-center text-[#555555] text-[18px] ${isResponseScreen ? "h-[20vh]" : "h-[30vh] md:h-[30vh]"}`}>
        <div className={`inputBox md:mb-[20px] flex items-center backdrop-blur-[80px] bg-black/10 h-[63px] rounded-[30px] w-[95vw] md:w-[70vw]`} style={{boxShadow: "0px 4px 30px 5px rgba(0,0,0,0.05)"}}>
          <input value={message} onChange={(e)=>{setMessage(e.target.value)}} onKeyDown={(e) => {if (e.key === 'Enter') {hitRequest();}}} type="text" className='p-[10px] pl-[30px] placeholder-[#888888] bg-transparent flex-1 outline-none border-none' placeholder='Write your message here...'/>
          {
            message == "" ? "" : <i className='mr-5 cursor-pointer text-[22px] text-{#555555]' onClick={hitRequest}><IoSend/></i>
          }
        </div>
        <p className='mb-[25px] text-[16px] text-[#888888]'>Your very own personal assistant, powered by Gemini API.</p>
      </div>
    </div>
    </>
  )
}

export default App


