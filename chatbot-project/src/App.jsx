import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import './App.css'

function App() {
    const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

    useEffect(() => {
        Chatbot.addResponses(
            {
                'goodbye' : 'Goodbye. Have a great day!',
                'give me an unique id' : () => `Sure, here is an unique ID: ${crypto.randomUUID()}`
            }
        );
    },[]);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(chatMessages))
    },[chatMessages]);

    return (
        <div className="app-container">
            { chatMessages.length === 0 && <p className="welcome">Welcome to the chatbot project! Send a message using the textbox below</p>}
            <ChatMessages
                chatMessages={chatMessages}
            />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    )
}

export default App
