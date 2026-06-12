/**
 * Chat Message Stagger
 * Messages appear sequentially from side with slide + fade
 * For Learning App coaching chat interface
 */

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp?: string
}

interface ChatMessageStaggerProps {
  messages: Message[]
  className?: string
  userBgColor?: string
  botBgColor?: string
  animationDelay?: number
}

const MessageBubble: React.FC<{
  message: Message
  index: number
  userBgColor: string
  botBgColor: string
  animationDelay: number
}> = ({ message, index, userBgColor, botBgColor, animationDelay }) => {
  const isUser = message.sender === 'user'
  const bgColor = isUser ? userBgColor : botBgColor
  const textColor = isUser ? 'text-white' : 'text-ink-900'

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
      initial={{
        opacity: 0,
        x: isUser ? 20 : -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: isUser ? 20 : -20,
      }}
      transition={{
        duration: 0.4,
        delay: index * animationDelay,
        ease: 'easeOut',
      }}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${bgColor} ${textColor} font-body text-body`}
      >
        <p className="m-0">{message.text}</p>
        {message.timestamp && (
          <p className={`text-caption mt-1 opacity-70`}>
            {message.timestamp}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export const ChatMessageStagger: React.FC<ChatMessageStaggerProps> = ({
  messages,
  className = '',
  userBgColor = 'bg-primary-600',
  botBgColor = 'bg-ink-100',
  animationDelay = 0.08,
}) => {
  return (
    <div className={`flex flex-col gap-stack-xs ${className}`}>
      <AnimatePresence>
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            index={index}
            userBgColor={userBgColor}
            botBgColor={botBgColor}
            animationDelay={animationDelay}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ChatMessageStagger
