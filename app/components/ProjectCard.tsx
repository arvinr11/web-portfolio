'use client'

import Image from 'next/image'
import { Pin } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    description: string
    technologies: Array<{
      iconUrl: string
    }>
    images: Array<{
      url: string
      alt: string
      isMain: boolean
    }>
    featured?: boolean
    slug?: {
      current: string
    }
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const mainImage = project.images?.find(img => img.isMain) || project.images?.[0]

  const handleViewDetails = () => {
    if (project.slug?.current) {
      router.push(`/projects/${project.slug.current}`)
    } else {
      console.error('Project slug is missing:', project)
      // Fallback: could redirect to a generic projects page or show error
    }
  }

  return (
    <div className="group border-2 border-slate-700 rounded-2xl overflow-hidden bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 w-full h-full">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden m-4 rounded-xl">
        {project.featured && (
          <div className="absolute top-3 left-3 z-10" aria-label="Pinned project" title="Pinned">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md ring-1 ring-white/20 backdrop-blur-sm">
              <Pin size={12} className="text-white" />
              Pinned
            </span>
          </div>
        )}
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.alt || project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300 rounded-xl"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center rounded-xl">
            <span className="text-white text-lg font-medium">No Image</span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="px-6 pb-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

                       {/* Description - Flexible height based on tech stack */}
               <p className="text-slate-300 mb-4 line-clamp-2 min-h-[3rem]">
                 {project.description.length > 100 
                   ? `${project.description.substring(0, 100)}... See more` 
                   : project.description}
               </p>

        {/* Bottom Row: Tech Stack Icons (Left) + Button (Right) */}
        <div className="flex justify-between items-center">
                  {/* Tech Stack Icons - Left */}
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:scale-110 transition-transform duration-200 border border-slate-600"
              title="Technology"
            >
              <Image
                src={tech.iconUrl}
                alt="Technology"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
          ))}
        </div>

          {/* Button Details - Right */}
          <button onClick={handleViewDetails} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-110 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg">
            Details →
          </button>
        </div>
      </div>
    </div>
  )
}
