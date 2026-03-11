"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Minimize, Maximize, Bot, Sparkles, Lightbulb, Zap, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { faqData, type FAQItem } from "@/data/faq-data"
import { useMediaQuery } from "@/hooks/use-media-query"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function AIChatAgent() {
  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm Uless Assistant. How can I help you find exclusive student discounts today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [suggestedQuestions, setSuggestedQuestions] = useState<FAQItem[]>(
    faqData.slice(0, 5), // Show first 5 questions initially
  )
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showInitialAnimation, setShowInitialAnimation] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [pulseEffect, setPulseEffect] = useState(true)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Disable initial animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Disable pulse effect after 10 seconds or after interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setPulseEffect(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
    setHasInteracted(true)
    setPulseEffect(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    // Filter suggested questions based on input
    if (e.target.value.trim()) {
      const filtered = faqData
        .filter(
          (item) =>
            item.question.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.answer.toLowerCase().includes(e.target.value.toLowerCase()),
        )
        .slice(0, 3)
      setSuggestedQuestions(filtered)
    } else {
      setSuggestedQuestions(faqData.slice(0, 5))
    }
  }

  const findAnswer = (question: string): string => {
    // Try to find an exact match
    const exactMatch = faqData.find((item) => item.question.toLowerCase() === question.toLowerCase())

    if (exactMatch) return exactMatch.answer

    // Try to find a partial match
    const partialMatch = faqData.find(
      (item) =>
        item.question.toLowerCase().includes(question.toLowerCase()) ||
        question.toLowerCase().includes(item.question.toLowerCase()),
    )

    if (partialMatch) return partialMatch.answer

    // If no match found, return a default response
    return "I don't have specific information about that yet. Please try asking about student discounts, verification, or how to redeem offers. You can also contact our support team for more assistance."
  }

  const simulateTyping = (answer: string) => {
    setIsTyping(true)

    // Simulate typing delay based on answer length
    const typingDelay = Math.min(1500, Math.max(800, answer.length * 10))

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          content: answer,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }, typingDelay)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Find and send answer
    const answer = findAnswer(inputValue)
    simulateTyping(answer)

    // Clear input and reset suggestions
    setInputValue("")
    setSuggestedQuestions(faqData.slice(0, 5))
    setHasInteracted(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    // Add user message with the suggested question
    const userMessage = {
      id: `user-${Date.now()}`,
      content: question,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Find and send answer
    const answer = findAnswer(question)
    simulateTyping(answer)

    // Reset suggestions
    setSuggestedQuestions(faqData.slice(0, 5))
    setHasInteracted(true)
  }

  // Determine chat window dimensions based on device
  const getChatWindowClasses = () => {
    if (isMobile) {
      return "fixed bottom-0 left-0 right-0 z-50 w-full max-h-[80vh]"
    } else if (isTablet) {
      return "fixed bottom-24 right-6 z-50 w-[350px] max-w-[90vw]"
    } else {
      return "fixed bottom-24 right-6 z-50 w-96 max-w-[90vw]"
    }
  }

  // Determine chat button position based on device
  const getChatButtonClasses = () => {
    if (isMobile) {
      return "fixed bottom-4 right-4 z-50"
    } else {
      return "fixed bottom-6 right-6 z-50"
    }
  }

  // Determine message container height based on device
  const getMessageContainerClasses = () => {
    if (isMobile) {
      return "h-[50vh] overflow-y-auto p-3 bg-gradient-to-b from-indigo-50 to-white"
    } else {
      return "h-80 overflow-y-auto p-3 bg-gradient-to-b from-indigo-50 to-white"
    }
  }

  return (
    <>
      {/* Chat button */}
      <motion.div
        className={getChatButtonClasses()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="relative"
          animate={pulseEffect ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          {pulseEffect && <div className="absolute inset-0 rounded-full bg-[#5B48D9] opacity-30 animate-ping"></div>}
          <Button
            onClick={toggleChat}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#5B48D9] to-[#7B68FF] hover:from-[#4a3ac0] hover:to-[#6a58e0] shadow-lg flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full"></span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={getChatWindowClasses()}
            initial={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, y: 20, scale: 0.9 }}
            animate={
              isMinimized
                ? { opacity: 1, y: 0, scale: 0.9 }
                : isMobile
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, scale: 1 }
            }
            exit={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className="border border-gray-200 shadow-2xl overflow-hidden h-full flex flex-col bg-white rounded-xl">
              <CardHeader className="p-3 bg-gradient-to-r from-[#5B48D9] to-[#7B68FF] text-white flex flex-row items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>

                <div className="flex items-center relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></div>
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 mr-2 bg-white/20 border border-white/40">
                      <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="font-medium text-xs sm:text-sm flex items-center">
                      Uless Assistant
                      <Sparkles className="h-3 w-3 ml-1 text-yellow-300" />
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/70">Student Discount Expert</p>
                  </div>
                </div>
                <div className="flex space-x-1 relative z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-white/20 transition-colors duration-200"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? (
                      <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <Minimize className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 sm:h-7 sm:w-7 rounded-full hover:bg-white/20 transition-colors duration-200"
                    onClick={toggleChat}
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    className="flex-1 flex flex-col"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="p-0 flex-1 flex flex-col">
                      <div className={getMessageContainerClasses()}>
                        {showInitialAnimation && !hasInteracted && (
                          <div className="flex justify-center items-center h-full absolute inset-0 bg-gradient-to-b from-indigo-50 to-white z-10">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="text-center p-4"
                            >
                              <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                                className="inline-block mb-3"
                              >
                                <Sparkles className="h-8 w-8 text-[#5B48D9]" />
                              </motion.div>
                              <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-lg font-bold text-[#5B48D9] mb-2"
                              >
                                Discover Student Savings
                              </motion.h3>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="text-sm text-gray-600 mb-4"
                              >
                                Ask me about exclusive student discounts and deals!
                              </motion.p>
                              <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                                className="bg-gradient-to-r from-[#5B48D9] to-[#7B68FF] text-white px-4 py-2 rounded-full text-sm font-medium hover:from-[#4a3ac0] hover:to-[#6a58e0] transition-all duration-300 shadow-md hover:shadow-lg"
                                onClick={() => setShowInitialAnimation(false)}
                              >
                                Start Chatting
                              </motion.button>
                            </motion.div>
                          </div>
                        )}

                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-lg p-2 sm:p-2.5 ${
                                message.sender === "user"
                                  ? "bg-gradient-to-r from-[#5B48D9] to-[#7B68FF] text-white shadow-md"
                                  : "bg-white border border-gray-200 shadow-sm"
                              }`}
                            >
                              <p className="text-xs sm:text-sm">{message.content}</p>
                              <div className="flex items-center justify-between">
                                <p
                                  className={`text-[10px] sm:text-xs mt-1 ${
                                    message.sender === "user" ? "text-white/70" : "text-gray-500"
                                  }`}
                                >
                                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                                {message.sender === "bot" && <Zap className="h-3 w-3 text-[#5B48D9] ml-1" />}
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-3 flex justify-start"
                          >
                            <div className="max-w-[85%] rounded-lg p-2 sm:p-3 bg-white border border-gray-200 shadow-sm">
                              <div className="flex space-x-1">
                                <motion.div
                                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5B48D9]"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                                ></motion.div>
                                <motion.div
                                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5B48D9]"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.3 }}
                                ></motion.div>
                                <motion.div
                                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5B48D9]"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.6 }}
                                ></motion.div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>

                      {/* Suggested questions */}
                      {suggestedQuestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="p-2 border-t border-gray-200 bg-white"
                        >
                          <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2 flex items-center">
                            <Lightbulb className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-[#5B48D9]" />
                            Popular questions:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {suggestedQuestions.map((item, index) => (
                              <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => handleSuggestedQuestion(item.question)}
                                className="text-[10px] sm:text-xs bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-[#5B48D9] px-2 py-1 rounded-full transition-colors duration-300 border border-indigo-100 flex items-center group"
                              >
                                {item.question}
                                <ChevronRight className="h-3 w-0 opacity-0 group-hover:w-3 group-hover:opacity-100 ml-0 group-hover:ml-1 transition-all duration-300" />
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </CardContent>

                    <CardFooter className="p-1.5 sm:p-2 border-t mt-auto bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex w-full items-center space-x-1 sm:space-x-2">
                        <Input
                          placeholder="Ask about student discounts..."
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          className="text-xs sm:text-sm h-8 sm:h-10 border-gray-300 focus:border-[#5B48D9] focus:ring-[#5B48D9] transition-all duration-300 bg-white"
                        />
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim()}
                          className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-[#5B48D9] to-[#7B68FF] hover:from-[#4a3ac0] hover:to-[#6a58e0] text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
                        >
                          <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
