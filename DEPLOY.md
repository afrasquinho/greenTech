# 🚀 Guia de Deploy - GreenTech Solutions

## Opções Rápidas de Deploy

### 1. **Netlify (Recomendado - Mais Rápido)**

1. Aceda a [netlify.com](https://netlify.com) e faça login
2. Arraste a pasta do projeto para a área de "Deploy"
3. O site ficará online em segundos!
4. Você receberá um URL grátis (ex: greentech.netlify.app)

**Vantagens:**
- ✅ Grátis
- ✅ HTTPS automático
- ✅ Deploy instantâneo
- ✅ URL customizável

---

### 2. **Vercel**

1. Aceda a [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Faça upload da pasta do projeto
4. Deploy automático!

**Vantagens:**
- ✅ Grátis
- ✅ Performance excelente
- ✅ Integração com Git

---

### 3. **GitHub Pages**

1. Crie um repositório no GitHub
2. Faça upload dos ficheiros
3. Vá em Settings → Pages
4. Selecione a branch main
5. O site ficará disponível em: `username.github.io/repository-name`

**Vantagens:**
- ✅ Grátis com GitHub
- ✅ Versionamento automático
- ✅ Deploy via Git

---

### 4. **Hosting Tradicional (cPanel/FTP)**

1. Aceda ao painel do seu hosting
2. Faça upload dos ficheiros via FTP ou File Manager
3. Coloque os ficheiros na pasta `public_html` ou `www`

**Ficheiros necessários:**
- index.html
- styles.css
- script.js

---

## 🎨 Personalização Antes do Deploy

### Substituir "GreenTech" por Outro Nome

```bash
# Use este comando no terminal para substituir rapidamente:
sed -i 's/GreenTech/SEU-NOME/g' index.html
sed -i 's/GreenTech/SEU-NOME/g' styles.css
sed -i 's/GreenTech/SEU-NOME/g' README.md
```

Ou edite manualmente nos ficheiros:
- `index.html` (procure por "GreenTech")
- `styles.css` (procure por "GreenTech" nos comentários)

### Adicionar Email Real

Edite `index.html`, linha aproximadamente 220:

```html
<div class="contact-item">
    <div class="contact-icon">📧</div>
    <div>
        <h3>Email</h3>
        <p>info@greentechsolutions.pt</p> <!-- SUBSTITUA AQUI -->
    </div>
</div>
```

### Adicionar LinkedIn Real

Edite `index.html`, linha aproximadamente 226:

```html
<div class="contact-item">
    <div class="contact-icon">💼</div>
    <div>
        <h3>LinkedIn</h3>
        <p>linkedin.com/company/greentech</p> <!-- SUBSTITUA AQUI -->
    </div>
</div>
```

---

## 📧 Configurar Formulário de Contacto

### Opção 1: Formspree (Mais Fácil)

1. Aceda a [formspree.io](https://formspree.io)
2. Crie uma conta grátis
3. Crie um novo formulário
4. Copie o ID do formulário
5. Edite `index.html` e adicione ao `<form>`:

```html
<form class="contact-form" action="https://formspree.io/f/SEU-ID" method="POST">
```

### Opção 2: EmailJS (Sem Backend)

1. Aceda a [emailjs.com](https://emailjs.com)
2. Crie uma conta
3. Configure um serviço de email
4. Adicione o código JavaScript fornecido

### Opção 3: Backend Próprio

Crie um endpoint que receba o formulário (ex: Node.js, Python Flask, etc.)

---

## 🔍 Testar Localmente

Antes de fazer deploy, teste localmente:

```bash
# Abra o ficheiro index.html no browser
# Ou use Python:
python3 -m http.server 8000

# Aceda a: http://localhost:8000
```

---

## ✅ Checklist de Deploy

- [ ] Substituir nome da empresa (se necessário)
- [ ] Adicionar email real
- [ ] Adicionar LinkedIn real
- [ ] Configurar formulário de contacto
- [ ] Testar em diferentes dispositivos
- [ ] Verificar todas as links funcionam
- [ ] Fazer deploy
- [ ] Testar site online

---

## 🎯 Próximos Passos Após Deploy

1. **Registar Domínio** (opcional): Ex: greentechsolutions.pt
2. **Configurar SSL**: HTTPS automático (Netlify/Vercel)
3. **Google Analytics**: Adicionar tracking
4. **SEO**: Adicionar meta tags
5. **Backup**: Manter cópia local dos ficheiros

---

## 🐛 Problemas Comuns

### O formulário não envia
- Configure Formspree ou EmailJS (ver acima)

### Imagens não aparecem
- Verifique os caminhos das imagens

### Estilos não carregam
- Verifique se `styles.css` está na mesma pasta

### Menu mobile não funciona
- Verifique se `script.js` está carregado

---

## 📞 Precisa de Ajuda?

Consulte o `README.md` para mais informações sobre personalização.

**Bom deploy! 🚀**

