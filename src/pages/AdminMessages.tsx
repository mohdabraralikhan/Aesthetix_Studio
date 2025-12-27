import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

interface Message {
  id: string;
  name: string;
  email: string;
  projectType?: string;
  message: string;
  status?: string;
  createdAt?: string;
}

const AdminMessages: React.FC = () => {
  const client = generateClient<Schema>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const result = await client.models.Inquiry.list();
      const inquiries = result.data as Message[];
      setMessages(inquiries);
      if (inquiries.length > 0 && !selectedMessageId) {
        setSelectedMessageId(inquiries[0].id);
      }
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (typeof window !== 'undefined' && !window.confirm('Delete this message?')) return;
    
    try {
      await client.models.Inquiry.delete({ id });
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessageId === id) {
        const remainingMessages = messages.filter(m => m.id !== id);
        setSelectedMessageId(remainingMessages.length > 0 ? remainingMessages[0].id : null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const selectedMessage = messages.find(m => m.id === selectedMessageId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
                {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'No date'}
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
                {selectedMessage.projectType || 'General Inquiry'}
              </span>
              <p className="text-gray-600 font-light leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div className="mt-8 pt-8 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-mono">
                {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleDateString() : 'No date'}
              </span>
              <button className="px-6 py-2 bg-studio-dark text-white text-sm hover:bg-gray-800 transition-colors">
                Reply
              </button>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No messages available</p>
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
