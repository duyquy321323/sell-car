import { marked } from "marked";
import React, { useState } from "react";
import run from "../ChatGemini";
import "./Chatbox.css";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botResponse = await run(input);
    setMessages((prev) => [...prev, { sender: "bot", text: marked.parse(botResponse) }]);
  };

  return (
    <div className="chat-container">
      {/* Nút mở chat */}
      <button className="chat-icon" onClick={() => setIsOpen(true)}>
        💬
      </button>

      {/* Khung chat */}
      {isOpen && (
        <div className="chatbox">
          {/* Header */}
          <div className="chat-header">
            <span>Trợ lý xe hơi</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Danh sách tin nhắn */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text }} />
         
            ))}
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về xe..."
            />
            <button onClick={handleSubmit}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
