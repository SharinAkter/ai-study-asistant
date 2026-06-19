export function getItem(key) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key) {
  localStorage.removeItem(key)
}
