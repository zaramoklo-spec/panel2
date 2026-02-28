import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatTimeAgo, formatBytes } from '@/lib/utils'
import type { Device, SmsMessage, Contact, CallLog } from '@/types'

// Mock device data (با ساختار جدید)
const mockDevice: Device = {
  device_id: 'device_1',
  admin_token: 'token_1',
  admin_username: 'admin',
  app_type: 'wosexy',
  
  battery_level: 85,
  battery_state: 'charging',
  is_charging: true,
  
  board: 'Samsung-S21',
  brand: 'Samsung',
  device: 'Samsung-S21',
  device_name: 'Samsung Galaxy S21',
  display: 'S21-Display',
  fingerprint: 'Samsung/S21:13/fingerprint',
  hardware: 'exynos2100',
  host: 'srv99186-1010',
  manufacturer: 'Samsung',
  model: 'Galaxy S21',
  product: 'S21-Global',
  
  os_version: '13',
  sdk_int: 33,
  screen_density: 420,
  screen_resolution: '1080x2400',
  supported_abis: ['arm64-v8a'],
  
  total_storage_mb: 128000,
  free_storage_mb: 64000,
  storage_used_mb: 64000,
  storage_percent_free: 50,
  total_ram_mb: 8000,
  free_ram_mb: 4000,
  ram_used_mb: 4000,
  ram_percent_free: 50,
  
  network_type: 'WiFi',
  ip_address: '192.168.1.100',
  
  status: 'online',
  is_online: true,
  is_emulator: false,
  is_rooted: false,
  last_online_update: new Date().toISOString(),
  last_ping: new Date().toISOString(),
  registered_at: new Date(Date.now() - 86400000 * 15).toISOString(),
  updated_at: new Date().toISOString(),
  
  settings: {
    monitoring_enabled: true,
    sms_forward_enabled: false,
    call_forward_enabled: true,
    forward_number: null,
  },
  
  stats: {
    total_sms: 1234,
    total_contacts: 456,
    total_calls: 789,
    last_sms_sync: new Date().toISOString(),
    last_contact_sync: new Date().toISOString(),
    last_call_sync: new Date().toISOString(),
  },
  
  sim_info: [
    {
      sim_slot: 0,
      subscription_id: 1,
      carrier_name: 'Airtel',
      display_name: 'Airtel',
      phone_number: '+919876543210',
      country_iso: 'in',
      network_type: 'LTE (4G)',
      sim_state: 'Ready',
      data_enabled: true,
      voice_capable: true,
      sms_capable: true,
    },
    {
      sim_slot: 1,
      subscription_id: 2,
      carrier_name: 'Jio',
      display_name: 'Jio',
      phone_number: '+919876543211',
      country_iso: 'in',
      network_type: 'LTE (4G)',
      sim_state: 'Ready',
      data_enabled: false,
      voice_capable: true,
      sms_capable: true,
    },
  ],
  
  has_upi: true,
  upi_detected_at: null,
  upi_last_updated_at: new Date().toISOString(),
  upi_pins: [
    {
      pin: '123456',
      app_type: 'Google Pay',
      status: 'success',
      detected_at: new Date().toISOString(),
    },
    {
      pin: '654321',
      app_type: 'Google Pay',
      status: 'success',
      detected_at: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      pin: '789012',
      app_type: 'Google Pay',
      status: 'failed',
      detected_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
  
  telegram_bot_id: 1,
  fcm_tokens: [],
  user_id: 'user_1',
}

// Mock SMS data
const mockSms: SmsMessage[] = Array.from({ length: 10 }, (_, i) => ({
  id: `sms_${i}`,
  deviceId: 'device_1',
  from: i % 2 === 0 ? '+919876543210' : undefined,
  to: i % 2 === 1 ? '+919876543210' : undefined,
  body: `This is a sample SMS message number ${i + 1}. Lorem ipsum dolor sit amet.`,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  type: i % 2 === 0 ? 'inbox' : 'sent',
  isRead: Math.random() > 0.3,
  isFlagged: false,
  tags: [],
  receivedAt: new Date(Date.now() - i * 3600000).toISOString(),
  simSlot: i % 2,
}))

// Mock Contacts
const mockContacts: Contact[] = Array.from({ length: 10 }, (_, i) => ({
  id: `contact_${i}`,
  deviceId: 'device_1',
  displayName: `Contact ${i + 1}`,
  phoneNumber: `+9198765432${10 + i}`,
  lastUpdated: new Date().toISOString(),
}))

// Mock Call Logs
const mockCalls: CallLog[] = Array.from({ length: 10 }, (_, i) => ({
  id: `call_${i}`,
  number: `+9198765432${10 + i}`,
  name: `Contact ${i + 1}`,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  duration: Math.floor(Math.random() * 600),
  callType: ['incoming', 'outgoing', 'missed'][Math.floor(Math.random() * 3)] as any,
}))

export default function DeviceDetailPage() {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const [activeTab, setActiveTab] = useState<'info' | 'sms' | 'logs'>('info')
  const [device] = useState<Device>(mockDevice)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Copied silently
    }).catch(() => {
      // Failed silently
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1419]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1A1F2E] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                device.is_online ? 'bg-green-100 dark:bg-green-900/20' : 'bg-slate-100 dark:bg-slate-800'
              }`}>
                <svg className={`w-8 h-8 ${
                  device.is_online ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {device.device_name}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-slate-600 dark:text-slate-400">
                    {device.manufacturer} • Android {device.os_version} • {device.app_type}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(device.device_id, 'Device ID')
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-mono font-semibold transition-colors group"
                    title="Click to copy"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    {device.device_id}
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant={device.is_online ? 'success' : 'default'} className="px-3 py-1.5">
                <span className={`w-2 h-2 rounded-full mr-2 ${device.is_online ? 'bg-green-500' : 'bg-slate-400'}`} />
                {device.is_online ? 'Online' : 'Offline'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Battery</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {device.battery_level}%
                  </p>
                  {device.is_charging && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">⚡ Charging</p>
                  )}
                </div>
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">Storage</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {device.storage_percent_free.toFixed(0)}%
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    {formatBytes(device.free_storage_mb * 1024 * 1024)} free
                  </p>
                </div>
                <svg className="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-1">RAM</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {device.ram_percent_free.toFixed(0)}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {formatBytes(device.free_ram_mb * 1024 * 1024)} free
                  </p>
                </div>
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mb-1">Last Ping</p>
                  <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                    {formatTimeAgo(device.last_ping)}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    {device.network_type}
                  </p>
                </div>
                <svg className="w-10 h-10 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-[#1A1F2E] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
            <nav className="flex gap-1 p-2">
              {[
                { 
                  id: 'info', 
                  label: 'Device Info', 
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )
                },
                { 
                  id: 'sms', 
                  label: 'SMS Messages', 
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ),
                  count: device.stats.total_sms 
                },
                { 
                  id: 'logs', 
                  label: 'Activity Logs', 
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2.5 px-4 font-medium text-sm transition-all rounded-lg flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'info' && <InfoTab device={device} copyToClipboard={copyToClipboard} />}
            {activeTab === 'sms' && <SmsTab messages={mockSms} />}
            {activeTab === 'logs' && <LogsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Info Tab
function InfoTab({ device, copyToClipboard }: { device: Device; copyToClipboard: (text: string, label: string) => void }) {
  const [smsForwardDialog, setSmsForwardDialog] = useState(false)
  const [callForwardDialog, setCallForwardDialog] = useState(false)
  const [smsForwardEnabled, setSmsForwardEnabled] = useState(device.settings.sms_forward_enabled)
  const [callForwardEnabled, setCallForwardEnabled] = useState(device.settings.call_forward_enabled || false)
  const [smsForwardNumber, setSmsForwardNumber] = useState(device.settings.forward_number || '')
  const [callForwardNumber, setCallForwardNumber] = useState(device.settings.forward_number || '')
  const [smsSelectedSim, setSmsSelectedSim] = useState(0)
  const [callSelectedSim, setCallSelectedSim] = useState(0)

  const handleSmsForwardSave = () => {
    // TODO: Save SMS forward settings
    setSmsForwardDialog(false)
    // Show success message (you can add a toast notification here)
  }

  const handleCallForwardSave = () => {
    // TODO: Save Call forward settings
    setCallForwardDialog(false)
    // Show success message (you can add a toast notification here)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Device Information */}
      <Card className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200 dark:border-sky-800">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-current/10">
            <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-sky-900 dark:text-sky-100">Device Information</h3>
          </div>
          <div className="space-y-2.5">
            <InfoRow label="Device ID" value={device.device_id} color="sky" />
            <InfoRow label="Model" value={device.model} color="sky" />
            <InfoRow label="Manufacturer" value={device.manufacturer} color="sky" />
            <InfoRow label="Brand" value={device.brand} color="sky" />
            <InfoRow label="OS Version" value={`Android ${device.os_version}`} color="sky" />
            <InfoRow label="SDK" value={device.sdk_int.toString()} color="sky" />
            <InfoRow label="Screen" value={device.screen_resolution} color="sky" />
            <InfoRow label="Network" value={device.network_type} color="sky" />
            <InfoRow label="IP Address" value={device.ip_address} color="sky" />
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-cyan-200 dark:border-cyan-800">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-current/10">
            <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">System Information</h3>
          </div>
          <div className="space-y-2.5">
            <InfoRow label="Board" value={device.board} color="cyan" />
            <InfoRow label="Hardware" value={device.hardware} color="cyan" />
            <InfoRow label="Product" value={device.product} color="cyan" />
            <InfoRow label="Fingerprint" value={device.fingerprint} copyable color="cyan" />
            <InfoRow label="Emulator" value={device.is_emulator ? 'Yes' : 'No'} color="cyan" />
            <InfoRow label="Rooted" value={device.is_rooted ? 'Yes' : 'No'} color="cyan" />
            <InfoRow label="Registered" value={formatTimeAgo(device.registered_at)} color="cyan" />
          </div>
        </CardContent>
      </Card>

      {/* SIM Cards */}
      <div className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">SIM Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {device.sim_info.map((sim, index) => {
            const colors = [
              { bg: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20', border: 'border-indigo-200 dark:border-indigo-800', text: 'text-indigo-900 dark:text-indigo-100', subtext: 'text-indigo-700 dark:text-indigo-300', icon: 'bg-indigo-500' },
              { bg: 'from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20', border: 'border-violet-200 dark:border-violet-800', text: 'text-violet-900 dark:text-violet-100', subtext: 'text-violet-700 dark:text-violet-300', icon: 'bg-violet-500' },
            ]
            const color = colors[index % colors.length]
            
            return (
              <Card key={sim.sim_slot} className={`bg-gradient-to-br ${color.bg} ${color.border}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-current/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${color.icon} flex items-center justify-center`}>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.5 6h-15A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0019.5 6zM9 16H5v-2h4v2zm0-3H5v-2h4v2zm0-3H5V8h4v2zm10 6h-9v-8h9v8z"/>
                        </svg>
                      </div>
                      <span className={`font-semibold text-lg ${color.text}`}>
                        SIM {sim.sim_slot + 1}
                      </span>
                    </div>
                    <span className={`px-3 py-1 bg-white/60 dark:bg-black/20 ${color.text} text-xs font-semibold rounded-full`}>
                      {sim.subscription_id}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className={`text-xs ${color.subtext} mb-1`}>Carrier</p>
                      <p className={`text-lg font-bold ${color.text}`}>
                        {sim.carrier_name}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${color.subtext} mb-1`}>Phone Number</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(sim.phone_number, 'Phone number')
                        }}
                        className={`font-mono font-semibold ${color.text} text-base tracking-wide hover:underline cursor-pointer flex items-center gap-2 group`}
                        title="Click to copy"
                      >
                        {sim.phone_number}
                        <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className={`text-xs ${color.subtext} mb-1`}>Network</p>
                        <p className={`text-sm font-semibold ${color.text}`}>
                          {sim.network_type}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${color.subtext} mb-1`}>Status</p>
                        <p className={`text-sm font-semibold ${color.text}`}>
                          {sim.sim_state}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-current/10">
                    {sim.data_enabled && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/60 dark:bg-black/20 ${color.text} rounded-md text-xs font-medium`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                        Data
                      </span>
                    )}
                    {sim.voice_capable && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/60 dark:bg-black/20 ${color.text} rounded-md text-xs font-medium`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Voice
                      </span>
                    )}
                    {sim.sms_capable && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/60 dark:bg-black/20 ${color.text} rounded-md text-xs font-medium`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        SMS
                      </span>
                    )}
                    {sim.is_network_roaming && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/60 dark:bg-black/20 ${color.text} rounded-md text-xs font-medium`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Roaming
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* UPI Information */}
      {device.has_upi && (
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">UPI Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Successful PINs */}
            {device.upi_pins.filter(pin => pin.status === 'success').length > 0 && (
              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-current/10">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-lg text-emerald-900 dark:text-emerald-100">
                      Successful PINs
                    </span>
                    <span className="ml-auto px-3 py-1 bg-white/60 dark:bg-black/20 text-emerald-900 dark:text-emerald-100 text-xs font-semibold rounded-full">
                      {device.upi_pins.filter(pin => pin.status === 'success').length}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {device.upi_pins.filter(pin => pin.status === 'success').map((pin, idx) => (
                      <div key={idx} className="p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                            {pin.app_type}
                          </span>
                          <span className="text-xs text-emerald-700 dark:text-emerald-300">
                            {formatTimeAgo(pin.detected_at)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-emerald-700 dark:text-emerald-300">PIN:</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(pin.pin, 'UPI PIN')
                            }}
                            className="font-mono font-bold text-emerald-900 dark:text-emerald-100 text-xl tracking-wider hover:underline cursor-pointer flex items-center gap-2 group"
                            title="Click to copy"
                          >
                            {pin.pin}
                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Failed PINs */}
            {device.upi_pins.filter(pin => pin.status === 'failed').length > 0 && (
              <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border-rose-200 dark:border-rose-800">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-current/10">
                    <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-lg text-rose-900 dark:text-rose-100">
                      Failed PINs
                    </span>
                    <span className="ml-auto px-3 py-1 bg-white/60 dark:bg-black/20 text-rose-900 dark:text-rose-100 text-xs font-semibold rounded-full">
                      {device.upi_pins.filter(pin => pin.status === 'failed').length}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {device.upi_pins.filter(pin => pin.status === 'failed').map((pin, idx) => (
                      <div key={idx} className="p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-rose-900 dark:text-rose-100">
                            {pin.app_type}
                          </span>
                          <span className="text-xs text-rose-700 dark:text-rose-300">
                            {formatTimeAgo(pin.detected_at)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-rose-700 dark:text-rose-300">PIN:</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(pin.pin, 'UPI PIN')
                            }}
                            className="font-mono font-bold text-rose-900 dark:text-rose-100 text-xl tracking-wider hover:underline cursor-pointer flex items-center gap-2 group"
                            title="Click to copy"
                          >
                            {pin.pin}
                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Settings */}
      <Card className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/20 dark:to-slate-900/20 border-slate-200 dark:border-slate-800">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-slate-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-black/20 rounded-lg">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Monitoring</span>
              </div>
              <Badge variant={device.settings.monitoring_enabled ? 'success' : 'default'}>
                {device.settings.monitoring_enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <button
              onClick={() => setSmsForwardDialog(true)}
              className="flex items-center justify-between p-4 bg-white/60 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">SMS Forwarder</span>
              </div>
              <Badge variant={smsForwardEnabled ? 'success' : 'default'}>
                {smsForwardEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </button>
            <button
              onClick={() => setCallForwardDialog(true)}
              className="flex items-center justify-between p-4 bg-white/60 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Call Forwarder</span>
              </div>
              <Badge variant={callForwardEnabled ? 'success' : 'default'}>
                {callForwardEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Dialogs */}
      <SmsForwardDialog
        isOpen={smsForwardDialog}
        onClose={() => setSmsForwardDialog(false)}
        device={device}
        enabled={smsForwardEnabled}
        setEnabled={setSmsForwardEnabled}
        forwardNumber={smsForwardNumber}
        setForwardNumber={setSmsForwardNumber}
        selectedSim={smsSelectedSim}
        setSelectedSim={setSmsSelectedSim}
        onSave={handleSmsForwardSave}
      />
      
      <CallForwardDialog
        isOpen={callForwardDialog}
        onClose={() => setCallForwardDialog(false)}
        device={device}
        enabled={callForwardEnabled}
        setEnabled={setCallForwardEnabled}
        forwardNumber={callForwardNumber}
        setForwardNumber={setCallForwardNumber}
        selectedSim={callSelectedSim}
        setSelectedSim={setCallSelectedSim}
        onSave={handleCallForwardSave}
      />
    </div>
  )
}

// SMS Forward Dialog
function SmsForwardDialog({ 
  isOpen, 
  onClose, 
  device, 
  enabled, 
  setEnabled, 
  forwardNumber, 
  setForwardNumber, 
  selectedSim, 
  setSelectedSim, 
  onSave 
}: {
  isOpen: boolean
  onClose: () => void
  device: Device
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  forwardNumber: string
  setForwardNumber: (number: string) => void
  selectedSim: number
  setSelectedSim: (sim: number) => void
  onSave: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#1A1F2E] rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              SMS Forwarder Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Enable SMS Forwarding</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Forward incoming SMS to another number</p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                enabled ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* SIM Card Selection */}
          <div className={enabled ? '' : 'opacity-50 pointer-events-none'}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Select SIM Card
            </label>
            <div className="space-y-2">
              {device.sim_info.map((sim, index) => (
                <button
                  key={sim.sim_slot}
                  onClick={() => setSelectedSim(index)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    selectedSim === index
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-500 dark:border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    selectedSim === index ? 'bg-blue-500' : 'bg-slate-400'
                  }`}>
                    {sim.sim_slot + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold text-sm ${
                      selectedSim === index 
                        ? 'text-blue-900 dark:text-blue-100' 
                        : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {sim.carrier_name}
                    </p>
                    <p className={`text-xs ${
                      selectedSim === index 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {sim.phone_number}
                    </p>
                  </div>
                  {selectedSim === index && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Forward Number */}
          <div className={enabled ? '' : 'opacity-50 pointer-events-none'}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Forward to Number
            </label>
            <input
              type="tel"
              value={forwardNumber}
              onChange={(e) => setForwardNumber(e.target.value)}
              disabled={!enabled}
              placeholder="+91 1234567890"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

// Call Forward Dialog (similar to SMS)
function CallForwardDialog({ 
  isOpen, 
  onClose, 
  device, 
  enabled, 
  setEnabled, 
  forwardNumber, 
  setForwardNumber, 
  selectedSim, 
  setSelectedSim, 
  onSave 
}: {
  isOpen: boolean
  onClose: () => void
  device: Device
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  forwardNumber: string
  setForwardNumber: (number: string) => void
  selectedSim: number
  setSelectedSim: (sim: number) => void
  onSave: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#1A1F2E] rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Call Forwarder Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Enable Call Forwarding</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Forward incoming calls to another number</p>
            </div>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                enabled ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  enabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* SIM Card Selection */}
          <div className={enabled ? '' : 'opacity-50 pointer-events-none'}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Select SIM Card
            </label>
            <div className="space-y-2">
              {device.sim_info.map((sim, index) => (
                <button
                  key={sim.sim_slot}
                  onClick={() => setSelectedSim(index)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    selectedSim === index
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-500 dark:border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    selectedSim === index ? 'bg-blue-500' : 'bg-slate-400'
                  }`}>
                    {sim.sim_slot + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold text-sm ${
                      selectedSim === index 
                        ? 'text-blue-900 dark:text-blue-100' 
                        : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {sim.carrier_name}
                    </p>
                    <p className={`text-xs ${
                      selectedSim === index 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {sim.phone_number}
                    </p>
                  </div>
                  {selectedSim === index && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Forward Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Forward to Number
            </label>
            <input
              type="tel"
              value={forwardNumber}
              onChange={(e) => setForwardNumber(e.target.value)}
              placeholder="+91 1234567890"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

// SMS Tab
function SmsTab({ messages }: { messages: SmsMessage[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSimSlot, setSelectedSimSlot] = useState<number>(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const device = mockDevice // Access device data

  const handleSendSms = () => {
    const selectedSim = device.sim_info[selectedSimSlot]
    // TODO: Implement SMS sending logic
    alert(`Sending SMS via ${selectedSim.carrier_name} (${selectedSim.phone_number})\nTo: ${phoneNumber}\nMessage: ${messageText}`)
    setIsDialogOpen(false)
    setPhoneNumber('')
    setMessageText('')
    setSelectedSimSlot(0)
  }

  const handleRefreshFirebase = () => {
    // TODO: Implement Firebase refresh
  }

  const handleRefreshServer = () => {
    // TODO: Implement Server refresh
  }

  // Filter messages based on search
  const filteredMessages = messages.filter(msg => 
    msg.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (msg.from && msg.from.includes(searchQuery)) ||
    (msg.to && msg.to.includes(searchQuery))
  )

  return (
    <div>
      {/* Action Bar */}
      <div className="flex items-center gap-2.5 mb-5">
        {/* Search Box */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Send</span>
        </button>

        {/* Firebase Refresh */}
        <button
          onClick={handleRefreshFirebase}
          className="p-2.5 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg transition-colors"
          title="Firebase"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </button>

        {/* Server Refresh */}
        <button
          onClick={handleRefreshServer}
          className="p-2.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
          title="Server"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Count */}
        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {filteredMessages.length}
        </span>
      </div>

      {/* SMS List */}
      <div className="space-y-3">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((sms) => (
            <Card key={sms.id} className="hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    sms.type === 'inbox' 
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30' 
                      : 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30'
                  }`}>
                    <svg className={`w-6 h-6 ${
                      sms.type === 'inbox' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {sms.type === 'inbox' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      )}
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {sms.type === 'inbox' ? sms.from : sms.to}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          sms.type === 'inbox'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          {sms.type === 'inbox' ? 'Received' : 'Sent'}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium">
                          SIM {(sms.simSlot || 0) + 1}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {formatTimeAgo(sms.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {sms.body}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No messages found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {searchQuery ? 'Try adjusting your search terms' : 'Messages will appear here when available'}
            </p>
          </div>
        )}
      </div>

      {/* Send SMS Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsDialogOpen(false)}>
          <div className="bg-white dark:bg-[#1A1F2E] rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            {/* Dialog Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Send SMS
                </h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dialog Body */}
            <div className="p-6 space-y-4">
              {/* SIM Card Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Select SIM Card
                </label>
                <div className="space-y-2">
                  {device.sim_info.map((sim, index) => (
                    <button
                      key={sim.sim_slot}
                      onClick={() => setSelectedSimSlot(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        selectedSimSlot === index
                          ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-500 dark:border-blue-600'
                          : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        selectedSimSlot === index ? 'bg-blue-500' : 'bg-slate-400'
                      }`}>
                        {sim.sim_slot + 1}
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`font-semibold text-sm ${
                          selectedSimSlot === index 
                            ? 'text-blue-900 dark:text-blue-100' 
                            : 'text-slate-900 dark:text-slate-100'
                        }`}>
                          {sim.carrier_name}
                        </p>
                        <p className={`text-xs ${
                          selectedSimSlot === index 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {sim.phone_number}
                        </p>
                      </div>
                      {selectedSimSlot === index && (
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 1234567890"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {messageText.length} characters
                </p>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendSms}
                disabled={!phoneNumber || !messageText}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send SMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Logs Tab
function LogsTab() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        Activity Logs
      </h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        Device activity logs and event history will be displayed here. This feature tracks all device actions and system events.
      </p>
    </div>
  )
}

// Helper component
function InfoRow({ label, value, copyable, color = 'slate' }: { label: string; value: string; copyable?: boolean; color?: string }) {
  const colorClasses = {
    sky: {
      bg: 'hover:bg-white/60 dark:hover:bg-black/20',
      label: 'text-sky-700 dark:text-sky-300',
      value: 'text-sky-900 dark:text-sky-100'
    },
    cyan: {
      bg: 'hover:bg-white/60 dark:hover:bg-black/20',
      label: 'text-cyan-700 dark:text-cyan-300',
      value: 'text-cyan-900 dark:text-cyan-100'
    },
    slate: {
      bg: 'hover:bg-slate-50 dark:hover:bg-slate-900/50',
      label: 'text-slate-600 dark:text-slate-400',
      value: 'text-slate-900 dark:text-slate-100'
    }
  }
  
  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.slate
  
  return (
    <div className={`flex justify-between items-center py-2.5 px-3 rounded-lg ${colors.bg} transition-colors`}>
      <span className={`text-sm font-medium ${colors.label}`}>{label}</span>
      <span className={`text-sm font-semibold ${colors.value} ${copyable ? 'font-mono text-xs' : ''}`}>
        {copyable && value.length > 40 ? `${value.substring(0, 40)}...` : value}
      </span>
    </div>
  )
}
