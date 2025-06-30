<div align="center">

# RmtDev - Remote Job Board for Developers

[![Last Commit](https://img.shields.io/github/last-commit/krifa-med-aziz/RmtDev?style=flat-square)](https://github.com/krifa-med-aziz/RmtDev)
[![Languages](https://img.shields.io/github/languages/count/krifa-med-aziz/RmtDev?style=flat-square)](https://github.com/krifa-med-aziz/RmtDev)

</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Radix_UI-000000?style=flat-square&logo=radix-ui&logoColor=white"/>
</div>

---


## 📚 Table of Contents

- [📖 Overview](#-overview)
- [⚙️ Getting Started](#️-getting-started)
- [🧩 Features](#-features)
- [🧠 Custom Hooks](#-custom-hooks)
- [🌐 Context API](#-context-api)
- [📁 Folder Structure](#-folder-structure)
- [🛠️ Available Scripts](#️-available-scripts)
- [🧪 Testing](#-testing)


---

## 📖 Overview

RmtDev allows users to:

- 🔍 Search for remote jobs in real time  
- 📌 Bookmark interesting listings  
- 📄 View full job details including company info  
- 🔃 Sort jobs by relevance or recency  
- 📱 Use the app on any device thanks to a responsive layout  

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
git clone https://github.com/krifa-med-aziz/RmtDev.git
cd RmtDev
npm install
```

### Run locally

```bash
npm run dev
```

App will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🧩 Features

- 🔎 Debounced live search  
- 📋 Sort jobs by relevance or newest first  
- 📌 Bookmark jobs to localStorage  
- 💬 Toast notifications and loading states  
- 🧠 Modular architecture with custom hooks  
- 📱 Fully responsive design  

---

## 🧠 Custom Hooks

| Hook                  | Description                                      |
|-----------------------|--------------------------------------------------|
| `useJobItems()`       | Fetches and caches job list                     |
| `useJobItem()`        | Fetches details for a specific job              |
| `useDebounce()`       | Debounces the search input                      |
| `useLocalStorage()`   | Handles persistent bookmarks                    |
| `useOnClickOutside()` | Closes dropdown/popover when clicking outside  |


---

## 🌐 Context API

| Context             | Description                        |
|---------------------|------------------------------------|
| `ActiveIdContext`    | Tracks currently selected job      |
| `BookmarksContext`   | Manages bookmarked jobs            |
| `SearchTextContext`  | Controls global search text        |
| `JobItemsContext`    | Central state for job listings     |



---

## 📁 Folder Structure

```
src/
├── components/         # UI components (JobList, Header, Sidebar, etc.)
├── contexts/           # React context providers
├── lib/
│   ├── hooks.ts        # Custom hooks
│   ├── types.ts        # TypeScript types
│   └── utils.ts        # Utility functions
├── pages/              # Main application pages
└── main.tsx            # Entry point
```

---

## 🛠️ Available Scripts

| Script           | Description                     |
|------------------|---------------------------------|
| `npm run dev`     | Start development server        |
| `npm run build`   | Build for production            |
| `npm run preview` | Preview production build        |
| `npm run lint`    | Run ESLint checks               |

---

## 🧪 Testing

This project does not include tests yet. You can add testing using:

- [`Vitest`](https://vitest.dev/)
- [`Jest`](https://jestjs.io/)
- [`React Testing Library`](https://testing-library.com/)


