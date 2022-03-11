import React from 'react'

import "./Chatbot1.css";


import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from "../chatbot/config";
import ActionProvider from "../chatbot/ActionProvider";
import MessageParser from "../chatbot/MessageParser";

function Chatbot1() {
    return (
        <div className="App1">
            <div style={{ maxWidth: "300px" }}>
                <Chatbot

                    config={config}
                    actionProvider={ActionProvider}
                    messageParser={MessageParser}

                />
            </div>
        </div>
    );
}

export default Chatbot1

