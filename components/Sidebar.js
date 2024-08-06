"use client"; // Mark as Client Component since it handles interactivity

import { useState } from 'react';
import React from 'react';
import NewChat from './NewChat';

export default function Sidebar({ chatSessions, activeSessionId, setActiveSessionId, handleNewChat }) {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-gray-800 text-white flex-shrink-0">
      <UserProfile />
      <ChatList
        chatSessions={chatSessions}
        activeSessionId={activeSessionId}
        setActiveSessionId={setActiveSessionId}
      />
      <NewChat handleNewChat={handleNewChat} />
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex flex-col items-center bg-gray-700 border border-gray-600 mt-4 w-full py-6 px-4 rounded-lg">
      <div className="h-20 w-20 rounded-full border overflow-hidden">
        <img
          src="https://github.com/mahathirrojan.png"
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-lg font-semibold mt-2">Demo User</div>
      <div className="text-xs text-gray-400">Age: 25 | Gender: Male</div>
    </div>
  );
}

function ChatList({ chatSessions, activeSessionId, setActiveSessionId }) {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold text-gray-400">Conversations</span>
        <span className="flex items-center justify-center bg-gray-600 h-4 w-4 rounded-full">
          {chatSessions.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-72 overflow-y-auto">
        {chatSessions.map((session) => (
          <ChatSessionButton
            key={session.id}
            session={session}
            isActive={session.id === activeSessionId}
            setActiveSessionId={setActiveSessionId}
          />
        ))}
      </div>
    </div>
  );
}

function ChatSessionButton({ session, isActive, setActiveSessionId }) {
  return (
    <button
      className={`flex flex-row items-center hover:bg-gray-700 rounded-xl p-2 ${isActive ? 'bg-gray-700' : ''}`}
      onClick={() => setActiveSessionId(session.id)}
    >
      <div className={`flex items-center justify-center h-8 w-8 bg-indigo-600 rounded-full`}>
        {session.title.charAt(0)}
      </div>
      <div className="ml-2 text-sm font-semibold">{session.title}</div>
    </button>
  );
}