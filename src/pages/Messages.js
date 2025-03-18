// src/pages/Messages.js

import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Messages.css';
import { useAuth } from '../context/AuthContext';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment'; // Import moment.js for date formatting

const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const chatContainerRef = useRef(null);

  // Fetch all conversations on component mount
  useEffect(() => {
    if (!authLoading && user) {
      api
        .get('/api/core/conversations/')
        .then((response) => {
          setConversations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching conversations:', error);
          setError('Failed to load conversations.');
        });
    }
  }, [authLoading, user]);

  // Fetch messages for the active conversation
  useEffect(() => {
    if (activeConversation) {
      api
        .get(`/api/core/conversations/${activeConversation.id}/`)
        .then((response) => {
          setMessages(response.data.messages);
          scrollToBottom();
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
          setError('Failed to load messages.');
        });
    }
  }, [activeConversation]);

  // Fetch conversation when conversationId changes
  useEffect(() => {
    if (conversationId) {
      const selectedConversation = conversations.find(
        (conv) => conv.id.toString() === conversationId
      );

      if (selectedConversation) {
        setActiveConversation(selectedConversation);
      } else {
        api
          .get(`/api/core/conversations/${conversationId}/`)
          .then((response) => {
            setActiveConversation(response.data);
            setConversations((prevConversations) => [...prevConversations, response.data]);
          })
          .catch((error) => {
            console.error('Error fetching conversation:', error);
            setError('Failed to load conversation.');
          });
      }
    } else {
      setActiveConversation(null);
    }
  }, [conversationId, conversations]);

  // Function to scroll chat to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Handle selecting a conversation from the sidebar
  const handleSelectConversation = (conversation) => {
    navigate(`/messages/${conversation.id}`);
  };

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageContent.trim() || !activeConversation) return;

    api
      .post(`/api/core/conversations/${activeConversation.id}/send_message/`, {
        content: messageContent.trim(),
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setMessageContent('');
        scrollToBottom();
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setError('Failed to send message.');
      });
  };

  // Handle opening the search modal
  const openSearchModal = () => {
    setShowSearchModal(true);
  };

  // Handle closing the search modal
  const closeSearchModal = () => {
    setShowSearchModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Debounced search using useEffect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        api
          .post('/api/core/search/', { query: searchQuery })
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((error) => {
            console.error('Error searching users:', error);
            setError('Failed to search users.');
          });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle starting a new conversation
  const handleStartConversation = (userId) => {
    api
      .post('/api/core/conversations/', { other_user_id: userId })
      .then((response) => {
        const newConversation = response.data;
        const existingConversation = conversations.find(
          (conv) => conv.id === newConversation.id
        );

        if (!existingConversation) {
          setConversations([newConversation, ...conversations]);
        }

        navigate(`/messages/${newConversation.id}`);
        closeSearchModal();
      })
      .catch((error) => {
        console.error('Error starting conversation:', error);
        setError('Failed to start conversation.');
      });
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];
    let lastDate = null;

    messages.forEach((message) => {
      const messageDate = moment(message.timestamp).startOf('day');
      if (!lastDate || !messageDate.isSame(lastDate)) {
        lastDate = messageDate;
        groupedMessages.push({
          type: 'date',
          date: messageDate,
        });
      }
      groupedMessages.push({
        type: 'message',
        data: message,
      });
    });

    return groupedMessages;
  };

  // Function to format date labels
  const formatDateLabel = (date) => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    if (date.isSame(today)) {
      return 'Today';
    } else if (date.isSame(yesterday)) {
      return 'Yesterday';
    } else {
      return date.format('MMM D, YYYY');
    }
  };

  return (
    <div className="container-fluid mt-4 messages-container">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        {/* Conversations List (Left Sidebar) */}
        <div
          className="col-md-4 col-lg-3 bg-dark text-white"
          style={{ borderRight: '1px solid #ccc', height: 'calc(100vh - 80px)', overflowY: 'auto' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3 p-3">
            <h4>Conversations</h4>
            <button className="btn btn-primary" onClick={openSearchModal}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <ul className="list-group">
            {conversations && conversations.length > 0 ? (
              conversations.map((conversation) => {
                const otherUser =
                  conversation.user1.id === user.id ? conversation.user2 : conversation.user1;
                return (
                  <li
                    key={conversation.id}
                    className={`list-group-item d-flex align-items-center ${
                      activeConversation && activeConversation.id === conversation.id
                        ? 'active bg-secondary'
                        : ''
                    }`}
                    style={{
                      backgroundColor:
                        activeConversation && activeConversation.id === conversation.id
                          ? '#495057'
                          : '#212121',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <img
                      src={otherUser.profile_picture_url || '/static/profile_pics/default.jpg'}
                      className="rounded-circle me-3"
                      style={{ width: '40px', height: '40px' }}
                      alt="Profile"
                    />
                    <div>
                      <span className="text-white text-decoration-none">
                        {otherUser.username}
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-center">No conversations found.</p>
            )}
          </ul>
        </div>

        {/* Conversation Content (Right Section) */}
        <div className="col-md-8 col-lg-9 d-flex flex-column" style={{ height: 'calc(100vh - 80px)' }}>
          {activeConversation ? (
            <>
              <div className="p-3 border-bottom bg-dark text-white">
                <h4>
                  Conversation with{' '}
                  {activeConversation.user1.id === user.id
                    ? activeConversation.user2.username
                    : activeConversation.user1.username}
                </h4>
              </div>

              {/* Chat Container */}
              <div className="chat-container flex-grow-1 d-flex flex-column" ref={chatContainerRef}>
                {messages && messages.length > 0 ? (
                  groupMessagesByDate(messages).map((item, index) => {
                    if (item.type === 'date') {
                      return (
                        <div key={`date-${index}`} className="date-divider">
                          <span>{formatDateLabel(item.date)}</span>
                        </div>
                      );
                    } else {
                      const message = item.data;
                      return (
                        <div
                          key={message.id}
                          className={`message-row ${
                            message.sender.id === user.id ? 'sent' : 'received'
                          }`}
                        >
                          <div
                            className={`message ${
                              message.sender.id === user.id ? 'sent' : 'received'
                            }`}
                          >
                            <p className="mb-1">{message.content}</p>
                            <small className="text-muted">
                              {moment(message.timestamp).format('h:mm A')}
                            </small>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <p className="text-center text-muted">No messages yet.</p>
                )}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-top message-input-area">
                <div className="input-group">
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Type your message here..."
                    rows="1"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100 text-white">
              <h5>Select a conversation to start chatting or</h5>
              <button className="btn btn-primary ms-3" onClick={openSearchModal}>
                Start a New Conversation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Search Modal */}
      <Modal show={showSearchModal} onHide={closeSearchModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="list-group">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((userResult) => (
                <div
                  key={userResult.id}
                  className="list-group-item list-group-item-action d-flex align-items-center"
                  style={{ backgroundColor: '#343a40', color: '#e8e8e8' }}
                >
                  <img
                    src={userResult.profile_picture_url || '/static/profile_pics/default.jpg'}
                    className="rounded-circle me-3"
                    style={{ width: '40px', height: '40px' }}
                    alt="Profile"
                  />
                  <span className="me-auto">{userResult.username}</span>
                  <Link
                    to={`/profile/${userResult.username}`}
                    className="btn btn-sm btn-outline-info me-2"
                  >
                    View Profile
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStartConversation(userResult.id)}
                  >
                    Start Conversation
                  </Button>
                </div>
              ))
            ) : searchQuery.length >= 3 ? (
              <div className="list-group-item">No users found.</div>
            ) : (
              <p className="text-muted">Start typing to search users.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSearchModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Messages;
