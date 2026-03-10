# Gerador Pessoal

Extensão de navegador que gera dados fictícios para cadastros de teste. Desenvolvida com React, Vite, TypeScript e shadcn/ui.

## Funcionalidades

- **Dados Básicos**: Nome, email, telefone, data de nascimento, sexo, endereço, CEP
- **Documentos**: CPF, CNPJ, RG, CNH, PIS, CNS
- **Cartões de Crédito**: Visa, Mastercard, Elo, American Express, Hipercard (número, validade, CVV, nome)

- Copiar para área de transferência com 1 clique
- Gerar novos dados com 1 clique
- Interface intuitiva e rápida

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Modo dev com HMR (recomendado)
# Abre http://localhost:5173 e edite o código - as mudanças aparecem na hora
npm run dev

# Modo watch (rebuilda ao salvar, para testar na extensão)
# Mantenha rodando e recarregue a extensão no Chrome quando quiser ver as mudanças
npm run dev:watch

# Build para produção
npm run build
```

**Dica:** Use `npm run dev` para desenvolver com hot reload no navegador. Quando terminar, rode `npm run build` e carregue a pasta `dist` no Chrome para testar como extensão.

## Instalação no Chrome

1. Execute `npm run build`
2. Abra `chrome://extensions`
3. Ative o "Modo do desenvolvedor"
4. Clique em "Carregar sem compactação"
5. Selecione a pasta `dist` do projeto

## Estrutura

```
src/
├── manifest.json      # Manifest da extensão (MV3)
├── popup.html         # HTML do popup
├── popup/             # App React do popup
├── components/        # Componentes React
├── lib/
│   └── generators/   # Geradores de dados (gerador-br)
└── hooks/            # Hooks customizados
```

## Tecnologias

- React 18 + TypeScript
- Vite + vite-plugin-web-extension
- Tailwind CSS + shadcn/ui
- gerador-br (dados brasileiros fictícios)
