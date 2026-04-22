# 🔧 INSTALAÇÃO CORRIGIDA - Sovereign Wallet

## 🚨 **PROBLEMA RESOLVIDO:**

**Erro:** `npm error ERESOLVE unable to resolve dependency tree`
**Causa:** Conflito entre `@typechain/ethers-v6@0.5.1` e `@nomicfoundation/hardhat-toolbox@3.0.0`

**Solução:** Atualizado para versões compatíveis:
- `@typechain/ethers-v6`: `^0.4.0` (em vez de `^0.5.0`)
- `@nomicfoundation/hardhat-toolbox`: `^4.0.0` (em vez de `^3.0.0`)
- `hardhat`: `^2.22.0` (em vez de `^2.19.0`)

## 📦 **INSTALAÇÃO CORRETA:**

### **1. Atualize o código no seu repositório:**
```bash
# Puxe as correções
git pull origin master

# Ou se preferir, faça manualmente:
# Edite contracts/package.json com as versões acima
```

### **2. Instale as dependências CORRETAMENTE:**
```bash
cd contracts

# Limpe cache do npm (opcional, mas recomendado)
npm cache clean --force

# Instale com --legacy-peer-deps para evitar conflitos
npm install --legacy-peer-deps

# Ou se quiser forçar a instalação correta
npm install --force
```

### **3. Teste a instalação:**
```bash
# Compile os contratos
npm run compile

# Rode os testes
npm run test

# Verifique cobertura
npm run test:coverage
```

## 🛠️ **SE AINDA DER ERRO:**

### **Opção A: Delete node_modules e reinstale:**
```bash
cd contracts
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### **Opção B: Use yarn (se preferir):**
```bash
cd contracts
yarn install
```

### **Opção C: Use versões específicas:**
Edite `package.json` para usar versões exatas:
```json
"devDependencies": {
  "@nomicfoundation/hardhat-toolbox": "4.0.0",
  "@typechain/ethers-v6": "0.4.0",
  "hardhat": "2.22.0"
}
```

## 📊 **VERSÕES TESTADAS E COMPATÍVEIS:**

### **Funciona:**
- Node.js: 18.x, 20.x
- npm: 9.x, 10.x
- hardhat-toolbox: 4.0.0
- typechain/ethers-v6: 0.4.0
- hardhat: 2.22.0

### **NÃO funciona:**
- typechain/ethers-v6: 0.5.x com hardhat-toolbox: 3.x

## 🔍 **VERIFIQUE SUA INSTALAÇÃO:**

### **Comandos que devem funcionar:**
```bash
# Verifique versões instaladas
npx hardhat --version
npx typechain --version

# Verifique dependências
npm list @nomicfoundation/hardhat-toolbox
npm list @typechain/ethers-v6
```

### **Saída esperada:**
```
@nomicfoundation/hardhat-toolbox@4.0.0
@typechain/ethers-v6@0.4.0
hardhat@2.22.0
```

## 🚀 **PRÓXIMOS PASSOS APÓS INSTALAÇÃO:**

### **1. Configure ambiente:**
```bash
cd contracts
cp .env.example .env
# Edite .env com suas chaves
```

### **2. Teste completo:**
```bash
npm run compile    # ✅ Compilar
npm run test       # ✅ Testes
npm run lint       # ✅ Linting
npm run typechain  # ✅ Typechain
```

### **3. Deploy para testnet:**
```bash
# Configure .env primeiro!
npm run deploy:goerli
```

## 📁 **ESTRUTURA DO PROJETO:**

```
sovereign-wallet/
├── contracts/          # Smart contracts (funciona agora!)
├── frontend/          # App React Native
├── docs/              # Documentação
├── scripts/           # Scripts utilitários
└── .github/workflows/ # CI/CD
```

## ⚠️ **PROBLEMAS COMUNS E SOLUÇÕES:**

### **1. Erro: "Cannot find module"**
```bash
# Solução:
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### **2. Erro: "Invalid BigNumber value"**
```bash
# Solução: Atualize ethers
npm install ethers@^6.0.0
```

### **3. Erro: "Typechain not generating"**
```bash
# Solução: Rode typechain manualmente
npx hardhat typechain
```

### **4. Erro: "Solidity version mismatch"**
```bash
# Solução: Verifique hardhat.config.ts
# Deve usar Solidity 0.8.19
```

## 🆘 **SUPORTE:**

### **Se ainda tiver problemas:**
1. **Verifique logs:** `npm install --loglevel=verbose`
2. **Reporte issue:** https://github.com/SovereignWallet26/Sovereign-Wallet/issues
3. **Use Docker:** `docker-compose up` (em breve)

### **Links úteis:**
- **Hardhat docs:** https://hardhat.org/docs
- **Typechain docs:** https://github.com/dethcrypto/TypeChain
- **ERC-4337:** https://eips.ethereum.org/EIPS/eip-4337

---

**🎉 PRONTO PARA DESENVOLVER!** 

Após corrigir a instalação, você pode:
1. Desenvolver novos contratos
2. Adicionar testes
3. Implementar frontend
4. Fazer deploy para testnets

**Boa codificação! 🚀**