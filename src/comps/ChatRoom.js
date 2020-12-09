import React, {useState, useEffect, useRef} from 'react';
import ChatMessage from './ChatMessage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewMessageForm from './NewMessageForm';

function ChatRoom({messagesRef, sendMessage, updateMessage, username}) {    
    const messagesDivRef = useRef(null);
    //let realtimeMessaging = useRef(true);
    const [realtimeMessaging, setRealtimeMessaging] = useState(true);

    const query = messagesRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, {idField: 'id'});

    // Scrolling to the bottom of the chatroom when a new message is posted if realtime messaging is enabled
    useEffect(() => {
        if (messagesDivRef.current && realtimeMessaging === false)
        {
            goToBottom();
        }
    }, [messages]);

    // Disableing realtime messaging    
    const displayDownArrow = () => {       
        if (messagesDivRef.current != null && (messagesDivRef.current.scrollTop + messagesDivRef.current.offsetHeight) === messagesDivRef.current.scrollHeight)
        {
            setRealtimeMessaging(false);
            //console.log("Set to false");
        }
        else
        {
            setRealtimeMessaging(true);
            //console.log("Set to true");
        }
    }

    const goToBottom = () => {
        messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }

    return (
        <div className="chat-room">
            <div className="messages" ref={messagesDivRef} onScroll={displayDownArrow}>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} username={username}/>)}
            </div>

            {<button className="enable-realtime-messaging-button" onClick={goToBottom} style={{opacity: (messages && (!realtimeMessaging ? "0" : "1"))}}><i className="fas fa-arrow-down"></i></button>}

            <NewMessageForm sendMessage={sendMessage} updateMessage={updateMessage}/>
        </div>
    )
}

export default ChatRoom;
