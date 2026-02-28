# 🚀 راهنمای نوشتن Backend با Go

## 📋 چرا Go برای این پروژه؟

### مزایا:
- ✅ **Performance بالا**: خیلی سریع‌تر از Node.js/Python
- ✅ **Concurrency عالی**: Goroutines برای WebSocket و Real-time
- ✅ **Memory Efficient**: مصرف RAM کمتر
- ✅ **Single Binary**: یه فایل executable، نیاز به runtime نداره
- ✅ **Type Safety**: مثل TypeScript ولی قوی‌تر
- ✅ **Built-in HTTP Server**: نیاز به Nginx/Apache نداره
- ✅ **Easy Deployment**: فقط یه فایل رو کپی کن و اجرا کن

### مقایسه با Node.js:
```
Go:        1000 req/s با 50MB RAM
Node.js:   300 req/s با 150MB RAM
```

---

## 🏗️ معماری پیشنهادی

### ساختار پروژه:
```
backend/
├── cmd/
│   └── server/
│       └── main.go              # Entry point
├── internal/
│   ├── api/
│   │   ├── handlers/            # HTTP Handlers
│   │   │   ├── auth.go
│   │   │   ├── device.go
│   │   │   ├── sms.go
│   │   │   ├── admin.go
│   │   │   └── tools.go
│   │   ├── middleware/          # Middlewares
│   │   │   ├── auth.go
│   │   │   ├── cors.go
│   │   │   ├── logger.go
│   │   │   └── ratelimit.go
│   │   └── routes.go            # Route definitions
│   ├── models/                  # Data models
│   │   ├── device.go
│   │   ├── admin.go
│   │   ├── sms.go
│   │   └── call.go
│   ├── repository/              # Database layer
│   │   ├── device_repo.go
│   │   ├── admin_repo.go
│   │   └── sms_repo.go
│   ├── service/                 # Business logic
│   │   ├── auth_service.go
│   │   ├── device_service.go
│   │   └── sms_service.go
│   ├── websocket/               # WebSocket logic
│   │   ├── hub.go               # Connection manager
│   │   ├── client.go            # Client connection
│   │   └── handlers.go          # WS message handlers
│   ├── config/                  # Configuration
│   │   └── config.go
│   └── utils/                   # Helper functions
│       ├── jwt.go
│       ├── hash.go
│       └── validator.go
├── pkg/                         # Public packages
│   ├── logger/
│   └── database/
├── migrations/                  # Database migrations
├── .env
├── go.mod
└── go.sum
```

---

## 📦 پکیج‌های پیشنهادی

### Core Packages:
```go
// HTTP Framework
"github.com/gin-gonic/gin"           // سریع‌ترین و محبوب‌ترین
// یا
"github.com/gofiber/fiber/v2"        // شبیه Express.js

// Database
"gorm.io/gorm"                       // ORM قدرتمند
"gorm.io/driver/postgres"            // PostgreSQL
"gorm.io/driver/mysql"               // MySQL
"go.mongodb.org/mongo-driver"        // MongoDB

// WebSocket
"github.com/gorilla/websocket"       // استاندارد صنعت

// JWT
"github.com/golang-jwt/jwt/v5"       // JSON Web Token

// Validation
"github.com/go-playground/validator/v10"

// Environment
"github.com/joho/godotenv"           // .env file

// Redis (Cache)
"github.com/redis/go-redis/v9"

// Firebase
"firebase.google.com/go/v4"

// Logging
"go.uber.org/zap"                    // سریع‌ترین logger

// CORS
"github.com/gin-contrib/cors"
```

---

## 🔐 Authentication Flow

### JWT Implementation:
```
1. User login → Validate credentials
2. Generate JWT token (access + refresh)
3. Store refresh token in Redis/DB
4. Return tokens to client
5. Client sends access token in header
6. Middleware validates token
7. Extract user info from token
8. Continue to handler
```

### 2FA با Telegram:
```
1. User login → Send OTP to Telegram Bot
2. Store OTP in Redis (expire: 5 min)
3. User enters OTP
4. Validate OTP from Redis
5. Generate JWT tokens
6. Clear OTP from Redis
```

---

## 🔄 WebSocket Architecture

### Hub Pattern:
```
Hub (مدیر اتصالات)
├── Clients Map (deviceId → *Client)
├── Register Channel (اضافه کردن client)
├── Unregister Channel (حذف client)
├── Broadcast Channel (ارسال به همه)
└── Message Channel (ارسال به یکی)

Client (هر اتصال)
├── Connection (*websocket.Conn)
├── Send Channel (ارسال پیام)
├── DeviceSubscriptions (لیست دستگاه‌های subscribe شده)
└── AdminInfo (اطلاعات ادمین)
```

### Message Flow:
```
1. Client connects → Authenticate via token
2. Add to Hub
3. Client sends: {"action": "subscribe", "device_id": "..."}
4. Add device to client's subscriptions
5. Device updates → Find subscribed clients → Send update
6. Client disconnects → Remove from Hub
```

---

## 💾 Database Design

### پیشنهاد: PostgreSQL

**چرا؟**
- ✅ JSONB support (برای nested data)
- ✅ Full-text search
- ✅ Performance عالی
- ✅ ACID compliance
- ✅ Free و Open Source

### جداول اصلی:
```
admins
├── id (UUID)
├── username (unique)
├── email
├── password_hash
├── role (super_admin, admin, viewer)
├── telegram_2fa_chat_id
├── telegram_bots (JSONB)
├── fcm_tokens (JSONB)
├── expires_at
├── created_at
└── updated_at

devices
├── device_id (PK)
├── user_id
├── model, manufacturer, os_version
├── status (online/offline)
├── battery_level
├── last_ping
├── settings (JSONB)
├── stats (JSONB)
├── sim_info (JSONB array)
├── upi_pins (JSONB array)
├── note_priority, note_message
├── is_uninstalled
└── timestamps

sms_messages
├── id (UUID)
├── device_id (FK)
├── from, to, body
├── timestamp
├── type (inbox/sent)
├── sim_slot
└── created_at

contacts
├── id (UUID)
├── device_id (FK)
├── display_name
├── phone_number
└── timestamps

call_logs
├── id (UUID)
├── device_id (FK)
├── number, name
├── duration
├── call_type
└── timestamp

activity_logs
├── id (UUID)
├── admin_username (FK)
├── action
├── details (JSONB)
├── ip_address
└── timestamp
```

---

## 🚀 Performance Tips

### 1. Database Optimization:
- استفاده از Indexes روی فیلدهای پرجستجو
- Connection Pooling
- Prepared Statements
- Pagination برای لیست‌های بزرگ

### 2. Caching با Redis:
```
- Session data
- Device online status
- Stats (cache for 1 min)
- OTP codes (expire: 5 min)
```

### 3. Goroutines:
```
- WebSocket connections (هر client یه goroutine)
- Background jobs (cleanup, notifications)
- Async operations (email, telegram)
```

### 4. Rate Limiting:
```
- Login: 5 req/min per IP
- API: 100 req/min per user
- WebSocket: 1000 msg/min per connection
```

---

## 📡 API Design

### RESTful Principles:
```
GET    /api/v1/devices           # لیست
GET    /api/v1/devices/:id       # جزئیات
POST   /api/v1/devices           # ایجاد
PUT    /api/v1/devices/:id       # بروزرسانی کامل
PATCH  /api/v1/devices/:id       # بروزرسانی جزئی
DELETE /api/v1/devices/:id       # حذف
```

### Response Format:
```json
{
  "success": true,
  "data": {...},
  "message": "Success",
  "timestamp": "2024-01-01T00:00:00Z"
}

// Error
{
  "success": false,
  "error": {
    "code": "DEVICE_NOT_FOUND",
    "message": "Device not found",
    "details": {...}
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## 🔒 Security Best Practices

### 1. Input Validation:
- Validate همه inputها
- Sanitize user data
- استفاده از validator package

### 2. SQL Injection Prevention:
- استفاده از ORM (GORM)
- Prepared statements
- هیچ‌وقت raw query با user input نزن

### 3. XSS Prevention:
- Escape HTML در responses
- Content-Type headers درست

### 4. CORS:
- فقط domainهای مجاز
- Credentials: true فقط برای trusted domains

### 5. Rate Limiting:
- Per IP
- Per User
- Per Endpoint

### 6. Secrets Management:
- استفاده از .env
- هیچ‌وقت secret رو commit نکن
- استفاده از vault در production

---

## 🧪 Testing Strategy

### Unit Tests:
```go
// handlers_test.go
func TestLoginHandler(t *testing.T) {
    // Mock database
    // Test success case
    // Test error cases
}
```

### Integration Tests:
```go
// api_test.go
func TestDeviceAPI(t *testing.T) {
    // Setup test database
    // Test full flow
    // Cleanup
}
```

### Load Testing:
```bash
# با k6 یا vegeta
k6 run load-test.js
```

---

## 📊 Monitoring & Logging

### Logging:
```go
// Structured logging با zap
logger.Info("Device updated",
    zap.String("device_id", deviceID),
    zap.String("admin", username),
    zap.Duration("duration", elapsed),
)
```

### Metrics:
```
- Request count
- Response time
- Error rate
- Active connections
- Database query time
```

### Health Check:
```
GET /health
{
  "status": "ok",
  "database": "connected",
  "redis": "connected",
  "websocket": "active",
  "uptime": "24h"
}
```

---

## 🚢 Deployment

### Docker:
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o server cmd/server/main.go

FROM alpine:latest
COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
```

### Systemd Service:
```ini
[Unit]
Description=Admin Panel API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/admin-panel
ExecStart=/opt/admin-panel/server
Restart=always

[Install]
WantedBy=multi-user.target
```

---

## 🔄 Migration از Backend فعلی

### مراحل:
1. **تحلیل API فعلی**: تمام endpointها رو document کن
2. **Database Migration**: داده‌ها رو منتقل کن
3. **Parallel Run**: هر دو backend رو همزمان اجرا کن
4. **Testing**: تست کامل
5. **Switch**: DNS رو به Go backend تغییر بده
6. **Monitor**: چند روز مانیتور کن
7. **Cleanup**: Backend قدیمی رو خاموش کن

---

## 📚 منابع یادگیری

### کتاب‌ها:
- "The Go Programming Language" (Donovan & Kernighan)
- "Let's Go" (Alex Edwards)
- "Go in Action"

### دوره‌ها:
- Go by Example (gobyexample.com)
- Tour of Go (go.dev/tour)
- Effective Go (go.dev/doc/effective_go)

### GitHub Repos:
- github.com/golang-standards/project-layout
- github.com/gin-gonic/examples
- github.com/gorilla/websocket/examples

---

## 💡 نکات مهم

### 1. Error Handling:
```go
// همیشه error رو check کن
if err != nil {
    return err
}
```

### 2. Context:
```go
// برای timeout و cancellation
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
```

### 3. Defer:
```go
// برای cleanup
file, err := os.Open("file.txt")
if err != nil {
    return err
}
defer file.Close()
```

### 4. Goroutine Leaks:
```go
// همیشه goroutineها رو cleanup کن
go func() {
    defer wg.Done()
    // work
}()
```

---

## 🎯 نتیجه‌گیری

### Go مناسبه برای:
- ✅ High-performance APIs
- ✅ Real-time applications (WebSocket)
- ✅ Microservices
- ✅ پروژه‌هایی که scalability مهمه

### شروع کن با:
1. یاد بگیر Go basics (1-2 هفته)
2. یه CRUD ساده بنویس
3. WebSocket رو اضافه کن
4. Authentication پیاده کن
5. بقیه فیچرها رو اضافه کن

---

**موفق باشی! 🚀**
