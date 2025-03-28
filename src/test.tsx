import React, { useState, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Upload,
  MessageSquareText,
  Sun,
  Moon,
  Brain,
  TrendingUp,
  HelpCircle,
  ChevronDown,
  FileText,
  BookOpen,
  PieChart,
  LineChart as LineChartIcon,
  ArrowRight,
  DollarSign,
  Percent,
  Scale,
  Building2,
  Wallet,
  Calculator,
  CircleDollarSign,
  BadgeDollarSign,
  Receipt,
  Landmark,
  Bot,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import GeneralAIChat from './components/GeneralAIChat';

// Sample financial data
const sampleFinancialData = {
  overview: {
    revenue: 1250000,
    revenueGrowth: 15.2,
    grossMargin: 42.5,
    operatingMargin: 18.3,
    netMargin: 12.8,
    currentRatio: 2.1,
  },
  trends: {
    positive: [
      'Strong revenue growth of 15.2% year-over-year',
      'Improving operating margins',
      'Healthy cash flow from operations',
    ],
    negative: [
      'Increasing accounts receivable days',
      'Rising inventory levels',
      'Higher operating expenses',
    ],
  },
  recommendations: [
    'Implement stricter credit control policies',
    'Optimize inventory management',
    'Review cost structure for efficiency improvements',
  ],
};

const sampleData = {
  revenue: [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
  ],
  expenses: [
    { category: 'Operations', value: 400 },
    { category: 'Marketing', value: 300 },
    { category: 'R&D', value: 300 },
    { category: 'Sales', value: 200 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedAnalysis, setSelectedAnalysis] = useState('overview');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  
  // Refs for scrolling
  const fileInputRef = useRef<HTMLInputElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const analysisRef = useRef<HTMLElement>(null);
  const learnRef = useRef<HTMLElement>(null);
  const aiChatRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    console.log('File selected:', file.name);

    // Simulated upload process
    try {
      // Simulating file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('File uploaded successfully');
      alert(`File ${file.name} uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('File upload failed');
    }
  };
  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setChatMessages([...chatMessages, { text: message, isUser: true }]);
    
    // Simulate AI response with educational content
    setTimeout(() => {
      let response = "Based on the financial statements, I notice that revenue has grown consistently over the past 6 months, with a particularly strong performance in May. The operating margins have improved due to better cost management. ";
      
      // Check for financial terms in the question and add educational context
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('ebitda')) {
        response += "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is a key metric that shows a company's operational performance. You can find more details about this in our Educational Center.";
        setActiveLesson('profitability');
      } else if (lowerMessage.includes('assets')) {
        response += "Assets represent everything a company owns that has economic value. Check out our Balance Sheet section in the Educational Center for more information.";
        setActiveLesson('balance-sheet');
      }

      setChatMessages(prev => [...prev, {
        text: response,
        isUser: false
      }]);
    }, 1000);
    
    setMessage('');
  };

  const lessons = [
    {
      id: 'balance-sheet',
      title: 'Understanding Balance Sheets',
      icon: Scale,
      content: 'A balance sheet provides a snapshot of a company\'s financial position at a specific point in time. It shows what a company owns (assets), what it owes (liabilities), and shareholders\' equity.',
      terms: [
        { term: 'Assets', definition: 'Resources owned by a company with economic value' },
        { term: 'Liabilities', definition: 'Debts and obligations of a company' },
        { term: 'Equity', definition: 'Shareholders\' stake in the company' }
      ]
    },
    {
      id: 'income-statement',
      title: 'Reading Income Statements',
      icon: Receipt,
      content: 'An income statement shows a company\'s revenues, costs, and expenses over a specific period. It helps you understand if a company is profitable and how it generates its earnings.',
      terms: [
        { term: 'Revenue', definition: 'Income from normal business operations' },
        { term: 'COGS', definition: 'Cost of Goods Sold - Direct costs of producing goods' },
        { term: 'Operating Expenses', definition: 'Costs of running the business' }
      ]
    },
    {
      id: 'cash-flow',
      title: 'Cash Flow Analysis',
      icon: CircleDollarSign,
      content: 'The cash flow statement tracks how changes in balance sheet accounts and income affect cash and cash equivalents. It shows cash movements through operating, investing, and financing activities.',
      terms: [
        { term: 'Operating Cash Flow', definition: 'Cash generated from core business activities' },
        { term: 'Free Cash Flow', definition: 'Cash available after capital expenditures' },
        { term: 'Working Capital', definition: 'Current assets minus current liabilities' }
      ]
    },
    {
      id: 'profitability',
      title: 'Profitability Metrics',
      icon: BadgeDollarSign,
      content: 'Understanding various profitability metrics helps assess a company\'s financial performance and operational efficiency.',
      terms: [
        { term: 'EBITDA', definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization' },
        { term: 'Gross Margin', definition: 'Revenue minus cost of goods sold, divided by revenue' },
        { term: 'Net Profit Margin', definition: 'Net income divided by total revenue' }
      ]
    },
    {
      id: 'ratios',
      title: 'Financial Ratios',
      icon: Calculator,
      content: 'Financial ratios help analyze a company\'s performance and financial health by comparing different metrics.',
      terms: [
        { term: 'Current Ratio', definition: 'Current assets divided by current liabilities' },
        { term: 'Debt-to-Equity', definition: 'Total liabilities divided by shareholders\' equity' },
        { term: 'ROE', definition: 'Return on Equity - Net income divided by shareholders\' equity' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-semibold dark:text-white">FinanceAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Features
              </button>
              <button
                onClick={() => analysisRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Analysis
              </button>
              <button
                onClick={() => learnRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                Learn
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="h-5 w-5 text-gray-300" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
              alt="Financial Analysis"
              className="w-full h-[400px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-2xl flex items-center justify-center">
              <div className="text-white max-w-3xl px-4">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                  Understand Financial Statements Like Never Before
                </h1>
                <p className="text-xl mb-8">
                  AI-Powered Insights in Simple Terms!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <label className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center cursor-pointer relative">
                    <Upload className="h-5 w-5 mr-2" />
                    {selectedFile ? (
                      <div className="flex items-center">
                        <span className="mr-2 max-w-[150px] truncate">{selectedFile.name}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            clearSelectedFile();
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      "Upload Statement"
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} id="features" className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              onClick={() => aiChatRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transform hover:scale-105 transition-transform cursor-pointer"
            >
              <Bot className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">AI Chat Assistant</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant answers to your financial questions from our AI assistant.
              </p>
            </div>
            <div 
              onClick={() => analysisRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transform hover:scale-105 transition-transform cursor-pointer"
            >
              <BarChart3 className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Visual Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beautiful charts and graphs that make financial data easy to understand.
              </p>
            </div>
            <div 
              onClick={() => learnRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transform hover:scale-105 transition-transform cursor-pointer"
            >
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Financial Education</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn financial concepts through interactive lessons and guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Statement Analysis Section */}
      <section id="statement-analysis" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div ref={analysisRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Financial Statement Analysis</h2>
            
            {/* Analysis Navigation */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setSelectedAnalysis('overview')}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  selectedAnalysis === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <Info className="h-4 w-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setSelectedAnalysis('trends')}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  selectedAnalysis === 'trends'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Key Trends
              </button>
              <button
                onClick={() => setSelectedAnalysis('recommendations')}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  selectedAnalysis === 'recommendations'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Recommendations
              </button>
            </div>

            {/* Analysis Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Visual Analysis */}
              <div>
                {selectedAnalysis === 'overview' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Revenue</span>
                        <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-2xl font-semibold dark:text-white">
                        ${(sampleFinancialData.overview.revenue / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        +{sampleFinancialData.overview.revenueGrowth}%
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Gross Margin</span>
                        <Percent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-2xl font-semibold dark:text-white">
                        {sampleFinancialData.overview.grossMargin}%
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Operating Margin</span>
                        <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-2xl font-semibold dark:text-white">
                        {sampleFinancialData.overview.operatingMargin}%
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Current Ratio</span>
                        <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-2xl font-semibold dark:text-white">
                        {sampleFinancialData.overview.currentRatio}
                      </div>
                    </div>
                  </div>
                )}

                {selectedAnalysis === 'trends' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center mb-4">
                        <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                        <h3 className="text-lg font-semibold dark:text-white">Positive Trends</h3>
                      </div>
                      <ul className="space-y-2">
                        {sampleFinancialData.trends.positive.map((trend, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                            {trend}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center mb-4">
                        <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                        <h3 className="text-lg font-semibold dark:text-white">Areas of Concern</h3>
                      </div>
                      <ul className="space-y-2">
                        {sampleFinancialData.trends.negative.map((trend, index) => (
                          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                            {trend}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {selectedAnalysis === 'recommendations' && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Strategic Recommendations</h3>
                    <ul className="space-y-4">
                      {sampleFinancialData.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                          <div>
                            <p className="text-gray-600 dark:text-gray-300">{rec}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column - Charts */}
              <div className="h-[400px]">
                {selectedMetric === 'revenue' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData.revenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#0284c7" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={sampleData.expenses}
                        dataKey="value"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                      >
                        {sampleData.expenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Analysis Section */}
      <section id="analysis" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">Financial Analysis Dashboard</h2>
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    selectedMetric === 'revenue'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <LineChartIcon className="h-4 w-4 mr-2" />
                  Revenue Trends
                </button>
                <button
                  onClick={() => setSelectedMetric('expenses')}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    selectedMetric === 'expenses'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Expense Breakdown
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Chart Section */}
              <div className="h-[400px]">
                {selectedMetric === 'revenue' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData.revenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#0284c7" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={sampleData.expenses}
                        dataKey="value"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                      >
                        {sampleData.expenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Chat Interface */}
              <div ref={aiChatRef} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center mb-4">
                  <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-xl font-semibold dark:text-white">Ask About the Data</h3>
                </div>
                <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          msg.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-600 dark:text-white'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about the financial data..."
                    className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <MessageSquareText className="h-4 w-4 mr-2" />
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section ref={learnRef} id="learn" className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8 dark:text-white">
            Financial Education Center
          </h2>
          <div className="space-y-4">
            {lessons.map((lesson) => {
              const LessonIcon = lesson.icon;
              return (
                <div key={lesson.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center">
                      <LessonIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                      <span className="font-medium dark:text-white">{lesson.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                        activeLesson === lesson.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeLesson === lesson.id && (
                    <div className="p-4 border-t dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{lesson.content}</p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-200">Key Terms:</h4>
                        {lesson.terms.map((item, index) => (
                          <div key={index} className="bg-white dark:bg-gray-600 p-3 rounded-lg">
                            <h5 className="font-medium text-blue-600 dark:text-blue-400">{item.term}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.definition}</p>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 text-blue-600 dark:text-blue-400 font-medium flex items-center">
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold">FinanceAI</span>
            </div>
            <p className="text-gray-400">
              Simplifying financial analysis with artificial intelligence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => analysisRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">
                  Analysis
                </button>
              </li>
              <li>
                <button onClick={() => learnRef.current?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">
                  Learn
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Have questions? Our team is here to help you understand your financial data better.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<GeneralAIChat />} />
    </Routes>
  );
}

export default App;