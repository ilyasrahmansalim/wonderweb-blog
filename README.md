# Wonderweb Blog

Blog resmi Wonderweb — dibangun dengan **Astro + Tailwind CSS + DaisyUI + Sveltia CMS**.
Fokus: authority di bidang web development, traffic organik, dan optimasi untuk AI Search (GEO).

---

## 1. Tech Stack

| Bagian       | Teknologi                          |
|--------------|-------------------------------------|
| Framework    | Astro 5                             |
| Styling      | Tailwind CSS 3 + DaisyUI 4          |
| CMS          | Sveltia CMS (di `/admin`)           |
| Font         | Plus Jakarta Sans (Google Fonts)    |
| Hosting      | Cloudflare Pages (direkomendasikan) |
| Sitemap      | @astrojs/sitemap (otomatis)         |

Versi yang sudah diverifikasi berhasil `npm install` + `npm run build` tanpa error:
`astro@5.18.2`, `@astrojs/tailwind@6.0.2`, `@astrojs/sitemap@3.7.3`, `tailwindcss@3.4.17`, `daisyui@4.12.24`.

---

## 2. Instalasi

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev
# → buka http://localhost:4321

# 3. Build production
npm run build
# → output ada di /dist

# 4. Preview hasil build
npm run preview
```

---

## 3. Struktur Folder

Sesuai aturan project — **hanya** tiga folder di `src/`, tidak ada `utils/`, `lib/`, `hooks/`, dll.

```
src/
├── pages/
│   ├── index.astro          → Home
│   ├── about.astro          → Tentang Wonderweb
│   ├── blog/
│   │   └── index.astro      → /blog (listing, search, filter)
│   └── [...slug].astro      → /nama-artikel (detail, dinamis dari CMS)
│
├── components/
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── FeaturedPosts.astro
│   ├── PostCard.astro
│   ├── BlogSearch.astro
│   ├── Newsletter.astro
│   ├── FAQ.astro
│   ├── Breadcrumb.astro
│   ├── ShareButtons.astro
│   ├── RelatedPosts.astro
│   ├── TableOfContents.astro
│   └── Categories.astro
│
├── layouts/
│   └── MainLayout.astro     → SEO, Open Graph, Twitter Card, JSON-LD, font, Navbar/Footer
│
├── content/
│   ├── config.ts            → Skema data artikel (Zod)
│   └── blog/                → File markdown artikel (dikelola CMS)
│
└── styles/
    └── global.css           → Tailwind + tema Wonderweb

public/
├── admin/                   → Sveltia CMS (index.html + config.yml)
├── images/                  → Aset gambar & upload dari CMS
├── favicon.svg
└── robots.txt
```

> Catatan: `content/` dan `styles/` ditambahkan sebagai pengecualian wajar di luar 3 folder inti (`pages`, `components`, `layouts`) karena merupakan bagian standar Astro Content Collections dan bukan folder "arsitektur" seperti `utils/` atau `services/`.

---

## 4. Setup Sveltia CMS

Sveltia CMS aktif di `/admin`. Dua langkah wajib sebelum dipakai tim non-teknis:

### a. Ubah target repository

Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: nama-org/nama-repo   # ganti dengan repo GitHub kamu
  branch: main
```

### b. Aktifkan GitHub OAuth (untuk login CMS di production)

Sveltia CMS butuh OAuth client untuk backend `github`. Cara tercepat: gunakan
[Sveltia CMS Auth](https://github.com/sveltia/sveltia-cms-auth) yang di-deploy sebagai Cloudflare Worker,
lalu daftarkan GitHub OAuth App dengan callback URL sesuai domain Worker tersebut.

### c. Development lokal tanpa GitHub

Jalankan proxy lokal agar CMS bisa membaca/menulis file langsung ke disk:

```bash
npx sveltia-cms-proxy-server
```

`local_backend: true` di `config.yml` sudah diaktifkan secara default.

### d. Field yang tersedia di CMS

Semua field sesuai permintaan brief, sudah dipetakan 1:1 ke skema di `src/content/config.ts`:

- Title, Slug, Description, Featured Image (+ alt text), Category, Tags, Author, Published Date, Updated Date, Reading Time (opsional — auto-fallback dihitung dari jumlah kata bila kosong)
- **SEO**: Meta Title, Meta Description, OG Title, OG Description, Canonical URL
- **AI / GEO**: AI Summary, Key Takeaways (list), FAQ (list pertanyaan-jawaban)

---

## 5. SEO & Structured Data

Setiap halaman otomatis mendapat:

- Meta title, meta description, canonical URL
- Open Graph + Twitter Card
- `robots.txt` (termasuk izin eksplisit untuk GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- Sitemap otomatis (`/sitemap-index.xml`) via `@astrojs/sitemap`
- JSON-LD:
  - **Organization** — di setiap halaman (lewat `MainLayout.astro`)
  - **Article** — di setiap halaman artikel
  - **BreadcrumbList** — di setiap halaman artikel
  - **FAQPage** — otomatis muncul jika artikel mengisi field FAQ di CMS

Sebelum deploy, ganti `SITE_URL` di `astro.config.mjs` dengan domain production Wonderweb yang sebenarnya —
seluruh URL canonical, OG, dan sitemap mengikuti nilai ini.

---

## 6. GEO (Generative Engine Optimization)

Template artikel ([...slug].astro`) sudah menyediakan struktur yang direkomendasikan brief:

1. **Ringkasan (AI Summary)** — kotak highlight di awal artikel
2. Isi artikel bebas markdown, disarankan mengikuti urutan:
   `Introduction → What Is → Why It Matters → Benefits → Examples → Conclusion`
3. **Key Takeaways** — box tersendiri, di-render dari field CMS
4. **FAQ** — accordion + schema `FAQPage`
5. **Table of Contents** — otomatis dari heading H2/H3
6. Semua artikel otomatis dapat **internal link** dari Related Posts (kategori sama)

Tiga contoh artikel di `src/content/blog/` sudah mengikuti struktur ini secara penuh dan bisa dipakai sebagai
referensi saat menulis artikel baru lewat CMS.

---

## 7. Branding

Tema DaisyUI kustom bernama `wonderweb` (lihat `tailwind.config.mjs`), dengan token warna:

| Warna           | Hex       | Porsi Pemakaian |
|-----------------|-----------|------------------|
| Ghost White     | `#F8FAFF` | 60% (base-100)   |
| Onyx            | `#0A0A0A` | 20% (teks, footer)|
| Ocean Twilight  | `#0047CC` | 15% (primary)    |
| Fresh Sky       | `#00A6FB` | 5% (aksen)       |

Font: **Plus Jakarta Sans** (di-load lewat Google Fonts di `MainLayout.astro`).

---

## 8. Deploy ke Cloudflare Pages

```bash
# Build command
npm run build

# Output directory
dist
```

Tambahkan environment variable/redirect sesuai kebutuhan OAuth Sveltia CMS bila memakai backend `github`.

---

## 9. Yang Perlu Diganti Sebelum Production

- [ ] `astro.config.mjs` → ganti `SITE_URL` ke domain asli
- [ ] `public/admin/config.yml` → ganti `repo:` ke repo GitHub asli
- [ ] `public/images/og-default.svg` → ganti dengan OG image final (disarankan format `.jpg`/`.png` 1200×630)
- [ ] Ganti gambar Unsplash placeholder di 3 contoh artikel dengan foto asli Wonderweb
- [ ] Isi `sameAs` di schema Organization (`MainLayout.astro`) dengan akun sosial media aktif
