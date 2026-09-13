import { useEffect } from 'react'
import headshotImg from '../assets/hero-3.jpg'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';

interface BusinessCardModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BusinessCardModal({ isOpen, onClose }: BusinessCardModalProps) {

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const socials = [
    { label: 'GitHub', role: 'projects & gizmos', href: 'https://github.com/weimic', icon: FaGithub },
    { label: 'LinkedIn', role: 'anything career-related', href: 'https://linkedin.com/in/weimic', icon: FaLinkedin },
    { label: 'Instagram', role: 'my favorite photos (friends only)', href: 'https://www.instagram.com/weiimic/', icon: FaInstagram },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-200"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-3xl p-6 sm:p-8 transition-all shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{
          backgroundColor: 'var(--bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[5px]"
          style={{ backgroundColor: 'var(--accent)' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Profile Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div
            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl"
            style={{ border: '1px solid var(--border)' }}
          >
            <img
              src={headshotImg}
              alt="Michael Wei"
              className="h-full w-full object-cover object-center [transform:translateZ(0)]"
            />
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-serif text-3xl font-normal leading-tight" style={{ color: 'var(--text-h)' }}>
              Michael Wei
            </h3>
            <p className="text-xs font-mono tracking-wide" style={{ color: 'var(--accent)' }}>
              Talk to me about anything!
            </p>
            <p className="text-xs font-mono pt-1">
              New York, NY · Atlanta, GA
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6" style={{ borderTop: '1px solid var(--border)' }} />

        {/* Friendly Email Section */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-sans">
              I check my email pretty frequently. (unless I'm away)
            </span>
          </div>

          <div
            className="group flex items-center justify-between rounded-2xl p-3.5 transition-all hover:scale-[1.01]"
            style={{
              backgroundColor: 'var(--social-bg)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-medium" style={{ color: 'var(--text-h)' }}>
                wei [dot] michaely [at] outlook [dot] com
              </span>
            </div>
          </div>
        </div>

        {/* Distinctive Social Links Row */}
        <div className="mt-6 space-y-2.5">
          <span className="text-xs font-sans block">
            Find me on social media too!
          </span>

          <div className="space-y-1.5">
            {socials.map((item) => {
              // 3. Destructure the component capitalization style for rendering
              const IconComponent = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors hover:bg-[var(--accent-bg)]"
                >
                  <div className="flex items-center gap-2 group-hover:text-[var(--accent)]">
                    {/* 4. Render directly as a normal JSX element with className */}
                    <IconComponent className="w-4 h-4 transition-colors " />
                    <span className="font-medium" style={{ color: 'var(--text-h)' }}>
                      {item.label}
                    </span>
                    <span className=" text-[11px]">
                      · {item.role}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}