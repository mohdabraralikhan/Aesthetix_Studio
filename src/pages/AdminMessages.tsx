import React, { useState } from 'react';

interface Message {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  status?: string;
  createdAt: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'Client A',
      email: 'client@example.com',
      projectType: 'Website',
      message: 'We need a website redesign for our upcoming product launch',
      status: 'New',
      createdAt: '2025-01-20'
    },
    {
      id: '2',
      name: 'Client B',
      email: 'contact@clientb.com',
      projectType: 'App',
      message: 'Looking for mobile app development services',
      createdAt: '2025-01-19'
    },
    {
      id: '3',
      name: 'Client C',
      email: 'hello@clientc.com',
      projectType: 'Design',
      message: 'Need UI/UX design for our SaaS platform',
      createdAt: '2025-01-18'
    }
  ]);

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>('1');
  const selectedMessage = messages.find(m => m.id === selectedMessageId);

  const handleDeleteMessage = (id: string) => {
    if (confirm('Delete this message?')) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessageId === id) {
        setSelectedMessageId(messages.length > 1 ? messages[0].id : null);
      }
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Messages List Sidebar */}
      <div className="w-80 flex-shrink-0 bg-white border border-gray-200 p-6 overflow-y-auto">
        <h3 className="font-display text-lg mb-4">Inbox</h3>
        <div className="space-y-2">
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedMessageId(msg.id)}
              className={`w-full text-left px-4 py-3 border transition-colors ${
                selectedMessageId === msg.id
                  ? 'bg-blue-50 border-blue-200'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-sm text-gray-800">{msg.name}</div>
              <div className="text-xs text-gray-500 mt-1 truncate">{msg.email}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(msg.createdAt).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 bg-white border border-gray-200 p-8">
        {selectedMessage ? (
          <div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="font-display text-2xl font-medium mb-2">{selectedMessage.name}</h2>
                <p className="text-gray-500">{selectedMessage.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="px-4 py-2 text-sm text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="pb-8 border-b border-gray-100">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
                {selectedMessage.projectType}
              </span>
              <p className="text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div className="mt-8 pt-8 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-mono">
                {new Date(selectedMessage.createdAt).toLocaleDateString()}
              </span>
              <button className="px-6 py-2 bg-studio-dark text-white text-sm hover:bg-gray-800 transition-colors">
                Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
