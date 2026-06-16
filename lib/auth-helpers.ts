import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

// Roles that are allowed to access staff/admin functionality.
// (There is no public "customer" role — all accounts are staff.)
const STAFF_ROLES = ['ADMIN', 'MANAGER']

/**
 * Returns the authenticated staff session, or null when the caller is not an
 * authenticated staff user. Use at the top of any mutating / sensitive API
 * route handler:
 *
 *   const session = await getStaffSession()
 *   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 */
export async function getStaffSession() {
  const session = await getServerSession(authOptions)
  if (!session?.user || !STAFF_ROLES.includes(session.user.role)) {
    return null
  }
  return session
}
