import Link from "next/link"

export default function NotFound() {
  return (
    <main className="container mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-[#020079]">Project not found</h1>
      <p className="mt-2 text-muted-foreground">
        The project you are looking for doesn’t exist or was removed.
      </p>
      <div className="mt-4">
        <Link href="/projects" className="text-[#020079] hover:underline">
          ← Back to Projects
        </Link>
      </div>
    </main>
  )
}
