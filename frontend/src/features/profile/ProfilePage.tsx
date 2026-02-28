import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

export default function ProfilePage() {
  const admin = useAuthStore((state) => state.admin)
  const updateAdmin = useAuthStore((state) => state.updateAdmin)
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: admin?.fullName || '',
    email: admin?.email || '',
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handleSaveProfile = () => {
    updateAdmin(formData)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    }
    
    alert('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowPasswordForm(false)
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            My Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 overflow-hidden">
              {/* Gradient Background Header */}
              <div className="h-32 bg-gradient-to-br from-primary via-secondary to-primary relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              
              <CardContent className="p-6 text-center -mt-16 relative">
                {/* Avatar */}
                <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-primary/30 mb-4 ring-4 ring-white dark:ring-slate-900">
                  {admin?.fullName.charAt(0)}
                </div>
                
                {/* Name & Username */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {admin?.fullName}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">
                  @{admin?.username}
                </p>
                
                {/* Role & Status Badges */}
                <div className="flex gap-2 justify-center mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                    admin?.role === 'super_admin' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {admin?.role === 'super_admin' ? '👑 Super Admin' : '👤 Admin'}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                    admin?.isActive 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {admin?.isActive ? '● Active' : '○ Inactive'}
                  </span>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{admin?.loginCount}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Total Logins</p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{admin?.permissions.length}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Permissions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        Account Information
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Update your personal details
                      </p>
                    </div>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <Input
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" onClick={handleSaveProfile}>
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            fullName: admin?.fullName || '',
                            email: admin?.email || '',
                          })
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Username</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{admin?.username}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Full Name</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{admin?.fullName}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg md:col-span-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Email</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{admin?.email}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        Security
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Change your password
                      </p>
                    </div>
                  </div>
                  {!showPasswordForm && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPasswordForm(true)}
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      Change Password
                    </Button>
                  )}
                </div>
              </CardHeader>
              {showPasswordForm && (
                <CardContent className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={handleChangePassword}>
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Password
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowPasswordForm(false)
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      Permissions
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Your access permissions
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {admin?.permissions.map((permission) => (
                    <span key={permission} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">
                      ✓ {permission}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


