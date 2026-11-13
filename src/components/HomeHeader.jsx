import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scrollKe } from '../lib/scroll'

const MENU = [
  { label: 'Beranda', id: 'beranda' },
  { label: 'Destinasi', id: 'destinasi' },
  { label: 'Tentang', id: 'tentang' },
]

export default function HomeHeader() {
  const [buka, setBuka] = useState(false)

  const pergi = (id) => {
    setBuka(false)
    scrollKe(id)
  }

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
          <Link
            to="/"
            onClick={() => pergi('beranda')}
            className="font-bold text-[18px] md:text-[20px] tracking-[0.2em] uppercase text-text-primary hover:text-primary transition-colors duration-300"
          >
            Jelajah Tangsel
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-nav-label">
          {MENU.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => pergi(m.id)}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              {m.label}
            </button>
          ))}
          <button
            type="button"
            aria-label="Jelajahi destinasi"
            onClick={() => pergi('destinasi')}
            className="text-primary hover:text-accent-hover transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-[22px]">explore</span>
          </button>
        </nav>
      </div>

      {buka && (
        <nav className="md:hidden px-margin-mobile pb-4 flex flex-col gap-1 bg-card-overlay">
          {MENU.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => pergi(m.id)}
              className="py-3 text-left text-text-primary hover:text-primary"
            >
              {m.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}