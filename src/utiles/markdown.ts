import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({
  breaks: true,
})

export const renderMarkdown = async (text: string): Promise<string> => {
  const html = await marked.parse(text)

  return DOMPurify.sanitize(html)
}
