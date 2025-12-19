import axios from 'axios'
import type { Message } from '@/stores/types';

const api = axios.create({
  baseURL: 'https://api.cerebras.ai/v1',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
    'Content-Type': 'application/json'
  }
})

export async function sendToAI(
  messages: Message[]
) {
  const response = await api.post('/chat/completions', {
    model: 'llama3.1-8b',
    messages
  })

  return response.data.choices[0].message
}

export const generateChatTitle = async (message: string): Promise<string> => {
  const response = await axios.post(
    '/chat/completions',
    {
      model: 'llama3.1-8b',
      messages: [
        {
          role: 'system',
          content:`
            You generate chat titles.

            Rules:
            - Summarize the topic, do NOT copy the sentence
            - Max 3–5 words
            - No quotes
            - No punctuation at the end
            - Use nouns, not verbs
            - Title case
            `
        },
        {
          role: 'user',
          content: message,
        },
      ],
    },
  )

  return response.data.choices[0].message
}


