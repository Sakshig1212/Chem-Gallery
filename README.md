# 🧪 ChemGallery: A Full-Stack Chemical Compound Explorer

<img width="1892" height="874" alt="image" src="https://github.com/user-attachments/assets/41030530-7d05-4f5f-a4bc-60faad427659" />

---

## 🌟 Overview

**ChemGallery** is a modern full-stack web application designed to **explore and manage a curated collection of 30 chemical compounds**.  
It showcases a complete development lifecycle — from a **responsive Angular frontend** to a **secure Node.js + Express + MySQL backend** — with seamless integration and elegant UI/UX design.

This project demonstrates **real-world best practices** in authentication, API design, and frontend architecture, making it an excellent portfolio or learning project.

---

## ✨ Features

### 🧭 Core Functionality
- **Interactive Compound Gallery:** Browse compounds in a responsive grid layout with pagination.  
- **Dynamic Routing:** Each compound has a unique, shareable detail page (`/compounds/:id`).  
- **CRUD Operations:**
  - 🧪 **View**: Explore detailed information about each compound.
  - ✏️ **Edit**: Update compound name, description, and image directly from the UI.
  - 🔍 **Search & Sort**: Instantly filter and sort compounds alphabetically.

---

### 🎨 UI / UX & Design
- **Angular Material** for a professional and consistent interface.  
- **Responsive Design** that adapts to mobile, tablet, and desktop.  
- **Hover Animations** for interactive compound cards.  
- **Dark/Light Mode Toggle** with local preference storage.  
- **User Feedback** via snackbars/toasts on updates, logins, and errors.

---

### 🔐 Authentication & Security
- **JWT-Based Authentication:** Secure login and session management.  
- **User Registration:** Encrypted passwords using `bcryptjs`.  
- **Forgot/Reset Password Flow:** Simulated password recovery feature.  
- **Logout & Session Handling:** Secure session termination.

---

## 🛠️ Tech Stack

| Category     | Technology / Library |
|---------------|----------------------|
| **Frontend**  | Angular, TypeScript, Angular Material, SCSS |
| **Backend**   | Node.js, Express.js |
| **Database**  | MySQL |
| **ORM**       | Sequelize |
| **Auth**      | JSON Web Tokens (JWT), bcryptjs |

---

## 🚀 Getting Started

Follow these steps to set up and run **ChemGallery** locally.

### ✅ Prerequisites
- Node.js (v18 or later)  
- Angular CLI  
  ```bash
  npm install -g @angular/cli
