import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import API from "../services/api"; // ✅ IMPORTANT

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  // 🎤 VOICE INPUT
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN"; // Hindi/English mix better
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
    };
  };

  // 🔊 BOT SPEAK
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
  };

  // 🔥 SEND MESSAGE
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    const msg = input;
    setInput("");

    try {
      // ✅ BACKEND AI CALL
      const res = await API.post('/recommendations', {
        query: msg
      });

      const reply = res.data.reply || "No suggestion found 🤔";

      setMessages(prev => [...prev, { sender: "bot", text: reply }]);

      // 🔊 SPEAK RESPONSE
      speak(reply);

    } catch (err) {
      console.log("AI error");

      const fallback = "Server busy 😅 Try again later";
      setMessages(prev => [...prev, { sender: "bot", text: fallback }]);
      speak(fallback);
    }
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        
        {/* 🎤 MIC */}
        <button
          onClick={startListening}
          className="bg-white border p-3 rounded-full shadow"
        >
          🎤
        </button>

        {/* CHAT TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-primary text-white p-4 rounded-full shadow-lg"
        >
          {open ? <X /> : <MessageCircle />}
        </button>
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white shadow-xl rounded-xl z-50 flex flex-col">

          {/* HEADER */}
          <div className="bg-primary text-white p-3 rounded-t-xl font-semibold">
            AI Assistant 🤖
          </div>

          {/* MESSAGES */}
          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-primary text-white ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 outline-none"
              placeholder="Ask anything... (Hindi/English)"
            />
            <button
              onClick={handleSend}
              className="px-4 bg-primary text-white"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}