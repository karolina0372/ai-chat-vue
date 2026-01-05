export type MessageRole = 'user' | 'assistant'

export interface Message {
  content: string
  role: MessageRole
}

export interface Chat {
  id: string
  title: string
  isPrivate?: boolean
  messages: Message[]
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}