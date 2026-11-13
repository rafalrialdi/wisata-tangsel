// Gulir halus ke section berdasarkan id.
// Dipakai sebagai pengganti <a href="#id"> karena HashRouter memakai "#" untuk alamat halaman.
export function scrollKe(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}