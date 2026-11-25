# AGENTS.md — ModuloBuilder Utils

Guia técnico de referência para agentes de IA e desenvolvedores trabalhando no repositório **ModuloBuilder Utils**.

---

## 1. Visão Geral do Projeto

O **ModuloBuilder Utils** é uma aplicação web client-side (SPA) que reúne uma biblioteca modular de ferramentas voltadas para **testes manuais, QA, homologação e desenvolvimento de software**, com foco especial em dados e documentos brasileiros.

- **Execução:** 100% no navegador, sem backend próprio.
- **Dependência externa única:** A ferramenta de CEP consulta a API pública [ViaCEP](https://viacep.com.br/). Todas as demais 12 ferramentas funcionam totalmente offline.
- **Aviso de domínio:** Todos os documentos, chaves PIX e cartões de crédito gerados são **fictícios**, matematicamente válidos apenas para fins de teste e homologação.

---

## 2. Stack Tecnológica & Scripts

| Camada | Tecnologia | Versão (package.json) |
| --- | --- | --- |
| Framework UI | React | `^19.2.6` |
| Linguagem | TypeScript | `~6.0.2` |
| Bundler / Dev Server | Vite | `^8.0.12` |
| Estilização | Tailwind CSS v4 (`@tailwindcss/vite`) | `^4.3.0` |
| Ícones | `lucide-react` | `^1.17.0` |
| Lint | ESLint (flat config) + `typescript-eslint` | `^10.3.0` |

### Comandos disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento (Vite)
npm run build    # Checagem TypeScript (tsc -b) + build de produção (vite build)
npm run lint     # Executa ESLint em todo o projeto
npm run preview  # Pré-visualiza o build de produção localmente
```

---

## 3. Estrutura de Diretórios

```text
ModuloBuilder/
├── index.html                    # Entrypoint HTML (pt-BR + fontes Bricolage Grotesque, Instrument Sans e IBM Plex Mono)
├── vite.config.ts                # Plugins React + Tailwind CSS v4
├── tsconfig.app.json             # Config TS estrita (verbatimModuleSyntax, noUnusedLocals, etc.)
├── eslint.config.js              # ESLint flat config
├── public/                       # Assets públicos (favicon.svg, icons.svg)
└── src/
    ├── main.tsx                  # Montagem do React StrictMode + import de index.css
    ├── index.css                 # @import "tailwindcss", mapeamento @theme (--color-theme-*, --font-*), base e scrollbar
    ├── App.tsx                   # Shell principal: catálogo técnico, breadcrumb, recentes, Ctrl+K e injeção de tema
    ├── registry.ts               # Registro central de todos os módulos de ferramentas (toolRegistry)
    ├── types/
    │   └── tool.ts               # Contratos TypeScript: ToolCategory, ToolConfig, ToolModule
    ├── styles/
    │   └── colors.ts             # Definição dos 4 temas autorais (oficina, grafite, prancheta, salvia) e tokens CSS
    ├── components/
    │   ├── BrandLogo.tsx         # Logotipo SVG geométrico adaptável ao tema
    │   ├── ToolIcon.tsx          # Mapa explícito de ícones Lucide (preserva tree-shaking)
    │   ├── Sidebar.tsx           # Navegação por categorias, contadores e seletor de temas em 1 clique
    │   ├── CommandPalette.tsx    # Modal de busca rápida (Ctrl+K / Cmd+K) com navegação por teclado
    │   ├── layouts/
    │   │   └── GeneratorValidatorLayout.tsx  # Layout compartilhado de 2 colunas (Gerador + Validador)
    │   └── ui/                   # Primitivas reutilizáveis 100% temáticas
    │       ├── Button.tsx
    │       ├── OutputBox.tsx
    │       ├── Panel.tsx
    │       ├── SegmentedControl.tsx
    │       ├── ToggleSwitch.tsx
    │       ├── ToolHeader.tsx
    │       └── ValidationStatus.tsx
    └── tools/
        ├── dev/                  # Utilitários de desenvolvimento (4 módulos)
        ├── documentos/           # Geradores e validadores de documentos BR (6 módulos)
        ├── financeiro/           # Dados financeiros fictícios (2 módulos)
        └── localizacao/          # Ferramentas de endereço/CEP (1 módulo)
```

---

## 4. Arquitetura Principal

### 4.1. Shell e Estado (`src/App.tsx`)
O `App.tsx` concentra a orquestração da interface sem biblioteca de roteamento externa:
- `selectedCategory`: `'all' | ToolCategory` — filtra o grid de catálogo do dashboard.
- `searchQuery`: filtro textual no dashboard (nome, descrição e `keywords`).
- `activeToolId`: `string | null` — quando preenchido, renderiza `<activeTool.Component onBack={...} />` no lugar do catálogo e exibe breadcrumb no header.
- `recentIds`: até 3 últimos módulos abertos, persistido em `localStorage` sob `'modulobuilder-recent'`.
- `isCommandPaletteOpen`: alternado pelo botão do header, atalho no campo de busca ou `Ctrl + K` / `Cmd + K`.
- `isMobileSidebarOpen`: controla o drawer responsivo da sidebar em telas `< md`.
- `currentThemeId`: persistido em `localStorage` sob `'modulobuilder-theme'` (padrão `'oficina'`, claro quente). Um `useEffect` injeta `colorScheme` e os tokens de `theme.colors` no `:root`.

### 4.2. Sistema de Registro (`src/registry.ts`)
Todas as ferramentas precisam ser importadas e registradas no dicionário `toolRegistry: Record<string, ToolModule>`.
Funções exportadas:
- `getToolById(id: string)`
- `getAllTools()`
- `getToolsByCategory(category: string)`

### 4.3. Contratos de Tipos (`src/types/tool.ts`)
- **`ToolCategory`**: `'documentos' | 'dev' | 'financeiro' | 'localizacao' | 'outros'`
- **`ToolConfig`**: `{ id, name, description, category, icon, keywords }`
  - `icon` é o nome exato de um ícone do `lucide-react` em PascalCase (ex.: `'CreditCard'`, `'Braces'`).
- **`ToolModule`**: `{ config: ToolConfig; Component: React.ComponentType<{ onBack?: () => void }>; utils?: any }`

### 4.4. Sistema de Temas (`src/styles/colors.ts` + `src/index.css`)
Os 4 temas (`oficina`, `grafite`, `prancheta`, `salvia`) definem tokens CSS semânticos consumidos por toda a aplicação:
- **Superfícies:** `--theme-bg`, `--theme-card`, `--theme-surface-inset` (`bg-theme-inset`)
- **Bordas:** `--theme-border`, `--theme-border-strong`
- **Textos:** `--theme-text`, `--theme-text-muted`, `--theme-text-subtle`
- **Marca/Acento:** `--theme-brand`, `--theme-brand-hover`, `--theme-brand-light`, `--theme-brand-border`, `--theme-brand-fg`
- **Status:** `--theme-success*`, `--theme-error*`, `--theme-warning*`

No `src/index.css`, o bloco `@theme` expõe essas variáveis como utilitários Tailwind (`bg-theme-bg`, `bg-theme-card`, `bg-theme-inset`, `text-theme-text`, `border-theme-border`, `text-theme-brand`, etc.) e configura `--font-display`, `--font-sans` e `--font-mono`.

---

## 5. Anatomia de um Módulo de Ferramenta (Padrão 5 Arquivos)

Cada ferramenta em `src/tools/<categoria>/<slug>-tool/` segue uma separação estrita de responsabilidades em 5 arquivos:

| Arquivo | Responsabilidade |
| --- | --- |
| `<prefix>Config.ts` | Metadados (`ToolConfig`): id único, nome, descrição, categoria, ícone e keywords de busca. |
| `<prefix>ToolUtils.ts` | Lógica de negócio em **TypeScript puro** (algoritmos de geração, validação, formatação), sem dependência de React. |
| `<prefix>UseTool.ts` | Hook customizado que gerencia estados da ferramenta (inputs, outputs, feedback de cópia, loading/erro) e conecta a UI às funções de `*ToolUtils.ts`. |
| `<prefix>ToolComponent.tsx` | Componente React responsável apenas pela apresentação e disparo dos handlers do hook. |
| `index.ts` | Agrega `config`, `Component` e `utils` e exporta `<prefix>ToolModule: ToolModule`. |

### Como adicionar uma nova ferramenta
1. Crie a pasta `src/tools/<categoria>/<nova>-tool/` com os 5 arquivos acima.
2. Em `src/registry.ts`, importe o módulo e adicione `[novaToolModule.config.id]: novaToolModule` ao `toolRegistry`.
3. Se criar uma nova categoria, atualize `ToolCategory` em `src/types/tool.ts` e a lista `categories` em `src/components/Sidebar.tsx`.
4. Valide com `npm run build` e `npm run lint`.

---

## 6. Catálogo Completo de Funcionalidades (13 Ferramentas)

### Utilitários Dev (`dev`)
1. **Utils de Texto & Base64** (`generic-text-utils` — `src/tools/dev/generic-tool/`)
   - Codificação/decodificação Base64 com suporte UTF-8, inversão de strings, contador em tempo real (caracteres, palavras e linhas) e opções avançadas (`Auto Trim` e caixa alta).
2. **Formatador & Linter JSON** (`json-tool` — `src/tools/dev/json-tool/`)
   - Validação sintática em tempo real com mensagem de erro do parser, formatação pretty-print (2 ou 4 espaços) e minificação.
3. **Gerador de Hash** (`hash-tool` — `src/tools/dev/hash-tool/`)
   - Cálculo simultâneo de **MD5** (implementação síncrona em JS puro), **SHA-1** e **SHA-256** (assíncrono via `crypto.subtle.digest` da Web Crypto API).
4. **Gerador de UUID v4** (`uuid-tool` — `src/tools/dev/uuid-tool/`)
   - Geração individual ou em lote (1 a 50 na UI; até 100 no utilitário) seguindo RFC 4122 v4, com opção de letras maiúsculas e cópia individual ou completa.

### Documentos Brasileiros (`documentos`)
5. **Gerador & Validador CPF** (`cpf-tool` — `src/tools/documentos/cpf-tool/`)
   - Geração com ou sem máscara (`000.000.000-00`) e validação dos dois dígitos verificadores (módulo 11), rejeitando sequências repetidas.
6. **Gerador & Validador CNPJ** (`cnpj-tool` — `src/tools/documentos/cnpj-tool/`)
   - Geração com ou sem pontuação (`00.000.000/0001-00`) e validação dos 14 dígitos pelos pesos oficiais da Receita Federal.
7. **Gerador & Validador CNH** (`cnh-tool` — `src/tools/documentos/cnh-tool/`)
   - Geração e validação de CNH de 11 dígitos seguindo o algoritmo oficial do Denatran (incluindo fator de ajuste `dsc`).
8. **Gerador Registro Geral (RG)** (`rg-tool` — `src/tools/documentos/rg-tool/`)
   - Geração (com/sem máscara) e validação de RG no padrão SSP-SP (9 caracteres, incluindo dígito verificador `'X'`).
9. **Gerador PIS/PASEP** (`pis-tool` — `src/tools/documentos/pis-tool/`)
   - Geração (com/sem pontuação) e validação de 11 dígitos pelo algoritmo de pesos do PIS/PASEP/NIT.
10. **Gerador Título de Eleitor** (`titulo-tool` — `src/tools/documentos/titulo-tool/`)
    - Geração (com seleção opcional de UF via `STATES_LIST`) e validação de 12 dígitos verificando código de estado emissor e dígitos verificadores.

### Dados Financeiros (`financeiro`)
11. **Gerador Chave PIX** (`pix-tool` — `src/tools/financeiro/pix-tool/`)
    - Gera chaves fictícias em 5 formatos: Chave Aleatória (`EVP`/UUID v4), `CPF`, `CNPJ`, `E-mail` e `Celular`.
    - **Dependência cruzada:** `pixToolUtils.ts` importa `generateCPF` e `generateCNPJ` de `src/tools/documentos/`.
12. **Gerador Cartão de Crédito** (`cartao-tool` — `src/tools/financeiro/cartao-tool/`)
    - Gera número matematicamente válido pelo **Algoritmo de Luhn** (`validateLuhn` também exportado), CVV (3 ou 4 dígitos para Amex) e validade futura para **Visa, Mastercard, Amex e Elo**, com prévia visual do cartão e cópia individual ou em bloco.

### Localização (`localizacao`)
13. **Validador & Gerador CEP** (`cep-tool` — `src/tools/localizacao/cep-tool/`)
    - Gera CEPs de 8 dígitos (com/sem máscara) e realiza validação estrutural + consulta real de endereço (`logradouro`, `bairro`, `localidade`, `uf`) via `https://viacep.com.br/ws/{cep}/json/`.

---

## 7. Convenções, Regras & Dívidas Técnicas Conhecidas

Ao editar ou criar código neste repositório, considere obrigatoriamente os pontos abaixo:

1. **TypeScript estrito (`tsconfig.app.json`):**
   - `verbatimModuleSyntax: true` → **sempre** use `import type { ... }` para importar tipos/interfaces.
   - `noUnusedLocals: true` e `noUnusedParameters: true` → não deixe variáveis ou parâmetros não usados.
   - `erasableSyntaxOnly: true` → evite `enum` ou recursos TS que geram runtime extra; prefira union types e `as const`.
2. **Sistema de temas e primitivas de UI:**
   - **Regra para novas telas/componentes:** sempre usar os tokens semânticos (`bg-theme-card`, `bg-theme-inset`, `text-theme-text`, `border-theme-border`, `text-theme-brand`, etc.) e reutilizar as primitivas de `src/components/ui/` (`ToolHeader`, `Panel`, `Button`, `OutputBox`, `ValidationStatus`, `ToggleSwitch`, `SegmentedControl`) e `GeneratorValidatorLayout`. Nunca usar cores Tailwind fixas (`zinc-*`, `indigo-*`, `text-white`, etc.).
3. **Nomenclatura de hooks e componentes:**
   - Os arquivos existentes em `src/tools/` usam `<prefix>UseTool` (sem o prefixo `use` no início do identificador) e `<prefix>ToolComponent` em camelCase. Ao criar novos componentes/hooks, prefira `PascalCase` para componentes React e `use<Nome>` para hooks (compatibilidade plena com `eslint-plugin-react-hooks`).
4. **Performance / Bundle de ícones:**
   - Utilize `ToolIcon` (`src/components/ToolIcon.tsx`), que mantém um mapa explícito dos ícones Lucide usados pelas ferramentas e preserva tree-shaking. Ao adicionar uma nova ferramenta com um ícone inédito, registre-o em `ICON_MAP` dentro de `ToolIcon.tsx`.
5. **Categoria `'outros'`:**
   - Existe no tipo `ToolCategory` e na `Sidebar.tsx`, sendo ocultada automaticamente na barra lateral enquanto possuir `0` ferramentas registradas.
6. **Segurança e escopo:**
   - Nunca enviar dados digitados pelo usuário para servidores externos (exceto a consulta explícita de CEP no ViaCEP).
   - Manter a separação entre lógica pura (`*ToolUtils.ts`) e camada React (`*UseTool.ts` / `*ToolComponent.tsx`).
