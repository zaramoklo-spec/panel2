import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  trend?: {
    value: number
    isPositive: boolean
  }
  onClick?: () => void
}

export function StatsCard({ title, value, icon, color, trend, onClick }: StatsCardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-[#1A1F2E] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all relative overflow-hidden",
        onClick && "cursor-pointer hover:scale-105"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0', color)}>
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            {value.toLocaleString()}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </div>
          
          {/* Trend indicator (optional) */}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-xs font-medium',
              trend.isPositive ? 'text-success' : 'text-error'
            )}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {trend.isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                )}
              </svg>
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
