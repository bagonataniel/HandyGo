<p align="center">
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png" width="80"/>
</p>

<h1 align="center">🛠️ HandyGo</h1>

<p align="center">
  <b>Kis munkák hirdetése és foglalása egyszerűen</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-development-orange"/>
  <img src="https://img.shields.io/badge/backend-Node.js-green"/>
  <img src="https://img.shields.io/badge/frontend-TypeScript-blue"/>
  <img src="https://img.shields.io/badge/database-MySQL-lightgrey"/>
  <img src="https://img.shields.io/badge/auth-JWT-red"/>
</p>

---

## ✨ Mi az a HandyGo?

A **HandyGo** egy modern webes platform, amely lehetővé teszi, hogy a felhasználók  
🧰 **szolgáltatásokat hirdessenek**,  
📅 **időpontot foglaljanak**,  
⭐ **értékeljék egymást** a sikeres munkák után.

Olyan kisebb munkákra készült, mint:
- fűnyírás
- takarítás
- szerelés
- tanítás
- fotózás

---

## 🚀 Funkciók áttekintése

| Funkció | Leírás |
|------|------|
| 🔐 Autentikáció | Regisztráció, bejelentkezés JWT tokennel |
| 📢 Hirdetés | Szolgáltatások létrehozása és kezelése |
| 📆 Foglalás | Időpontfoglalás szolgáltatásokra |
| ⭐ Értékelés | Munkák értékelése és visszajelzés |
| 🛡 Admin | Hirdetések moderálása |
| 📊 API | Dokumentált REST API |

---

## 🧱 Projekt felépítése

HandyGo/  
│  
├── Backend/ ⚙️ Node.js + Express API  
├── Frontend/  
│ └── HandyGo/ 🎨 Frontend alkalmazás
│  
├── API_endpoint_list.xlsx 📊 API dokumentáció (Excel)  
├── handygo.sql 🗄 Teszt adatbázis  
└── README.md


---

## 🛠️ Használt technológiák

### Backend
- 🟢 Node.js
- 🚀 Express
- 🔐 JWT autentikáció

### Frontend
- 🌐 HTML / CSS
- ⚡ JavaScript / TypeScript

### Adatbázis
- 🐬 MySQL

---

## 📥 Telepítés & futtatás

### 1️⃣ Repo klónozása  
git clone https://github.com/bagonataniel/HandyGo.git  
cd HandyGo

2️⃣ MongoDB telepítés  
MongoDB Community Server letöltés és telepítése (chat működéséhez)  
MongoDB Compass az adatbázis egyszerű megtekintéséhez

3️⃣ Adatbázis  
Importáld a handygotest.sql fájlt MySQL-be  
Állítsd be az adatbázis elérést (.env)

4️⃣ Backend indítása  
cd Backend  
npm install  
npm start

5️⃣ Frontend indítása  
cd Frontend/HandyGo  
npm install  
ng serve -o

🔌 API dokumentáció

📁 A projekt tartalmazza az API végpontok listáját:

API_endpoint_list.xlsx

📌 Példa kérés
POST /api/services
Authorization: x-auth-token <JWT>
Content-Type: application/json

{
  "title": "Fűnyírás",
  "description": "Gyors és precíz munka",
  "price": 5000
}

🎯 Jövőbeli tervek

🔔 Értesítések

📱 Mobilbarát UI
<p align="center"> Készítette: <b>bagonataniel  Beni00030  Sipibence</b> 💻 </p> 
