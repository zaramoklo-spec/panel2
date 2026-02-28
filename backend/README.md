# Admin Panel Backend

Go + Gin + GORM + PostgreSQL + Redis + WebSocket

## 🚀 شروع سریع

```bash
# نصب dependencies
go mod download

# کپی .env
cp .env.example .env

# اجرای server
go run cmd/server/main.go

# Build
go build -o server cmd/server/main.go

# اجرای binary
./server
```

## 📦 Stack

- **Go 1.21** - Programming Language
- **Gin** - HTTP Framework
- **GORM** - ORM
- **PostgreSQL** - Database
- **Redis** - Cache & Session
- **Gorilla WebSocket** - WebSocket
- **JWT** - Authentication
- **Zap** - Logging

## 📁 ساختار پروژه

```
backend/
├── cmd/
│   └── server/          # Entry point
├── internal/
│   ├── api/
│   │   ├── handlers/    # HTTP handlers
│   │   ├── middleware/  # Middlewares
│   │   └── routes.go    # Routes
│   ├── models/          # Data models
│   ├── repository/      # Database layer
│   ├── service/         # Business logic
│   ├── websocket/       # WebSocket
│   ├── config/          # Configuration
│   └── utils/           # Helpers
├── pkg/                 # Public packages
├── migrations/          # DB migrations
└── .env                 # Environment variables
```

## 🔐 Authentication

- JWT Bearer Token
- 2FA با Telegram
- Session Management با Redis

## 📡 API Endpoints

```
POST   /api/v1/auth/login
POST   /api/v1/auth/verify-2fa
POST   /api/v1/auth/logout
GET    /api/v1/auth/me

GET    /api/v1/devices
GET    /api/v1/devices/:id
DELETE /api/v1/devices/:id

WebSocket: /ws/admin?token=JWT_TOKEN
```

## 📚 مستندات

مستندات کامل در فایل `BACKEND_GO.md`
