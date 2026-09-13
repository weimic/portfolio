import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroGrid from '../components/HeroGrid'
import BusinessCardModal from '../components/BusinessCardModal'

const words = ['iterating.', 'growing.', 'learning.', 'exploring.', 'building.', 'experiencing.']

export default function Home() {
  const [index, setIndex] = useState(0)
  const [animState, setAnimState] = useState<'visible' | 'exiting' | 'entering'>('visible')
  const [isCardOpen, setIsCardOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimState('exiting')
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length)
        setAnimState('entering')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimState('visible')
          })
        })
      }, 400)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getTransformAndOpacity = () => {
    switch (animState) {
      case 'exiting':
        return {
          transform: 'translateY(-50%)',
          opacity: 0,
          transition: 'transform 1000ms cubic-bezier(0.4, 0, 0.2, 1), opacity 1000ms ease-in',
        }
      case 'entering':
        return {
          transform: 'translateY(100%)',
          opacity: 0,
          transition: 'none',
        }
      case 'visible':
      default:
        return {
          transform: 'translateY(0%)',
          opacity: 1,
          transition: 'transform 450ms cubic-bezier(0, 0, 0.2, 1), opacity 450ms ease-out',
        }
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-5xl space-y-12">
        <HeroGrid />

        <section className="space-y-6">
          <h1 className="flex flex-wrap items-baseline gap-x-3">
            <span>Hi! Right now, I am </span>
            <span className="inline-grid overflow-hidden align-baseline h-[1.15em]">
              <span
                className="italic inline-block font-serif"
                style={{
                  color: 'var(--accent)',
                  ...getTransformAndOpacity(),
                }}
              >
                {words[index]}
              </span>
            </span>
          </h1>

          <p style={{ color: 'var(--text)' }} className="leading-relaxed text-lg">
            I'll be back soon. In the meantime, take a look around my site!{' '}
            <button
              type="button"
              onClick={() => setIsCardOpen(true)}
              style={{ color: 'var(--accent)' }}
              className="inline hover:underline underline-offset-4 cursor-pointer font-medium bg-transparent border-none p-0"
            >
              Contact me
            </button>{' '}
            if you have any questions or comments.
          </p>

          <div className="pt-4 flex items-center gap-4">
            <Link
              to="/projects"
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              View Projects &rarr;
            </Link>
          </div>
        </section>
      </div>

      {/* Render the Modal */}
      <BusinessCardModal isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
    </>
  )
}