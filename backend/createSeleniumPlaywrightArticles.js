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

const newArticles = [
  {
    title: 'Selenium WebDriver: Guia Completo para Testes E2E',
    excerpt: 'Aprende a usar Selenium WebDriver para criar testes automatizados robustos em aplicações web. Desde configuração inicial até práticas avançadas.',
    content: `<h2>O que é Selenium?</h2>
<p>Selenium é uma das ferramentas mais populares para automação de testes em aplicações web. Permite controlar navegadores programaticamente e simular interações de utilizadores.</p>

<h2>Porquê Selenium?</h2>
<p>As principais vantagens do Selenium:</p>
<ul>
<li><strong>Suporte multi-navegador:</strong> Chrome, Firefox, Safari, Edge</li>
<li><strong>Múltiplas linguagens:</strong> Java, Python, JavaScript, C#</li>
<li><strong>Open source:</strong> Comunidade ativa e gratuita</li>
<li><strong>Maturidade:</strong> Ferramenta estabelecida com muitos recursos</li>
</ul>

<h2>Configuração Inicial</h2>
<p>Para começar com Selenium em Node.js:</p>
<pre><code>npm install selenium-webdriver
npm install chromedriver --save-dev</code></pre>

<h2>Criando o Primeiro Teste</h2>
<p>Exemplo básico de um teste:</p>
<pre><code>const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

async function exemploTeste() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build()

  try {
    await driver.get('https://exemplo.com')
    await driver.findElement(By.id('username')).sendKeys('usuario')
    await driver.findElement(By.id('password')).sendKeys('senha')
    await driver.findElement(By.css('button[type="submit"]')).click()
    
    await driver.wait(until.titleIs('Dashboard'), 5000)
    console.log('Login bem-sucedido!')
  } finally {
    await driver.quit()
  }
}

exemploTeste()</code></pre>

<h2>Localizadores</h2>
<p>Selenium oferece várias formas de localizar elementos:</p>
<ul>
<li><strong>By.id:</strong> Localizar por ID</li>
<li><strong>By.className:</strong> Localizar por classe CSS</li>
<li><strong>By.cssSelector:</strong> Usar seletores CSS</li>
<li><strong>By.xpath:</strong> Usar expressões XPath</li>
<li><strong>By.linkText:</strong> Localizar links por texto</li>
</ul>

<h2>Esperas (Waits)</h2>
<p>É crucial usar waits para elementos dinâmicos:</p>
<pre><code>// Espera explícita
await driver.wait(
  until.elementLocated(By.id('dynamic-element')),
  10000
)

// Espera implícita
await driver.manage().setTimeouts({ implicit: 10000 })</code></pre>

<h2>Page Object Model</h2>
<p>Organiza os testes usando Page Object Model:</p>
<pre><code>class LoginPage {
  constructor(driver) {
    this.driver = driver
    this.usernameInput = By.id('username')
    this.passwordInput = By.id('password')
    this.submitButton = By.css('button[type="submit"]')
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username)
    await this.driver.findElement(this.passwordInput).sendKeys(password)
    await this.driver.findElement(this.submitButton).click()
  }
}</code></pre>

<h2>Boas Práticas</h2>
<ul>
<li>Usa esperas explícitas em vez de Thread.sleep()</li>
<li>Implementa Page Object Model para manutenibilidade</li>
<li>Mantém testes independentes e isolados</li>
<li>Usa IDs estáveis em vez de seletores frágeis</li>
<li>Configura timeouts apropriados</li>
</ul>

<h2>Desafios Comuns</h2>
<p>Alguns problemas frequentes:</p>
<ul>
<li><strong>Elementos não encontrados:</strong> Adiciona waits apropriados</li>
<li><strong>Testes flaky:</strong> Evita dependências entre testes</li>
<li><strong>Performance:</strong> Otimiza seletores e reduz esperas desnecessárias</li>
<li><strong>Manutenção:</strong> Usa Page Objects para centralizar localizadores</li>
</ul>

<h2>Conclusão</h2>
<p>Selenium continua a ser uma ferramenta poderosa para testes E2E. Com as práticas certas, consegues criar uma suite de testes robusta e manutenível.</p>`,
    category: 'tutorial',
    tags: ['selenium', 'webdriver', 'testing', 'e2e', 'automation'],
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
    readTime: 12
  },
  {
    title: 'Playwright vs Selenium: Qual Escolher em 2024?',
    excerpt: 'Comparação detalhada entre Playwright e Selenium: vantagens, desvantagens e quando usar cada ferramenta para testes automatizados.',
    content: `<h2>Introdução</h2>
<p>Playwright e Selenium são duas das ferramentas mais populares para automação de testes web. Mas qual escolher? Vamos analisar ambas.</p>

<h2>O que é Playwright?</h2>
<p>Playwright é uma ferramenta moderna da Microsoft lançada em 2020. Oferece APIs simples e poderosas para automação de navegadores.</p>

<h2>Comparação de Funcionalidades</h2>

<h3>Velocidade</h3>
<p><strong>Playwright:</strong> ⭐⭐⭐⭐⭐</p>
<ul>
<li>Arquitetura mais moderna</li>
<li>Execução paralela nativa</li>
<li>Menos overhead de comunicação</li>
</ul>

<p><strong>Selenium:</strong> ⭐⭐⭐</p>
<ul>
<li>Mais antigo, pode ser mais lento</li>
<li>Depende do WebDriver protocol</li>
<li>Ainda eficiente para a maioria dos casos</li>
</ul>

<h3>API e Usabilidade</h3>
<p><strong>Playwright:</strong></p>
<pre><code>// Sintaxe simples e intuitiva
await page.click('button')
await page.fill('#username', 'user')
await expect(page.locator('.message')).toHaveText('Success')</code></pre>

<p><strong>Selenium:</strong></p>
<pre><code>// Mais verboso
await driver.findElement(By.id('username')).sendKeys('user')
await driver.findElement(By.css('button')).click()
const message = await driver.findElement(By.css('.message')).getText()
assert(message === 'Success')</code></pre>

<h3>Suporte a Navegadores</h3>
<p><strong>Playwright:</strong></p>
<ul>
<li>Chrome, Firefox, Safari (WebKit)</li>
<li>Navegadores headless e headed</li>
<li>Suporte móvel (emuladores)</li>
</ul>

<p><strong>Selenium:</strong></p>
<ul>
<li>Chrome, Firefox, Safari, Edge, Opera</li>
<li>Maturidade em mais navegadores</li>
<li>Melhor para casos legacy</li>
</ul>

<h3>Recursos Avançados</h3>
<p><strong>Playwright oferece:</strong></p>
<ul>
<li>Auto-wait: Esperas automáticas para elementos</li>
<li>Network interception: Capturar/modificar requests</li>
<li>Mobile emulation: Testar em dispositivos móveis</li>
<li>Codegen: Gerar testes automaticamente</li>
<li>Trace viewer: Debug visual de testes</li>
</ul>

<h3>Quando Usar Playwright?</h3>
<ul>
<li>Projetos novos ou modernos</li>
<li>Precisas de velocidade máxima</li>
<li>Queres features avançadas (network, mobile)</li>
<li>A equipa está disposta a aprender nova ferramenta</li>
<li>Precisas de suporte nativo para múltiplas linguagens</li>
</ul>

<h3>Quando Usar Selenium?</h3>
<ul>
<li>Já tens testes em Selenium (legado)</li>
<li>Precisas de suporte para navegadores específicos</li>
<li>A equipa já conhece bem Selenium</li>
<li>Projeto grande com muitos testes existentes</li>
<li>Precisas de máxima compatibilidade</li>
</ul>

<h2>Migração de Selenium para Playwright</h2>
<p>Se quiseres migrar, a estrutura é similar:</p>
<pre><code>// Selenium
const driver = await new Builder().forBrowser('chrome').build()
await driver.get('https://example.com')
const element = await driver.findElement(By.id('button'))
await element.click()

// Playwright
const { chromium } = require('playwright')
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('https://example.com')
await page.click('#button')</code></pre>

<h2>Performance</h2>
<p>Em benchmarks típicos:</p>
<ul>
<li><strong>Playwright:</strong> ~30-50% mais rápido</li>
<li><strong>Execução paralela:</strong> Playwright tem melhor suporte nativo</li>
<li><strong>Estabilidade:</strong> Ambos são estáveis quando bem configurados</li>
</ul>

<h2>Comunidade e Suporte</h2>
<p><strong>Selenium:</strong></p>
<ul>
<li>Comunidade muito grande e estabelecida</li>
<li>Muitos recursos e tutoriais</li>
<li>Suporte de longa data</li>
</ul>

<p><strong>Playwright:</strong></p>
<ul>
<li>Comunidade em rápido crescimento</li>
<li>Excelente documentação oficial</li>
<li>Suporte ativo da Microsoft</li>
</ul>

<h2>Conclusão</h2>
<p>Para novos projetos, Playwright é geralmente a melhor escolha devido à velocidade, API moderna e recursos avançados. No entanto, Selenium continua a ser uma excelente opção, especialmente se já tens investimento nele ou precisas de compatibilidade máxima.</p>
<p>Ambas as ferramentas têm o seu lugar. A escolha depende das tuas necessidades específicas, experiência da equipa e requisitos do projeto.</p>`,
    category: 'best-practices',
    tags: ['playwright', 'selenium', 'comparison', 'testing', 'automation'],
    featured: true,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    readTime: 15
  },
  {
    title: 'Playwright: Começar do Zero em 30 Minutos',
    excerpt: 'Tutorial prático para começar com Playwright rapidamente. Aprende a configurar, escrever e executar os teus primeiros testes automatizados.',
    content: `<h2>Instalação</h2>
<p>Começa por instalar o Playwright:</p>
<pre><code>npm init -y
npm install @playwright/test
npx playwright install</code></pre>
<p>O comando <code>playwright install</code> baixa os navegadores necessários (Chromium, Firefox, WebKit).</p>

<h2>Configuração Inicial</h2>
<p>Cria o ficheiro <code>playwright.config.js</code>:</p>
<pre><code>const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
})</code></pre>

<h2>Primeiro Teste</h2>
<p>Cria <code>tests/exemplo.spec.js</code>:</p>
<pre><code>const { test, expect } = require('@playwright/test')

test('teste de login', async ({ page }) => {
  await page.goto('https://example.com/login')
  
  await page.fill('#username', 'usuario')
  await page.fill('#password', 'senha123')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL(/.*dashboard/)
  await expect(page.locator('.welcome-message')).toContainText('Bem-vindo')
})</code></pre>

<h2>Executando Testes</h2>
<p>Adiciona scripts ao <code>package.json</code>:</p>
<pre><code>{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug"
  }
}</code></pre>

<h2>Localizadores</h2>
<p>Playwright oferece várias formas de localizar elementos:</p>
<pre><code>// Por texto
await page.click('text=Login')

// Por ID
await page.fill('#username', 'user')

// Por classe
await page.click('.btn-primary')

// Por seletor CSS
await page.click('button[type="submit"]')

// Por role (recomendado)
await page.getByRole('button', { name: 'Submit' }).click()
await page.getByLabel('Email').fill('email@example.com')
await page.getByPlaceholder('Search').fill('query')</code></pre>

<h2>Esperas Automáticas</h2>
<p>Um dos maiores benefícios do Playwright é o auto-wait:</p>
<pre><code>// Playwright espera automaticamente por:
// - Elemento estar visível
// - Elemento estar enabled
// - Elemento estar estável
await page.click('button') // Espera automaticamente!</code></pre>

<h2>Ações Comuns</h2>
<pre><code>// Navegação
await page.goto('https://example.com')
await page.goBack()
await page.goForward()
await page.reload()

// Input
await page.fill('#input', 'texto')
await page.type('#input', 'texto', { delay: 100 }) // Com delay
await page.selectOption('#select', 'option-value')

// Cliques
await page.click('button')
await page.dblclick('element')
await page.hover('menu')

// Upload
await page.setInputFiles('#file', 'path/to/file.pdf')

// Screenshots
await page.screenshot({ path: 'screenshot.png' })
await page.locator('.component').screenshot({ path: 'component.png' })</code></pre>

<h2>Asserções</h2>
<p>Playwright tem asserções poderosas:</p>
<pre><code>await expect(page).toHaveURL(/.*dashboard/)
await expect(page).toHaveTitle('Dashboard')
await expect(page.locator('.message')).toHaveText('Sucesso!')
await expect(page.locator('.count')).toHaveText(/\\d+/)
await expect(page.locator('button')).toBeEnabled()
await expect(page.locator('#modal')).toBeVisible()
await expect(page.locator('.data')).toHaveCount(10)</code></pre>

<h2>Network Interception</h2>
<p>Intercepta e modifica requests:</p>
<pre><code>// Aguardar request
await page.waitForRequest(request => 
  request.url().includes('/api/data')
)

// Mockar response
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ users: [] })
  })
})

// Bloquear requests
await page.route('**/*.{png,jpg,jpeg}', route => route.abort())</code></pre>

<h2>Contexto e Páginas</h2>
<pre><code>// Criar novo contexto (como sessão privada)
const context = await browser.newContext()
const page = await context.newPage()

// Multi-páginas
const [page1, page2] = await Promise.all([
  context.waitForEvent('page'),
  context.waitForEvent('page'),
])</code></pre>

<h2>Codegen: Gerar Testes Automaticamente</h2>
<p>Uma das funcionalidades mais impressionantes:</p>
<pre><code>npx playwright codegen https://example.com</code></pre>
<p>Isto abre o navegador e grava as tuas ações, gerando código de teste automaticamente!</p>

<h2>Debugging</h2>
<p>Várias formas de debugar:</p>
<pre><code># Modo debug (passo a passo)
npx playwright test --debug

# Modo UI (interativo)
npx playwright test --ui

# Traces
npx playwright show-trace trace.zip</code></pre>

<h2>CI/CD</h2>
<p>Playwright funciona perfeitamente em CI:</p>
<pre><code># GitHub Actions
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run tests
  run: npm test

- name: Upload report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/</code></pre>

<h2>Boas Práticas</h2>
<ul>
<li>Usa <code>getByRole</code> quando possível (mais acessível)</li>
<li>Aproveita o auto-wait (não adiciones waits desnecessários)</li>
<li>Organiza testes em ficheiros lógicos</li>
<li>Usa fixtures para setup comum</li>
<li>Testa em múltiplos navegadores</li>
</ul>

<h2>Conclusão</h2>
<p>Em apenas 30 minutos, aprendeste o básico do Playwright. A ferramenta é poderosa, rápida e intuitiva. Experimenta criar os teus próprios testes e explora as funcionalidades avançadas!</p>`,
    category: 'tutorial',
    tags: ['playwright', 'tutorial', 'testing', 'automation', 'e2e'],
    featured: false,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    readTime: 10
  }
]

async function createArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado ao MongoDB')

    // Buscar um admin para ser autor
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
    for (const articleData of newArticles) {
      // Verificar se já existe
      const slug = articleData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const existing = await Article.findOne({ slug })
      
      if (existing) {
        console.log(`⚠️  Artigo já existe: ${articleData.title}`)
        continue
      }

      const article = await Article.create({
        ...articleData,
        slug,
        author: admin._id,
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 50),
        publishedAt: new Date()
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

