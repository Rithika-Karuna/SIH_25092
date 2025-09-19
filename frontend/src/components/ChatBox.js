import React, { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BsMic } from "react-icons/bs";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (customMessage) => {
    const userMessage = customMessage || input;
    if (!userMessage) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setTyping(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        { message: userMessage },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = response.data.response;
      setMessages([...newMessages, { sender: "bot", text: botMessage }]);
      speak(botMessage);
    } catch (err) {
      console.error(err);
      const errorMsg = "⚠️ Error connecting to server.";
      setMessages([...newMessages, { sender: "bot", text: errorMsg }]);
      speak(errorMsg);
    }

    setTyping(false);
    setInput("");
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.start();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e1e2f, #2d2d44)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#2b2b3c",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#3a3a55",
            padding: "15px",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            borderBottom: "1px solid #444",
          }}
        >
          College Friend Chatbot 🤗
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: "15px",
            overflowY: "auto",
            background: "#222233",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                margin: "10px 0",
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: "15px",
                  maxWidth: "75%",
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(135deg, #6a5acd, #836fff)"
                      : "linear-gradient(135deg, #444, #666)",
                  color: "#fff",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div style={{ textAlign: "left", margin: "10px 0" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: "15px",
                  background: "linear-gradient(135deg, #444, #666)",
                  color: "#fff",
                  fontStyle: "italic",
                  animation: "blink 1.5s infinite",
                }}
              >
                Bot is typing<span className="dots">...</span>
              </span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div
          style={{
            display: "flex",
            padding: "12px",
            background: "#2b2b3c",
            borderTop: "1px solid #444",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "none",
              outline: "none",
              marginRight: "10px",
              background: "#3a3a55",
              color: "#fff",
            }}
          />
          <button
            onClick={startListening}
            style={{
              border: "none",
              background: listening ? "#ff5555" : "#3a3a55",
              color: "#fff",
              padding: "10px",
              borderRadius: "50%",
              marginRight: "8px",
              cursor: "pointer",
            }}
          >
            <BsMic size={18} />
          </button>
          <button
            onClick={() => sendMessage()}
            style={{
              border: "none",
              background: "#6a5acd",
              color: "#fff",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>

      {/* Inline animation */}
      <style>
        {`
          @keyframes blink {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
        `}
      </style>
    </div>
  );
};

export default ChatBox;
