import { client } from '../../../lib/client'
import { projectQueries } from '../../../lib/queries'
import ProjectDetails from './ProjectDetails'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  technologies: { iconUrl: string }[]
  images: { url: string; alt: string; isMain: boolean }[]
  githubUrl?: string
  featured: boolean
  yearCreated: number
  category: string
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const project = (await client.fetch(projectQueries.bySlug, {
      slug,
    })) as Project | null

    if (!project) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-200 mb-4">Project not found</h1>
            <p className="text-slate-400">The project you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      )
    }

    return <ProjectDetails project={project} />
  } catch (error) {
    console.error('Error loading project:', error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-200 mb-4">Error loading project</h1>
          <p className="text-slate-400">Something went wrong while loading the project.</p>
        </div>
      </div>
    )
  }
}
