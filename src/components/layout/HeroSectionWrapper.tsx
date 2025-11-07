import { getCurrentUser } from '@/lib/auth'
import { HeroSection } from './HeroSection'
import { User } from '@/hooks/useAuth'

/**
 * Server component that fetches user data and passes it to the client HeroSection
 */
export async function HeroSectionWrapper() {
  const user = await getCurrentUser() as User | null
  
  return <HeroSection initialUser={user} />
}
