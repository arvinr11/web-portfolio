'use client'

import Image from 'next/image'
import { useState } from 'react'
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

  return (
    <>
      {/* Certificate Card */}
      <div className="group relative cursor-pointer" onClick={openModal}>
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
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg">
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <Eye size={24} className="text-slate-800" />
            </div>
          </div>
        </div>
        
        {/* View Certificate Text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-b-lg">
          <p className="text-white font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Certificate
          </p>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
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
