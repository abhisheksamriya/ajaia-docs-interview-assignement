# Architecture & Technical Design Note

## 🏗️ System Overview
Ajaia Docs is built as a clean, decoupled full-stack application. I separated the frontend presentation layer from the backend REST API to keep the codebase modular, easy to maintain, and simple to deploy.

## 🛠️ Tech Stack Choices & Why
- **Frontend (Next.js App Router & TypeScript):** Used Next.js because its file-based routing and server/client component model make building responsive dashboards and editors super fast. TypeScript ensures type safety across document states.
- **Styling (Tailwind CSS):** Chose Tailwind for rapid styling to achieve a clean, high-end "Linear/Obsidian-inspired" dark developer UI without messy custom CSS files.
- **Backend (Node.js & Express.js):** A lightweight REST API server handling document CRUD operations, sharing logic, and file imports.
- **Database (MongoDB & Mongoose):** Used MongoDB because document-based JSON storage fits a text document editor naturally. It makes storing document content, titles, and sharing arrays (`sharedWith`) very straightforward.

## ⚖️ Prioritization & Tradeoffs (Within 4-6 Hour Timebox)
1. **Prioritized Core CRUD & UX Fidelity:** Instead of trying to build every single Google Docs feature, I focused heavily on a polished dark UI, smooth auto-saving, Markdown live previews, and robust multi-format exports (.txt, .md, .pdf).
2. **Deferred Real-Time WebSockets:** I initially considered adding Socket.io for live multi-cursor collaboration. However, given the tight time limit, I intentionally cut it to ensure the core persistence, file upload buffer handling, and sharing mechanism were 100% bug-free and working end-to-end.
3. **Serverless File Upload Handling:** Shifted from local disk storage (`uploads/`) to Multer memory storage (`req.file.buffer`) so the app can deploy seamlessly on Vercel and cloud environments without crashing due to ephemeral server file systems.