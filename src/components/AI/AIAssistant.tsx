import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import Header from '../Dashboard/Header';
import { ArrowLeft, Bot, Sparkles, MessageCircle, Lightbulb, Target, FileText, Send, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const navigate = useNavigate();
  const { currentResume } = useResume();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Resume Assistant. I can help you improve your resume, write compelling bullet points, create professional summaries, and optimize for ATS systems. What would you like to work on today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const aiServices = [
    {
      id: 'bullet-points',
      title: 'Improve Bullet Points',
      description: 'Transform weak bullet points into achievement-driven statements',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'professional-summary',
      title: 'Write Professional Summary',
      description: 'Create a compelling professional summary tailored to your role',
      icon: FileText,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'ats-optimization',
      title: 'ATS Optimization',
      description: 'Optimize your resume for Applicant Tracking Systems',
      icon: Bot,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'skill-suggestions',
      title: 'Skill Suggestions',
      description: 'Get recommendations for relevant skills to add',
      icon: Lightbulb,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const quickPrompts = [
    "Help me write a professional summary for a software engineer role",
    "Improve this bullet point: Worked on various projects",
    "What skills should I add for a marketing manager position?",
    "How can I make my resume more ATS-friendly?",
    "Write achievement-based bullet points for my sales experience"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('bullet point') || lowerInput.includes('improve')) {
      return `Here's an improved version of your bullet point:

**Original:** "Worked on various projects"
**Improved:** "Led cross-functional team of 5 developers to deliver 3 high-impact web applications, resulting in 40% increase in user engagement and $200K annual revenue growth"

**Key improvements:**
• Added specific numbers and metrics
• Used strong action verb "Led"
• Included team size and scope
• Quantified business impact
• Specified the type of work (web applications)

Would you like me to help improve more bullet points?`;
    }
    
    if (lowerInput.includes('professional summary') || lowerInput.includes('summary')) {
      return `Here's a professional summary template for a software engineer:

**Professional Summary:**
"Results-driven Software Engineer with 5+ years of experience developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading technical initiatives that improved system performance by 60% and reduced deployment time by 75%. Expertise in full-stack development, agile methodologies, and cross-functional collaboration. Seeking to leverage technical expertise and leadership skills to drive innovation at a forward-thinking technology company."

**Key elements included:**
• Years of experience
• Specific technologies
• Quantifiable achievements
• Leadership experience
• Career objective

Would you like me to customize this for your specific background?`;
    }
    
    if (lowerInput.includes('ats') || lowerInput.includes('optimize')) {
      return `Here are key ATS optimization strategies:

**1. Keyword Optimization**
• Include exact keywords from job descriptions
• Use both acronyms and full terms (e.g., "AI" and "Artificial Intelligence")
• Incorporate industry-specific terminology

**2. Format Guidelines**
• Use standard section headings (Experience, Education, Skills)
• Avoid tables, graphics, and complex formatting
• Use bullet points for easy scanning
• Save as .docx or .pdf format

**3. Content Structure**
• Place most important information in the top third
• Use reverse chronological order
• Include relevant certifications and skills
• Quantify achievements with numbers

**4. Technical Considerations**
• Use standard fonts (Arial, Calibri, Times New Roman)
• Maintain consistent formatting
• Avoid headers and footers
• Use simple bullet points (•)

Would you like me to analyze your current resume for ATS compatibility?`;
    }
    
    if (lowerInput.includes('skill') || lowerInput.includes('add')) {
      return `Here are trending skills to consider adding based on current market demands:

**Technical Skills:**
• Cloud Platforms: AWS, Azure, Google Cloud
• Programming: Python, JavaScript, React, Node.js
• Data Analysis: SQL, Tableau, Power BI
• DevOps: Docker, Kubernetes, CI/CD
• AI/ML: Machine Learning, TensorFlow, PyTorch

**Soft Skills:**
• Project Management
• Cross-functional Collaboration
• Strategic Planning
• Problem-solving
• Leadership & Mentoring

**Industry-Specific:**
• Agile/Scrum Methodologies
• API Development
• Database Management
• Cybersecurity Awareness
• Digital Marketing (if applicable)

**Tip:** Only add skills you can confidently discuss in an interview. Consider taking online courses to strengthen areas where you're less experienced.

What industry or role are you targeting? I can provide more specific recommendations.`;
    }
    
    return `I understand you're looking for help with your resume. I can assist you with:

• **Improving bullet points** - Transform weak statements into achievement-driven content
• **Writing professional summaries** - Create compelling introductions tailored to your role
• **ATS optimization** - Ensure your resume passes through applicant tracking systems
• **Skill recommendations** - Suggest relevant skills for your target position
• **Content enhancement** - Make your experience more impactful with metrics and results

Please let me know which area you'd like to focus on, or feel free to share specific content you'd like me to help improve!`;
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-lg text-gray-700 rounded-lg hover:bg-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
              <Bot className="w-8 h-8" />
              <span>AI Resume Assistant</span>
            </h1>
            <p className="text-white/80">Get personalized help to improve your resume with AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* AI Services Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>AI Services</span>
              </h3>
              <div className="space-y-3">
                {aiServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        selectedService === service.id
                          ? 'bg-purple-100 border-2 border-purple-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${service.color}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">{service.title}</h4>
                          <p className="text-xs text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Prompts</h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="w-full p-2 text-left text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">AI Resume Assistant</h3>
                    <p className="text-sm text-green-600">● Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'ai' && (
                          <Bot className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {message.content}
                          </pre>
                          {message.type === 'ai' && (
                            <button
                              onClick={() => copyToClipboard(message.content)}
                              className="mt-2 flex items-center space-x-1 text-xs text-purple-600 hover:text-purple-800"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-purple-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about your resume..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;