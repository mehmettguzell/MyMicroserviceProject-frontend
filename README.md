/frontend
│
├─ /app                # Next.js 13+ server components için
│   ├─ /layout.tsx     # Global layout
│   ├─ /page.tsx       # Ana sayfa
│   ├─ /product        # Product sayfaları
│   │   ├─ /[id]       # Dinamik route (ör: /product/1)
│   │   └─ page.tsx
│   └─ /order
│       └─ page.tsx
│
├─ /components         # Reusable UI bileşenleri
│   ├─ Button.tsx
│   ├─ Input.tsx
│   └─ Navbar.tsx
│
├─ /services           # Backend API ile iletişim
│   ├─ orderService.ts
│   └─ productService.ts
│
├─ /context            # React Context (global state)
│   └─ AuthContext.tsx
│
├─ /hooks              # Custom hook’lar
│   └─ useFetch.ts
│
├─ /styles             # CSS / Tailwind / SCSS dosyaları
│   └─ globals.css
│
└─ /utils              # Yardımcı fonksiyonlar
    └─ formatters.ts
