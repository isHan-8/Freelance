// src/pages/DatingChat.js

import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/PrivateLayout';
import api from '../utils/api';
import { useParams } from 'react-router-dom';

const DatingChat = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Fetch match and messages
    api.get(`/api/dating/matches/${matchId}/`)
      .then(response => {
        setMatch(response.data.match);
        setMessages(response.data.messages);
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error fetching match data:', error);
      });
  }, [matchId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageContent.trim()) return;
    api.post(`/api/dating/matches/${matchId}/messages/`, {
      content: messageContent,
    })
      .then(response => {
        setMessages([...messages, response.data]);
        setMessageContent('');
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2>Chat with {match.other_user_username}</h2>
        <div className="chat-container" ref={chatContainerRef}>
          {messages.map(message => (
            <div key={message.id} className={`message-row ${message.is_me ? 'me' : 'other'}`}>
              <div className="message-content">
                <p>{message.content}</p>
                <small>{new Date(message.timestamp).toLocaleString()}</small>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <textarea
              name="message"
              className="form-control"
              placeholder="Type a message..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DatingChat;
