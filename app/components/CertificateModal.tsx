'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface CertificateModalProps {
  imageUrl: string
  onClose: () => void
}

export default function CertificateModal({ imageUrl, onClose }: CertificateModalProps) {
  // Disable body scroll while modal is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center overscroll-none select-none"
      onClick={onClose}
    >
      {/* Close Button (circular, high contrast) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 rounded-full bg-white/90 text-slate-900 p-1 shadow-lg hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
        aria-label="Close modal"
      >
        <X size={18} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
      </button>

      {/* Certificate Image - clicking also closes modal */}
      <img
        src={imageUrl}
        alt="Certificate"
        className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
        style={{ userSelect: 'none' }}
        draggable={false}
        onClick={onClose}
      />
    </div>
  )
}

