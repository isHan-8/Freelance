// src/pages/Conversation.js

import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import Layout from '../components/PrivateLayout';
import styles from './Conversation.module.css'; // Using CSS modules
import { useParams } from 'react-router-dom';

const Conversation = () => {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Fetch conversation and messages from the backend
    api.get(`/api/core/conversations/${conversationId}/`)
      .then(response => {
        setConversation(response.data.conversation);
        setMessages(response.data.messages);
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error fetching conversation:', error);
      });
  }, [conversationId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageContent.trim()) return;
    // Send the message to the backend
    api.post(`/api/core/conversations/${conversationId}/messages/`, {
      content: messageContent,
    })
      .then(response => {
        // Append the new message to the messages list
        setMessages([...messages, response.data]);
        setMessageContent('');
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  let lastDate = null;

  return (
    <Layout>
      <div className="container mt-4">
        <h2>
          Conversation with{' '}
          {conversation && conversation.other_user_username}
        </h2>

        <div className={`${styles.chatContainer} mt-4`} ref={chatContainerRef}>
          {messages.map((message, index) => {
            const messageDate = new Date(message.timestamp).toDateString();
            const showDateSeparator = lastDate !== messageDate;
            lastDate = messageDate;

            return (
              <React.Fragment key={message.id}>
                {showDateSeparator && (
                  <div className={styles.dateSeparator}>
                    <span>{formatDate(message.timestamp)}</span>
                  </div>
                )}
                <div className={`${styles.messageRow} ${message.is_me ? styles.me : styles.other}`}>
                  <div className={styles.messageContent}>
                    <p>{message.content}</p>
                    <small className="text-muted">{formatTime(message.timestamp)}</small>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Message Input Fixed at Bottom */}
      <form onSubmit={handleSubmit} className={styles.messageInput}>
        <div className="input-group">
          <textarea
            name="message"
            className="form-control"
            placeholder="Type your message here..."
            rows="1"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          ></textarea>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Conversation;
