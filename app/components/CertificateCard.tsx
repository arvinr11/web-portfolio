'use client'

import Image from 'next/image'

interface CertificateCardProps {
  certificate: {
    _id: string
    title: string
    imageUrl?: string
  }
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl hover:scale-105 transition-transform duration-300">
      {/* Certificate Image Only */}
      {certificate.imageUrl ? (
        <Image
          src={certificate.imageUrl}
          alt={certificate.title}
          width={300}
          height={200}
          className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <span className="text-white text-lg font-medium">No Image</span>
        </div>
      )}
    </div>
  )
}
