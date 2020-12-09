import React, {useRef, useEffect} from 'react'

function NewMessageForm({sendMessage, updateMessage}) {
    const newMessageInputRef = useRef(null);

    useEffect(() => {
        setFocusToInput();
    }, [])

    const setFocusToInput = () => {
        newMessageInputRef.current.focus();
    }
    
    return (
        <form className="new-message-form" onSubmit={sendMessage}>
            <input className="new-message-input" type="text" ref={newMessageInputRef} onChange={updateMessage} placeholder="Type something... "/>
            <button className="send-message-button" onClick={setFocusToInput}>Send</button>
        </form>
    )
}

export default NewMessageForm;
