import { useState } from 'react'
import { chatAPI } from '../services/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    try {
      // Try API first, fallback to mock if fails
      const data = await chatAPI.sendMessage(content)
      const assistantMessage: Message = { role: 'assistant', content: data.response }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('API Error, using fallback:', error)
      // Fallback to mock response
      const response = await mockAIResponse(content)
      const assistantMessage: Message = { role: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
}

// Mock AI response until backend is integrated
const mockAIResponse = async (userInput: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  const lowerInput = userInput.toLowerCase()

  if (lowerInput.includes('serviço') || lowerInput.includes('o que vocês fazem')) {
    return 'Oferecemos três serviços principais:\n\n1. **Software à Medida**: Desenvolvimento full-stack personalizado para suas necessidades específicas\n2. **Consultoria QA**: Especialização em Quality Assurance Engineering\n3. **Desenvolvimento de Carreira**: Formação, mentoria e preparação para mercado de QA\n\nQual desses serviços mais te interessa? 🤔'
  }

  if (lowerInput.includes('qa') || lowerInput.includes('quality')) {
    return 'Somos especialistas em Quality Assurance Engineering! 🎯\n\nOferecemos:\n- Formação completa em QA\n- Consultoria técnica\n- Preparação para entrevistas\n- Melhoria de processos de teste\n- Testes automatizados\n\nQuer saber mais sobre algum aspecto específico?'
  }

  if (lowerInput.includes('preço') || lowerInput.includes('quanto custa') || lowerInput.includes('valor')) {
    return 'Nossos serviços são personalizados conforme suas necessidades! 💰\n\nPara empresas (B2B):\n- Soluções de software customizadas\n- Contratos personalizados\n\nPara particulares:\n- Formação e mentoria em QA\n- Preparação de currículo\n- Otimização LinkedIn\n\nVamos conversar? Entre em contacto! 📧'
  }

  if (lowerInput.includes('contacto') || lowerInput.includes('como entrar em contato')) {
    return 'Pode entrar em contacto conosco através do formulário abaixo! 📧\n\nNossos canais:\n- Email: info@greentechsolutions.pt\n- LinkedIn: Procurar GreenTech Solutions\n\nEstamos prontos para ajudar! 🌟'
  }

  if (lowerInput.includes('empresa') || lowerInput.includes('b2b')) {
    return 'Sim! Trabalhamos tanto com empresas B2B quanto com particulares! 🏢👤\n\nPara empresas:\n- Desenvolvimento de software personalizado\n- Consultoria QA\n- Integração de sistemas\n- Full-stack solutions\n\nVamos discutir sua necessidade? 😊'
  }

  // Default response
  return 'Obrigado pela sua pergunta! 😊\n\nPosso ajudar com:\n- Informações sobre nossos serviços\n- QA Engineering\n- Desenvolvimento de carreira\n- Software à medida\n- Preços e contacto\n\nO que gostaria de saber? 💡'
}

