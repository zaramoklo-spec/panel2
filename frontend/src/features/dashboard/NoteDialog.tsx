import { Button } from '@/components/ui/Button'

interface NoteDialogProps {
  isOpen: boolean
  currentNote: string | null
  noteText: string
  onClose: () => void
  onNoteChange: (note: string | null) => void
  onTextChange: (text: string) => void
  onSave: () => void
}

export function NoteDialog({
  isOpen,
  currentNote,
  noteText,
  onClose,
  onNoteChange,
  onTextChange,
  onSave,
}: NoteDialogProps) {
  if (!isOpen) return null

  return (
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
              onClick={onClose}
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
              onClick={() => onNoteChange('high_balance')}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                currentNote === 'high_balance'
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg shadow-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
              }`}
            >
              <div className="flex flex-col items-center gap-2.5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  currentNote === 'high_balance'
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/40'
                    : 'bg-emerald-100 dark:bg-emerald-900/40'
                }`}>
                  <svg className={`w-7 h-7 ${
                    currentNote === 'high_balance'
                      ? 'text-white'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-semibold ${
                    currentNote === 'high_balance'
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    High Balance
                  </div>
                </div>
              </div>
              {currentNote === 'high_balance' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>

            {/* Low Balance */}
            <button
              onClick={() => onNoteChange('low_balance')}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                currentNote === 'low_balance'
                  ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/30 shadow-lg shadow-rose-500/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-900/10'
              }`}
            >
              <div className="flex flex-col items-center gap-2.5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  currentNote === 'low_balance'
                    ? 'bg-rose-500 shadow-lg shadow-rose-500/40'
                    : 'bg-rose-100 dark:bg-rose-900/40'
                }`}>
                  <svg className={`w-7 h-7 ${
                    currentNote === 'low_balance'
                      ? 'text-white'
                      : 'text-rose-600 dark:text-rose-400'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-semibold ${
                    currentNote === 'low_balance'
                      ? 'text-rose-700 dark:text-rose-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    Low Balance
                  </div>
                </div>
              </div>
              {currentNote === 'low_balance' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>

            {/* None */}
            <button
              onClick={() => onNoteChange('none')}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                currentNote === 'none'
                  ? 'border-slate-400 bg-slate-100 dark:bg-slate-700/50 shadow-lg shadow-slate-500/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/30'
              }`}
            >
              <div className="flex flex-col items-center gap-2.5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  currentNote === 'none'
                    ? 'bg-slate-500 shadow-lg shadow-slate-500/40'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  <svg className={`w-7 h-7 ${
                    currentNote === 'none'
                      ? 'text-white'
                      : 'text-slate-500 dark:text-slate-400'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-semibold ${
                    currentNote === 'none'
                      ? 'text-slate-700 dark:text-slate-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    None
                  </div>
                </div>
              </div>
              {currentNote === 'none' && (
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
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Add custom note or description..."
              rows={3}
              className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:border-transparent resize-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              className="flex-1 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700"
            >
              Save Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
