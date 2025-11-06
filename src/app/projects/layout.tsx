import { Navigation } from "@/components/layout/Navigation"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      {children}
    </div>
  )
}
