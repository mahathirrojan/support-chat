"use client";


import React, { useState } from 'react';

export default function ChatWindow({ messages, onSend }) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      onSend(inputValue);
      setInputValue(''); // Clear the input field after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-auto h-full p-6 bg-gray-900">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-800 h-full p-4">
        <ChatMessages messages={messages} />
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

function ChatMessages({ messages }) {
  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }) {
  const isReceived = message.type === 'received';
  const colStart = isReceived ? 'col-start-1 col-end-8' : 'col-start-6 col-end-13';
  const bubbleColor = isReceived ? 'bg-gray-700 text-white' : 'bg-indigo-600 text-white';
  const bubbleAlignment = isReceived ? 'flex-row' : 'flex-row-reverse';

  return (
    <div className={`${colStart} p-3 rounded-lg`}>
      <div className={`flex items-center ${bubbleAlignment}`}>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0">
          {isReceived ? 'AI' : 'U'}
        </div>
        <div className={`relative ml-3 text-sm ${bubbleColor} py-2 px-4 shadow rounded-xl`}>
          <div>{message.text}</div>
        </div>
      </div>
    </div>
  );
}

function ChatInput({ inputValue, setInputValue, handleSend, handleKeyPress }) {
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-gray-800 w-full px-4 mt-4">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-500 pl-4 h-10 bg-gray-700 text-white"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-300"
            onClick={handleSend}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white px-4 py-1 flex-shrink-0"
          onClick={handleSend}
        >
          <span>Send</span>
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
