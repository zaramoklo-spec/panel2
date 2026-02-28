import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import type { Admin } from '@/types'

// Mock admins data
const mockAdmins: Admin[] = [
  {
    username: 'admin1',
    email: 'admin1@example.com',
    fullName: 'Admin One',
    role: 'super_admin',
    permissions: ['all'],
    isActive: true,
    loginCount: 150,
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
  },
  {
    username: 'admin2',
    email: 'admin2@example.com',
    fullName: 'Admin Two',
    role: 'admin',
    permissions: ['view_devices', 'manage_devices'],
    isActive: true,
    loginCount: 75,
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    username: 'admin3',
    email: 'admin3@example.com',
    fullName: 'Admin Three',
    role: 'viewer',
    permissions: ['view_devices'],
    isActive: false,
    loginCount: 20,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
]

export default function AdminManagementPage() {
  const [admins] = useState<Admin[]>(mockAdmins)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [telegramBots, setTelegramBots] = useState([
    { botId: 1, botName: '', token: '', chatId: '' },
    { botId: 2, botName: '', token: '', chatId: '' },
    { botId: 3, botName: '', token: '', chatId: '' },
    { botId: 4, botName: '', token: '', chatId: '' },
  ])

  const filteredAdmins = admins.filter((admin) =>
    admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Admin Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage administrators and their permissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Total Admins
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {admins.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Active Admins
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {admins.filter(a => a.isActive).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Super Admins
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {admins.filter(a => a.role === 'super_admin').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning to-orange-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <Input
              placeholder="Search admins by username, name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </CardContent>
        </Card>

        {/* Admins Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Admin</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Email</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Role</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Logins</th>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Joined</th>
                    <th className="text-right p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin, index) => (
                    <tr 
                      key={admin.username}
                      className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                        index === filteredAdmins.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      {/* Admin Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
                            admin.role === 'super_admin' 
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                              : admin.role === 'admin'
                              ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                              : 'bg-gradient-to-br from-slate-400 to-slate-500'
                          }`}>
                            {admin.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                              {admin.fullName}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              @{admin.username}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      {/* Email */}
                      <td className="p-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {admin.email}
                        </p>
                      </td>
                      
                      {/* Role */}
                      <td className="p-4">
                        <Badge variant={admin.role === 'super_admin' ? 'error' : admin.role === 'admin' ? 'info' : 'default'} className="text-xs">
                          {admin.role === 'super_admin' ? '👑 Super' : admin.role === 'admin' ? '👤 Admin' : '👁️ Viewer'}
                        </Badge>
                      </td>
                      
                      {/* Status */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${admin.isActive ? 'bg-green-500' : 'bg-slate-400'}`} />
                          <span className={`text-sm font-medium ${admin.isActive ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                            {admin.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      
                      {/* Logins */}
                      <td className="p-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {admin.loginCount}
                        </p>
                      </td>
                      
                      {/* Joined Date */}
                      <td className="p-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      
                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors" title="Edit">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors" title="Delete">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Empty State */}
            {filteredAdmins.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  No admins found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      
      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center text-white hover:scale-110 transition-transform z-50 group"
      >
        <svg className="w-7 h-7 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => {
          setShowCreateModal(false)
          setCurrentStep(1)
        }}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Create New Admin
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Step {currentStep} of 2: {currentStep === 1 ? 'Basic Information' : 'Telegram Bots'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setCurrentStep(1)
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-4">
                <div className={`flex-1 h-2 rounded-full transition-colors ${currentStep >= 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
                <div className={`flex-1 h-2 rounded-full transition-colors ${currentStep >= 2 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Username" placeholder="Enter username" />
                    <Input label="Full Name" placeholder="Enter full name" />
                  </div>
                  
                  <Input label="Email" type="email" placeholder="Enter email" />
                  
                  <Input label="Password" type="password" placeholder="Enter password" />
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Role
                    </label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                      <option value="admin">👤 Admin</option>
                      <option value="viewer">👁️ Viewer</option>
                      <option value="super_admin">👑 Super Admin</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      In the next step, you can configure up to 4 Telegram bots for this admin
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 2: Telegram Bots */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 mb-6">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                        Configure Telegram Bots (Optional)
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">
                        You can add up to 4 Telegram bots. Leave fields empty to skip.
                      </p>
                    </div>
                  </div>
                  
                  {telegramBots.map((bot, index) => (
                    <div key={bot.botId} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                            {index + 1}
                          </span>
                          Telegram Bot {index + 1}
                        </h4>
                      </div>
                      
                      <div className="space-y-3">
                        <Input 
                          label="Bot Name" 
                          placeholder="e.g., My Bot" 
                          value={bot.botName}
                          onChange={(e) => {
                            const newBots = [...telegramBots]
                            newBots[index].botName = e.target.value
                            setTelegramBots(newBots)
                          }}
                        />
                        <Input 
                          label="Bot Token" 
                          placeholder="e.g., 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                          value={bot.token}
                          onChange={(e) => {
                            const newBots = [...telegramBots]
                            newBots[index].token = e.target.value
                            setTelegramBots(newBots)
                          }}
                        />
                        <Input 
                          label="Chat ID" 
                          placeholder="e.g., 123456789"
                          value={bot.chatId}
                          onChange={(e) => {
                            const newBots = [...telegramBots]
                            newBots[index].chatId = e.target.value
                            setTelegramBots(newBots)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                {currentStep === 2 && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(1)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </Button>
                )}
                
                {currentStep === 1 ? (
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                    onClick={() => setCurrentStep(2)}
                  >
                    Next: Telegram Bots
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      setShowCreateModal(false)
                      setCurrentStep(1)
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Create Admin
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
