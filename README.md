# Pokédex – Projeto Fábrica de Software

Aplicação web de Pokédex desenvolvida como projeto acadêmico na **Fábrica de Software**.  
Construída com **Next.js 15**, **React**, **TailwindCSS** e **Axios**, consumindo a [PokeAPI](https://pokeapi.co/).  

Permite explorar todos os Pokémon existentes, visualizar detalhes, favoritar, alternar entre sprites normais e shiny, além de montar times personalizados.  
O design é totalmente **responsivo**, adaptado para **mobile, tablet e desktop**.

**Deploy online**: [https://wsfrontend-fabrica25-2.vercel.app/](https://wsfrontend-fabrica25-2.vercel.app/)

---

## Resumo da Aplicação

A Pokédex oferece:
- Visualização de todos os Pokémon disponíveis na [PokeAPI](https://pokeapi.co/).  
- Busca por nome ou tipo.  
- Alternância entre **modo Grid** (cartões) e **modo Lista** (mais compacto).  
- Página de **detalhes** com informações completas de cada Pokémon.  
- Sistema de **favoritos** persistente via `localStorage`.  
- **Team Builder** para montar times de até 6 Pokémon.  
- Totalmente **responsiva** e otimizada para qualquer dispositivo.  

---

## Tecnologias utilizadas

- **Next.js 15 (App Router)** → Framework React para SSR/SSG.  
- **React** → Criação dos componentes da interface.  
- **TailwindCSS** → Estilização moderna e responsiva.  
- **Axios** → Consumo da API REST da PokeAPI.  
- **React Context API** → Gerenciamento global (favoritos, modo de visualização).  
- **localStorage** → Persistência dos favoritos no navegador.  

---

## Instalação e execução local

### 1. Clonar repositório
```bash
git clone https://github.com/seu-usuario/projetofabrica_pokedex.git
cd projetofabrica_pokedex
```

### 2. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3. Rodar em ambiente de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

### 4. Gerar build de produção
```bash
npm run build
npm start
```

---

## Funcionalidades

### 🏠 Home
- Listagem de todos os Pokémon disponíveis.  
- Busca por **nome ou tipo**.  
- Alternar entre **modo Grid** (cartões) e **modo Lista**.  
- Grid responsiva com colunas variando conforme o tamanho da tela.  
- Cada card exibe:
  - Imagem oficial.  
  - Nome + ID.  
  - Badges coloridas indicando o(s) tipo(s).  

### 📄 Página de Detalhes
- Exibe **sprite oficial** e versão **shiny**.  
- Nome, ID, peso e experiência base.  
- Badges de tipos estilizadas por cor.  
- Botões:
  - **Favoritar / remover dos favoritos**.  
  - Alternar entre sprite normal e shiny ✨.  

### Favoritos
- Lista todos os Pokémon favoritados.  
- Persistência em `localStorage` → mantém dados mesmo ao recarregar a página.  
- Limite de **até 50 Pokémon favoritos**.  
- Contador em destaque no **header** em cor dourada.  

### Team Builder
- Permite montar um time com **até 6 Pokémon**.  
- Clique em um Pokémon da lista para adicioná-lo ao time.  
- Alternar cada membro entre **normal/shiny**.  
- Remover Pokémon do time a qualquer momento.  
- Layout responsivo para sidebar (time) + grid (lista de escolha).  

---

## Responsividade

- **Mobile:** Cards centralizados em 2 colunas, menus e botões empilhados.  
- **Tablet:** Ajuste automático para 3 a 4 colunas.  
- **Desktop:** Grid completa com até 6 colunas, sidebar no Team Builder fixa.  
- Uso de **flexbox** e **grid do Tailwind** para layouts fluidos.  

---

## Deploy

O projeto está disponível online via **Vercel**:  
 [https://wsfrontend-fabrica25-2.vercel.app/](https://wsfrontend-fabrica25-2.vercel.app/)

Atualizações no branch `main` do GitHub geram automaticamente um novo deploy.  

---

## Licença & Fair Use

Este projeto foi desenvolvido **exclusivamente para fins acadêmicos** no âmbito da **Fábrica de Software**.  
O consumo da [PokeAPI](https://pokeapi.co/) e o uso das imagens oficiais de Pokémon seguem os princípios de **fair use** para estudo, pesquisa e prática de desenvolvimento.  

Pokémon © 1996–2025 Nintendo / Creatures Inc. / GAME FREAK Inc.  
Este projeto **não possui fins comerciais**.
