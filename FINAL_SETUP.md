# 🎉 Deploy Completo - Configuração Final

Frontend e Backend estão deployados! Agora só falta atualizar os URLs finais.

---

## ✅ **STATUS ATUAL**

### **Backend** ✅
- URL: `https://greentech-49d3.onrender.com`
- Status: Live e funcionando

### **Frontend** ✅
- URL: `https://green-tech-gamma.vercel.app`
- Status: Deployado

---

## 🔄 **ATUALIZAR URLs FINAIS**

### **1. No Render (Backend)**

Atualiza `FRONTEND_URL`:

1. Vai ao teu serviço no Render
2. **Environment** → Encontra `FRONTEND_URL`
3. **Edita o valor para:**
   ```
   https://green-tech-gamma.vercel.app
   ```
4. **Save**

Render vai fazer rebuild automaticamente.

---

### **2. No Vercel (Frontend)**

Verifica se `VITE_API_URL` está correto:

1. Vai ao teu projeto no Vercel
2. **Settings** → **Environment Variables**
3. Verifica se `VITE_API_URL` é:
   ```
   https://greentech-49d3.onrender.com/api
   ```
4. Se não estiver, atualiza e faz re-deploy

---

## 🧪 **TESTAR TUDO**

### **1. Testar Backend**

```bash
curl https://greentech-49d3.onrender.com/health
```

Deve retornar:
```json
{"status":"healthy","database":"connected"}
```

---

### **2. Testar Frontend**

1. **Abre:** https://green-tech-gamma.vercel.app
2. **Verifica:**
   - ✅ Página carrega?
   - ✅ Sem erros no console (F12)?
   - ✅ Consegues ver a homepage?

---

### **3. Testar Integração**

1. **Abre o frontend**
2. **Abre Console (F12)**
3. **Testa:**
   - Tenta fazer registo
   - Tenta fazer login
   - Verifica se conecta ao backend

**Se vires erros CORS:**
- Aguarda o rebuild do Render terminar (após atualizar FRONTEND_URL)
- Verifica se `FRONTEND_URL` está correto no Render

---

## ✅ **CHECKLIST FINAL**

- [ ] `FRONTEND_URL` atualizado no Render: `https://green-tech-gamma.vercel.app`
- [ ] `VITE_API_URL` verificado no Vercel: `https://greentech-49d3.onrender.com/api`
- [ ] Rebuild do Render terminado
- [ ] Frontend carrega sem erros
- [ ] Frontend conecta ao backend
- [ ] Registo/Login funciona
- [ ] Tudo testado

---

## 🎉 **PRONTO!**

Depois de atualizar o `FRONTEND_URL` no Render e aguardar o rebuild:

**A aplicação está 100% em produção! 🚀**

**URLs Finais:**
- Backend: `https://greentech-49d3.onrender.com`
- Frontend: `https://green-tech-gamma.vercel.app`

---

## 🔗 **LINK DIRETO**

**Abre e testa:**
👉 https://green-tech-gamma.vercel.app

---

**Boa sorte! 🎉**

