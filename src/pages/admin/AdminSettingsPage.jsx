import { useState } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import ToggleSwitch from '../../components/ToggleSwitch'

export default function AdminSettingsPage() {
  const { settings, updateSettings, toggleModule } = useAdmin()
  const [form, setForm] = useState({
    siteName: settings.siteName,
    siteDescription: settings.siteDescription,
    contactEmail: settings.contactEmail,
    announcementBanner: settings.announcementBanner,
    passwordMinLength: settings.passwordMinLength,
    maxUsers: settings.maxUsers,
    defaultTheme: settings.defaultTheme,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/20 dark:bg-navy-900 dark:text-white'

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl dark:text-white">App Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Configure all platform settings and feature modules</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">General Settings</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
              <input value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Description</label>
              <textarea rows={2} value={form.siteDescription} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
              <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Announcement Banner</label>
              <input value={form.announcementBanner} onChange={(e) => setForm({ ...form, announcementBanner: e.target.value })} placeholder="Optional banner text shown to users" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Min Password Length</label>
                <input type="number" min={4} max={20} value={form.passwordMinLength} onChange={(e) => setForm({ ...form, passwordMinLength: Number(e.target.value) })} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Users (0 = unlimited)</label>
                <input type="number" min={0} value={form.maxUsers} onChange={(e) => setForm({ ...form, maxUsers: Number(e.target.value) })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Theme</label>
              <select value={form.defaultTheme} onChange={(e) => setForm({ ...form, defaultTheme: e.target.value })} className={inputClass}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
          <button type="button" onClick={handleSave} className="mt-6 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">Platform Controls</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-navy-800 dark:text-white">Allow Registration</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Let new users create accounts</p>
              </div>
              <ToggleSwitch enabled={settings.allowRegistration} onToggle={() => updateSettings({ allowRegistration: !settings.allowRegistration })} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-navy-800 dark:text-white">Maintenance Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Disable public access temporarily</p>
              </div>
              <ToggleSwitch enabled={settings.maintenanceMode} onToggle={() => updateSettings({ maintenanceMode: !settings.maintenanceMode })} color="amber" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-navy-800/50">
          <h2 className="text-lg font-semibold text-navy-800 dark:text-white">Feature Modules</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enable or disable app modules</p>
          <ul className="mt-4 space-y-4">
            {Object.entries(settings.modules).map(([key, enabled]) => (
              <li key={key} className="flex items-center justify-between">
                <span className="capitalize font-medium text-navy-800 dark:text-white">{key}</span>
                <ToggleSwitch enabled={enabled} onToggle={() => toggleModule(key)} color="green" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
