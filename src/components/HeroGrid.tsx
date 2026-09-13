import img1 from '../assets/hero-1.jpg'
import img2 from '../assets/hero-2.jpg'
import img3 from '../assets/hero-3.jpg'

interface ImageItemProps {
  src: string
  alt: string
}

function ImageItem({ src, alt }: ImageItemProps) {
  return (
    <div className="group relative overflow-hidden bg-[var(--social-bg)]">
      {/* 2/3 portrait aspect ratio scales smoothly with the column width */}
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </div>
  )
}

export default function HeroGrid() {
  const images = [
    { src: img1, alt: 'Showcase 1'},
    { src: img2, alt: 'Showcase 2'},
    { src: img3, alt: 'Showcase 3'},
  ]

  return (
    <section className="w-full">
      <div
        className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm"
        style={{ border: '1px solid var(--border)' }}
      >
        {/* Strictly locks to 3 columns and horizontal divider at all screen widths */}
        <div
          className="grid grid-cols-3 divide-x"
          style={{ borderColor: 'var(--border)' }}
        >
          {images.map((img) => (
            <ImageItem
              key={img.alt}
              src={img.src}
              alt={img.alt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}