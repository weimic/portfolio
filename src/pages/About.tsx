import { useState } from 'react'
import BusinessCardModal from '../components/BusinessCardModal'
import img from '../assets/tennis.jpg'

export default function About() {
  const [isCardOpen, setIsCardOpen] = useState(false)

  const faqs = [
    {
      q: 'Why computer science?',
      a: "I've always enjoyed learning about tricky observations and problem-solving. Computers appear to be a great vessel for that right now.",
    },
    {
      q: 'Why did you choose computer science?',
      a: 'I learned Scratch in elementary school, then Python and Java in 7th grade. Eventually, I got my hands dirty with larger projects and never looked back. Programming is cool.',
    },
    {
      q: 'Enough about computer science. Who are you?',
      a: 'I\'m still trying to find out myself; I can only tell you (with certainty) who I was. One of my favorite quotes is, "Life can only be understood backwards, but it must be lived forwards." So, we\'ll see.',
    },
    {
      q: "What's your favorite media?",
      a: 'At the moment, my favorite book is "All the Light We Cannot See" by Anthony Doerr. I also love musicals, namely "Hamilton" (my favorite song is "Dear Theodosia").',
    },
    {
      q: "What's on your mind?",
      a: 'Everything about artificial intelligence. Schoolwork. What to eat tomorrow.',
    },
  ]

  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
        {/* Intro / Header */}
        <section className="pb-12 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
            {/* Left: Text */}
            <div className="flex-1 space-y-5">
            <h1 className="text-4xl sm:text-5xl font-normal leading-tight font-serif" style={{ color: 'var(--text-h)' }}>
                Hey, I'm Michael!
            </h1>

            {/* Paragraphs with dedicated gap */}
            <div className="flex flex-col gap-4">
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
                I'm a computer science major at Georgia Tech, and I'm also a violinist, cyclist, and tennis player.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
                On campus, I'm a software engineer for HexLabs, an ML engineer for Smart Stadium, and a violinist in our orchestra. I was previously a data intern for a startup backed by Google and a16z.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
                I'll keep this brief;{' '}
                <button
                    type="button"
                    onClick={() => setIsCardOpen(true)}
                    className="hover:underline underline-offset-4 cursor-pointer font-medium transition-opacity hover:opacity-80 inline"
                    style={{ color: 'var(--accent)' }}
                >
                    contact me
                </button>{' '}
                if you want to chat for longer.
                </p>
            </div>
            </div>

            {/* Right: Sharp, constrained portrait frame */}
            <div
            className="w-full sm:w-64 flex-shrink-0 aspect-[16/9] sm:aspect-[4/5] overflow-hidden rounded-2xl border shadow-sm self-center"
            style={{ borderColor: 'var(--border)' }}
            >
            <img
                src={img}
                alt="On the tennis courts."
                className="h-full w-full object-cover object-[center_65%] [transform:translateZ(0)] [image-rendering:-webkit-optimize-contrast]"
            />
            </div>
        </div>
        </section>

        {/* Q&A Editorial List */}
        <section className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {faqs.map((item) => (
            <div
              key={item.q}
              className="py-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8"
              style={{ borderColor: 'var(--border)' }}
            >
              <h2
                className="font-serif text-xl sm:text-2xl font-normal leading-snug"
                style={{ color: 'var(--text-h)' }}
              >
                {item.q}
              </h2>
              <div className="md:col-span-2">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--text)' }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Business Card Popup */}
      <BusinessCardModal isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
    </>
  )
}