import { height } from '@mui/system';
import React from 'react';
import { Offcanvas, Form, InputGroup, Button } from 'react-bootstrap';
import { IoIosChatboxes } from 'react-icons/io';

const ChatBox = ({
    showChat,
    handleCloseChat,
    chatType,
    selectedChatBooking,
    chatMessages,
    handleSendMessage,
    newMessage,
    setNewMessage,
}) => {
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
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
                <div className="d-flex flex-column h-100">
                    <div
                        className="flex-grow-1 p-3 overflow-auto custom-scroll"
                        style={{ maxHeight: '400px' }}
                    >
                        {chatMessages.map((msg) => (
                            <div
                                key={msg.id || msg._id}
                                className={`mb-2 ${msg.sender === 'user' ? 'text-end' : ''}`}
                            >
                                <div
                                    className={`d-inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'
                                        }`}
                                    style={{ maxWidth: '80%' }}
                                >
                                    {msg.text}
                                </div>
                                <small
                                    className={`d-block ${msg.sender === 'user' ? 'text-white-50' : 'text-muted'}`}
                                >
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </small>
                            </div>
                        ))}
                    </div>
                    <Form onSubmit={handleSendMessage} className="border-top p-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="form-control"
                                style={{ boxShadow: 'none' }}
                            />
                            <Button
                                variant="outline-secondary"
                                type="submit"
                                className="btn"
                                disabled={!newMessage.trim()}
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