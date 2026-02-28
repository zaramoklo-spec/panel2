import { create } from 'zustand'
import type { Device, DeviceFilters, Stats } from '@/types'

interface DeviceState {
  devices: Device[]
  selectedDevice: Device | null
  stats: Stats
  filters: DeviceFilters
  isLoading: boolean
  error: string | null
  
  // Actions
  setDevices: (devices: Device[]) => void
  setSelectedDevice: (device: Device | null) => void
  setStats: (stats: Stats) => void
  setFilters: (filters: Partial<DeviceFilters>) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  updateDeviceNote: (deviceId: string, note: 'high_balance' | 'low_balance' | 'none' | null, noteText?: string) => void
  
  // Computed
  getFilteredDevices: () => Device[]
}

export const useDeviceStore = create<DeviceState>((set, get) => ({
  devices: [],
  selectedDevice: null,
  stats: {
    totalDevices: 0,
    onlineDevices: 0,
    activeDevices: 0,
    pendingDevices: 0,
    deletedDevices: 0,
  },
  filters: {
    search: '',
    status: ['all'],
    appType: '',
    adminUsername: '',
  },
  isLoading: false,
  error: null,
  
  setDevices: (devices) => set({ devices }),
  setSelectedDevice: (device) => set({ selectedDevice: device }),
  setStats: (stats) => set({ stats }),
  setFilters: (filters) => set((state) => ({ 
    filters: { ...state.filters, ...filters } 
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  updateDeviceNote: (deviceId, note, noteText) => set((state) => ({
    devices: state.devices.map((device) =>
      device.device_id === deviceId
        ? { 
            ...device, 
            note: note === 'none' ? null : note,
            note_text: note === 'none' ? null : noteText || null
          }
        : device
    ),
  })),
  
  getFilteredDevices: () => {
    const { devices, filters } = get()
    
    return devices.filter((device) => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase()
        const matchesSearch = 
          device.device_id.toLowerCase().includes(search) ||
          device.model.toLowerCase().includes(search) ||
          device.manufacturer.toLowerCase().includes(search) ||
          device.device_name?.toLowerCase().includes(search) ||
          device.note_text?.toLowerCase().includes(search) ||
          device.sim_info?.some(sim => sim.phone_number.toLowerCase().includes(search)) ||
          device.ip_address?.toLowerCase().includes(search)
        
        if (!matchesSearch) return false
      }
      
      // Status filters - if 'all' is selected or array is empty, show all
      if (filters.status.length > 0 && !filters.status.includes('all')) {
        const isAppDeleted = new Date().getTime() - new Date(device.last_ping).getTime() > 7 * 24 * 60 * 60 * 1000
        const isPending = !device.is_online && device.stats.total_sms === 0 && !isAppDeleted
        const isActive = device.stats.total_sms > 0
        
        let matchesAnyFilter = false
        
        for (const status of filters.status) {
          if (status === 'online' && device.is_online) matchesAnyFilter = true
          if (status === 'offline' && !device.is_online) matchesAnyFilter = true
          if (status === 'active' && isActive) matchesAnyFilter = true
          if (status === 'pending' && isPending) matchesAnyFilter = true
          if (status === 'deleted' && isAppDeleted) matchesAnyFilter = true
          if (status === 'high_balance' && device.note === 'high_balance') matchesAnyFilter = true
          if (status === 'low_balance' && device.note === 'low_balance') matchesAnyFilter = true
          if (status === 'high_battery' && device.battery_level >= 80) matchesAnyFilter = true
          if (status === 'low_battery' && device.battery_level < 20) matchesAnyFilter = true
          if (status === 'has_upi' && device.has_upi) matchesAnyFilter = true
          if (status === 'no_upi' && !device.has_upi) matchesAnyFilter = true
        }
        
        if (!matchesAnyFilter) return false
      }
      
      // App type filter
      if (filters.appType && device.app_type !== filters.appType) {
        return false
      }
      
      return true
    })
  },
}))
