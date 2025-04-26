'use client'; // Mark this as a client component for useState and event handlers

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header'; // Import the real Header component
import Hero from '../components/Hero'; // Import the real Hero component
import Features from '../components/Features'; // Import the real Features component
import HowItWorks from '../components/HowItWorks'; // Import the real HowItWorks component
import Testimonials from '../components/Testimonials'; // Import the real Testimonials component
import Pricing from '../components/Pricing'; // Import the real Pricing component
import FAQ from '../components/FAQ'; // Import the real FAQ component

// Placeholder components (we will create these later)
// const Header = () => <header className="py-4 bg-gray-100 dark:bg-gray-900 text-center">Header Placeholder</header>; // Remove placeholder
// const Hero = () => <section className="py-20 text-center">Hero Placeholder</section>; // Remove placeholder
// const FeaturesPlaceholder = () => <section className="py-16 bg-gray-50 dark:bg-gray-800 text-center">Features Placeholder</section>; // Remove placeholder
// const HowItWorks = () => <section className="py-16 text-center">How It Works Placeholder</section>; // Remove placeholder
// const TestimonialsPlaceholder = () => <section className="py-16 bg-gray-50 dark:bg-gray-800 text-center">Testimonials Placeholder</section>; // Remove placeholder
// const FAQPlaceholder = () => <section className="py-16 bg-gray-50 dark:bg-gray-800 text-center">FAQ Placeholder</section>; // Remove placeholder
const Footer = () => <footer className="py-8 bg-gray-200 dark:bg-gray-700 text-center">Footer Placeholder</footer>;

// Type definitions for the API request/response (matching api/rewrite.ts)
type RewriteStyle = 'formal' | 'casual' | 'professional' | 'creative' | 'concise';
type RewriteDegree = 'slight' | 'moderate' | 'significant';

export default function Home() {
  const [inputText, setInputText] = useState<string>('');
  const [rewrittenText, setRewrittenText] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<RewriteStyle>('professional');
  const [selectedDegree, setSelectedDegree] = useState<RewriteDegree>('moderate');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingTaskId, setPollingTaskId] = useState<string | null>(null);
  const [queueMessage, setQueueMessage] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollErrorCountRef = useRef<number>(0);
  const MAX_POLL_ERRORS = 3; // 最大轮询错误次数

  const inputMaxLength = parseInt(process.env.NEXT_PUBLIC_INPUT_MAX_LENGTH || '200', 10);

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setPollingTaskId(null);
    setIsLoading(false);
    setQueueMessage(null);
    pollErrorCountRef.current = 0; // 重置错误计数
    
    // 删除这里的按钮重新启用逻辑
    // setTimeout(() => setIsButtonDisabled(false), 1000);
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const pollStatus = async (taskId: string) => {
    try {
      // 重置错误信息
      setError(null);
      
      const response = await fetch(`/api/rewrite-status?taskId=${taskId}`);
      const data = await response.json();

      if (response.status === 200) {
        // 任务完成
        setRewrittenText(data.rewrittenText || 'Received empty result.');
        setError(null);
        stopPolling();
        pollErrorCountRef.current = 0; // 重置错误计数
        // 任务完成后启用按钮
        setTimeout(() => setIsButtonDisabled(false), 1000);
      } else if (response.status === 202) {
        // 任务在队列中或处理中
        setQueueMessage(data.message || 'Still processing in queue...');
        pollErrorCountRef.current = 0; // 重置错误计数
        
        // 如果数据包含已处理的任务文本，但仍在处理中
        if (data.rewrittenText) {
          setRewrittenText(data.rewrittenText);
        }
      } else if (response.status === 404) {
        // 任务未找到，可能是刚刚被添加还未处理
        pollErrorCountRef.current += 1;
        
        if (pollErrorCountRef.current >= MAX_POLL_ERRORS) {
          setError('Unable to find your task. Please try again.');
          stopPolling();
          // 轮询失败后启用按钮
          setTimeout(() => setIsButtonDisabled(false), 2000);
        } else {
          console.log(`Task not found yet (attempt ${pollErrorCountRef.current}/${MAX_POLL_ERRORS}), will retry...`);
        }
      } else {
        // 其他错误
        setError(data.error || `Polling failed with status: ${response.status}`);
        stopPolling();
        // 轮询失败后启用按钮
        setTimeout(() => setIsButtonDisabled(false), 2000);
      }
    } catch (err) {
      pollErrorCountRef.current += 1;
      console.error("Polling failed:", err);
      
      if (pollErrorCountRef.current >= MAX_POLL_ERRORS) {
        const errorMessage = err instanceof Error ? err.message : 'Polling error occurred.';
        setError(errorMessage);
        stopPolling();
        // 轮询失败后启用按钮
        setTimeout(() => setIsButtonDisabled(false), 2000);
      }
    }
  };

  const handleRewrite = async () => {
    setIsLoading(true);
    setError(null);
    setRewrittenText('');
    setQueueMessage(null);
    stopPolling();
    setIsButtonDisabled(true); // 立即禁用按钮

    try {
      // 添加点击防抖，确保按钮不会被快速连续点击
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          style: selectedStyle,
          degree: selectedDegree,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setRewrittenText(data.rewrittenText);
        setIsLoading(false);
        // 延迟重新启用按钮，防止连续点击
        setTimeout(() => setIsButtonDisabled(false), 1000);
      } else if (response.status === 202 && data.taskId) {
        const message = data.message || 'Request queued, waiting for processing...';
        setQueueMessage(message);
        setPollingTaskId(data.taskId);
        
        setTimeout(() => {
          pollingIntervalRef.current = setInterval(() => pollStatus(data.taskId), 1500);
        }, 500);
        // 按钮保持禁用状态，直到轮询结束时在pollStatus函数中启用
      } else if (response.status === 429 && data.isQueued && data.taskId) {
        setQueueMessage(data.message || 'You already have a request in the queue.');
        setPollingTaskId(data.taskId);
        
        pollingIntervalRef.current = setInterval(() => pollStatus(data.taskId), 1500);
        // 按钮保持禁用状态，直到轮询结束时在pollStatus函数中启用
      } else {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Rewrite failed:", err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      setIsLoading(false);
      // 出错时延迟启用按钮
      setTimeout(() => setIsButtonDisabled(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <Head>
        <title>AI Sentence Rewriter - Enhance Your Writing</title>
        <meta name="description" content="Rewrite your sentences with AI in various styles and intensities. Perfect for professionals, students, and writers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <Hero />

        <section id="rewriter" className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-black">
          <div className="max-w-4xl mx-auto relative">
            {/* 处理中遮罩 */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 dark:bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-lg font-medium">
                    {pollingTaskId ? 'Your request is in queue...' : 'Processing your request...'}
                  </span>
                  {queueMessage && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 text-center">{queueMessage}</p>
                  )}
                </div>
              </div>
            )}
            
            <h2 className="text-3xl font-bold text-center mb-8">Rewrite Your Text</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to rewrite..."
                  rows={8}
                  maxLength={inputMaxLength}
                  disabled={isLoading}
                  className={`w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:outline-none 
                    ${isLoading ? 'bg-gray-100 dark:bg-gray-800 opacity-75' : 'bg-white dark:bg-gray-700'} 
                    placeholder-gray-500 dark:placeholder-gray-400`}
                />
                <p className="text-right text-xs text-gray-500 dark:text-gray-400 pr-1">
                  {inputText.length} / {inputMaxLength}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <div className="flex-1">
                    <label htmlFor="style" className="block text-sm font-medium mb-1">Style:</label>
                    <select
                      id="style"
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value as RewriteStyle)}
                      disabled={isLoading}
                      className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        isLoading ? 'bg-gray-100 dark:bg-gray-800 opacity-75 cursor-not-allowed' : 'bg-white dark:bg-gray-700'
                      }`}
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                      <option value="creative">Creative</option>
                      <option value="concise">Concise</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="degree" className="block text-sm font-medium mb-1">Degree of Change:</label>
                    <select
                      id="degree"
                      value={selectedDegree}
                      onChange={(e) => setSelectedDegree(e.target.value as RewriteDegree)}
                      disabled={isLoading}
                      className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                        isLoading ? 'bg-gray-100 dark:bg-gray-800 opacity-75 cursor-not-allowed' : 'bg-white dark:bg-gray-700'
                      }`}
                    >
                      <option value="slight">Slight</option>
                      <option value="moderate">Moderate</option>
                      <option value="significant">Significant</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleRewrite}
                  disabled={isLoading || !inputText.trim() || isButtonDisabled}
                  className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 relative
                    ${isLoading || !inputText.trim() || isButtonDisabled
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-80'
                      : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                    } ${(isLoading || isButtonDisabled) && 'pointer-events-none select-none'}`}
                  title={isLoading || isButtonDisabled ? "Please wait while your request is being processed" : ""}
                >
                  {isLoading || isButtonDisabled ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {pollingTaskId ? 'Waiting in Queue...' : isLoading ? 'Rewriting...' : 'Processing Request...'}
                    </span>
                  ) : 'Rewrite Text'}
                </button>
                {queueMessage && (
                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                      <span className="font-medium">Queue Status:</span> {queueMessage}
                      {pollingTaskId && <span className="block mt-1 text-xs">Your request will be processed soon. Please wait...</span>}
                    </p>
                )}
              </div>

              <div className="flex flex-col">
                <textarea
                  value={rewrittenText}
                  readOnly
                  placeholder={isLoading ? "Processing your request..." : "Rewritten text will appear here..."}
                  rows={8}
                  className={`w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                    ${isLoading ? 'bg-blue-50 dark:bg-blue-900/20 animate-pulse' : 'bg-gray-50 dark:bg-gray-800'} 
                    placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">Error: {error}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
