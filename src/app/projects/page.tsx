import ProjectCard from "@/components/projects/ProjectCard"
import { projects } from "@/data/projects"

export const dynamic = "force-static"

export default function ProjectsPage() {
	return (
		<main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 bg-white">
			<h1 className="mb-6 text-3xl font-bold tracking-tight text-[#020079]">Projects</h1>
			<p className="mb-8 text-muted-foreground">
				Explore our recent automobile modification and detailing projects.
			</p>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{projects.map((p) => (
									<ProjectCard key={p.id} project={p} variant="tilt" />
				))}
			</div>
		</main>
	)
}

