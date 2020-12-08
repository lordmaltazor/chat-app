import React from 'react'

function NewMessageForm({sendMessage, updateMessage}) {
    return (
        <form className="new-message-form" onSubmit={sendMessage}>
            <input className="new-message-input" type="text" onChange={updateMessage} placeholder="Type something... "/>
            <button className="send-message-button">Send</button>
        </form>
    )
}

export default NewMessageForm;
