import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Trash2, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  language: string;
}

interface Language {
  code: string;
  name: string;
}

const GeneralAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: 'english', name: 'English' },
    { code: 'telugu', name: 'Telugu' },
    { code: 'hindi', name: 'Hindi' },
    { code: 'tamil', name: 'Tamil' },
    { code: 'kannada', name: 'Kannada' },
    { code: 'french', name: 'French' },
    { code: 'spanish', name: 'Spanish' },
    { code: 'bengali', name: 'Bengali' },
    { code: 'german', name: 'German' },
    { code: 'japanese', name: 'Japanese' },
    { code: 'chinese', name: 'Chinese' },
    { code: 'arabic', name: 'Arabic' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (): Promise<void> => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const newUserMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      language: selectedLanguage
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Make API call to backend
      const response = await fetch('https://chat-bot-api-31xd.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputMessage,
          language: selectedLanguage,
          debug: false
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        language: selectedLanguage
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: `Sorry, I couldn't process your request. Please try again later.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        language: 'english'
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = (): void => {
    setMessages([]);
  };

  const toggleDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md sticky">
        <div className="container mx-auto flex justify-between items-center sticky">
          <div className="flex items-center space-x-2">
            <Bot size={24} />
            <h1 className="text-xl font-bold">Multilingual AI Assistant</h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="bg-blue-700 text-white p-2 rounded-md border border-blue-400 flex items-center justify-between min-w-40"
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <span>{languages.find(l => l.code === selectedLanguage)?.name}</span>
                <span className="ml-2">▼</span>
              </button>
              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setDropdownOpen(false);
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={clearChat} className="ml-4 p-2 hover:bg-blue-700 rounded-full">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <Bot size={48} className="mx-auto mb-4" />
              <p>Select a language and start chatting!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-3/4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                      <Bot size={16} />
                    </div>
                  )}
                  
                  <div className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg px-4 py-2 max-w-md`}>
                    <p>{message.text}</p>
                    
                    <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp} • {languages.find(l => l.code === message.language)?.name || message.language}
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-2">
                      <MessageCircle size={16} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                <Bot size={16} />
              </div>
              <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Type your message in ${languages.find(l => l.code === selectedLanguage)?.name || selectedLanguage}...`}
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 min-h-12"
              rows={1}
            />
            <button 
              onClick={handleSendMessage} 
              className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={inputMessage.trim() === ''}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralAIChat;