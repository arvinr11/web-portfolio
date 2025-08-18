'use client'

import Image from 'next/image'

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
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const mainImage = project.images?.find(img => img.isMain) || project.images?.[0]

  return (
    <div className="group border-2 border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden m-4 rounded-xl">
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
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

                       {/* Description - Flexible height based on tech stack */}
               <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 min-h-[3rem]">
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
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:scale-110 transition-transform duration-200 border border-slate-200 dark:border-slate-600"
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
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg">
            Details →
          </button>
        </div>
      </div>
    </div>
  )
}
