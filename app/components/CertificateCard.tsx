'use client'

import Image from 'next/image'
import { KeyboardEvent } from 'react'
import { Eye } from 'lucide-react'

interface CertificateCardProps {
  certificate: {
    _id: string
    imageUrl: string
    title?: string
    date?: string
  }
  onClick: () => void
}

export default function CertificateCard({ certificate, onClick }: CertificateCardProps) {
  // Membuka modal dengan keyboard enter / spasi
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View Certificate: ${certificate.title || 'Certificate'}`}
      className="group relative cursor-pointer w-full h-full"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-700 bg-slate-800 flex items-center justify-center">
        <Image
          src={certificate.imageUrl}
          alt={certificate.title || 'Certificate'}
          width={400}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/25 transition-all duration-300">
        <div className="flex flex-col items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white">
          <div className="bg-white/90 rounded-full p-3 shadow-lg">
            <Eye className="text-slate-800" size={24} />
          </div>
          <p className="mt-2 font-medium">View Certificate</p>
        </div>
      </div>
    </div>
  )
}
