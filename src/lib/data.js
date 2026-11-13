// Semua data dibaca saat build dari folder /data (file JSON yang diedit lewat Sveltia CMS).
import beranda from '../../data/pengaturan/beranda.json'

const modul = import.meta.glob('/data/wisata/*.json', { eager: true, import: 'default' })

/** Ubah path dari CMS (mis. /assets/img/foto.jpg) menjadi URL yang benar, termasuk saat di-host di sub-folder. */
export function asset(path) {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${String(path).replace(/^\//, '')}`
}

function rapikanFoto(foto) {
  return (foto || [])
    .map((f) => (typeof f === 'string' ? { gambar: f } : f))
    .filter((f) => f && f.gambar)
}

let cache = null

export function getAllWisata() {
  if (cache) return cache
  cache = Object.entries(modul)
    .map(([path, data]) => ({
      ...data,
      slug: path.split('/').pop().replace(/\.json$/, ''),
      foto: rapikanFoto(data.foto),
      fasilitas: data.fasilitas || [],
    }))
    .sort((a, b) => (a.urutan ?? 999) - (b.urutan ?? 999) || a.nama.localeCompare(b.nama))
  return cache
}

export function getWisata(slug) {
  return getAllWisata().find((w) => w.slug === slug)
}

export { beranda }
