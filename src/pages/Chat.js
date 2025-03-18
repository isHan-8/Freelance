import React, { useState, useEffect, useRef } from "react";
import "./chat.css"; // Assuming you have the updated CSS
import { FaPaperPlane, FaVideo, FaImage } from "react-icons/fa"; // Importing the icons
import LeftNavBar from "./LeftNavBar";

const Chat = () => {
  const [showSendButton, setShowSendButton] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    img: "",
    uid: "",
    secretKey: "",
  });
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const divRef = useRef();

  // Mock users data
  const mockUsers = [
    {
      uid: "1",
      name: "John Doe",
      profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
      secretKey: "secret1",
    },
    {
      uid: "2",
      name: "Jane Smith",
      profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
      secretKey: "secret2",
    },
    {
      uid: "3",
      name: "Alice Brown",
      profileImg: "https://randomuser.me/api/portraits/women/3.jpg",
      secretKey: "secret3",
    },
  ];

  // Mock messages data
  const mockMessages = [
    {
      sender: "1",
      message: "Hey, how are you?",
      secretKey: "secret1",
      time: "10:30 AM",
    },
    { sender: "2", message: "Hello!", secretKey: "secret2", time: "10:31 AM" },
    {
      sender: "3",
      message: "Hi there!",
      secretKey: "secret3",
      time: "10:32 AM",
    },
  ];

  // Set up initial users and mock messages
  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  // Load messages for the selected user
  useEffect(() => {
    if (selectedUser.secretKey) {
      const filteredMessages = mockMessages.filter(
        (msg) => msg.secretKey === selectedUser.secretKey
      );
      setMessages(filteredMessages);
    }
  }, [selectedUser]);

  // Handle message input change
  const messageHandler = (event) => {
    setMessage(event.target.value);
    setShowSendButton(event.target.value.length > 0);
  };

  // Handle Enter key press for sending the message
  const onKeyHandler = (e) => {
    if (message.length > 0 && e.charCode === 13) {
      sendMessage();
    }
  };

  // Handle sending a new message
  const sendMessage = () => {
    const newMessage = {
      sender: "currentUser", // In a real app, this would be the logged-in user's ID
      message: message,
      secretKey: selectedUser.secretKey,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
    setShowSendButton(false);
  };

  // Load selected user and their messages
  const loadMessagesHandler = (user) => {
    setSelectedUser(user);
    setMessages(mockMessages.filter((msg) => msg.secretKey === user.secretKey));
  };

  return (
    <>

    {/* <div className="ishan">
    <LeftNavBar/> */}
    <div className="container">
      {/* Left Sidebar */}
      <div className="left">
        {users.length === 0 && <h5 className="nodata">No conversations</h5>}
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.uid} onClick={() => loadMessagesHandler(user)}>
                <span className="imgContainer">
                  <img alt="profile" src={user.profileImg} />
                </span>
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Side (Chat Area) */}
      {selectedUser.secretKey && (
        <div className="right">
          <div className="header">
            <span className="imgContainer">
              <img alt="profile" src={selectedUser.img} />
            </span>
            <div className="header-info">{selectedUser.name}</div>
          </div>

          <div ref={divRef} className="okok">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "currentUser" ? "user" : "sender"}
              >
                <p>{msg.message}</p>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>

          {/* Send Message */}
          <div className="sendMessage">
            <div className="input-container">
              <input
                ref={messageRef}
                value={message}
                onChange={messageHandler}
                onKeyPress={onKeyHandler}
                placeholder="Enter Message"
                type="text"
              />
              <div className="input-icons">
                <button className="icon-btn">
                  <FaPaperPlane size={20} />
                </button>{" "}
                {/* Send icon */}
                <button className="icon-btn">
                  <FaVideo size={20} />
                </button>{" "}
                {/* Video icon */}
                <button className="icon-btn">
                  <FaImage size={20} />
                </button>{" "}
                {/* Image icon */}
              </div>
            </div>
            {showSendButton && (
              <button onClick={sendMessage} className="btn">
                SEND
              </button>
            )}
          </div>
        </div>
      )}

      {/* No user selected message */}
      {!selectedUser.secretKey && (
        <h5 className="nodata">
          {users.length === 0 ? "No Conversations" : "Select a User"}
        </h5>
      )}
    </div>
    {/* </div> */}
    </>
  );
};

export default Chat;
