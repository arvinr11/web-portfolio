"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import Aurora from '../../components/Backgrounds/Aurora/Aurora';

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

export default function ProjectDetails({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Safety check for images array
  const images = project.images || []
  const mainImage = images[currentImageIndex] || images[0]

  const nextImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev: number) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev: number) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const goToImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background - Same as home page */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#1e40af", "#3b82f6", "#0ea5e9"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Back Button - Top Left Corner */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 dark:bg-slate-800/20 backdrop-blur-md rounded-lg shadow-lg border border-white/20 dark:border-slate-700/20 hover:bg-white/30 dark:hover:bg-slate-700/30 transition-all duration-300"
        >
          <ArrowLeft size={18} className="text-slate-700 dark:text-slate-200" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Back</span>
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-12">
        {/* Project Title - Above everything */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-8">
          {project.title}
        </h1>

        {/* Main Layout: Image on left, Description on right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Project Image - 16:9 ratio */}
          <div className="w-full lg:w-2/3">
            {mainImage ? (
              <div className="relative w-full aspect-video group">
                <Image
                  src={mainImage.url}
                  alt={mainImage.alt || project.title}
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
                
                {/* Navigation Arrows - Show on hover */}
                {images.length > 1 && (
                  <>
                    {/* Left Arrow */}
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 dark:bg-slate-800/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 dark:hover:bg-slate-700/30 border border-white/20 dark:border-slate-700/20 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                    </button>
                    
                    {/* Right Arrow */}
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 dark:bg-slate-800/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 dark:hover:bg-slate-700/30 border border-white/20 dark:border-slate-700/20 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <p className="text-slate-500 dark:text-slate-400">No image available</p>
              </div>
            )}
            
            {/* Carousel Dots - Below the image */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentImageIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                    } hover:bg-blue-400 dark:hover:bg-blue-400`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* GitHub Button - Below the image */}
            {project.githubUrl && (
              <div className="mt-6">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-white/20 dark:bg-slate-800/20 backdrop-blur-md text-slate-700 dark:text-slate-200 rounded-lg hover:bg-white/30 dark:hover:bg-slate-700/30 transition-all duration-300 shadow-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl"
                >
                  <Github size={22} />
                  <span className="text-lg font-semibold">GitHub</span>
                </a>
              </div>
            )}
          </div>

          {/* Right: Description only */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Description</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              {project.description}
            </p>
          </div>
        </div>

        {/* Technology Used Section - Icons Centered in Borders */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Technology Used</h2>
          <div className="flex flex-wrap gap-5">
            {(project.technologies || []).map((tech, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-16 h-16 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-full shadow-2xl border-2 border-white/60 dark:border-slate-600/60 hover:bg-white dark:hover:bg-slate-700 hover:scale-110 transition-all duration-300 hover:shadow-3xl"
              >
                <Image 
                  src={tech.iconUrl} 
                  alt="Tech icon" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
