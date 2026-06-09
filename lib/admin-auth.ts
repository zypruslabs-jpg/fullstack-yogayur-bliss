// Simple admin auth using environment variable password
// No database needed for single admin user

export function checkAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'yogayur2025'
  return password === adminPassword
}

export function getAdminToken(): string {
  return process.env.ADMIN_SECRET_TOKEN || 'yogayur-admin-secret-2025'
}

export function verifyAdminToken(token: string): boolean {
  return token === getAdminToken()
}
