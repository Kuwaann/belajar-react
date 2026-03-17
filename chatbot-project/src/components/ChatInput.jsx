import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'
import LoadingSpinner from '../assets/loading-spinner.gif'
import dayjs from 'dayjs';

function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        
        if(isLoading || inputText === ''){
            return;
        }
        
        setInputText('');
        setIsLoading(true);

        setChatMessages([
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            },
            {
                message: <img src={LoadingSpinner} className="loading-spinner"/>,
                sender: 'robot',
                id: crypto.randomUUID(),
            }

        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        
        setChatMessages([
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            },
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf(),
            }
        ]);

        setIsLoading(false);
    }

    function clearMessage(){
        setChatMessages([]);
        localStorage.setItem('messages',JSON.stringify([]));
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        sendMessage();
                    }
                }}
                value={inputText}
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
            <button onClick={clearMessage} className="clear-button">Clear</button>
        </div>
    );
}

export default ChatInput