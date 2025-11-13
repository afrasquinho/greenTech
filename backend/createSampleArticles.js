const mongoose = require('mongoose')
require('dotenv').config()

const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  tags: [String],
  featured: Boolean,
  published: Boolean,
  publishedAt: Date,
  coverImage: String,
  readTime: Number,
  views: Number,
  likes: Number
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)
const Article = mongoose.model('Article', ArticleSchema)

const sampleArticles = [
  {
    title: 'Guia Completo: Testes Automatizados com Jest e React Testing Library',
    excerpt: 'Aprende a criar testes robustos para aplicações React usando Jest e React Testing Library. Inclui exemplos práticos e boas práticas.',
    content: `<h2>Introdução aos Testes Automatizados</h2>
<p>Os testes automatizados são fundamentais para garantir a qualidade do código e prevenir regressões. Neste artigo, vamos explorar como criar testes eficazes para aplicações React.</p>

<h2>Porquê Testar?</h2>
<p>Os testes automatizados oferecem várias vantagens:</p>
<ul>
<li><strong>Confiança:</strong> Permitem fazer refatorações com segurança</li>
<li><strong>Documentação:</strong> Servem como exemplos de uso do código</li>
<li><strong>Prevenção:</strong> Detectam bugs antes de chegarem à produção</li>
<li><strong>Velocidade:</strong> Testam mais rápido que testes manuais</li>
</ul>

<h2>Configuração Inicial</h2>
<p>Começa por instalar as dependências necessárias:</p>
<pre><code>npm install --save-dev jest @testing-library/react @testing-library/jest-dom</code></pre>

<h2>Escrevendo o Primeiro Teste</h2>
<p>Vamos criar um componente simples e testá-lo:</p>
<pre><code>// Button.test.js
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renderiza o botão com o texto correto', () => {
  render(&lt;Button&gt;Clique aqui&lt;/Button&gt;)
  const button = screen.getByText('Clique aqui')
  expect(button).toBeInTheDocument()
})</code></pre>

<h2>Testes de Interação</h2>
<p>Testar interações do utilizador é essencial:</p>
<pre><code>import { render, screen, fireEvent } from '@testing-library/react'

test('chama a função onClick quando clicado', () => {
  const handleClick = jest.fn()
  render(&lt;Button onClick={handleClick}&gt;Clique&lt;/Button&gt;)
  
  fireEvent.click(screen.getByText('Clique'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})</code></pre>

<h2>Boas Práticas</h2>
<ul>
<li>Testa comportamentos, não implementação</li>
<li>Usa queries acessíveis (getByRole, getByLabelText)</li>
<li>Mantém testes simples e focados</li>
<li>Evita testes frágeis (não testes detalhes internos)</li>
</ul>

<h2>Conclusão</h2>
<p>Os testes automatizados são uma parte essencial do desenvolvimento moderno. Com Jest e React Testing Library, tens as ferramentas certas para criar testes robustos e manuteníveis.</p>`,
    category: 'tutorial',
    tags: ['react', 'testing', 'jest', 'qa', 'tutorial'],
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    readTime: 8
  },
  {
    title: 'Como Construir APIs REST Robustas com Node.js e Express',
    excerpt: 'Descobre as melhores práticas para criar APIs REST escaláveis e manuteníveis usando Node.js, Express e TypeScript.',
    content: `<h2>Porquê APIs REST?</h2>
<p>As APIs REST são o padrão mais comum para comunicação entre sistemas. Oferecem simplicidade, escalabilidade e facilidade de implementação.</p>

<h2>Estrutura de um Projeto Node.js</h2>
<p>Começa por organizar o teu projeto de forma clara:</p>
<pre><code>src/
  controllers/
  models/
  routes/
  middleware/
  utils/
  config/</code></pre>

<h2>Criando a Primeira Rota</h2>
<pre><code>// routes/users.js
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json({ success: true, users })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router</code></pre>

<h2>Middleware de Autenticação</h2>
<p>Protege as tuas rotas com middleware de autenticação:</p>
<pre><code>const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  // Verificar token...
  next()
}</code></pre>

<h2>Validação de Dados</h2>
<p>Usa validação para garantir a integridade dos dados:</p>
<ul>
<li><strong>express-validator:</strong> Validação de schemas</li>
<li><strong>Joi:</strong> Schemas de validação poderosos</li>
<li><strong>yup:</strong> Validação tipo-first</li>
</ul>

<h2>Tratamento de Erros</h2>
<p>Implementa um middleware centralizado para erros:</p>
<pre><code>const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  })
}</code></pre>

<h2>Boas Práticas</h2>
<ul>
<li>Usa códigos HTTP corretos (200, 201, 400, 404, 500)</li>
<li>Implementa paginação para listas grandes</li>
<li>Adiciona rate limiting</li>
<li>Documenta a API (Swagger/OpenAPI)</li>
<li>Implementa logging estruturado</li>
</ul>

<h2>Conclusão</h2>
<p>Construir APIs REST robustas requer atenção aos detalhes, mas com as práticas certas, consegues criar APIs escaláveis e manuteníveis.</p>`,
    category: 'tech',
    tags: ['nodejs', 'express', 'api', 'rest', 'backend'],
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    readTime: 10
  },
  {
    title: '5 Estratégias para Melhorar a Qualidade de Código em Equipa',
    excerpt: 'Descobre técnicas práticas para manter código limpo, legível e manutenível quando trabalhas em equipa.',
    content: `<h2>1. Code Reviews Estruturados</h2>
<p>Os code reviews são essenciais para manter a qualidade. Estabelece guidelines claros:</p>
<ul>
<li>Revisa código de forma construtiva</li>
<li>Foca na lógica e legibilidade</li>
<li>Evita revisões demasiado longas</li>
<li>Usa checklists padronizadas</li>
</ul>

<h2>2. Linting e Formatação Automática</h2>
<p>Configura ferramentas que garantem consistência:</p>
<pre><code>// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error'
  }
}</code></pre>
<p>Usa Prettier para formatação automática e configura pre-commit hooks.</p>

<h2>3. Testes como Documentação</h2>
<p>Escreve testes que servem como exemplos de uso:</p>
<ul>
<li>Testes unitários para funções isoladas</li>
<li>Testes de integração para fluxos completos</li>
<li>Testes E2E para casos de uso críticos</li>
</ul>

<h2>4. Documentação Viva</h2>
<p>Mantém documentação atualizada:</p>
<ul>
<li>READMEs claros e completos</li>
<li>Comentários no código (quando necessário)</li>
<li>Documentação de APIs (Swagger/OpenAPI)</li>
<li>Changelog para versões</li>
</ul>

<h2>5. Pair Programming e Knowledge Sharing</h2>
<p>Promove partilha de conhecimento:</p>
<ul>
<li>Session de pair programming para problemas complexos</li>
<li>Tech talks internos</li>
<li>Documentação de decisões técnicas (ADR)</li>
<li>Onboarding bem estruturado</li>
</ul>

<h2>Ferramentas Recomendadas</h2>
<ul>
<li><strong>SonarQube:</strong> Análise de qualidade de código</li>
<li><strong>Husky:</strong> Git hooks</li>
<li><strong>ESLint/Prettier:</strong> Linting e formatação</li>
<li><strong>Conventional Commits:</strong> Mensagens de commit padronizadas</li>
</ul>

<h2>Conclusão</h2>
<p>Manter código de qualidade em equipa requer disciplina e ferramentas certas. Implementa estas estratégias gradualmente e verás melhorias significativas na qualidade do teu código.</p>`,
    category: 'best-practices',
    tags: ['qualidade', 'code-review', 'equipa', 'best-practices'],
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    readTime: 7
  },
  {
    title: 'TypeScript: Do JavaScript ao Type Safety',
    excerpt: 'Aprende como TypeScript pode melhorar a tua produtividade e reduzir bugs através de tipos estáticos.',
    content: `<h2>O que é TypeScript?</h2>
<p>TypeScript é um superset de JavaScript que adiciona tipagem estática. Compila para JavaScript puro mas oferece validação de tipos em tempo de desenvolvimento.</p>

<h2>Vantagens do TypeScript</h2>
<ul>
<li><strong>Detecção precoce de erros:</strong> Encontra bugs antes de executar</li>
<li><strong>Melhor autocomplete:</strong> IDEs oferecem sugestões mais inteligentes</li>
<li><strong>Refactoring seguro:</strong> Muda código com confiança</li>
<li><strong>Documentação implícita:</strong> Tipos servem como documentação</li>
</ul>

<h2>Tipos Básicos</h2>
<pre><code>// Variáveis
let nome: string = "João"
let idade: number = 30
let ativo: boolean = true

// Arrays
let numeros: number[] = [1, 2, 3]
let nomes: Array&lt;string&gt; = ["Ana", "João"]

// Objetos
interface User {
  id: number
  nome: string
  email: string
}

const usuario: User = {
  id: 1,
  nome: "João",
  email: "joao@exemplo.com"
}</code></pre>

<h2>Funções Tipadas</h2>
<pre><code>function somar(a: number, b: number): number {
  return a + b
}

// Arrow functions
const multiplicar = (a: number, b: number): number => {
  return a * b
}

// Funções async
async function buscarUser(id: number): Promise&lt;User&gt; {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}</code></pre>

<h2>Interfaces vs Types</h2>
<p>Ambos servem para definir formas, mas têm diferenças:</p>
<pre><code>// Interface - pode ser estendida
interface Animal {
  nome: string
}

interface Cachorro extends Animal {
  raca: string
}

// Type - mais flexível para unions e intersections
type Status = 'ativo' | 'inativo' | 'pendente'
type UserWithStatus = User & { status: Status }</code></pre>

<h2>Generics</h2>
<p>Permitem criar componentes reutilizáveis:</p>
<pre><code>function primeiro&lt;T&gt;(lista: T[]): T | undefined {
  return lista[0]
}

const primeiroNumero = primeiro([1, 2, 3]) // number | undefined
const primeiroNome = primeiro(["Ana", "João"]) // string | undefined</code></pre>

<h2>Migrando de JavaScript</h2>
<p>TypeScript é incremental - podes adicionar gradualmente:</p>
<ol>
<li>Renomeia .js para .ts</li>
<li>Corrige erros básicos de tipo</li>
<li>Adiciona tipos gradualmente</li>
<li>Ativa strict mode quando estiveres confortável</li>
</ol>

<h2>Conclusão</h2>
<p>TypeScript não é apenas uma camada de tipos - é uma ferramenta poderosa que melhora a experiência de desenvolvimento e reduz bugs em produção.</p>`,
    category: 'tutorial',
    tags: ['typescript', 'javascript', 'tutorial', 'tipagem'],
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    readTime: 9
  },
  {
    title: 'Casos de Sucesso: Migração de Monolito para Microserviços',
    excerpt: 'Um caso de estudo real sobre como migramos uma aplicação monolítica para uma arquitetura de microserviços.',
    content: `<h2>O Desafio</h2>
<p>Uma aplicação monolítica com mais de 500k linhas de código começou a apresentar problemas de escalabilidade e manutenibilidade. O tempo de deploy era superior a 30 minutos e qualquer mudança afetava todo o sistema.</p>

<h2>Análise Inicial</h2>
<p>Identificámos os principais problemas:</p>
<ul>
<li>Deploy lento e arriscado</li>
<li>Escalabilidade limitada</li>
<li>Dificuldade em adicionar novas funcionalidades</li>
<li>Dependências complexas entre módulos</li>
</ul>

<h2>Estratégia de Migração</h2>
<p>Optámos por uma abordagem incremental (Strangler Pattern):</p>
<ol>
<li><strong>Identificar domínios:</strong> Separámos o sistema em contextos delimitados</li>
<li><strong>Extrair APIs:</strong> Criámos APIs REST para cada domínio</li>
<li><strong>Migrar gradualmente:</strong> Movemos funcionalidades uma a uma</li>
<li><strong>Manter compatibilidade:</strong> O monolito continuou funcionando durante a migração</li>
</ol>

<h2>Tecnologias Escolhidas</h2>
<ul>
<li><strong>Backend:</strong> Node.js com Express (microserviços leves)</li>
<li><strong>Comunicação:</strong> REST APIs + Message Queue (RabbitMQ)</li>
<li><strong>Orquestração:</strong> Kubernetes para deploy e escalabilidade</li>
<li><strong>Monitorização:</strong> Prometheus + Grafana</li>
</ul>

<h2>Resultados</h2>
<p>Após 6 meses de migração:</p>
<ul>
<li>✅ Tempo de deploy reduzido de 30min para 5min</li>
<li>✅ Escalabilidade independente por serviço</li>
<li>✅ Equipas mais autónomas e produtivas</li>
<li>✅ Redução de 60% em incidentes de produção</li>
<li>✅ Facilidade em adicionar novas funcionalidades</li>
</ul>

<h2>Desafios Encontrados</h2>
<p>Nem tudo foi fácil:</p>
<ul>
<li>Gestão de dados distribuídos</li>
<li>Comunicação entre serviços</li>
<li>Debugging mais complexo</li>
<li>Curva de aprendizagem da equipa</li>
</ul>

<h2>Lições Aprendidas</h2>
<ul>
<li>Migrações incrementais são menos arriscadas</li>
<li>Invista em observabilidade desde o início</li>
<li>Documentação é crucial em arquiteturas distribuídas</li>
<li>Comunicação clara entre equipas é essencial</li>
</ul>

<h2>Conclusão</h2>
<p>A migração para microserviços foi um sucesso, mas requer planeamento cuidadoso e uma abordagem incremental. Os benefícios a longo prazo justificam o investimento inicial.</p>`,
    category: 'case-study',
    tags: ['microserviços', 'arquitetura', 'nodejs', 'devops'],
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    readTime: 12
  },
  {
    title: 'Novidades no Ecossistema JavaScript 2024',
    excerpt: 'Uma visão geral das principais novidades e tendências no ecossistema JavaScript para 2024.',
    content: `<h2>React 19 e Server Components</h2>
<p>React 19 traz melhorias significativas, especialmente nos Server Components que permitem renderizar componentes diretamente no servidor, reduzindo o bundle size do cliente.</p>

<h2>Next.js 14 e App Router</h2>
<p>O App Router está estável e oferece:</p>
<ul>
<li>Nested layouts</li>
<li>Streaming e Suspense integrados</li>
<li>Server Components por padrão</li>
<li>Melhor performance</li>
</ul>

<h2>Vite Continua a Crescer</h2>
<p>Vite tornou-se o bundler padrão para muitos projetos. A velocidade de desenvolvimento e a experiência do desenvolvedor são incomparáveis.</p>

<h2>Bun: O Novo Runtime</h2>
<p>Bun está a ganhar tração como alternativa ao Node.js:</p>
<ul>
<li>Runtime extremamente rápido</li>
<li>Compatibilidade com Node.js APIs</li>
<li>Bundler e test runner integrados</li>
<li>TypeScript nativo</li>
</ul>

<h2>Tendências em Frameworks</h2>
<ul>
<li><strong>Remix:</strong> Foco em web standards</li>
<li><strong>SvelteKit:</strong> Performance excecional</li>
<li><strong>Astro:</strong> Islands architecture</li>
</ul>

<h2>Ferramentas de Qualidade</h2>
<p>Ferramentas que estão a ganhar destaque:</p>
<ul>
<li><strong>Biome:</strong> Linter e formatter rápido (alternativa ao ESLint)</li>
<li><strong>Playwright:</strong> Testes E2E robustos</li>
<li><strong>Vitest:</strong> Test runner baseado em Vite</li>
</ul>

<h2>O Futuro</h2>
<p>As tendências apontam para:</p>
<ul>
<li>Mais foco em performance</li>
<li>Server-side rendering por padrão</li>
<li>TypeScript como standard</li>
<li>Ferramentas mais rápidas</li>
</ul>

<h2>Conclusão</h2>
<p>O ecossistema JavaScript continua a evoluir rapidamente. A chave é manter-se atualizado, mas também escolher ferramentas estáveis para projetos de produção.</p>`,
    category: 'news',
    tags: ['javascript', 'react', 'nextjs', 'trends', '2024'],
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    readTime: 6
  }
]

async function createArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado ao MongoDB')

    // Buscar um admin para ser autor (ou criar um se não existir)
    let admin = await User.findOne({ role: 'admin' })
    if (!admin) {
      admin = await User.findOne()
      if (!admin) {
        console.log('❌ Nenhum utilizador encontrado. Por favor, cria um utilizador primeiro.')
        process.exit(1)
      }
    }

    console.log(`📝 Usando ${admin.name} como autor dos artigos`)

    // Criar artigos
    for (const articleData of sampleArticles) {
      // Verificar se já existe
      const existing = await Article.findOne({ slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })
      
      if (existing) {
        console.log(`⚠️  Artigo já existe: ${articleData.title}`)
        continue
      }

      // Gerar slug
      const slug = articleData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const article = await Article.create({
        ...articleData,
        slug,
        author: admin._id,
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 50),
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Últimos 30 dias
      })

      console.log(`✅ Artigo criado: ${article.title}`)
    }

    console.log('\n✅ Todos os artigos foram criados com sucesso!')
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro:', error.message)
    await mongoose.disconnect()
    process.exit(1)
  }
}

createArticles()

