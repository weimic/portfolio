import { useState, useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  // Fields from the screenshot rubric:
  fullDescription?: string
  process?: string
  videoUrl?: string // Embed URL (e.g., YouTube/Vimeo embed or direct .mp4)
}

const projects: Project[] = [
  {
    title: 'GT Movies Store',
    description: 'A responsive full-stack movie store built with modern web tools.',
    tags: ['Python', 'Django', 'SQLite', 'Bootstrap'],
    github: 'https://github.com/weimic/moviesstore',
    fullDescription:
      'A full-stack web application built alongside the textbook, "Django 5 for the Impatient." Users are able to browse and search for movies, add and see reviews, and purchase movies. This application provides distinct webpages for the vast movie catalog, login/registration, the shopping cart, and order history so that users can have an easy shopping experience. Each movie page provides a description, price, and a review section where users can add and report reviews, as well as edit and delete their own reviews. It contains dynamic inventory search, user cart management, and checkout flows. Administrators can also manage movies, users, reviews, and orders from an authentication-required webpage. The comprehensive user interface directly maps to various features covering customer checkout, review submissions, and administrative inventory controls. It is hosted on PythonAnywhere and is accessible from anywhere with an internet.',
    process:
      'Throughout this project, I used the corresponding textbook ("Django 5 for the Impatient") and embedded resources like Django documentation. I relied on compartmentalization and Django\'s built-in MVT system to stay organized and maintain encapsulation for an understandable codebase. My recordings contain goals and thorough voiced documentation about my actions, which was useful to review before building the application out further. I made sure to search extensively for whitespace gaps, since that was a recurring issue. Any questions I had were easily answered through the textbook, as its linked resources were detailed and easy to read.',
    videoUrl: 'https://www.youtube.com/embed/mOkyE_717UU', // Replace with your video embed link
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  // Close on Escape & freeze background scroll
  useEffect(() => {
    if (!activeProject) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject])

  return (
    <div className="space-y-8">
      <div>
        <h1>Projects</h1>
        <p style={{ color: 'var(--text)' }}>
          Here are some things I've worked on. Click on each tile to learn more.
        </p>
      </div>

      {/* Project Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            onClick={() => setActiveProject(project)}
            className="group rounded-xl p-6 flex flex-col justify-between transition-all cursor-pointer hover:scale-[1.01]"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: 'var(--social-bg)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h2 className="group-hover:opacity-80 transition-opacity">{project.title}</h2>
                <span
                  className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--accent)' }}
                >
                  ↗
                </span>
              </div>

              <p className="text-sm mt-2" style={{ color: 'var(--text)' }}>
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--accent-bg)',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent-border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.github && (
              <div
                className="mt-6 pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border)' }}
                onClick={(e) => e.stopPropagation()} // Keeps link click from firing modal
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold hover:underline inline-flex items-center gap-1"
                  style={{ color: 'var(--accent)' }}
                >
                  View on GitHub &rarr;
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm transition-all"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 transition-all shadow-2xl animate-in fade-in zoom-in-95"
            style={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            {/* Top Accent Strip */}
            <div
              className="absolute top-0 left-0 right-0 h-[5px]"
              style={{ backgroundColor: 'var(--accent)' }}
            />

            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <h2 className="font-serif text-3xl font-normal" style={{ color: 'var(--text-h)' }}>
                {activeProject.title}
              </h2>

              <div className="flex flex-wrap gap-2 pt-1">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2 py-0.5 text-xs"
                    style={{
                      backgroundColor: 'var(--accent-bg)',
                      color: 'var(--accent)',
                      border: '1px solid var(--accent-border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="mt-8 space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              {/* 1. Video Demonstration */}
              {activeProject.videoUrl && (
                <div className="space-y-2">
                  <span className="text-md tracking-wider text-slate-400 uppercase block">
                    Video Demonstration
                  </span>
                  <div
                    className="aspect-video w-full overflow-hidden rounded-2xl border"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <iframe
                      src={activeProject.videoUrl}
                      title={`${activeProject.title} Demo`}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* 2. Project Description */}
              {activeProject.fullDescription && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-md tracking-wider text-slate-400 uppercase block">
                    Project Overview
                  </span>
                  <p className="leading-relaxed">{activeProject.fullDescription}</p>
                </div>
              )}

              {/* 3. Process Description */}
              {activeProject.process && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-md tracking-wider text-slate-400 uppercase block">
                    Process & Methodology
                  </span>
                  <p className="leading-relaxed">{activeProject.process}</p>
                </div>
              )}
            </div>

            {/* Footer Links */}
            {activeProject.github && (
              <div
                className="mt-8 pt-4 flex items-center justify-between border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  Source Repository <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}