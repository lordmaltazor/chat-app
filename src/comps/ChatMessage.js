import React from 'react'

function ChatMessage({message, username}) {
    return (
        <div className="message-container">
            <p className="message-sender" style={{textAlign: message.sender === username ? "right" : "left"}}>{message.sender}</p>
            <p className="message" style={{textAlign: message.sender === username ? "right" : "left"}}>{message.text}</p> 
        </div>
    )
}

export default ChatMessage;