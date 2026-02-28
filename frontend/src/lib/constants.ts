// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://zeroday.cyou'
export const WS_URL = import.meta.env.VITE_WS_URL || 'wss://zeroday.cyou/ws/admin'

// Theme Colors
export const COLORS = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const

// Routes
export const ROUTES = {
  LOGIN: '/login',
  OTP: '/otp',
  DASHBOARD: '/',
  DEVICES: '/devices',
  DEVICE_DETAIL: '/devices/:id',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN_MANAGEMENT: '/admins',
  LEAK_LOOKUP: '/tools/leak-lookup',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'current_user',
  THEME: 'theme',
} as const
