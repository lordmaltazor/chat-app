import React from 'react';
import ChatMessage from './ChatMessage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewMessageForm from './NewMessageForm';

function ChatRoom({messagesRef, sendMessage, updateMessage, username}) {
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    return (
        <div className="chat-room">
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} username={username}/>)}

            <NewMessageForm sendMessage={sendMessage} updateMessage={updateMessage}/>
        </div>
    )
}

export default ChatRoom;
