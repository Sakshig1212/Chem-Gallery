ChemGallery: A Full-Stack Chemical Compound Explorer
![alt text](link_to_your_best_screenshot_or_gif_here)
Note: Replace the link above with a URL to a screenshot or GIF of your running application.
ChemGallery is a modern, full-stack web application designed for managing and exploring a curated collection of 30 chemical compounds. It demonstrates a complete development lifecycle, featuring a responsive Angular frontend and a secure RESTful API powered by Node.js, Express, and MySQL.
This project showcases best practices in both frontend and backend development, including JWT-based authentication, responsive UI/UX with Angular Material, and a clean, organized codebase.
✨ Features
Core Functionality
Interactive Compound Gallery: Compounds are displayed in a responsive grid layout with pagination.
Dynamic Routing: Each compound has a unique detail page (/compounds/:id) that is directly accessible.
CRUD Operations:
View: Browse the gallery and view detailed information for each compound.
Edit: A dedicated form allows for modification of a compound's name, image, and description, with changes persisted to the database.
Search & Sort: Instantly filter the gallery by compound name and sort the results alphabetically.
UI/UX & Design
Professional UI: Built with Angular Material for a clean, modern, and consistent user experience.
Interactive Cards: Compound cards feature hover animations and provide clear visual feedback.
Fully Responsive Design: The layout seamlessly adapts to mobile, tablet, and desktop screens.
Dark/Light Mode: A theme toggle in the header allows users to switch between light and dark modes, with their preference saved locally.
User Feedback: Features toast/snackbar messages for actions like successful updates or login failures.
Authentication & Security
JWT-Based Authentication: Secure user registration and login system.
Registration: New users can create an account with encrypted password storage (bcryptjs).
Login: Authenticates users and provides a JSON Web Token (JWT) for session management.
Forgot/Reset Password: A complete (simulated) password recovery flow.
Session Management: A Logout feature securely ends the user's session.
🛠️ Tech Stack
Category	Technology / Library
Frontend	Angular, TypeScript, Angular Material, SCSS
Backend	Node.js, Express.js
Database	MySQL
ORM	Sequelize
Auth	JSON Web Tokens (JWT), bcryptjs
🚀 Getting Started
Follow these steps to set up and run the project on your local machine.
Prerequisites
Node.js (v18 or later)
Angular CLI (npm install -g @angular/cli)
A running MySQL Server instance.
Git
1. Clone the Repository
code
Bash
git clone <your-repository-url>
cd <project-folder-name>
2. Backend Setup
Navigate to the backend directory and install dependencies:
code
Bash
cd backend
npm install
Create the Database:
Using a MySQL client, create the database:
code
SQL
CREATE DATABASE chemical_compounds_db;
Set Up Environment Variables:
In the backend directory, create a file named .env and add your database credentials and a JWT secret:
code
Env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=chemical_compounds_db
JWT_SECRET=a-long-random-secret-string-for-jwt
Seed the Database:
This script creates the compounds and users tables and populates the compounds table with initial data. Run it once:
code
Bash
node scripts/importData.js
3. Frontend Setup
Navigate to the frontend directory and install dependencies:
code
Bash
cd ../frontend
npm install
4. Run the Application
You need two separate terminals to run the backend and frontend concurrently.
Terminal 1: Start the Backend
code
Bash
cd backend
npm run dev
# API server is now running on http://localhost:3000
Terminal 2: Start the Frontend
code
Bash
cd frontend
ng serve -o
# Application will open automatically at http://localhost:4200
The application is now running. You can register an account and start exploring.
📄 API Documentation
The API provides endpoints for user authentication and compound management.
Base URL: http://localhost:3000/api
Authentication (/api/auth)
POST /register: Creates a new user.
POST /login: Authenticates a user and returns a JWT.
Compounds (/api/compounds)
GET /: Retrieves a list of all compounds (supports ?limit= query parameter).
GET /:id: Retrieves a single compound by its ID.
PUT /:id: Updates a compound's details.
A full Postman collection (ChemGallery.postman_collection.json) is available in the repository for easy testing.
