# MATIKA° — DESIGN.md

> Media Belajar Matematika: Fungsi Invers · Fungsi Komposisi · Lingkaran

---

## 1. Visual Theme & Atmosphere

MATIKA° tampil seperti **majalah ilmiah cetak yang bisa diklik** — bukan aplikasi belajar biasa. Halaman utama dibangun di atas kanvas hitam tinta gelap (`#0D0C0A`) dengan aksen amber/emas tua (`#C8902A`) sebagai satu-satunya warna dominan yang bercahaya. Kesan yang ditargetkan: jurnal matematika premium dari tahun 1970-an yang di-digitalisasi dan dibuat interaktif.

Tiga bab punya karakter visual masing-masing:
- **Bab 01 — Fungsi Invers**: krem kertas (`#F4EFE4`), editorial terang, grafik pencerminan amber & sienna
- **Bab 02 — Fungsi Komposisi**: hitam penuh, diagram mesin berantai berwarna sienna & amber
- **Bab 03 — Lingkaran**: hijau teal muda (`#EDF7F5`), nuansa organik dan geometri

Setiap keputusan visual berpijak pada satu prinsip: **form mengikuti matematika**. Amber untuk elemen interaktif dan hasil fungsi utama. Sienna untuk fungsi sekunder. Grid latar belakang di halaman cover meniru kertas grafik — bukan dekorasi, tapi bagian dari identitas matematis.

Tidak ada: gradien biru-ungu, font Inter atau Roboto, rounded corners berlebihan, hero section teks tengah, atau ilustrasi vektor generik.

---

## 2. Color Palette & Roles

| Token | Hex | Peran |
|---|---|---|
| `--ink` | `#0D0C0A` | Latar gelap, sidebar, panel, elemen UI dominan |
| `--paper` | `#F4EFE4` | Latar terang Bab 01, area baca utama |
| `--chalk` | `#E8E2D5` | Surface sekunder di area terang (header bab, card) |
| `--amber` | `#C8902A` | Aksen utama — CTA, grafik f(x), hasil, border aktif, nav aktif |
| `--sienna` | `#A84030` | Aksen sekunder — grafik invers f⁻¹, mesin g(x) |
| `--teal` | `#2A7B6F` | Eksklusif Bab 03 — semua elemen tematik lingkaran |
| `--muted` | `#7B7163` | Teks label, metadata, eyebrow, nomor nav |
| `--border` | `#C8C1B3` | Garis pembatas di area terang |

**Aturan warna:**
- Amber tidak boleh menjadi background luas — hanya aksen sempit (border kiri, teks, dot).
- Teal eksklusif Bab 03, tidak muncul di bab lain.
- Tidak ada warna biru, ungu, atau hijau selain teal yang ditentukan.
- Teks pada latar gelap: `--paper` atau `rgba(244,239,228, 0.5–0.7)`.

---

## 3. Typography Rules

### Pasangan Font

| Peran | Font | Catatan |
|---|---|---|
| Display / Judul | **Cormorant Garamond** | 600–700, italic untuk aksen, tracking −1px s/d −3px |
| UI / Label / Body | **Barlow Condensed** | 400 reguler, 600 semi-bold, tracking 0–2px |
| Formula / Kode | **Source Code Pro** | 400–600, semua ekspresi matematis |

### Skala Tipe

| Token | Ukuran | Font | Berat | Penggunaan |
|---|---|---|---|---|
| `{type.hero}` | clamp(56px, 9vw, 108px) | Cormorant | 700 | Judul cover, satu per halaman |
| `{type.chapter}` | 44px | Cormorant | 700 | Judul per bab |
| `{type.body}` | 15px | Barlow Condensed | 400 | Teks penjelasan, line-height 1.85 |
| `{type.label}` | 10–12px | Barlow Condensed | 600 | Eyebrow, uppercase, tracking 2–3px |
| `{type.formula}` | 14–17px | Source Code Pro | 400–600 | Semua ekspresi dan hasil matematis |
| `{type.bignumber}` | 96px | Cormorant | 700 | Angka bab dekoratif, warna `--border` |

**Aturan tipografi:**
- Semua judul rata kiri — tidak pernah center.
- Letter-spacing negatif pada heading Cormorant ukuran besar.
- Eyebrow: uppercase · 10–11px · tracking 2.5px · warna `--amber` atau `--muted`.

---

## 4. Component Stylings

### Navigation — Hamburger Toggle

```
Tombol trigger  : fixed, pojok kiri atas, 40×40px, background --ink
Icon            : ☰ saat tutup → × saat buka, warna --paper
Panel sidebar   : lebar 220px, slide dari kiri, background --ink
Overlay         : rgba(0,0,0,0.5) di belakang panel, klik untuk tutup
Item nav        : Barlow Condensed 13px 600, warna rgba(paper,0.6) default
Item hover/aktif: warna --amber
Nomor bab       : Source Code Pro 10px, warna --muted (aktif → --amber)
Auto-close      : sidebar menutup otomatis setelah item diklik
```

### Formula Block

```
Background   : --ink
Teks formula : --amber · Source Code Pro 16–17px
Border kiri  : 3px solid --amber
Label atas   : Barlow Condensed 10px · uppercase · --muted
Padding      : 16px 22px
Margin       : 20px atas-bawah
Border-radius: 0 (tidak ada)
```

### Tombol Kontrol Interaktif

```
Background default : --ink
Teks               : --paper · Barlow Condensed 12px · uppercase · tracking 1.5px
Hover/aktif        : background --amber · teks --ink
Padding            : 6px 14px
Border-radius      : 0
Shadow             : tidak ada
```

### Chapter Header

```
Layout      : grid dua kolom (angka bab besar | teks judul)
Background  : --chalk (Bab 01) · --ink (Bab 02) · --teal (Bab 03)
Angka bab   : Cormorant 96px · --border di terang, rgba(0,0,0,0.15) di gelap
Border bawah: 1px solid --border
Padding     : 44px 72px
```

### Mesin Komposisi (Bab 02)

```
Layout  : flexbox horizontal
Mesin g : background --sienna · teks putih
Mesin f : background --amber · teks --ink
IO Box  : background gelap (#1F1D1A) · border rgba(putih,0.1)
Hasil   : border 1px --amber · teks --amber
Font    : Source Code Pro untuk semua nilai numerik
```

### Canvas Grafik

```
Background      : mengikuti bab (--paper / gelap / teal muda)
Grid latar      : opacity 0.05–0.06
Sumbu x dan y   : --ink stroke 1.2px (terang) · rgba(putih,0.15) (gelap)
Kurva f(x)      : --amber · stroke 2px
Kurva f⁻¹ / g  : --sienna · stroke 2px
Garis y=x       : --teal · dashed 5/4
Dot persilangan : 4px radius · warna sesuai kurva
Legenda         : di bawah canvas · 11px · teks + dot warna
```

### Statistik Lingkaran (Bab 03)

```
Layout     : grid 2×2
Background : --paper
Label      : 9px · uppercase · tracking 2px · --muted
Nilai      : Source Code Pro 18–22px · --ink
Pemisah    : 1px solid --border
Radius     : 0
Shadow     : tidak ada
```

---

## 5. Layout Principles

### Spacing Tokens

| Token | Nilai | Penggunaan |
|---|---|---|
| `{spacing.xxs}` | 4px | Gap micro |
| `{spacing.xs}` | 8px | Padding label kecil |
| `{spacing.sm}` | 12px | Gap grup kontrol |
| `{spacing.md}` | 16px | Gap antarkomponen standar |
| `{spacing.lg}` | 24px | Padding card, gap section kecil |
| `{spacing.xl}` | 32px | Margin antarelemen besar |
| `{spacing.xxl}` | 44px | Padding chapter header vertikal |
| `{spacing.section}` | 72px | Padding utama konten bab (kiri-kanan) |

### Grid & Layout

- Halaman konten bab: **dua kolom 50/50** — kiri teks & rumus, kanan visual interaktif.
- Cover: satu kolom penuh, teks rata kiri, tidak ada centering.
- Daftar isi cover: **grid tiga kolom**, pemisah 1px solid.
- Tidak ada max-width container yang sempit — konten mengisi lebar penuh.
- Ritme vertikal: `border-bottom: 1px solid --border` memisahkan setiap bab.
- Poin list: `padding: 8px 0 · border-top: 1px solid --border`.

---

## 6. Depth & Elevation

MATIKA° **tidak menggunakan shadow**. Kedalaman lewat:
- **Kontras warna latar antar bab** — ink ↔ paper ↔ teal menciptakan separasi alami tanpa garis pembatas tambahan.
- **Hairline border** — `1px solid --border` mendefinisikan batas komponen di area terang.
- **Grid grafik samar** — `opacity: 0.05–0.06` memberi tekstur tanpa kebisingan.

Aturan keras:
- Tidak ada `box-shadow`.
- Tidak ada `backdrop-filter` atau `blur`.
- Tidak ada gradient mesh atau noise texture.

---

## 7. Do's and Don'ts

### ✓ Lakukan

- Judul selalu rata kiri.
- Angka bab (01, 02, 03) sangat besar sebagai elemen dekoratif.
- Setiap bab punya **satu interaksi inti** yang terhubung langsung ke konsep materinya.
- Formula dalam blok Source Code Pro dengan border kiri amber.
- Warna dengan peran tetap — amber utama, sienna sekunder, teal hanya lingkaran.
- Sidebar navigasi tersembunyi di balik tombol toggle.
- Sidebar menutup otomatis setelah link diklik.
- Smooth scroll ke section yang dituju.

### ✗ Jangan

- Jangan gunakan gradien.
- Jangan gunakan Inter, Roboto, Arial, atau system-ui.
- Jangan `border-radius` pada elemen structural (formula block, chapter header, tombol).
- Jangan pakai warna biru atau ungu.
- Jangan buat navigasi top-bar yang selalu terlihat.
- Jangan tampilkan teks formula sebagai gambar.
- Jangan letakkan lebih dari satu interaksi inti per bab.
- Jangan center-align judul.

---

## 8. Responsive Behavior

| Breakpoint | Lebar | Penyesuaian |
|---|---|---|
| Desktop | ≥ 1024px | Dua kolom penuh, padding section 72px |
| Tablet | 768–1023px | Dua kolom → satu, padding 40px |
| Mobile | < 768px | Satu kolom, padding 24px, font hero 48px |

- Chapter body: dua kolom → satu kolom (teks atas, visual bawah).
- Chapter index cover: tiga kolom → satu kolom.
- Mesin komposisi: flex-wrap aktif di < 500px.
- Canvas: `max-width: 100%; height: auto`.
- Sidebar: selalu overlay di semua ukuran layar (toggle).

---

## 9. Agent Prompt Guide

### Prompt Dasar

> "Buat [komponen] sesuai DESIGN.md MATIKA°. Font: Cormorant Garamond untuk judul, Barlow Condensed untuk UI, Source Code Pro untuk formula. Warna: --ink #0D0C0A · --amber #C8902A · --sienna #A84030 · --teal #2A7B6F · --paper #F4EFE4. Tidak ada border-radius, tidak ada shadow, tidak ada gradien. Judul selalu rata kiri."

### Menambah Bab Baru

> "Buat bab baru dengan warna tematik unik (bukan amber, sienna, atau teal). Sertakan: header grid dua kolom dengan angka bab dekoratif, body dua kolom (teks-rumus kiri, canvas interaktif kanan), formula block amber, satu interaksi inti terhubung ke materi."

### Membuat Formula Block

> "Formula block: background --ink, teks Source Code Pro --amber, border-left 3px --amber, label 10px uppercase Barlow Condensed --muted. Tidak ada border-radius."

### Membuat Canvas Grafik

> "Canvas grafik: grid opacity 0.06, sumbu --ink 1.2px, kurva utama --amber stroke 2px, kurva sekunder --sienna stroke 2px, legenda warna di bawah. Background mengikuti bab."

### Memperbaiki Navigasi

> "Sidebar toggle: tombol ☰ fixed pojok kiri atas background --ink. Klik buka panel 220px slide dari kiri. Overlay rgba(0,0,0,0.5) di belakang. Item aktif --amber. Sidebar auto-close setelah klik, smooth scroll ke section."

---

*Dibuat mengikuti format Stitch dari VoltAgent/awesome-design-md.
Proyek Semester Matematika — Kelas XI · Dikumpul 4 Juni 2026.*
