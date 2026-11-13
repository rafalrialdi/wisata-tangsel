import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { asset, getWisata } from '../lib/data'
import SiteFooter from '../components/SiteFooter.jsx'

function Judul({ nama }) {
  // Kata pertama dicetak miring, seperti pada desain.
  const [awal, ...sisa] = nama.split(' ')
  return sisa.length ? (
    <>
      <span className="italic">{awal}</span> {sisa.join(' ')}
    </>
  ) : (
    <>{nama}</>
  )
}

export default function Detail() {
  const { slug } = useParams()
  const w = getWisata(slug)
  const [tersalin, setTersalin] = useState(false)

  useEffect(() => {
    document.title = w ? `${w.nama} — Jelajah Tangsel` : 'Tidak ditemukan — Jelajah Tangsel'
  }, [w])

  if (!w) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-margin-mobile text-center">
        <h1 className="font-display text-5xl">Tempat tidak ditemukan</h1>
        <p className="text-text-secondary max-w-md">
          Halaman yang Anda cari belum ada atau sudah dipindahkan.
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 rounded-full bg-primary-container hover:bg-accent-hover transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </main>
    )
  }

  const hero = w.foto[0]
  const galeri = w.foto.slice(1)
  const paragraf = (w.deskripsi || '').split(/\n\s*\n/).filter(Boolean)

  const bagikan = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: w.nama, url })
      } else {
        await navigator.clipboard.writeText(url)
        setTersalin(true)
        setTimeout(() => setTersalin(false), 2000)
      }
    } catch {
      /* dibatalkan pengguna */
    }
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-margin-mobile md:px-margin py-4 w-full backdrop-blur-sm">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 px-4 py-2 min-h-[44px] rounded-full bg-card-overlay border border-border-subtle/40 text-text-primary hover:border-accent-hover hover:text-primary transition-all duration-300 backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform duration-200">
            arrow_back
          </span>
          <span className="text-nav-label font-medium tracking-wide">Kembali ke Beranda</span>
        </Link>
        <button
          type="button"
          onClick={bagikan}
          aria-label="Bagikan halaman ini"
          className="inline-flex items-center justify-center gap-2 h-11 min-w-[44px] px-3 rounded-full bg-card-overlay border border-border-subtle/30 text-text-primary hover:text-primary hover:border-accent-hover transition-all duration-300"
        >
          <span className="material-symbols-outlined">{tersalin ? 'check' : 'share'}</span>
          {tersalin && <span className="text-nav-label pr-1">Tautan disalin</span>}
        </button>
      </header>

      {/* HERO: tinggi minimal 1 layar penuh (svh = tinggi layar yang terlihat, aman di HP) */}
      <section className="relative min-h-svh w-full flex items-end pb-16 md:pb-24 px-margin-mobile md:px-margin overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hero && (
            <img
              src={asset(hero.gambar)}
              alt={hero.judul || w.nama}
              className="w-full h-full object-cover object-center scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background-base/90 via-background-base/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl pt-32">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {w.kategori && (
              <span className="px-3 py-1 rounded-full bg-card-overlay border border-border-subtle/30 text-pill-label text-primary uppercase">
                {w.kategori}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-nav-label text-text-secondary">
              <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
              {w.kecamatan}, Tangerang Selatan
            </span>
          </div>

          {/* Ukuran judul mengikuti lebar (9.5vw) dan tinggi layar (12vh), diambil yang terkecil, maks 116px */}
          <h1 className="font-display text-[length:clamp(2.75rem,min(9.5vw,12vh),7.25rem)] leading-[0.95] tracking-tight mb-6">
            <Judul nama={w.nama} />
          </h1>

          {w.ringkasan && (
            <p className="text-text-secondary text-[16px] leading-relaxed max-w-2xl mb-8">
              {w.ringkasan}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {w.maps && (
              <a
                href={w.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 min-h-[48px] bg-primary-container hover:bg-accent-hover text-text-primary px-8 py-3.5 rounded-full text-nav-label font-medium tracking-wide transition-all duration-300 shadow-lg active:scale-95"
              >
                <span className="material-symbols-outlined">location_on</span>
                Lokasi
              </a>
            )}
            {w.jam_buka && (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-dark/70 border border-border-subtle/30 backdrop-blur-md text-text-secondary text-body-default">
                <span className="material-symbols-outlined text-[18px] text-secondary">schedule</span>
                <span>{w.jam_buka}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GALERI */}
      {galeri.length > 0 && (
        <section className="w-full px-margin-mobile md:px-margin -mt-8 relative z-20 mb-section-gap-mobile md:mb-section-gap">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-pill-label uppercase tracking-widest text-primary">Galeri foto</h2>
            <p className="text-nav-label text-outline hidden md:block">{galeri.length} sudut pandang</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galeri.map((f, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle/40 hover:border-accent-hover transition-all duration-500 bg-surface-dark"
              >
                <img
                  src={asset(f.gambar)}
                  alt={f.judul || `${w.nama} — foto ${i + 2}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {(f.judul || f.keterangan) && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-base via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      {f.judul && <p className="text-card-title text-text-primary">{f.judul}</p>}
                      {f.keterangan && <p className="text-nav-label text-text-secondary">{f.keterangan}</p>}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ISI */}
      <main className="w-full px-margin-mobile md:px-margin mb-section-gap-mobile md:mb-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <article className="lg:col-span-7 flex flex-col space-y-8">
            {w.judul_ulasan && (
              <h2 className="text-[32px] md:text-[48px] leading-tight text-text-primary font-semibold">
                {w.judul_ulasan}
              </h2>
            )}
            <div className="space-y-6 text-text-secondary text-[16px] leading-[1.85]">
              {paragraf.map((p, i) => (
                <div key={i} className="space-y-6">
                  <p>{p}</p>
                  {i === 1 && w.kutipan && (
                    <blockquote className="my-8 p-8 rounded-xl bg-surface-dark border-l-2 border-primary border border-border-subtle/20 relative overflow-hidden">
                      <p className="italic text-text-primary text-[18px] leading-relaxed">“{w.kutipan}”</p>
                    </blockquote>
                  )}
                </div>
              ))}
              {paragraf.length < 2 && w.kutipan && (
                <blockquote className="my-8 p-8 rounded-xl bg-surface-dark border-l-2 border-primary border border-border-subtle/20">
                  <p className="italic text-text-primary text-[18px] leading-relaxed">“{w.kutipan}”</p>
                </blockquote>
              )}
            </div>
          </article>

          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl p-8 bg-surface-dark/95 border border-border-subtle/30 backdrop-blur-xl shadow-2xl space-y-8">
              <div className="border-b border-outline-variant/40 pb-5">
                <h3 className="text-headline-md text-text-primary">Panduan Destinasi</h3>
              </div>

              {w.jam_buka && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-primary">
                    <span className="material-symbols-outlined">access_time</span>
                    <span className="text-card-title text-text-primary">Jam Operasional</span>
                  </div>
                  <div className="pl-7">
                    <p className="text-text-primary text-[15px] font-medium">{w.jam_buka}</p>
                    {w.waktu_terbaik && (
                      <div className="mt-2 text-[12px] text-text-secondary leading-relaxed bg-surface-container-high/60 p-3 rounded-lg border border-outline-variant/30">
                        <span className="text-primary font-medium block mb-0.5">
                          Waktu kunjungan terbaik
                        </span>
                        <span className="whitespace-pre-line">{w.waktu_terbaik}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {w.alamat && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-primary">
                    <span className="material-symbols-outlined">pin_drop</span>
                    <span className="text-card-title text-text-primary">Alamat Lengkap</span>
                  </div>
                  <div className="pl-7">
                    <p className="text-text-secondary text-[14px] leading-relaxed">{w.alamat}</p>
                    {w.akses && <p className="text-[12px] text-outline mt-1">{w.akses}</p>}
                  </div>
                </div>
              )}

              {w.fasilitas.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-primary">
                    <span className="material-symbols-outlined">category</span>
                    <span className="text-card-title text-text-primary">Fasilitas Tersedia</span>
                  </div>
                  <div className="pl-7 grid grid-cols-2 gap-2.5">
                    {w.fasilitas.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high/50 border border-border-subtle/20 text-text-secondary hover:text-text-primary hover:border-accent-hover transition-colors duration-200"
                      >
                        <span className="material-symbols-outlined text-[17px] text-primary">
                          {f.ikon || 'check_circle'}
                        </span>
                        <span className="text-[12px]">{f.nama}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {w.maps && (
                <div className="pt-4 border-t border-outline-variant/30">
                  <a
                    href={w.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 min-h-[48px] bg-primary-container hover:bg-accent-hover text-text-primary py-3.5 px-6 rounded-full text-nav-label font-medium transition-all duration-300 shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined">navigation</span>
                    Petunjuk arah menuju lokasi
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter border />
    </div>
  )
}
