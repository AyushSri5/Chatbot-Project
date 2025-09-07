'use client'
import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Copy,
  Check,
  Bot,
  User as UserIcon,
  Download,
  Code2,
  Sparkles,
  MessageSquare,
  Terminal,
  Wand2,
  Maximize2,
  Minimize2,
} from 'lucide-react';

const ChatCodeEditor = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');
  const [expandedCode, setExpandedCode] = useState('');
  const [editingCode, setEditingCode] = useState('');
  const [editedCodes, setEditedCodes] = useState({});
  const messagesEndRef = useRef(null);
  const currentResponseIndex = useRef(0);

  // Helper: naive beautifier (placeholder). Replace with Prettier if desired.
  const beautifyCode = (code, language) => {
    try {
      // Minimal cleanup: trim and normalize newlines
      return code.replace(/\t/g, '  ').replace(/\r\n?|\n/g, '\n').trim() + '\n';
    } catch {
      return code;
    }
  };

  const handleCodeEdit = (code, messageId) => {
    setEditingCode(messageId);
    setEditedCodes((prev) => ({ ...prev, [messageId]: code }));
  };

  const cancelEdit = (messageId) => {
    // Revert to original by removing temp edit buffer
    setEditedCodes((prev) => {
      const next = { ...prev };
      delete next[messageId];
      return next;
    });
    setEditingCode('');
  };

  const saveEditedCode = (messageId) => {
    // Keep editedCodes as the source for display; just exit editing mode
    setEditingCode('');
  };

  // Dummy responses with code
  const dummyResponses = [
  {
    id: 1,
    text: "Here's a modern React component with TypeScript and Tailwind CSS:",
    code: `import React, { useState } from 'react';
import { Heart, Share2, Bookmark } from 'lucide-react';

interface PostProps {
  title: string;
  content: string;
  author: string;
  likes: number;
}

const PostCard: React.FC<PostProps> = ({ title, content, author, likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">by {author}</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLike}
            className={\`flex items-center space-x-1 \${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors\`}
          >
            <Heart className={\`w-4 h-4 \${isLiked ? 'fill-current' : ''}\`} />
            <span>{likeCount}</span>
          </button>
          <Share2 className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
          <Bookmark className="w-4 h-4 text-gray-400 hover:text-green-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;`,
    language: "tsx",
  },
  {
    id: 2,
    text: "Here's a Python FastAPI endpoint with database integration:",
    code: `from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
import bcrypt
from datetime import datetime, timedelta
import jwt

app = FastAPI(title="User Management API", version="1.0.0")

class UserService:
    def __init__(self, db: Session):
        self.db = db
    
    async def create_user(self, user_data: dict) -> dict:
        """Create a new user with hashed password"""
        hashed_password = bcrypt.hashpw(
            user_data['password'].encode('utf-8'), 
            bcrypt.gensalt()
        )
        
        # NOTE: User model & get_db dependency should exist in your project
        new_user = User(
            email=user_data['email'],
            username=user_data['username'],
            password_hash=hashed_password,
            created_at=datetime.utcnow()
        )
        
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        
        return {
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username,
            "created_at": new_user.created_at
        }
    
    async def authenticate_user(self, email: str, password: str) -> Optional[dict]:
        """Authenticate user and return JWT token"""
        user = self.db.query(User).filter(User.email == email).first()
        
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
            return None
        
        token_data = {
            "user_id": user.id,
            "exp": datetime.utcnow() + timedelta(hours=24)
        }
        
        token = jwt.encode(token_data, "secret_key", algorithm="HS256")
        
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username
            }
        }

@app.post("/users/register")
async def register_user(user_data: dict, db: Session = Depends(get_db)):
    user_service = UserService(db)
    try:
        user = await user_service.create_user(user_data)
        return {"message": "User created successfully", "user": user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))`,
    language: "python",
  },
  {
    id: 3,
    text: "Here's a modern CSS animation with glassmorphism effect:",
    code: `/* Modern Glassmorphism Card with Animations */
.glass-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  padding: 2rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s;
}

.glass-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 20px 40px 0 rgba(31, 38, 135, 0.5),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
}

.glass-card:hover::before {
  left: 100%;
}

/* Floating Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(-5px) rotate(-1deg);
  }
}

.floating-element {
  animation: float 6s ease-in-out infinite;
}

/* Gradient Text Animation */
.gradient-text {
  background: linear-gradient(
    -45deg,
    #ff006e,
    #8338ec,
    #3a86ff,
    #06ffa5
  );
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Pulse Effect */
.pulse-ring {
  position: absolute;
  border: 3px solid rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}`,
    language: "css",
  },
  {
    id: 4,
    text: "Here's a Next.js API route with real-time features using WebSockets:",
    code: `// First install the required dependencies:
// npm install socket.io socket.io-client
// npm install -D @types/socket.io (if using TypeScript)

// pages/api/socket.js
import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
    res.end();
    return;
  }

  console.log('Socket is initializing');
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Store active users and rooms
  const activeUsers = new Map();
  const roomUsers = new Map();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room
    socket.on('join-room', ({ room, user }) => {
      socket.join(room);
      activeUsers.set(socket.id, { ...user, room, socketId: socket.id });
      
      if (!roomUsers.has(room)) {
        roomUsers.set(room, new Map());
      }
      roomUsers.get(room).set(socket.id, user);

      socket.to(room).emit('user-joined', {
        user,
        room,
        timestamp: new Date().toISOString()
      });

      const currentUsers = Array.from(roomUsers.get(room).values());
      socket.emit('room-users', currentUsers);
    });

    socket.on('send-message', ({ content, room, user }) => {
      const message = {
        id: Date.now().toString(),
        content,
        user,
        room,
        timestamp: new Date().toISOString()
      };
      io.to(room).emit('new-message', message);
    });

    socket.on('typing', ({ room, user, isTyping }) => {
      socket.to(room).emit('user-typing', { user, isTyping, room });
    });

    socket.on('disconnect', () => {
      const user = activeUsers.get(socket.id);
      if (user) {
        const { room } = user;
        if (roomUsers.has(room)) {
          roomUsers.get(room).delete(socket.id);
          if (roomUsers.get(room).size === 0) {
            roomUsers.delete(room);
          }
        }
        socket.to(room).emit('user-left', {
          user,
          room,
          timestamp: new Date().toISOString()
        });
        activeUsers.delete(socket.id);
      }
      console.log('User disconnected:', socket.id);
    });
  });

  res.end();
};

export default SocketHandler;`,
    language: "javascript",
  },
];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    const t = setTimeout(() => {
      setMessages([
        {
          id: 'welcome',
          content:
            "Hello! I'm your AI coding assistant. I can help you create beautiful, modern code in various technologies. Try asking me to build a component, API endpoint, or solve a coding challenge!",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const response = dummyResponses[currentResponseIndex.current % dummyResponses.length];
      currentResponseIndex.current++;

      const aiMessage = {
        id: Date.now().toString() + '_ai',
        content: response.text,
        code: response.code,
        language: response.language,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (code, messageId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(messageId);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = (code, language) => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      tsx: 'tsx',
      python: 'py',
      css: 'css',
      html: 'html',
    };

    const filename = `code.${extensions[language] || 'txt'}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const CodeBlock = ({ code, language, messageId }) => {
    const isExpanded = expandedCode === messageId;
    const isEditing = editingCode === messageId;
    const currentCode = editedCodes[messageId] ?? code;

    return (
      <div
        className={`mt-4 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl transition-all duration-300 ${
          isExpanded ? 'fixed inset-4 z-50 max-w-none' : ''
        }`}
      >
        <div className="flex items-center justify-between bg-gray-800/80 backdrop-blur-sm px-4 py-3 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-gray-300 capitalize">{language}</span>
            {editedCodes[messageId] && (
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Modified</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const beautified = beautifyCode(currentCode, language);
                handleCodeEdit(beautified, messageId);
              }}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
              title="Beautify code"
            >
              <Wand2 className="w-3 h-3" />
              <span>Beautify</span>
            </button>
            <button
              onClick={() => copyToClipboard(currentCode, messageId)}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              {copiedCode === messageId ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={() => downloadCode(currentCode, language)}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setExpandedCode(isExpanded ? '' : messageId)}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>{isExpanded ? 'Minimize' : 'Expand'}</span>
            </button>
          </div>
        </div>

        <div className={`overflow-auto ${isExpanded ? 'h-full' : 'max-h-96'}`}>
          {isEditing ? (
            <div className="relative">
              <textarea
                value={currentCode}
                onChange={(e) => setEditedCodes({ ...editedCodes, [messageId]: e.target.value })}
                className="w-full h-64 p-4 bg-gray-900 text-gray-300 font-mono text-sm leading-relaxed resize-none focus:outline-none border-none"
                style={{ minHeight: isExpanded ? 'calc(100vh - 200px)' : '16rem' }}
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={() => cancelEdit(messageId)}
                  className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveEditedCode(messageId)}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <pre className="p-4 text-sm leading-relaxed">
                <code className="text-gray-300 font-mono whitespace-pre-wrap">{currentCode}</code>
              </pre>
              <button
                onClick={() => handleCodeEdit(currentCode, messageId)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-all duration-200"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
            onClick={() => setExpandedCode('')}
          />
        )}
      </div>
    );
  };

  const TypingIndicator = () => (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-3 max-w-3xl">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">AI is thinking</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Code Assistant</h1>
                <p className="text-sm text-gray-400">Powered by advanced AI technology</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">Ready to code</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`flex items-start space-x-3 max-w-4xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.isUser
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                        : 'bg-gradient-to-br from-purple-500 to-blue-600'
                    }`}
                  >
                    {message.isUser ? (
                      <UserIcon className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div
                    className={`rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm border ${
                      message.isUser
                        ? 'bg-blue-600/90 text-white border-blue-500/20'
                        : 'bg-gray-800/80 text-gray-100 border-gray-700'
                    }`}
                  >
                    <p className="leading-relaxed">{message.content}</p>
                    {message.code && (
                      <CodeBlock code={message.code} language={message.language} messageId={message.id} />
                    )}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-600/20">
                      <span className="text-xs text-gray-400">{message.timestamp.toLocaleTimeString()}</span>
                      {!message.isUser && (
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">AI Assistant</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Container */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 shadow-lg">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me to write some code, create a component, or solve a programming challenge..."
                className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none backdrop-blur-sm transition-all duration-200"
                rows={3}
                disabled={isTyping}
              />
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <span className="text-xs text-gray-500">Press Enter to send</span>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center space-x-2 group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCodeEditor;
