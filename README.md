
# THTD Society Project Setup

## Frontend
1. Open terminal
2. Go to frontend folder
3. Run:

npm install
npm run dev

Frontend will run at:
http://localhost:5173

---

## Backend
1. Open another terminal
2. Go to backend folder
3. Run:

npm install

4. Create .env file
5. Add:

MONGO_URI=your_mongodb_connection_url

6. Run:

npm run dev

Backend will run at:
http://localhost:5000

---

## MongoDB Atlas Setup

1. Create account at:
https://www.mongodb.com/

2. Create Cluster

3. Click Database Access
Create username & password

4. Click Network Access
Allow IP:
0.0.0.0/0

5. Click Connect
Choose:
Drivers

6. Copy connection URL

Example:

mongodb+srv://username:password@cluster.mongodb.net/thtdDB

7. Put it inside backend/.env

---

## Features

- React + Vite frontend
- Tailwind CSS + daisyUI design
- Express.js backend
- MongoDB Atlas database
- Form submit system
- Data show in table
- Easy to add more fields later

