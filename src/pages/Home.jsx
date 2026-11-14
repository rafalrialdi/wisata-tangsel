import { useEffect, useMemo, useRef, useState } from 'react'
import { asset, beranda, getAllWisata } from '../lib/data'
import { scrollKe } from '../lib/scroll'
import HomeHeader from '../components/HomeHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import WisataCard from '../components/WisataCard.jsx'

export default function Home() {
  const [kata, setKata] = useState('')
  const carousel = useRef(null)
  const semua = useMemo(() => getAllWisata(), [])

  useEffect(() => {
    document.title = 'Jelajah Tangsel — Pesona Ruang Hijau & Wisata'
  }, [])

  const daftar = useMemo(() => {
    const q = kata.trim().toLowerCase()
    if (q) {
      return semua.filter((w) =>
        [w.nama, w.kecamatan, w.kategori].filter(Boolean).join(' ').toLowerCase().includes(q),
      )
    }
    const unggulan = semua.filter((w) => w.unggulan)
    return unggulan.length ? unggulan : semua
  }, [kata, semua])

  const geser = (arah) => {
    const el = carousel.current
    if (el) el.scrollBy({ left: arah * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  const cariSubmit = (e) => {
    e.preventDefault()
    scrollKe('destinasi')
  }

  // Kartu sorotan di hero: panel hitam selalu terlihat di belakang kartu (seperti desain awal).
  // Kartu ini hanya hiasan visual: tanpa tautan, tanpa hover, dan klik tidak melakukan apa pun.
  const kartuSorotan = (
    <div
      role="img"
      aria-label={`${beranda.kartu_sorotan_label || ''} ${beranda.kartu_sorotan_judul || ''}`.trim()}
      className="group relative w-[min(180px,26svh)] sm:w-[min(220px,34svh)] md:w-[min(280px,45svh)] select-none"
    >
      {/* Panel hitam di belakang kartu — tampil di semua ukuran layar, geseran lebih rapat di HP */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 -right-3 w-full h-full rounded-2xl bg-card-overlay backdrop-blur-xl border border-border-subtle/20 shadow-2xl rotate-3 sm:-top-6 sm:-right-4 md:-top-8 md:-right-5"
      />
      {/* Kartu foto (tidak bisa diklik) */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border-subtle shadow-2xl bg-surface-dark">
        {beranda.kartu_sorotan_foto && (
          <img
            src={asset(beranda.kartu_sorotan_foto)}
            alt={beranda.kartu_sorotan_judul || ''}
            className="pointer-events-none w-full h-full object-cover card-zoom-img"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background-base/90 via-transparent to-transparent flex flex-col justify-end p-5 pointer-events-none">
          <span className="text-pill-label text-primary uppercase tracking-widest mb-1">
            {beranda.kartu_sorotan_label}
          </span>
          <p className="text-card-title text-text-primary">{beranda.kartu_sorotan_judul}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Latar panorama menyambung */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {beranda.latar && (
          <img
            alt=""
            src={asset(beranda.latar)}
            className="w-full h-full object-cover object-center brightness-[0.58] contrast-[1.12] scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background-base/60 via-transparent to-background-base/70" />
        <div className="absolute inset-0 bg-background-base/20" />
      </div>

      <HomeHeader />

      <main className="w-full max-w-[1280px] mx-auto relative z-10">
        {/* HERO: tinggi minimal 1 layar penuh (svh = tinggi layar yang terlihat, aman di HP) */}
        <section
          id="beranda"
          className="relative min-h-svh w-full flex items-center px-margin-mobile md:px-margin pt-24 pb-10 md:pt-28 md:pb-12"
        >
          <div className="absolute -left-20 top-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="text-pill-label text-primary uppercase tracking-[0.2em] mb-3 md:mb-4">
                {beranda.hero_subjudul}
              </span>
              {/* Ukuran judul = antara 56px dan 124px, mengikuti lebar (13vw) dan tinggi layar (17vh), diambil yang terkecil */}
              <h1 className="font-display text-[length:clamp(3.5rem,min(13vw,17vh),7.75rem)] leading-[0.92] mb-5 md:mb-8 select-none flex flex-col items-start drop-shadow-2xl">
                <span className="text-text-primary font-normal tracking-[-0.03em]">
                  {beranda.hero_judul_1}
                </span>
                <span className="italic font-light text-primary mt-1 md:mt-2">
                  {beranda.hero_judul_2}
                </span>
              </h1>
              <p className="max-w-[380px] text-body-default text-text-secondary drop-shadow-sm">
                {beranda.hero_paragraf}
              </p>
            </div>

            <div className="md:col-span-5 flex justify-start md:justify-end items-center md:pr-6 pointer-events-none">
              {kartuSorotan}
            </div>
          </div>
        </section>

        {/* PENCARIAN */}
        <section className="relative z-20 px-margin-mobile md:px-margin pt-12 mb-section-gap-mobile md:mb-section-gap">
          <form
            onSubmit={cariSubmit}
            role="search"
            className="relative flex items-center h-[52px] w-full max-w-xl mx-auto bg-input-bg rounded-full shadow-2xl px-5 focus-within:ring-2 focus-within:ring-accent-hover transition-all duration-300"
          >
            <div className="h-5 w-px bg-outline/40 mr-4" />
            <input
              type="text"
              value={kata}
              onChange={(e) => setKata(e.target.value)}
              aria-label="Cari tempat wisata di Tangerang Selatan"
              placeholder="Cari tempat wisata…"
              className="w-full bg-transparent border-none text-surface-dark text-body-default placeholder:text-input-placeholder focus:outline-none focus:ring-0 px-0"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="flex items-center justify-center text-surface-dark hover:text-accent-hover transition-colors duration-200 ml-2 min-w-[44px] min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
          </form>
        </section>

        {/* DESTINASI */}
        <section id="destinasi" className="relative px-margin-mobile md:px-margin mb-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-2 gap-3">
            <div>
              <h2 className="text-headline-md text-text-primary tracking-wide drop-shadow-md">
                {beranda.judul_destinasi}
              </h2>
            </div>
            <p className="text-body-default text-text-secondary max-w-md drop-shadow">
              {beranda.deskripsi_destinasi}
            </p>
          </div>

          {daftar.length === 0 ? (
            <p className="text-text-secondary py-12">
              Tidak ada tempat yang cocok dengan “{kata}”. Coba kata kunci lain, misalnya nama
              kecamatan.
            </p>
          ) : (
            <>
              {/* pt-12 -mt-12 dan pr-8: memberi ruang agar panel hitam dan kartu yang terangkat tidak terpotong */}
              <div
                ref={carousel}
                className="flex gap-gutter overflow-x-auto snap-x snap-mandatory no-scrollbar pt-12 -mt-12 pr-8 pb-2"
              >
                {daftar.map((w) => (
                  <WisataCard
                    key={w.slug}
                    wisata={w}
                    className="snap-start shrink-0 basis-[72%] sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-1.125rem)]"
                  />
                ))}
              </div>
              <div className="flex justify-end items-center gap-3 mt-8">
                <button
                  type="button"
                  aria-label="Destinasi sebelumnya"
                  onClick={() => geser(-1)}
                  className="w-11 h-11 rounded-full border border-border-subtle/20 hover:border-accent-hover bg-input-bg/10 hover:bg-primary-container/40 text-text-primary hover:text-primary backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                  type="button"
                  aria-label="Destinasi selanjutnya"
                  onClick={() => geser(1)}
                  className="w-11 h-11 rounded-full border border-border-subtle/20 hover:border-accent-hover bg-input-bg/10 hover:bg-primary-container/40 text-text-primary hover:text-primary backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </>
          )}
        </section>

        {/* PENUTUP */}
        <section
          id="tentang"
          className="relative min-h-[580px] w-full px-margin-mobile md:px-margin py-16 flex items-center mb-16 scroll-mt-24"
        >
          <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-5 order-2 md:order-1 pt-6 md:pt-0 flex flex-col gap-4">
              {[
                [beranda.foto_penutup_1, beranda.keterangan_foto_1],
                [beranda.foto_penutup_2, beranda.keterangan_foto_2],
              ]
                .filter(([foto]) => foto)
                .map(([foto, ket], i) => (
                  <div
                    key={i}
                    className="relative w-full max-w-[360px] aspect-[16/10] rounded-2xl overflow-hidden border border-border-subtle bg-surface-dark/70 shadow-2xl hover:-translate-y-1 transition-transform duration-300 group"
                  >
                    <img
                      src={asset(foto)}
                      alt={ket || ''}
                      loading="lazy"
                      className="w-full h-full object-cover card-zoom-img"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-base/90 via-transparent to-transparent flex items-end p-4">
                      <p className="text-pill-label text-text-primary tracking-wide">{ket}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="md:col-span-7 order-1 md:order-2 flex flex-col items-end text-right">
              <blockquote className="text-quote-display-mobile md:text-quote-display text-text-primary max-w-[620px] mb-6 drop-shadow-xl">
                {beranda.kutipan}
              </blockquote>
              <p className="text-body-default text-text-secondary max-w-[480px] drop-shadow">
                {beranda.kutipan_paragraf}
              </p>
              <button
                type="button"
                onClick={() => scrollKe('destinasi')}
                className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-on-primary text-pill-label uppercase tracking-wider hover:bg-accent-hover transition-colors duration-200 shadow-2xl"
              >
                {beranda.tombol_ajakan}
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}