import LandingPage from "@/components/LandingPage"

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return <LandingPage />
}