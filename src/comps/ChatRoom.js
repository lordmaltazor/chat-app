import React from 'react';
import ChatMessage from './ChatMessage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewMessageForm from './NewMessageForm';

function ChatRoom({messagesRef, sendMessage, updateMessage, username}) {
    const maxMessages = 50; 
    
    const query = messagesRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, {idField: 'id'});

    if (messages && messages.length > maxMessages)
    {
        messagesRef.doc(messages[0].id).delete();
    }

    return (
        <div className="chat-room">
            <div className="messages">
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} username={username}/>)}
            </div>

            <NewMessageForm sendMessage={sendMessage} updateMessage={updateMessage}/>
        </div>
    )
}

export default ChatRoom;
