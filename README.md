# 📓 MyNotebook

MyNotebook is a full-stack **MERN (MongoDB, Express, React, Node.js)** web application that allows users to securely create, manage, and organize their personal notes. It provides authentication and full CRUD functionality for an efficient note-taking experience.

---

## 🚀 Features

- 🔐 User **Authentication** (Signup / Login)
- 📝 Create, update, and delete notes
- 📂 Organized note management
- 💾 Persistent storage using MongoDB
- ⚡ Fast and responsive UI with React
- 🔒 Protected routes using JWT
- 🔔 Real-time alerts for user actions

---

## 🛠️ Tech Stack

- ⚛️ React.js (Frontend)
- 🌐 Node.js & Express.js (Backend)
- 🍃 MongoDB with Mongoose (Database)
- 🔐 JSON Web Tokens (JWT Authentication)
- 🔑 bcrypt.js (Password Hashing)

---

## 📂 Project Structure

```
MyNotebook/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
│── .env
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/ShubhamSarate/MyNotebook.git

# Navigate into the project folder
cd MyNotebook
```

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside backend:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend server:

```bash
npm start
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 💻 Run Both Backend & Frontend

```bash
npm run both
```

---

## 📸 Screenshots

### Login Page  
![Login Page}(./assets/login.jpg)

### Update Page  
![Login Page}(./assets/Update.jpg)

### Users DB  
![Login Page}(./assets/Users.jpg)


### Notes DB  
![Login Page}(./assets/Notes.jpg)

---

## 🌐 Usage

1. Register or login to your account  
2. Create new notes  
3. Edit or delete existing notes  
4. Manage your notes efficiently  

---

## 🔐 Authentication

- Secure login/signup system  
- Passwords hashed using bcrypt  
- JWT used for session management  
- Protected routes for authorized access  

---

## 🔮 Future Improvements

- 📌 Pin important notes  
- 🏷️ Add tags/categories  
- 🌙 Dark mode support  
- 📱 Improve mobile responsiveness  
- ☁️ Cloud deployment  

---

## 🤝 Contributing

- Fork the repository  
- Create a new branch  
- Make your changes  
- Submit a pull request  

---

## 🙌 Acknowledgements

- Built as a MERN stack learning project  
- Inspired by modern note-taking apps  

---

## 👨‍💻 Author

**Shubham Sarate**  
GitHub: https://github.com/ShubhamSarate  

---
