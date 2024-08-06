"use client"; // Ensure this component is treated as a Client Component

import React from 'react';

export default function NewChat({ handleNewChat }) {
  return (
    <button
      className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white mt-4 px-4 py-2"
      onClick={handleNewChat} // This requires it to be a Client Component
    >
      + New Chat
    </button>
  );
}