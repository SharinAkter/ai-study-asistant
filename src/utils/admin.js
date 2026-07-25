export const ADMIN_CREDENTIALS = {
  id: 'admin-001',
  name: 'Sharin Admin',
  email: 'sharin@aistydy.com',
  password: 'sharin123',
  role: 'admin',
}

export function isAdminUser(user) {
  return user?.role === 'admin'
}
