import React, { useState, useEffect, useRef } from 'react';
import { messagesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Message, User } from '../types';
import { 
  Send, 
  Search, 
  Users, 
  Paperclip, 
  Smile,
  MoreVertical
} from 'lucide-react';
import toast from 'react-hot-toast';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatUsers, setChatUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock chat users - in real app, fetch from API
  const mockUsers: User[] = [
    {
      id: '2',
      name: 'John Farmer',
      email: 'john@example.com',
      role: 'farmer',
      profile: {
        businessName: 'Green Valley Farms',
        avatar: ''
      }
    },
    {
      id: '3',
      name: 'Sarah Wholesaler',
      email: 'sarah@example.com',
      role: 'wholesaler',
      profile: {
        businessName: 'Fresh Produce Distributors',
        avatar: ''
      }
    },
    {
      id: '4',
      name: 'Mike Retailer',
      email: 'mike@example.com',
      role: 'retailer',
      profile: {
        businessName: 'City Market Store',
        avatar: ''
      }
    }
  ];

  useEffect(() => {
    // Simulate loading chat users
    setChatUsers(mockUsers);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    if (!selectedUser) return;

    try {
      const chatId = [user!.id, selectedUser.id].sort().join('_');
      const response = await messagesAPI.getByChatId(chatId);
      setMessages(response.data);
    } catch (error) {
      toast.error('Failed to load messages');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const chatId = [user!.id, selectedUser.id].sort().join('_');
      const messageData = {
        chatId,
        receiver: selectedUser.id,
        content: newMessage.trim(),
        type: 'text' as const
      };

      const response = await messagesAPI.send(messageData);
      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-200px)]">
      <div className="card h-full flex">
        {/* Sidebar - Chat List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="input-field pl-10 text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              // Loading Skeleton
              [...Array(5)].map((_, index) => (
                <div key={index} className="p-4 border-b border-gray-100 animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              chatUsers.map((chatUser) => (
                <button
                  key={chatUser.id}
                  onClick={() => setSelectedUser(chatUser)}
                  className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    selectedUser?.id === chatUser.id ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {chatUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {chatUser.profile?.businessName || chatUser.name}
                        </h3>
                        <span className="text-xs text-gray-500">12:30 PM</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chatUser.role.charAt(0).toUpperCase() + chatUser.role.slice(1)}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedUser.profile?.businessName || selectedUser.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} • Online
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${message.sender.id === user!.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.sender.id === user!.id
                            ? 'bg-green-500 text-white rounded-br-none'
                            : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender.id === user!.id
                              ? 'text-green-100'
                              : 'text-gray-500'
                          }`}
                        >
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Empty Chat State
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Start a conversation
                      </h3>
                      <p className="text-gray-600 max-w-sm">
                        Send a message to {selectedUser.profile?.businessName || selectedUser.name} to discuss products or orders.
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end space-x-3">
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <Paperclip size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <Smile size={20} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      rows={1}
                      className="input-field resize-none"
                      style={{ minHeight: '40px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // No Chat Selected State
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Select a conversation
                </h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Choose a contact from the sidebar to start messaging. 
                  Connect with farmers, wholesalers, and retailers in the marketplace.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure messaging</span>
                  <span>•</span>
                  <span>Real-time updates</span>
                  <span>•</span>
                  <span>File sharing</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
