# ✅ Verificar se Deploy Está Completo

Guia para verificar se frontend e backend estão funcionando.

---

## 🧪 **TESTES RÁPIDOS**

### **1. Testar Backend**

```bash
curl https://greentech-49d3.onrender.com/health
```

**Deve retornar:**
```json
{"status":"healthy","database":"connected"}
```

✅ Se funcionar = Backend OK

---

### **2. Testar Frontend**

1. **Abre o URL do Vercel no browser**
   - Exemplo: `https://seu-projeto.vercel.app`

2. **Verifica:**
   - ✅ Página carrega?
   - ✅ Sem erros no console (F12)?
   - ✅ Consegues ver a homepage?

✅ Se sim = Frontend deployado

---

### **3. Testar Integração**

1. **Abre o frontend no browser**
2. **Abre Console (F12)**
3. **Procura por erros:**
   - ❌ Erros CORS?
   - ❌ Erros de conexão ao backend?
   - ❌ 404 ou 500 errors?

4. **Testa funcionalidades:**
   - Tenta fazer registo
   - Tenta fazer login
   - Verifica se conecta ao backend

✅ Se tudo funcionar = Integração OK

---

## 🔍 **VERIFICAR VARIÁVEIS**

### **No Render (Backend):**

Verifica se `FRONTEND_URL` está correto:
- Deve ser o URL do Vercel (não localhost)
- Formato: `https://seu-projeto.vercel.app`

### **No Vercel (Frontend):**

Verifica se `VITE_API_URL` está correto:
- Deve ser: `https://greentech-49d3.onrender.com/api`

---

## ✅ **CHECKLIST FINAL**

- [ ] Backend health check funciona
- [ ] Frontend carrega no browser
- [ ] Sem erros no console do browser
- [ ] Frontend conecta ao backend
- [ ] Registo funciona
- [ ] Login funciona
- [ ] Variáveis atualizadas corretamente

---

## 🎉 **SE TUDO FUNCIONAR**

**Parabéns! A aplicação está 100% em produção! 🚀**

**URLs:**
- Backend: `https://greentech-49d3.onrender.com`
- Frontend: `https://seu-projeto.vercel.app`

---

## 🐛 **SE ALGO NÃO FUNCIONAR**

### **Frontend não carrega:**
- Verifica se deploy terminou no Vercel
- Verifica logs no Vercel

### **Frontend não conecta ao backend:**
- Verifica `VITE_API_URL` no Vercel
- Verifica `FRONTEND_URL` no Render
- Verifica CORS no backend

### **Erros CORS:**
- Certifica-te que `FRONTEND_URL` no Render é o URL correto do frontend
- Deve ser HTTPS (não HTTP)

---

**Testa e diz-me o resultado! 🧪**

