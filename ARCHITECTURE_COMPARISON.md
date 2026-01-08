# 📐 Perbandingan Struktur Arsitektur Aplikasi

Dokumen ini membandingkan struktur aplikasi **Woori Front (Contoh)** dengan aplikasi **Malgist App (Aplikasi Kita)**.

## 📊 Tabel Perbandingan Struktur

| Aspek | Woori Front (Contoh) | Malgist App (Kita) | Keterangan |
|-------|---------------------|-------------------|------------|
| **Next.js Version** | Next.js 15.3.6 | Next.js 16.0.10 | Kita menggunakan versi yang lebih baru |
| **React Version** | React 19.2.1 | React 19.2.0 | Hampir sama |
| **App Router** | ✅ Ya (Next.js 15) | ✅ Ya (Next.js 16) | Sama-sama menggunakan App Router |
| **TypeScript** | ✅ Ya | ✅ Ya | Sama-sama menggunakan TypeScript |
| **Tailwind CSS** | ✅ Ya (v4) | ✅ Ya (v4) | Sama-sama menggunakan Tailwind v4 |

## 📁 Perbandingan Struktur Folder

| Kategori | Woori Front | Malgist App | Status | Penjelasan |
|----------|-------------|-------------|--------|------------|
| **Shared Components** | `app/_common/component/` | `components/` | ⚠️ **Berbeda** | Woori menggunakan `_common`, kita menggunakan `components/` di root |
| **Atomic Design** | ✅ `atoms/`, `molecules/`, `organism/`, `templates/` | ❌ Tidak ada | ❌ **Tidak Ada** | Kita belum menggunakan Atomic Design Pattern |
| **Global Providers** | `app/_global/providers/` | `components/providers/` | ⚠️ **Berbeda** | Lokasi berbeda, struktur mirip |
| **Routes/Pages** | `app/company-info/[ticker]/` | `app/dashboard/`, `app/portfolio/` | ✅ **Sama** | Sama-sama menggunakan App Router |
| **Custom Hooks** | `app/_common/hooks/` | `features/*/hooks/`, `hooks/` | ⚠️ **Berbeda** | Kita menggunakan feature-based hooks |
| **API Services** | `app/_common/services/api/` | `lib/api/`, `features/*/services/` | ⚠️ **Berbeda** | Kita terdistribusi di feature |
| **Types** | `app/_common/types/` | `types/` | ⚠️ **Berbeda** | Kita menggunakan folder `types/` di root |
| **Utils** | `app/_common/utils/` | `lib/utils/` | ⚠️ **Berbeda** | Nama folder berbeda |
| **Assets** | `app/_common/assets/` | `public/` | ⚠️ **Berbeda** | Lokasi berbeda |
| **Constants** | `app/_common/const/` | ❌ Tidak ada | ❌ **Tidak Ada** | Kita belum punya folder khusus constants |

## 🏗️ Pola Arsitektur

| Pola | Woori Front | Malgist App | Status |
|------|-------------|-------------|--------|
| **Atomic Design Pattern** | ✅ Digunakan penuh | ❌ Tidak digunakan | ❌ Kita tidak menggunakan pattern ini |
| **Feature-Based Organization** | ❌ Tidak (domain-based) | ✅ Ya | ✅ Kita lebih modular per feature |
| **Service Layer Pattern** | ✅ `apiServices.ts` terpusat | ⚠️ Terdistribusi | ⚠️ Kita punya tapi terdistribusi |
| **Provider Pattern** | ✅ Digunakan | ✅ Digunakan | ✅ Sama-sama menggunakan |

## 🔄 Data Fetching & State Management

| Aspek | Woori Front | Malgist App | Status |
|------|-------------|-------------|--------|
| **React Query** | ✅ Digunakan | ✅ Digunakan | ✅ Sama |
| **Query Provider Location** | `_global/providers/QueryProvider.tsx` | `components/providers/Web3Provider.tsx` | ⚠️ **Berbeda** | Kita gabungkan dengan Web3Provider |
| **API Request Pattern** | ✅ `apiRequest()` terpusat | ❌ Belum ada | ❌ Kita belum punya base API request |
| **Custom Hooks Pattern** | ✅ Hook → Service → API | ⚠️ Hook → Mock Data | ⚠️ Kita masih pakai mock data |

## 📦 Struktur Komponen

| Level | Woori Front | Malgist App | Contoh Komponen |
|-------|-------------|-------------|-----------------|
| **Atoms** | ✅ Ada | ❌ Tidak ada | Button, Card, Icon |
| **Molecules** | ✅ Ada | ⚠️ Sebagian | PositionCard, DepositModal |
| **Organisms** | ✅ Ada | ⚠️ Sebagian | CommonTable, TabList |
| **Templates** | ✅ Ada | ⚠️ Sebagian | DashboardLayout, PageViewContainer |
| **Pages** | ✅ Ada | ✅ Ada | page.tsx di routes |

## 🎯 Feature Organization

| Organisasi | Woori Front | Malgist App | Kelebihan/Kekurangan |
|------------|-------------|-------------|----------------------|
| **Struktur** | Domain-based (`company-info/`, `issues/`) | Feature-based (`features/portfolio/`, `features/strategy/`) | ✅ **Kita lebih modular** - Setiap feature independen |
| **Komponen Per Feature** | ❌ Di `_common/component/` | ✅ Di `features/*/components/` | ✅ **Lebih terorganisir** - Komponen dekat dengan fitur |
| **Hooks Per Feature** | ❌ Di `_common/hooks/` | ✅ Di `features/*/hooks/` | ✅ **Lebih terorganisir** - Hooks dekat dengan fitur |
| **Services Per Feature** | ❌ Di `_common/services/` | ⚠️ Sebagian di `features/*/services/` | ⚠️ **Terdistribusi** - Ada yang di lib/api, ada yang di feature |

## 🔌 Provider Architecture

| Provider | Woori Front | Malgist App | Status |
|----------|-------------|-------------|--------|
| **QueryProvider** | ✅ Terpisah | ✅ Gabung dengan Web3Provider | ⚠️ Kita gabungkan |
| **ModalProvider** | ✅ Ada | ❌ Tidak ada | ❌ Kita belum punya |
| **PageMetaProvider** | ✅ Ada | ❌ Tidak ada | ❌ Kita belum punya |
| **Web3Provider** | ❌ Tidak ada | ✅ Ada (RainbowKit) | ✅ Unik untuk DeFi app |

## 📂 Detail Struktur Folder

### Woori Front Structure
```
app/
├── _common/              # Shared everything
│   ├── component/        # Atomic Design
│   ├── hooks/            # Shared hooks
│   ├── services/         # API services
│   ├── types/            # Shared types
│   ├── utils/            # Shared utils
│   └── const/            # Constants
├── _global/              # Global config
│   ├── providers/        # Global providers
│   └── styles/           # Global styles
└── [routes]/             # Domain-based routes
```

### Malgist App Structure
```
malgist_app/
├── app/                  # Next.js App Router
│   └── [routes]/         # Feature-based routes
├── components/           # Shared components
│   ├── layout/           # Layout components
│   ├── providers/        # React providers
│   └── ui/               # UI components
├── features/             # Feature-based modules
│   ├── portfolio/        # Portfolio feature
│   │   ├── components/   # Feature components
│   │   ├── hooks/        # Feature hooks
│   │   └── services/     # Feature services
│   ├── strategy/         # Strategy feature
│   └── ...               # Other features
├── lib/                  # Shared libraries
│   ├── api/              # API utilities
│   ├── utils/            # Shared utilities
│   └── wagmi/            # Web3 config
└── types/                # Shared types
```

## 🔄 Data Flow Pattern

| Tahap | Woori Front | Malgist App | Status |
|-------|-------------|-------------|--------|
| **1. Page Component** | ✅ Ada | ✅ Ada | ✅ Sama |
| **2. Custom Hook** | ✅ `useCompanies()` | ✅ `usePortfolioData()` | ✅ Sama |
| **3. React Query** | ✅ `useQuery()` | ✅ Ada tapi belum banyak dipakai | ⚠️ Kita masih pakai mock |
| **4. API Service** | ✅ `companiesService.getAll()` | ❌ Belum ada service layer | ❌ Kita belum implement |
| **5. API Request** | ✅ `apiRequest()` terpusat | ❌ Belum ada | ❌ Kita belum ada |
| **6. Backend API** | ✅ `/api/v1/companies` | ❌ Belum ada | ❌ Kita belum integrate |

## 🎨 Component Organization Pattern

| Pattern | Woori Front | Malgist App | Rekomendasi |
|---------|-------------|-------------|-------------|
| **Atomic Design** | ✅ Penuh | ❌ Tidak | ⚠️ **Opsional** - Bisa dipertimbangkan jika ingin lebih terstruktur |
| **Feature-Based** | ❌ Tidak | ✅ Ya | ✅ **Lebih baik** - Lebih modular dan scalable |
| **Colocation** | ⚠️ Terpisah | ✅ Dekat dengan feature | ✅ **Kita lebih baik** - Komponen dekat dengan konteks |

## 🔑 Key Differences Summary

| Aspek | Woori Front | Malgist App | Keuntungan Kita |
|-------|-------------|-------------|-----------------|
| **Organization Style** | Domain-based + Shared | Feature-based + Shared | ✅ **Lebih modular** - Setiap feature bisa independen |
| **Component Location** | Terpusat di `_common` | Terdistribusi per feature | ✅ **Lebih mudah maintain** - Komponen dekat dengan penggunaan |
| **Scalability** | ⚠️ Semakin besar, `_common` semakin penuh | ✅ Setiap feature terpisah | ✅ **Lebih scalable** |
| **Reusability** | ✅ Atomic Design membantu reusability | ⚠️ Komponen terkadang duplikat | ⚠️ Perlu standardisasi |
| **API Layer** | ✅ Service layer terpusat | ⚠️ Belum lengkap | ❌ Perlu implement service layer |
| **Testing** | ⚠️ Lebih sulit (terpusat) | ✅ Lebih mudah (terpisah) | ✅ **Lebih mudah test** |

## 📊 Technology Stack Comparison

| Teknologi | Woori Front | Malgist App | Status |
|-----------|-------------|-------------|--------|
| **Next.js** | 15.3.6 | 16.0.10 | ✅ Lebih baru |
| **React** | 19.2.1 | 19.2.0 | ✅ Hampir sama |
| **TypeScript** | ^5 | ^5 | ✅ Sama |
| **Tailwind CSS** | ^4 | ^4 | ✅ Sama |
| **React Query** | ^5.90.2 | ^5.90.11 | ✅ Hampir sama |
| **ECharts** | ^5.6.0 | ❌ Tidak | ❌ Kita pakai Chart.js & Recharts |
| **Chart.js** | ^4.4.9 | ^4.5.1 | ✅ Sama |
| **SVGR** | ✅ Ada | ❌ Tidak | - |
| **Wagmi** | ❌ Tidak | ✅ ^2.19.5 | ✅ Unik untuk DeFi |
| **RainbowKit** | ❌ Tidak | ✅ ^2.2.9 | ✅ Unik untuk DeFi |
| **Viem** | ❌ Tidak | ✅ ^2.40.3 | ✅ Unik untuk DeFi |

## 🎯 Rekomendasi untuk Malgist App

### ✅ Yang Sudah Baik (Jangan Ubah)
1. **Feature-Based Organization** - Struktur ini lebih scalable dan modular
2. **Colocation Pattern** - Komponen dekat dengan fitur yang menggunakannya
3. **Web3 Integration** - Provider pattern sudah baik

### ⚠️ Yang Bisa Diperbaiki
1. **Service Layer Pattern** - Implement centralized API service layer
2. **React Query Usage** - Gunakan lebih banyak untuk data fetching, jangan hanya mock data
3. **Constants Folder** - Buat folder untuk constants yang digunakan di banyak tempat
4. **Base API Request** - Buat utility function untuk API requests yang terpusat

### ❌ Yang Opsional (Tidak Wajib)
1. **Atomic Design Pattern** - Bisa ditambahkan jika ingin lebih terstruktur, tapi tidak wajib karena feature-based sudah cukup baik
2. **ModalProvider** - Bisa ditambahkan jika modal state management menjadi kompleks

## 📝 Kesimpulan

| Aspek | Kesimpulan |
|-------|-----------|
| **Struktur Folder** | ✅ **Malgist App lebih baik** - Feature-based organization lebih scalable |
| **Component Pattern** | ⚠️ **Woori lebih terstruktur** - Atomic Design membantu, tapi tidak wajib |
| **Service Layer** | ❌ **Woori lebih lengkap** - Perlu implement service layer di Malgist |
| **Data Fetching** | ⚠️ **Woori lebih matang** - Perlu lebih banyak menggunakan React Query |
| **Overall** | ✅ **Malgist App foundation baik** - Perlu perbaikan di service layer dan data fetching |

---

**Catatan**: Perbandingan ini dibuat untuk pembelajaran dan improvement, bukan untuk menyatakan salah satu lebih baik secara absolut. Setiap struktur memiliki trade-off dan sesuai untuk use case yang berbeda.



