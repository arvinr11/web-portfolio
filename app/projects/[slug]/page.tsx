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

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  try {
    const project = (await client.fetch(projectQueries.bySlug, {
      slug: params.slug,
    })) as Project | null

    if (!project) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Project not found</h1>
            <p className="text-slate-500 dark:text-slate-400">The project you're looking for doesn't exist.</p>
          </div>
        </div>
      )
    }

    return <ProjectDetails project={project} />
  } catch (error) {
    console.error('Error loading project:', error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">Error loading project</h1>
          <p className="text-slate-500 dark:text-slate-400">Something went wrong while loading the project.</p>
        </div>
      </div>
    )
  }
}
