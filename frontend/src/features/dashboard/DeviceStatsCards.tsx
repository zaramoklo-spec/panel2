import { StatsCard } from '@/components/StatsCard'
import type { Stats } from '@/types'

interface DeviceStatsCardsProps {
  stats: Stats
  onFilterClick: (filter: string) => void
}

export function DeviceStatsCards({ stats, onFilterClick }: DeviceStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
      <StatsCard
        title="Total Devices"
        value={stats.totalDevices}
        icon={
          <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        }
        color="bg-blue-100 dark:bg-blue-900/20"
        onClick={() => onFilterClick('all')}
      />
      
      <StatsCard
        title="Active Devices"
        value={stats.activeDevices}
        icon={
          <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        color="bg-green-100 dark:bg-green-900/20"
        onClick={() => onFilterClick('active')}
      />
      
      <StatsCard
        title="Pending Setup"
        value={stats.pendingDevices}
        icon={
          <svg className="w-7 h-7 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        color="bg-orange-100 dark:bg-orange-900/20"
        onClick={() => onFilterClick('pending')}
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
        onClick={() => onFilterClick('online')}
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
        onClick={() => onFilterClick('offline')}
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
        onClick={() => onFilterClick('deleted')}
      />
    </div>
  )
}
