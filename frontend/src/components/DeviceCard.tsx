import { Card, CardContent } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import type { Device } from '@/types'
import { formatTimeAgo, getBatteryColor } from '@/lib/utils'

interface DeviceCardProps {
  device: Device
  onView: () => void
  onPing?: () => void
  onDelete?: () => void
}

export function DeviceCard({ device, onView, onPing, onDelete }: DeviceCardProps) {
  const isOnline = device.isOnline || device.status === 'online'
  
  return (
    <Card className="hover:shadow-lg transition-all hover:scale-[1.02]">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Device Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {device.deviceName || device.model}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {device.manufacturer}
              </p>
            </div>
          </div>
          
          {/* Status Badge */}
          <Badge variant={isOnline ? 'success' : 'default'}>
            <span className={`w-2 h-2 rounded-full mr-1.5 ${isOnline ? 'bg-success' : 'bg-slate-400'}`} />
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </div>
        
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Battery */}
          <div className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {device.batteryLevel}%
            </span>
          </div>
          
          {/* Storage */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {device.storagePercentFree?.toFixed(0) || 0}% free
            </span>
          </div>
          
          {/* SMS Count */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {device.stats.totalSms} SMS
            </span>
          </div>
          
          {/* Last Ping */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {formatTimeAgo(device.lastPing)}
            </span>
          </div>
        </div>
        
        {/* SIM Info */}
        {device.simInfo && device.simInfo.length > 0 && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>
                {device.simInfo.length} SIM{device.simInfo.length > 1 ? 's' : ''}: {device.simInfo.map(s => s.carrierName).join(', ')}
              </span>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={onView}
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </Button>
          
          {onPing && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onPing()
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </Button>
          )}
          
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="text-error hover:bg-error/10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
