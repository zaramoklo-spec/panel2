# 🚀 Admin Panel - Full Stack Project

یک پنل مدیریت کامل با React (Frontend) و Go (Backend)

## 📁 ساختار پروژه

```
.
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── backend/           # Go + Gin + PostgreSQL
│   ├── cmd/
│   ├── internal/
│   ├── go.mod
│   └── README.md
│
└── README.md
```

---

## 🎯 Frontend (React)

### Stack:
- React 18 + TypeScript
- Vite (Build Tool)
- TailwindCSS + shadcn/ui
- React Router
- Zustand (State Management)
- TanStack Query (Data Fetching)
- Socket.io (WebSocket)

### شروع:
```bash
cd frontend
npm install
npm run dev
```

📚 **مستندات کامل:** `frontend/DOCUMENTATION.md`

---

## ⚡ Backend (Go)

### Stack:
- Go 1.21
- Gin (HTTP Framework)
- GORM (ORM)
- PostgreSQL (Database)
- Redis (Cache)
- Gorilla WebSocket
- JWT Authentication

### شروع:
```bash
cd backend
cp .env.example .env
go mod download
go run cmd/server/main.go
```

📚 **مستندات کامل:** `backend/BACKEND_GO.md`

---

## 🔥 فیچرها

### ✅ Authentication
- Login با Username/Password
- 2FA با Telegram OTP
- JWT Token Management
- Session Handling

### ✅ Device Management
- لیست دستگاه‌ها با فیلتر و جستجو
- مشاهده جزئیات دستگاه
- Ping دستگاه (Firebase)
- Real-time Updates via WebSocket
- نمایش SIM Info (Dual SIM)
- UPI Pins Management
- Device Notes

### ✅ SMS Management
- مشاهده و جستجو در SMS
- ارسال SMS
- Export (CSV/Excel)
- Real-time Updates

### ✅ Contacts & Calls
- مدیریت مخاطبین
- تاریخچه تماس‌ها
- Export Data

### ✅ Admin Management
- مدیریت ادمین‌ها (Super Admin)
- Activity Logs
- Telegram Bots Configuration
- Permissions Management

### ✅ Tools
- Leak Lookup
- Multi-Device View
- Statistics Dashboard

---

## 🚀 Development

### Frontend:
```bash
cd frontend
npm run dev          # Development server (port 3000)
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend:
```bash
cd backend
go run cmd/server/main.go    # Development server (port 8080)
go build -o server cmd/server/main.go  # Build binary
./server                      # Run binary
```

---

## 🔧 Environment Variables

### Frontend (.env):
```env
VITE_API_BASE_URL=https://zeroday.cyou
VITE_WS_URL=wss://zeroday.cyou/ws/admin
```

### Backend (.env):
```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=admin_panel
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
```

---

## 📦 Deployment

### Frontend:
- Vercel / Netlify (Web)
- Capacitor (Mobile - Android/iOS)

### Backend:
- Docker
- Systemd Service
- Cloud Platforms (AWS, GCP, DigitalOcean)

---

## 🎨 Design System

### رنگ‌ها:
- Primary: `#6366F1` (Indigo)
- Secondary: `#8B5CF6` (Violet)
- Success: `#10B981` (Emerald)
- Error: `#EF4444` (Red)

### فونت‌ها:
- Display: Poppins
- Body: Inter

---

## 📚 مستندات

- **Frontend:** `frontend/DOCUMENTATION.md`
- **Backend:** `backend/BACKEND_GO.md`

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License

---

**ساخته شده با ❤️**
