import { getCurrentUser } from '@/lib/auth'
import { Navigation } from './Navigation'
import { User } from '@/hooks/useAuth'

/**
 * Server component that fetches user data and passes it to the client Navigation
 */
export async function NavigationWrapper() {
  const user = await getCurrentUser() as User | null
  
  return <Navigation initialUser={user} />
}
