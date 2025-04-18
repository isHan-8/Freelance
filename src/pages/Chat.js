import React, { useState } from "react";
import "./chat.css";
import LeftNavBar from "./LeftNavBar";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa"; // Emoji button
import { FaMicrophone } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const dummyChats = [
  {
    id: 1,
    name: "Groups",
    username: "buddy_father",
    avatar:
      "https://plus.unsplash.com/premium_photo-1669839774885-b1958e625b5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8anBnfGVufDB8fDB8fHww",
    lastMessage: "sent an attachment.",
    time: "1h",
    messages: ["Hey bro", "Whats up?"],
    unread: true,
  },
  {
    id: 2,
    name: "__ÀR__",
    username: "akshat_rodwal",
    avatar:
      "https://plus.unsplash.com/premium_photo-1669839774885-b1958e625b5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8anBnfGVufDB8fDB8fHww",
    lastMessage: "You sent an attachment.",
    time: "1h",
    messages: ["Sure, Ill send it"],
    unread: false,
  },
  {
    id: 3,
    name: "Rithik Agarwal",
    username: "rithik_official",
    avatar:
      "https://plus.unsplash.com/premium_photo-1669839774885-b1958e625b5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8anBnfGVufDB8fDB8fHww",
    lastMessage: "sent an attachment.",
    time: "1w",
    messages: ["ishan"],
    unread: true,
  },
  {
    id: 4,
    name: "ishan",
    username: "ishan_official",
    avatar:
      "https://plus.unsplash.com/premium_photo-1669839774885-b1958e625b5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8anBnfGVufDB8fDB8fHww",
    lastMessage: "sent an attachment.",
    time: "1w",
    messages: ["i am doing code"],
    unread: true,
  },
];

function ChatApp() {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setShowPicker(false);
  };
  return (
    <div className="messenger-container">
      <LeftNavBar />
      {/* Left sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>ish18an</h2>
          <MdEdit className="edit-icon" />
        </div>

        <div className="messages-title">
          <h4>Messages</h4>
          <p className="requests">Requests</p>
        </div>

        <div className="chat-list">
          {dummyChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                selectedChat.id === chat.id ? "" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <img className="chat-avatar" src={chat.avatar} alt={chat.name} />
              <div className="chat-info">
                <div className="chat-name">{chat.name}</div>
                <div className="chat-last">
                  {chat.lastMessage} · {chat.time}
                </div>
              </div>
              {chat.unread && <span className="unread-dot" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right content */}
      <div className="chat-content">
        <div className="chat-header">
          <div className="selected-avatar">
            <img src={selectedChat.avatar} alt={selectedChat.name} />
          </div>
          <div>
            <div className="selected-name">{selectedChat.name}</div>
            <div className="selected-username">{selectedChat.username}</div>
          </div>
        </div>

        <div className="chat-messages">
          <div className="timestamp">8:27 PM</div>
          {selectedChat.messages.map((msg, idx) => (
            <div key={idx} className="message-bubble">
              {msg}
            </div>
          ))}
          <img
            className="media-thumb"
            src="https://plus.unsplash.com/premium_photo-1669839774560-f4524492b1d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGpwZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="media"
          />
        </div>

        <div className="message-input">
          <div style={{ position: "relative", display: "inline-block" }}>
            <FaSmile
              size={24}
              style={{ cursor: "pointer" }}
              onClick={() => setShowPicker((prev) => !prev)}
            />

            {showPicker && (
              <div style={{ position: "absolute", top: "-500px", zIndex: 10 }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            {selectedEmoji && (
              <span style={{ marginLeft: "10px", fontSize: "24px" }}>
                {selectedEmoji}
              </span>
            )}
          </div>
          <input type="text" placeholder="Message..." />
          <FaMicrophone className="input-icons" />
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
