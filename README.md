# Ajaia Docs

A lightweight, developer-grade collaborative document editor inspired by Google Docs, built with a modern stack (Next.js, Express, MongoDB) and styled with a clean dark aesthetic.

## 🎥 Walkthrough Video
- YouTube Demo Link: [https://www.youtube.com/watch?v=pbZysPWIhy8]

## 📋 Features
- Document CRUD & Persistence: Create, rename, edit, and delete documents with persistent MongoDB storage.
- Rich Markdown Formatting & Preview: Toggle between Edit mode and live Markdown Preview mode, with a formatting toolbar (Bold, Italic, Underline, Headings, Lists).
- File Import & Export: Upload .txt or .md files to automatically generate new documents, and export documents as .txt, .md, or .pdf.
- User Sharing Model: Grant document access to other users (user_1 / user_2) with visual separation between owned and shared documents.
- Responsive Developer-Grade UI: High-end dark obsidian theme featuring a sticky sidebar and fluid layout.

## 🛠️ Tech Stack
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Lucide React
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB with Mongoose ODM
- Deployment: Vercel 

---

## 🚀 Local Setup & Run Instructions

### Prerequisites
- Node.js (v18+) installed locally.
- MongoDB connection string (Atlas or Local).

### 1. Clone the Repository
git clone https://github.com/abhisheksamriya/ajaia-docs-interview-assignement.git
cd ajaia-docs-interview-assignement

### 2. Backend Setup
cd server
npm install

Create a .env file in the root of the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string_here

Start the backend server:
npm run dev

### 3. Frontend Setup
cd frontend
npm install

Create a .env.local file in the frontend folder:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start the frontend development server:
npm run dev

Open http://localhost:3000 in your browser.

---

## 👤 Author
- Abhishek Samriya  
- GitHub: https://github.com/abhisheksamriya
- Portfolio: https://abhishek-samriya.vercel.app