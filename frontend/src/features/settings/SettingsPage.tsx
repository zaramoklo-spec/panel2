import { useThemeStore } from '@/stores/themeStore'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your application preferences and configurations
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"></div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Appearance
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Customize the look and feel of your interface
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4">
                <ThemeOption
                  label="Light"
                  description="Bright theme"
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                  isActive={theme === 'light'}
                  onClick={() => setTheme('light')}
                />
                <ThemeOption
                  label="Dark"
                  description="Dark theme"
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  }
                  isActive={theme === 'dark'}
                  onClick={() => setTheme('dark')}
                />
                <ThemeOption
                  label="System"
                  description="Auto theme"
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  isActive={theme === 'system'}
                  onClick={() => setTheme('system')}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600"></div>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    System Information
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Application details and version information
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4">
                <InfoCard
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  }
                  label="Version"
                  value="1.0.0"
                  color="purple"
                />
                <InfoCard
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  label="Build"
                  value="2024.02.27"
                  color="blue"
                />
                <InfoCard
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  }
                  label="Environment"
                  value="Production"
                  color="emerald"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ThemeOption({
  label,
  description,
  icon,
  isActive,
  onClick,
}: {
  label: string
  description: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-5 rounded-xl border-2 transition-all hover:scale-105
        ${isActive
          ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20'
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
        }
      `}
    >
      <div className={`mb-3 ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
        {icon}
      </div>
      <div className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-slate-900 dark:text-slate-100'}`}>
        {label}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </div>
      {isActive && (
        <div className="mt-2">
          <svg className="w-5 h-5 mx-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  )
}

function InfoCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: 'purple' | 'blue' | 'emerald'
}) {
  const colorClasses = {
    purple: 'from-purple-500 to-pink-600',
    blue: 'from-blue-500 to-cyan-600',
    emerald: 'from-emerald-500 to-teal-600',
  }

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} rounded-xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      <div className="relative p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 text-center">{value}</p>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium text-center">{label}</p>
      </div>
    </div>
  )
}
