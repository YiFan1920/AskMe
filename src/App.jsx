import React, { useState, useRef, useEffect } from 'react';
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
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    const hitRequest = async (text) => {
      const msg = text || message;
      if (!msg.trim()) return alert("You must write something!");

      setisResponseScreen(true); // switch to response screen

      const userMsg = { type: "userMsg", text: msg };
      setMessages(prev => [...prev, userMsg]);
      setMessage(""); // clear input

      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Answer briefly (max 50 words): ${msg}`,
        });

        setMessages(prev => [...prev, { type: "responseMsg", text: response.text }]);
      } catch (err) {
        console.error("AI request failed:", err);
      }
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
        <div className="middle flex flex-col h-[85vh] w-full">
          <div className="header px-[35px] h-[80px] w-[100vw] flex justify-between items-center mx-auto">
            <h2 className='text-[30px] font-borel pt-[25px] text-[#333333]'>AskMe</h2>
            <button id='newChatBtn' onClick={newChat} className='cursor-pointer text-[16px] text-[#333333]'>New chat</button>
          </div>

          <div className="messages flex-1 overflow-y-auto w-[90vw] mb-[-30px] md:w-[70vw] mx-auto">
            {
              messages?.map((msg, index) =>{
                return (
                    <div key={index} className={msg.type}><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                  )
              })
            }
          <div ref={messagesEndRef} />
          </div>
        </div>
        :
      <div className="middle w-full h-[80vh] md:h-[70vh] flex flex-col items-center justify-center px-4 py-4">
        <h1 className="text-[60px] md:text-[70px] mb-8 font-borel text-[#333333]">AskMe</h1>
        <div className="w-full overflow-x-auto">
        <div className="flex justify-center gap-4 min-w-max text-white">
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between" onClick={() => hitRequest("What is coding? How can we learn it.")}>
          <p className='text-[18px]'>What is coding?<br/>
            How can we learn it.</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between" onClick={() => hitRequest("What will the weather be like tomorrow?")}>
          <p className='text-[18px]'>What will the weather<br/>
          be like tomorrow?</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between" onClick={() => hitRequest("How many planets are there in our solar system?")}>
          <p className='text-[18px]'>How many planets<br />
            are there in our<br />
            solar system?</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        <div className="card rounded-lg cursor-pointer transition-all hover:bg-black/35 relative bg-black/40 backdrop-blur-[100px] p-4 md:pt-[20px] md:pb-[30px] flex-shrink-0 md:w-[230px] flex flex-col justify-between" onClick={() => hitRequest("How is the job market for CS students right now?")}>
          <p className='text-[18px]'>How is the job market <br />
            for CS students <br />
            right now? </p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[20px]'/></i>
          </div>
        </div>
      </div>
      </div>
      }
      <div className={`bottom w-[100vw] flex flex-col justify-between items-center text-[#555555] text-[16px] ${isResponseScreen ? "h-[15vh]" : "h-[30vh] md:h-[30vh]"}`}>
        <div className={`inputBox flex items-center backdrop-blur-[80px] bg-black/10 h-[60px] rounded-[30px] w-[90vw] md:w-[70vw]`} style={{boxShadow: "0px 4px 30px 5px rgba(0,0,0,0.05)"}}>
          <input value={message} onChange={(e)=>{setMessage(e.target.value)}} onKeyDown={(e) => {if (e.key === 'Enter') {hitRequest();}}} type="text" className='p-[10px] pl-[30px] placeholder-[#888888] bg-transparent flex-1 outline-none border-none' placeholder='Write your message here...'/>
          {
            message == "" ? "" : <i className='mr-5 cursor-pointer text-[22px] text-{#555555]' onClick={hitRequest}><IoSend/></i>
          }
        </div>
        <p className='mb-[20px] text-[14px] text-[#888888]'>Your very own personal assistant, powered by Gemini API.</p>
      </div>
    </div>
    </>
  )
}

export default App


