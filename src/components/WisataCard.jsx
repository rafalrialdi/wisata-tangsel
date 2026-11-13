import { Link } from 'react-router-dom'
import { asset } from '../lib/data'

// Seluruh kartu adalah satu tautan ke halaman Detail Wisata. Tanpa harga.
// Saat di-hover: panel hitam muncul di belakang kartu dan kartu terangkat.
export default function WisataCard({ wisata, className = '' }) {
  const foto = wisata.foto[0]
  return (
    <article className={className}>
      <Link
        to={`/wisata/${wisata.slug}`}
        className="group flex flex-col rounded-2xl active:scale-[0.98] transition-transform duration-200"
      >
        <div className="relative">
          {/* Panel hitam di belakang kartu (muncul saat hover) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -right-4 w-full h-full rounded-2xl bg-card-overlay backdrop-blur-xl border border-border-subtle/20 shadow-2xl rotate-3 opacity-0 scale-95 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
          />
          {/* Kartu foto (terangkat saat hover) */}
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-border-subtle card-zoom-border bg-surface-dark shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-3">
            {foto && (
              <img
                src={asset(foto.gambar)}
                alt={foto.judul || wisata.nama}
                loading="lazy"
                className="w-full h-full object-cover card-zoom-img"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background-base/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-card-title text-text-primary group-hover:text-primary transition-colors duration-200">
            {wisata.nama}
          </h3>
          <p className="text-nav-label text-text-secondary mt-0.5">({wisata.kecamatan})</p>
        </div>
      </Link>
    </article>
  )
}