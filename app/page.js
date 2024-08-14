"use client";
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
  const [chatSessions, setChatSessions] = useState([
    { id: 1, title: 'Session 1', messages: [] },
    { id: 2, title: 'Session 2', messages: [] },
    { id: 3, title: 'Session 3', messages: [] },
    { id: 4, title: 'Session 4', messages: [] },
    { id: 5, title: 'Session 5', messages: [] },
  ]);
  const [activeSessionId, setActiveSessionId] = useState(chatSessions[0].id);

  const handleSend = async (message) => {
    const updatedSessions = chatSessions.map(session => {
      if (session.id === activeSessionId) {
        return {
          ...session,
          messages: [...session.messages, { id: Date.now(), type: 'sent', text: message }]
        };
      }
      return session;
    });
    setChatSessions(updatedSessions);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      const aiMessage = data.message;

      // Add AI's response to the same session's messages
      const updatedSessionsWithAI = updatedSessions.map(session => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, { id: Date.now(), type: 'received', text: aiMessage }]
          };
        }
        return session;
      });
      setChatSessions(updatedSessionsWithAI);

    } catch (error) {
      console.error('Error sending message to AI:', error);
    }
  };

  const handleNewChat = () => {
    const newSessionId = chatSessions.length + 1;
    const newSession = {
      id: newSessionId,
      title: `Session ${newSessionId}`,
      messages: [],
    };
    setChatSessions([...chatSessions, newSession]);
    setActiveSessionId(newSessionId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="flex flex-row h-full">
        <Sidebar
          chatSessions={chatSessions}
          activeSessionId={activeSessionId}
          setActiveSessionId={setActiveSessionId}
          handleNewChat={handleNewChat}
        />
        <ChatWindow
          messages={chatSessions.find(session => session.id === activeSessionId)?.messages || []}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between h-16 px-6 bg-gray-800 text-white shadow-md">
      <div className="flex items-center space-x-3">
        <svg
          className="w-6 h-6 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          ></path>
        </svg>
        <span className="text-2xl font-bold">AI Chat Support</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-gray-300">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V12a7.978 7.978 0 00-1.633-4.847M9 7H6l-1.405-1.405A2.032 2.032 0 014 4.158V2m1.543 10.815A7.978 7.978 0 0112 20a7.978 7.978 0 001.847-.215M12 12v.01"
            ></path>
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-300">
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
              d="M10 20v-6a4 4 0 014-4h.018a4 4 0 014 4v6M4 20v-6a4 4 0 014-4h.018a4 4 0 014 4v6m0 0v-6a4 4 0 014-4h.018a4 4 0 014 4v6"
            ></path>
          </svg>
        </button>
        <button className="text-gray-400 hover:text-gray-300">
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
              d="M3 7h18M3 12h18M3 17h18"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
