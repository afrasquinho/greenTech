# 👨‍💼 Criar Utilizador Administrador

Para acederes ao dashboard administrativo, precisas de ter uma conta com role `admin`.

## 📋 Método 1: Através do MongoDB Atlas

1. Acede ao [MongoDB Atlas](https://cloud.mongodb.com/)
2. Vai à tua database `greentech`
3. Collection `users`
4. Clica em **"Insert Document"**
5. Cria um documento assim:

```json
{
  "name": "Teu Nome",
  "email": "teu-email@exemplo.com",
  "password": "$2a$10$HASH_AQUI",
  "role": "admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

**Mas** precisas de hash da password primeiro!

## 🚀 Método 2: Script Node.js (Mais Fácil)

Cria um script para criar o admin:

1. Cria um ficheiro `backend/createAdmin.js`:

```javascript
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'client'], default: 'client' }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado ao MongoDB')

    const email = process.argv[2] || 'admin@greentech.pt'
    const password = process.argv[3] || 'admin123'
    const name = process.argv[4] || 'Administrador'

    // Verificar se já existe
    const existing = await User.findOne({ email })
    if (existing) {
      console.log('⚠️  Utilizador já existe!')
      if (existing.role === 'admin') {
        console.log('✅ Já é admin!')
      } else {
        existing.role = 'admin'
        await existing.save()
        console.log('✅ Role atualizado para admin!')
      }
      process.exit(0)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar admin
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    })

    console.log('✅ Admin criado com sucesso!')
    console.log('Email:', admin.email)
    console.log('Password:', password)
    console.log('Role:', admin.role)

    process.exit(0)
  } catch (error) {
    console.error('❌ Erro:', error.message)
    process.exit(1)
  }
}

createAdmin()
```

2. Executa o script:

```bash
cd backend
node createAdmin.js teu-email@exemplo.com tua-password "Teu Nome"
```

**Exemplo:**
```bash
node createAdmin.js admin@greentech.pt admin123 "João Silva"
```

3. Faz login com essas credenciais no site!

## 🔑 Método 3: Via API (Se já tens conta)

Se já tens uma conta de cliente, podes atualizar para admin:

```bash
cd backend
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
  const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
  return User.findOneAndUpdate(
    { email: 'teu-email@exemplo.com' },
    { role: 'admin' },
    { new: true }
  );
}).then(user => {
  console.log('✅ Role atualizado para admin!');
  console.log('Email:', user.email);
  process.exit(0);
}).catch(err => {
  console.error('❌ Erro:', err.message);
  process.exit(1);
});
"
```

---

**Depois de criares o admin, podes:**
1. Fazer login no site
2. Ver o link "Admin" na Navbar
3. Aceder ao dashboard administrativo em `/admin`

