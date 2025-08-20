'use client'

import Image from 'next/image'
import { useState, KeyboardEvent } from 'react'
import { Eye, X } from 'lucide-react'

interface CertificateCardProps {
  certificate: {
    _id: string
    imageUrl: string
  }
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openModal()
    }
  }

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
      {/* Modal Popup (outside clickable card) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* Close Button */}
            <button
              onClick={(e) => { e.stopPropagation(); closeModal(); }}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Certificate Image */}
            <div className="w-full h-full rounded-lg overflow-hidden">
              <Image
                src={certificate.imageUrl}
                alt="Certificate Full View"
                width={800}
                height={600}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
