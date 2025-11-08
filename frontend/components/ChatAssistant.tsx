
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { SparklesIcon, UserIcon, BotIcon, SendIcon } from './ui/icons';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

const ChatAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(m => `${m.role}: ${m.text}`).join('\n');
            const response = await getChatResponse(history, input);
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting right now." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto">
            <div className="text-center mb-6">
                 <h1 className="text-3xl font-bold">AI Assistant</h1>
                 <p className="text-muted-foreground">Your personal guide to financial aid.</p>
            </div>
            <Card className="flex flex-col flex-1">
                <CardContent className="flex-1 p-0 overflow-y-auto">
                    <div className="p-6 space-y-4">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                <SparklesIcon className="w-12 h-12 mb-4"/>
                                <p className="font-medium">Welcome to the SmartScholar Assistant!</p>
                                <p className="text-sm">Ask me anything about scholarships or financial aid.</p>
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                {message.role === 'model' && <div className="p-2 bg-secondary rounded-full"><BotIcon className="w-5 h-5 text-primary"/></div>}
                                <div className={`max-w-md p-3 rounded-lg ${
                                    message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary'
                                }`}>
                                   <pre className="font-sans whitespace-pre-wrap">{message.text}</pre>
                                </div>
                                {message.role === 'user' && <div className="p-2 bg-secondary rounded-full"><UserIcon className="w-5 h-5 text-primary"/></div>}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-secondary rounded-full"><BotIcon className="w-5 h-5 text-primary"/></div>
                                <div className="max-w-md p-3 rounded-lg bg-secondary">
                                    <div className="flex items-center space-x-1">
                                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                                       <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>
                <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about deadlines, eligibility, or application tips..."
                            className="flex-1 p-2 border rounded-md"
                        />
                        <button type="submit" disabled={isLoading} className="p-2 text-white rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary/90">
                           <SendIcon className="w-5 h-5"/>
                        </button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default ChatAssistant;
