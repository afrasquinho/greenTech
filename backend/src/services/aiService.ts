import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

const SYSTEM_PROMPT = `Você é um assistente IA da GreenTech Solutions, uma empresa especializada em:
- Desenvolvimento de software à medida (B2B e particulares)
- Consultoria em Quality Assurance Engineering
- Desenvolvimento de carreira e formação em QA

Responda de forma amigável, profissional e em português (PT-PT). Seja conciso mas informativo.`

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function getAIResponse(userMessage: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Fallback mock responses if API key not configured
    return getMockResponse(userMessage)
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return completion.choices[0].message.content || 'Desculpe, não consegui processar sua pergunta.'
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return getMockResponse(userMessage)
  }
}

function getMockResponse(userInput: string): string {
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
    return 'Pode entrar em contacto conosco através do formulário no site! 📧\n\nNossos canais:\n- Email: info@greentechsolutions.pt\n- LinkedIn: Procurar GreenTech Solutions\n\nEstamos prontos para ajudar! 🌟'
  }

  if (lowerInput.includes('empresa') || lowerInput.includes('b2b')) {
    return 'Sim! Trabalhamos tanto com empresas B2B quanto com particulares! 🏢👤\n\nPara empresas:\n- Desenvolvimento de software personalizado\n- Consultoria QA\n- Integração de sistemas\n- Full-stack solutions\n\nVamos discutir sua necessidade? 😊'
  }

  // Default response
  return 'Obrigado pela sua pergunta! 😊\n\nPosso ajudar com:\n- Informações sobre nossos serviços\n- QA Engineering\n- Desenvolvimento de carreira\n- Software à medida\n- Preços e contacto\n\nO que gostaria de saber? 💡'
}

