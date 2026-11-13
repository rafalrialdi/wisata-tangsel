import { useState } from 'react'

export default function HomeHeader() {
  const [buka, setBuka] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Menu navigasi"
            aria-expanded={buka}
            onClick={() => setBuka((v) => !v)}
            className="md:hidden text-primary rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">{buka ? 'close' : 'menu'}</span>
          </button>
          <a
            href="#/"
            className="font-bold text-[18px] md:text-[20px] tracking-[0.2em] uppercase text-text-primary hover:text-primary transition-colors duration-300"
          >
            Jelajah Tangsel
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-nav-label">
          <a href="#destinasi" className="text-text-secondary hover:text-primary transition-colors">
            Destinasi
          </a>
          <a href="#tentang" className="text-text-secondary hover:text-primary transition-colors">
            Tentang
          </a>
          <a
            href="#destinasi"
            aria-label="Eksplorasi"
            className="text-primary hover:text-accent-hover transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-[22px]">explore</span>
          </a>
        </nav>
      </div>

      {buka && (
        <nav className="md:hidden px-margin-mobile pb-4 flex flex-col gap-1 bg-card-overlay">
          <a
            href="#destinasi"
            onClick={() => setBuka(false)}
            className="py-3 text-text-primary hover:text-primary"
          >
            Destinasi
          </a>
          <a
            href="#tentang"
            onClick={() => setBuka(false)}
            className="py-3 text-text-primary hover:text-primary"
          >
            Tentang
          </a>
        </nav>
      )}
    </header>
  )
}
