import { height } from '@mui/system'; // Remove if not used
import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, InputGroup, Button } from 'react-bootstrap';
import { IoIosChatboxes } from 'react-icons/io';
import { io } from 'socket.io-client';
import axios from 'axios';

const ChatBox = ({
    showChat,
    handleCloseChat,
    chatType,
    selectedChatBooking,
    user,
}) => {
    const env = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Use env variable
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (showChat && selectedChatBooking) {
            const token = localStorage.getItem('camp_booking');
            console.log('Token from localStorage:', token ? 'Present' : 'Missing'); // Debug log

            if (!token) {
                console.error('No token found! Redirect to login?');
                handleCloseChat(); // Close chat if no token
                return;
            }

            // Create socket connection when chat opens
            const newSocket = io(env, {
                withCredentials: true,
                auth: { token }, // Send token in auth object
            });

            newSocket.on('connect', () => {
                console.log('Connected to Socket.IO server');
                setIsConnected(true);
                // Join the booking room
                newSocket.emit('joinBooking', selectedChatBooking._id);
            });

            newSocket.on('receiveMessage', (message) => {
                setChatMessages((prev) => [...prev, message]);
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from Socket.IO server');
                setIsConnected(false);
            });

            newSocket.on('auth_error', (error) => { // Listen for auth errors from backend
                console.error('Socket Auth Error:', error);
                setIsConnected(false);
                handleCloseChat(); // Close if auth fails
            });

            // Fetch existing messages
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(
                        `${env}/api/messages/booking/${selectedChatBooking._id}`,
                        {
                            headers: { 
                                Authorization: `Bearer ${token}`, // Ensure Bearer prefix
                            },
                            withCredentials: true,
                        }
                    );
                    console.log('Messages fetched:', response.data); // Debug
                    setChatMessages(response.data);
                } catch (err) {
                    console.error('Error fetching messages:', err.response?.data || err.message);
                    if (err.response?.status === 401) {
                        console.error('Token invalid/expired. Redirect to login?');
                        // Optional: localStorage.removeItem('token'); handleCloseChat();
                    }
                }
            };

            fetchMessages();
            setSocket(newSocket);

            // Cleanup on unmount or close
            return () => {
                if (newSocket) {
                    newSocket.disconnect();
                }
            };
        }
    }, [showChat, selectedChatBooking, env, handleCloseChat]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedChatBooking && socket && isConnected) {
            const messageData = {
                bookingId: selectedChatBooking._id,
                text: newMessage,
                sender: 'user',
                userId: user?.id || user?._id, // Handle both id and _id
            };
            socket.emit('sendMessage', messageData);
            setNewMessage('');
        }
    };

    if (!showChat) return null;

    return (
        <Offcanvas
            show={showChat}
            onHide={handleCloseChat}
            placement="start"
            style={{
                width: '400px',
                height: '550px',
                position: 'fixed',
                top: 'auto',
                bottom: 0,
                right: 0,
                marginBottom: 0,
            }}
        >
            <Offcanvas.Header closeButton className="bg-success text-white">
                <Offcanvas.Title className="fw-bold">
                    <IoIosChatboxes className="me-2" size={20} />
                    Chat Support -{' '}
                    {selectedChatBooking
                        ? chatType === 'ground'
                            ? selectedChatBooking.groundName
                            : selectedChatBooking.eventName
                        : 'Booking'}
                    {isConnected ? <span className="ms-2 text-warning">● Connected</span> : <span className="ms-2 text-danger">● Disconnected</span>}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
                <div className="d-flex flex-column h-100">
                    <div
                        className="flex-grow-1 p-3 overflow-auto custom-scroll"
                        style={{ maxHeight: '400px' }}
                    >
                        {chatMessages.length === 0 ? (
                            <div className="text-center text-muted py-3">
                                No messages yet. Start the conversation!
                            </div>
                        ) : (
                            chatMessages.map((msg) => (
                                <div
                                    key={msg.id || msg._id}
                                    className={`mb-2 ${msg.sender === 'user' ? 'text-end' : ''}`}
                                >
                                    <div
                                        className={`d-inline-block p-2 rounded ${
                                            msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'
                                        }`}
                                        style={{ maxWidth: '80%' }}
                                    >
                                        {msg.text}
                                        {msg.userId?.name && msg.sender !== 'user' && <small className="d-block text-muted"> - {msg.userId.name}</small>}
                                    </div>
                                    <small
                                        className={`d-block ${msg.sender === 'user' ? 'text-white-50' : 'text-muted'}`}
                                    >
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </small>
                                </div>
                            ))
                        )}
                    </div>
                    <Form onSubmit={handleSendMessage} className="border-top p-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder={isConnected ? "Type your message..." : "Connecting..."}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="form-control"
                                style={{ boxShadow: 'none' }}
                                disabled={!isConnected}
                            />
                            <Button
                                variant="outline-secondary"
                                type="submit"
                                className="btn"
                                disabled={!newMessage.trim() || !isConnected}
                            >
                                Send
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
            </Offcanvas.Body>
            <style jsx>{`
                .custom-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .custom-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </Offcanvas>
    );
};

export default ChatBox;