import React, { useState } from "react";
import { MessageCircle, X, Mic } from "lucide-react";

export default function Chatbot() {

  const [open,setOpen] = useState(false);

  const [messages,setMessages] = useState([
    { sender:"bot", text:"Hi 👋 I am BizMart AI Assistant. How can I help you?" }
  ]);

  const [input,setInput] = useState("");

  // 🎤 Voice Input
  const startListening = () => {

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult = (event) => {

      const text = event.results[0][0].transcript;

      setInput(text);

    };

  };


  // 🔊 Speak response
  const speak = (text) => {

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";

    window.speechSynthesis.speak(speech);

  };


  // 🔥 Send Message
  const handleSend = async () => {

    if(!input.trim()) return;

    const userMsg = { sender:"user", text:input };

    setMessages(prev => [...prev,userMsg]);

    const msg = input;

    setInput("");

    try{

      const res = await fetch("http://localhost:5000/api/ai/chat",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          message:msg
        })

      });

      const data = await res.json();

      const reply = data.reply;

      setMessages(prev => [...prev,{sender:"bot",text:reply}]);

      speak(reply);

    }

    catch{

      const fallback = "Server busy 😅 Try again later";

      setMessages(prev => [...prev,{sender:"bot",text:fallback}]);

      speak(fallback);

    }

  };


  return(

    <>

    {/* FLOAT BUTTON */}

    <button
    onClick={()=>setOpen(!open)}
    className="fixed bottom-6 right-6 bg-[#c97979] text-white p-4 rounded-full shadow-lg z-50 hover:bg-[#b86b6b]"
    >

    {open ? <X size={22}/> : <MessageCircle size={22}/>}

    </button>


    {/* CHAT WINDOW */}

    {open &&(

      <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-xl z-50 flex flex-col">

      {/* HEADER */}

      <div className="bg-[#c97979] text-white p-3 rounded-t-xl font-semibold text-center">
      🤖 BizMart AI Assistant
      </div>


      {/* MESSAGES */}

      <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">

      {messages.map((msg,i)=>(
        <div
        key={i}
        className={`p-2 rounded-lg max-w-[75%] ${
        msg.sender==="user"
        ? "bg-[#c97979] text-white ml-auto"
        : "bg-gray-100"
        }`}
        >
        {msg.text}
        </div>
      ))}

      </div>


      {/* INPUT AREA */}

      <div className="flex items-center border-t px-2 py-1">

      <input
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      className="flex-1 p-2 outline-none text-sm"
      placeholder="Ask anything..."
      />


      {/* MIC BUTTON */}

      <button
      onClick={startListening}
      className="p-2 text-gray-500 hover:text-[#c97979]"
      >
      <Mic size={18}/>
      </button>


      {/* SEND BUTTON */}

      <button
      onClick={handleSend}
      className="px-3 py-1 bg-[#c97979] text-white rounded-md ml-1"
      >
      Send
      </button>

      </div>

      </div>

    )}

    </>

  );

}