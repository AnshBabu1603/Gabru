
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your DeFakeX assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: input.trim(),
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Generate bot response
    setTimeout(() => {
      const botMessage: Message = {
        text: getBotResponse(input.trim()),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 600);
  };
  
  const getBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
      return "Hello! How can I help you with deepfake detection today?";
    } else if (lowerMsg.includes("how") && (lowerMsg.includes("work") || lowerMsg.includes("detect"))) {
      return "Our system analyzes facial movements, lighting patterns, and compression artifacts to identify signs of manipulation. Would you like to know more about a specific aspect?";
    } else if (lowerMsg.includes("accurate") || lowerMsg.includes("reliability")) {
      return "Our detection achieves 95-98% accuracy on benchmark tests. Real-world performance depends on video quality and the sophistication of the deepfake.";
    } else if (lowerMsg.includes("format") || lowerMsg.includes("support")) {
      return "We support MP4, AVI, MOV videos and JPG, PNG, WEBP images. Maximum file size is 100MB for videos and 20MB for images.";
    } else if (lowerMsg.includes("privacy") || lowerMsg.includes("data")) {
      return "All processing is confidential. Uploaded files are immediately deleted after analysis and never stored or shared.";
    } else if (lowerMsg.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any other questions.";
    } else {
      return "I'm not sure I understand. Could you rephrase your question? You can ask about how detection works, supported formats, or our accuracy rates.";
    }
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-600 transition-all duration-300 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] z-50"
          >
            <Card className="border-0 shadow-lg overflow-hidden h-[450px] max-h-[70vh] flex flex-col">
              {/* Chat Header */}
              <div className="bg-teal-500 p-4 text-white font-medium flex items-center justify-between">
                <span>DeFakeX Assistant</span>
                <button onClick={toggleChat} className="text-white/80 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Chat Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isBot
                          ? "bg-gray-100 self-start rounded-tl-none"
                          : "bg-teal-500 text-white self-end rounded-tr-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about deepfake detection..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-teal-500 hover:bg-teal-600"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
