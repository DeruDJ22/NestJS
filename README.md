# 📦 Admin Panel - Manajemen Data

Aplikasi Admin Panel berbasis web untuk manajemen data **Category** dan **Product** menggunakan framework **NestJS** (TypeScript) dengan pola arsitektur **MVC (Model-View-Controller)**.

## 📋 Deskripsi Project

Aplikasi ini adalah sebuah Admin Panel sederhana yang memiliki fitur:

- **Login** - Autentikasi user dengan session
- **Dashboard** - Menampilkan ringkasan data
- **CRUD Category** - Create, Read, Update, Delete data category
- **CRUD Product** - Create, Read, Update, Delete data product
- **Pencarian Data** - Fitur search pada halaman list
- **Relasi One-to-Many** - Satu category memiliki banyak product
- **API Endpoint** - Endpoint JSON untuk testing di Postman
- **Error Handling** - Penanganan error (NotFoundException)

## 🗄️ Desain Database

Aplikasi menggunakan **SQLite** sebagai database dengan 3 tabel:

### Diagram Relasi

```
┌─────────────────┐       ┌─────────────────────┐
│     users       │       │    categories        │
├─────────────────┤       ├─────────────────────┤
│ id (PK)         │       │ id (PK)              │
│ username        │       │ name                 │
│ password        │       │ description          │
│ role            │       │ created_at           │
└─────────────────┘       │ updated_at           │
                          └──────────┬───────────┘
                                     │ 1
                                     │
                                     │ * (One-to-Many)
                                     │
                          ┌──────────┴───────────┐
                          │     products          │
                          ├──────────────────────┤
                          │ id (PK)               │
                          │ name                  │
                          │ description           │
                          │ price                 │
                          │ stock                 │
                          │ category_id (FK)      │
                          │ created_at            │
                          │ updated_at            │
                          └──────────────────────┘
```

### DBML (untuk dbdiagram.io)

```dbml
Table users {
  id integer [primary key, increment]
  username varchar [unique, not null]
  password varchar [not null]
  role varchar [default: 'admin']
}

Table categories {
  id integer [primary key, increment]
  name varchar [not null]
  description text
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
}

Table products {
  id integer [primary key, increment]
  name varchar [not null]
  description text
  price decimal(10,2) [default: 0]
  stock integer [default: 0]
  category_id integer [not null]
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
}

Ref: products.category_id > categories.id [delete: cascade]
```

## 📸 Screenshot Aplikasi

### Halaman Login
![Login Page](screenshots/login.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Daftar Category
![Category List](screenshots/categories.png)

### Detail Category (beserta Product di dalamnya)
![Category Detail](screenshots/category-detail.png)

### Daftar Product
![Product List](screenshots/products.png)

### Detail Product
![Product Detail](screenshots/product-detail.png)

### Form Tambah/Edit
![Form](screenshots/form.png)

### Error Handling (404)
![Error](screenshots/error.png)

## 🏗️ Struktur Project (MVC Pattern)

```
manajemen_data/
├── src/                          # Source Code
│   ├── main.ts                   # Entry point & setup MVC
│   ├── app.module.ts             # Root module & database config
│   ├── auth/                     # Modul Autentikasi
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts    # (C) Controller Login/Logout
│   │   └── auth.guard.ts         # Guard proteksi halaman
│   ├── category/                 # Modul Category
│   │   ├── category.entity.ts    # (M) Model/Entity Category
│   │   ├── category.module.ts
│   │   ├── category.service.ts   # Logika bisnis Category
│   │   └── category.controller.ts # (C) Controller Category
│   ├── product/                  # Modul Product
│   │   ├── product.entity.ts     # (M) Model/Entity Product
│   │   ├── product.module.ts
│   │   ├── product.service.ts    # Logika bisnis Product
│   │   └── product.controller.ts # (C) Controller Product
│   ├── dashboard/                # Modul Dashboard
│   │   ├── dashboard.module.ts
│   │   └── dashboard.controller.ts # (C) Controller Dashboard
│   ├── user/                     # Modul User
│   │   ├── user.entity.ts        # (M) Model/Entity User
│   │   ├── user.module.ts
│   │   └── user.service.ts       # Logika bisnis User
│   └── seed/                     # Modul Seed Data
│       ├── seed.module.ts
│       └── seed.service.ts       # Data awal otomatis
├── views/                        # (V) View - Template EJS
│   ├── partials/
│   │   ├── header.ejs            # Header & Navbar
│   │   └── footer.ejs            # Footer
│   ├── login.ejs                 # Halaman Login
│   ├── dashboard.ejs             # Halaman Dashboard
│   ├── error.ejs                 # Halaman Error
│   ├── categories/
│   │   ├── index.ejs             # List Category
│   │   ├── detail.ejs            # Detail Category
│   │   └── form.ejs              # Form Tambah/Edit Category
│   └── products/
│       ├── index.ejs             # List Product
│       ├── detail.ejs            # Detail Product
│       └── form.ejs              # Form Tambah/Edit Product
├── public/                       # File Statis
│   └── css/
│       └── style.css             # Stylesheet
└── package.json
```

## 🔧 Dependency

| Package | Versi | Keterangan |
|---------|-------|------------|
| `@nestjs/core` | ^11.0.1 | Core framework NestJS |
| `@nestjs/common` | ^11.0.1 | Decorator dan utilitas umum |
| `@nestjs/platform-express` | ^11.0.1 | HTTP platform Express |
| `@nestjs/typeorm` | latest | Integrasi TypeORM dengan NestJS |
| `typeorm` | latest | ORM untuk akses database |
| `better-sqlite3` | latest | Driver SQLite |
| `ejs` | latest | Template engine untuk View |
| `express-session` | latest | Session management untuk Login |
| `bcryptjs` | latest | Hashing password |

## 🚀 Cara Install & Menjalankan

### Prasyarat
- **Node.js** versi 18 atau lebih baru
- **npm** (biasanya sudah terinstall bersama Node.js)

### Langkah Install

```bash
# 1. Clone repository
git clone https://github.com/DeruDJ22/NestJS.git

# 2. Masuk ke folder project
cd NestJS

# 3. Install semua dependency
npm install

# 4. Jalankan aplikasi (mode development)
npm run start:dev
```

### Akses Aplikasi

Buka browser dan akses: **http://localhost:3000**

Login menggunakan:
- **Username:** `admin`
- **Password:** `admin123`

## 📡 API Endpoints (untuk Postman)

### Auth
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| POST | `/login` | Login (form-data: username, password) |

### Category API
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/categories` | Ambil semua category |
| GET | `/api/categories?search=keyword` | Cari category |
| GET | `/api/categories/:id` | Ambil detail category |
| POST | `/api/categories` | Tambah category baru |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Hapus category |

### Product API
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/products` | Ambil semua product |
| GET | `/api/products?search=keyword` | Cari product |
| GET | `/api/products/:id` | Ambil detail product |
| POST | `/api/products` | Tambah product baru |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Hapus product |

### Contoh Body Request (JSON) untuk Postman

**Tambah Category:**
```json
{
  "name": "Olahraga",
  "description": "Peralatan olahraga dan fitness"
}
```

**Tambah Product:**
```json
{
  "name": "Sepatu Nike",
  "description": "Sepatu lari Nike Air Max",
  "price": 1500000,
  "stock": 20,
  "category_id": 1
}
```

## 🎥 Video Demo

Link video demo: [Klik di sini](#) _(tambahkan link video)_

## 📝 Informasi Tambahan

### Pola MVC dalam Project ini

- **Model** → File `*.entity.ts` (mendefinisikan struktur tabel database)
- **View** → File `*.ejs` di folder `views/` (template halaman HTML)
- **Controller** → File `*.controller.ts` (mengatur routing dan menghubungkan Model dengan View)

### Error Handling

Aplikasi mengimplementasikan error handling menggunakan `NotFoundException` dari NestJS. Ketika data tidak ditemukan (misalnya mengakses Category/Product dengan ID yang tidak ada), aplikasi akan menampilkan halaman error 404 dengan pesan yang jelas.

### Catatan untuk Developer Selanjutnya

1. Database menggunakan **SQLite** sehingga tidak perlu setup server database terpisah. File database akan otomatis dibuat saat pertama kali menjalankan aplikasi.
2. Opsi `synchronize: true` pada TypeORM akan otomatis membuat/mengupdate tabel. **Jangan gunakan di production**, gunakan migration sebagai gantinya.
3. Data awal (seed) akan otomatis dibuat saat pertama kali menjalankan aplikasi melalui `SeedService`.
4. Password user di-hash menggunakan **bcryptjs** sehingga aman tersimpan di database.
