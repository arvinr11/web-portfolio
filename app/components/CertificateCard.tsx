'use client'

import Image from 'next/image'
import { useState, KeyboardEvent, useEffect } from 'react'
import { Eye, X } from 'lucide-react'


interface CertificateCardProps {
  certificate: {
    _id: string
    imageUrl: string
  }
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openModal()
    }
  }

  // Prevent scroll and hide navbar when modal is open
  useEffect(() => {
    if (!isModalOpen) return

    // Simple overflow hidden - no position fixed to avoid scroll jump
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Hide navbar
    const navbar = document.querySelector('nav')
    if (navbar) {
      navbar.style.display = 'none'
    }

    // Prevent scroll on wheel and touch
    const preventScroll = (e: Event) => {
      e.preventDefault()
    }
    
    document.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      // Restore original overflow only
      document.body.style.overflow = originalOverflow
      
      // Show navbar again
      if (navbar) {
        navbar.style.display = ''
      }
      
      document.removeEventListener('wheel', preventScroll)
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [isModalOpen])

  return (
    <>
      {/* Certificate Card */}
      <div
        role="button"
        tabIndex={0}
        aria-label="View Certificate"
        className="group relative cursor-pointer w-full h-full"
        onClick={openModal}
        onKeyDown={handleKeyDown}
      >
        {/* Certificate Image - No Border */}
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <Image
            src={certificate.imageUrl}
            alt="Certificate"
            width={400}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Google Lens Effect Overlay */}
        <div className="absolute inset-0 rounded-lg transition-all duration-300 bg-black/0 group-hover:bg-black/25">
          {/* Center Stack: Icon above, text below */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col items-center justify-center text-center gap-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform transition-transform duration-200 group-hover:scale-105">
                <Eye size={24} className="text-slate-800" />
              </div>
              <p className="text-white font-medium text-sm md:text-base translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                View Certificate
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* MUI Style Modal - Full Screen */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999999999]"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            padding: 0,
          }}
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div
            className="relative w-auto m-0 p-0 outline-none"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-white bg-black/60 hover:bg-black/80 hover:scale-110 transition-all duration-200 z-10 p-2 rounded-full"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Image */}
            <img
              src={certificate.imageUrl}
              alt="Certificate Full View"
              className="block w-auto h-auto object-contain"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "90vh",
                margin: "0 auto",
                objectFit: "contain",
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  )
}
