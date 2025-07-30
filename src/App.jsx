import React, { useState } from 'react'
import "./App.css"
import { IoCodeSlash, IoSend } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

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
    <div className =" w-screen min-h-screen overflow-x-hidden text-black">
      {
        isResponseScreen?
        <div className="middle h-[80vh]">
          <div className="header w-[100vw] pt-[25px] flex justify-between items-center px-[300px]">
            <h2 className='text-2xl'>AskMe</h2>
            <button id='newChatBtn' onClick={newChat} className='bg-red-500 p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]'>New Chat</button>
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
      <div className="middle w-[100vw] h-[80vh] flex items-center flex-col justify-center">
        <h1 className='text-3xl'>AskMe</h1>
        <div className="boxes mt-[30px] flex items-center gap-2 text-white">
          <div className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-black/30 relative min-h-[20vh] bg-black/40 p-[20px]">
          <p className='text-[18px]'>What is coding?<br/>
            How can we learn it.</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[18px]'/></i>
          </div>
          <div className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-black/30 relative min-h-[20vh] bg-black/40 p-[20px]">
          <p className='text-[18px]'>What will the weather<br/>
          be like tomorrow?</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[18px]'/></i>
          </div>
          <div className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-black/30 relative min-h-[20vh] bg-black/40 p-[20px]">
          <p className='text-[18px]'>How many planets<br />
            are there in our<br />
            solar system?</p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[18px]'/></i>
          </div>
          <div className="card px-[20px] rounded-lg cursor-pointer transition-all hover:bg-black/30 relative min-h-[20vh] bg-black/40 p-[20px]">
          <p className='text-[18px]'>How is the job market <br />
            for CS students <br />
            right now? </p>
            <i><IoCodeSlash className='absolute right-3 bottom-3 text-[18px]'/></i>
          </div>
        </div>
      </div>
      }
      <div className="bottom w-[100vw] flex flex-col items-center text-[#5F5F5F]">
        <div className="inputBox flex items-center bg-black h-[55px] rounded-[30px] w-[60vw]">
          <input value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" className='p-[10px] pl-[20px] bg-transparent flex-1 outline-none border-none' placeholder='Write your message here...'/>
          {
            message == "" ? "" : <i className='mr-5 cursor-pointer text-[20px] text-white' onKeyDown={(e) => {if (e.key === 'Enter') {hitRequest();}}} onClick={hitRequest}><IoSend/></i>
          }
        </div>
        <p className='my-4'>Your very own personal assistant, powered by Gemini API.</p>
      </div>
    </div>
    </>
  )
}

export default App


