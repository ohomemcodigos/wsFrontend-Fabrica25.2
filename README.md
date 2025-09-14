# Pokédex – Projeto Fábrica

Aplicação web de Pokédex desenvolvida com **Next.js 15**, **React**, **TailwindCSS** e **Axios**, consumindo a [PokeAPI](https://pokeapi.co/).  
Permite buscar, favoritar e montar times de pokémons, com visualização responsiva em Grid ou Lista.

---

## 🚀 Tecnologias
- [Next.js 15 (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [PokeAPI](https://pokeapi.co/)

---

## 🔧 Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repo>
cd projetofabrica_pokedex
npm install
# ou
yarn install
```

---

## ▶️ Execução

Rodar em ambiente de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

Gerar build de produção:
```bash
npm run build
npm start
```

---

## 🌟 Funcionalidades

### 🏠 Home
- Buscar pokémons por **nome ou tipo**.
- Alternar entre **visualização em Grid** e **Lista**.
- Grid responsiva (mobile-first).
- Lista centralizada com **badges coloridas** para os tipos.

### 📄 Detalhes
- Exibir sprite **normal** e **shiny**.
- Mostrar informações: ID, nome, peso e experiência.
- **Badges coloridas** para tipos.
- Botões:
  - Favoritar / Remover dos favoritos (⭐ dourada).
  - Alternar entre **sprite normal** e **shiny**.

### ⭐ Favoritos
- Listar pokémons favoritados.
- Remover pokémon da lista.
- Persistência em `localStorage`.
- Contador de favoritos destacado em **dourado** no Header.

### 🛠️ Team Builder
- Adicionar até **6 pokémons** ao time.
- Alternar shiny individualmente.
- Remover pokémon do time.
- Grid responsiva para navegação.

---

## 🎨 Estilo & UX
- Layout 100% em **TailwindCSS**.
- Design responsivo (mobile, tablet, desktop).
- Header fixo com contador de favoritos dourado.
- Cards com `hover` shadow para melhor feedback visual.

---

## 🛠️ Técnicas utilizadas
- **Next.js App Router** para rotas e páginas.
- **React Context** para gerenciamento de favoritos e modo de visualização.
- **Axios** para consumo da PokeAPI.
- **TailwindCSS** para estilização responsiva.
- **localStorage** para persistência de favoritos.

---

## 📜 Licença
Este projeto foi desenvolvido para fins educacionais na **Fábrica de Software**.
