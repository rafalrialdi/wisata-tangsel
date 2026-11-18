# Jelajah Tangsel

Web informasi wisata Tangerang Selatan. React + Vite + Tailwind, dengan panel admin Sveltia CMS.

## Menjalankan di localhost

1. Pasang Node.js versi 18 atau lebih baru (cek dengan `node -v`).
2. Buka terminal di folder proyek ini, lalu jalankan:
   ```
   npm install
   npm run dev
   ```
3. Buka http://localhost:5173 untuk web, dan http://localhost:5173/admin/index.html untuk panel admin.

## Memakai admin di localhost (tanpa login GitHub)

1. Buka http://localhost:5173/admin/index.html memakai Chrome atau Edge.
2. Klik **Work with Local Repository**, lalu pilih folder proyek ini.
3. Ubah atau tambah data. Perubahan langsung tersimpan ke file di folder `data/` dan `public/assets/img/`.
4. Kembali ke http://localhost:5173, tampilan ikut berubah.

## Destinasi

| Urutan | Destinasi | Kecamatan | Kategori |
| --- | --- | --- | --- |
| 1 | Ocean Park BSD City | Serpong | Rekreasi Keluarga |
| 1 | Situ Gintung | Ciputat Timur | Danau & Situ |
| 2 | Taman Kota 2 BSD | Serpong | Taman Kota |
| 3 | Setu Babakan | Pamulang | Danau & Situ |
| 4 | Aviary Park Bintaro | Ciputat Timur | Rekreasi Keluarga |

Kolom **Urutan Tampil** di panel admin menentukan posisi kartu di Home: angka kecil tampil lebih dulu, dan angka yang sama diurutkan menurut nama. Field **Tampilkan di Homepage** menentukan destinasi mana yang masuk daftar "Pilihan Tempat Populer"; kalau tidak ada yang dicentang, semua destinasi tetap ditampilkan.

## Struktur data

- `data/wisata/*.json`: satu file per tempat wisata. Nama file menjadi alamat halaman (`/#/wisata/nama-file`).
- `data/pengaturan/beranda.json`: teks dan foto di Homepage.
- `public/assets/img/`: foto yang diunggah lewat admin.
- `public/admin/config.yml`: konfigurasi Sveltia CMS.

## Deploy

Setiap push ke branch `main` otomatis dibangun dan diterbitkan ke GitHub Pages oleh `.github/workflows/deploy.yml`.

- Situs: https://rafalrialdi.github.io/wisata-tangsel/
- Panel admin: https://rafalrialdi.github.io/wisata-tangsel/admin/

Di GitHub Pages, folder `admin/` dan `assets/` disajikan apa adanya dari `public/`, sehingga CMS bisa dibuka langsung tanpa build tambahan.
