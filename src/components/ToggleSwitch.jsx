export default function ToggleSwitch({ enabled, onToggle, color = 'primary' }) {
  const colors = {
    primary: enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600',
    green: enabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600',
    amber: enabled ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600',
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-7 w-12 rounded-full transition ${colors[color]}`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
          enabled ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  )
}
