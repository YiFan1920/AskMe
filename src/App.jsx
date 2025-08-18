import React, { useState, useRef, useEffect } from 'react';
import "./App.css"
import { IoCodeSlash, IoSend} from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import Bubble from "./Bubble";
import { motion, AnimatePresence } from "framer-motion";


const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setisResponseScreen] = useState(false);
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
              <AnimatePresence>
        {!isResponseScreen && (
          <motion.div
            key="circles"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ type: "spring", stiffness: 40, damping: 10 }}
            className="w-full h-full flex justify-center items-center"
          >
      <Bubble color="rgb(254,173,216)" />
      <Bubble color="rgb(164,150,246)" />
      <Bubble color="rgb(197, 132, 237)" />
                </motion.div>
        )}
      </AnimatePresence>
    </div>
      {
        isResponseScreen?
        <div className="middle flex flex-col h-[85vh] w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }} // smooth fade-in
        >
          <div className="header md:[5vw] px-[15vw] h-[80px] w-[100vw] flex justify-between items-center mx-auto">
            <h2 className='text-[30px] font-borel pt-[25px] text-transparent bg-clip-text bg-gradient-to-r from-[#3823B4] to-[#A61D66]'>AskMe</h2>
            <button id='newChatBtn' onClick={newChat} className='cursor-pointer text-[16px] text-[#333333]'><i><FiEdit className='text-[25px]'/></i></button>
          </div>
          </motion.div>

          <div className="messages flex-1 overflow-y-auto w-[90vw] mb-[-30px] md:w-[70vw] mx-auto">
            {
              messages?.map((msg, index) =>{
                return (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}     
                      animate={{ y: 0, opacity: 1 }}     
                      exit={{ y: -20, opacity: 0 }}         
                      transition={{ type: "spring", stiffness: 120, damping: 12 }} 
                      className={msg.type}
                    ><ReactMarkdown>{msg.text}</ReactMarkdown></motion.div>
                  )
              })
            }
          <div ref={messagesEndRef} />
          </div>
        </div>
        :
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }} // smooth fade-in
      >
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
      </motion.div>
      }
     <motion.div
      animate={{ height: isResponseScreen ? "15vh" : "30vh" }}
      transition={{ duration: 0.7, ease: "circOut" }}
      className="fixed bottom-0 left-0 w-full flex flex-col justify-between items-center text-[#333333] text-[16px]"
    >
        <div className={`inputBox flex items-center backdrop-blur-[80px] bg-[#A7A7A7]/25 h-[60px] rounded-[30px] w-[90vw] md:w-[70vw]`} style={{boxShadow: "0px 4px 30px 5px rgba(0,0,0,0.05)"}}>
            <input value={message} onChange={(e)=>{setMessage(e.target.value)}} onKeyDown={(e) => {if (e.key === 'Enter') {hitRequest();}}} type="text" className='p-[10px] pl-[30px] placeholder-[#888888] bg-transparent flex-1 outline-none border-none' placeholder='Write your message here...'/>
          {
            message == "" ? "" : <i className='mr-5 cursor-pointer text-[22px] text-{#333333]' onClick={hitRequest}><IoSend/></i>
          }
        </div>
        <p className='text-[14px] text-[#888888]'>Your very own personal assistant, powered by Gemini API.</p>
        <div className="container h-[1px] w-[1px]"></div>
        </motion.div>
      </div>
    </>
  )
}

export default App


