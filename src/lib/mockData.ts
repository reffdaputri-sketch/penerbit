export interface Book {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  price: number;
  coverUrl: string;
  publishedDate: string;
  isbn: string;
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Masa Depan AI: Panduan Lengkap",
    author: "Dr. Alan Turing",
    synopsis: "Buku ini mengeksplorasi secara mendalam tentang bagaimana Kecerdasan Buatan akan mengubah lanskap teknologi, ekonomi, dan kehidupan sehari-hari kita dalam dekade mendatang. Ditulis dengan gaya yang mudah dipahami namun kaya akan wawasan teknis dan filosofis.",
    price: 150000,
    coverUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2024-01-15",
    isbn: "978-623-1234-56-7"
  },
  {
    id: "2",
    title: "Desain Antarmuka Memukau",
    author: "Sarah Drasner",
    synopsis: "Panduan praktis dan komprehensif bagi desainer dan developer untuk menciptakan antarmuka pengguna (UI) yang tidak hanya fungsional tetapi juga memberikan pengalaman visual (UX) yang tak terlupakan dengan micro-animations dan glassmorphism.",
    price: 185000,
    coverUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2023-11-20",
    isbn: "978-623-9876-54-3"
  },
  {
    id: "3",
    title: "Koding dengan Hati",
    author: "Budi Raharjo",
    synopsis: "Menyelami aspek emosional dan seni di balik penulisan kode perangkat lunak. Bagaimana menjadi developer yang tidak hanya mengejar efisiensi, tetapi juga keindahan dan keterbacaan struktur kode.",
    price: 120000,
    coverUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2023-08-05",
    isbn: "978-623-5555-12-9"
  },
  {
    id: "4",
    title: "Misteri Lembah Silikon",
    author: "Elon Musk (Foreword)",
    synopsis: "Kisah tak terungkap di balik startup-startup raksasa teknologi. Kegagalan, pengkhianatan, dan inovasi gila yang akhirnya membentuk dunia digital seperti yang kita kenal sekarang.",
    price: 210000,
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2024-03-10",
    isbn: "978-623-7777-88-8"
  },
  {
    id: "5",
    title: "Seneka dan Filosofi Stoik",
    author: "Feri",
    synopsis: "Panduan untuk menjalani kehidupan yang lebih tenang dengan menerapkan ajaran dari para filsuf Stoa di zaman modern. Sebuah bacaan wajib bagi mereka yang mencari kebahagiaan sejati.",
    price: 95000,
    coverUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2023-01-12",
    isbn: "978-623-1122-33-4"
  },
  {
    id: "6",
    title: "Seni Berbicara di Depan Umum",
    author: "Dian Sastro",
    synopsis: "Menguasai panggung, menarik perhatian audiens, dan menyampaikan pesan dengan penuh karisma. Buku ini memberikan teknik praktis dari pembicara profesional.",
    price: 115000,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2024-02-14",
    isbn: "978-623-5566-77-8"
  },
  {
    id: "7",
    title: "Membangun Startup dari Nol",
    author: "Nadiem Makarim",
    synopsis: "Langkah demi langkah membangun perusahaan rintisan di era digital. Dari validasi ide, mencari pendanaan, hingga merancang strategi pemasaran yang tepat.",
    price: 165000,
    coverUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2023-10-10",
    isbn: "978-623-2233-44-5"
  },
  {
    id: "8",
    title: "Sejarah Peradaban Manusia",
    author: "Yuval Noah",
    synopsis: "Perjalanan luar biasa umat manusia dari era prasejarah hingga zaman modern. Analisis mendalam tentang bagaimana budaya, agama, dan teknologi membentuk kita.",
    price: 250000,
    coverUrl: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2022-05-20",
    isbn: "978-623-9999-11-2"
  },
  {
    id: "9",
    title: "Psikologi Keuangan",
    author: "Morgan Housel",
    synopsis: "Mengapa orang pintar membuat keputusan bodoh tentang uang? Buku ini mengupas aspek perilaku dan emosi manusia dalam mengelola kekayaan.",
    price: 140000,
    coverUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2023-07-08",
    isbn: "978-623-4444-55-6"
  },
  {
    id: "10",
    title: "Rahasia Produktivitas Tinggi",
    author: "James Clear",
    synopsis: "Cara efektif mengatur waktu, mengurangi gangguan, dan meningkatkan efisiensi kerja. Fokus pada perubahan kebiasaan kecil yang berdampak masif.",
    price: 135000,
    coverUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedDate: "2024-01-05",
    isbn: "978-623-8888-22-3"
  }
];
