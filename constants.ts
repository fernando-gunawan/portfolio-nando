import { Project, Experience, Skill, Organization, Recommendation } from './types';

// DATA PRIBADI
export const USER_INFO = {
  name: "Fernando",
  role: "Information System Student | Big Data & Web Dev",
  githubUsername: "fernando-gunawan",
  about: "Mahasiswa Sistem Informasi di Universitas Multimedia Nusantara dengan IPK 3.43. Memiliki minat mendalam pada Big Data Analytics, Data Analysis, dan Web Development. Berpengalaman dalam Machine Learning dan Full Stack Web Development sederhana.",
  bio: [
    "Saya adalah mahasiswa Sistem Informasi di Universitas Multimedia Nusantara (Aug 2023 - Sekarang). Fokus studi saya mencakup analisis data yang kompleks dan pengembangan solusi berbasis web.",
    "Secara teknis, saya telah membangun arsitektur CycleGAN end-to-end untuk generative art dan melakukan studi komparatif model Machine Learning untuk prediksi kesehatan. Saya juga mahir dalam pengembangan web menggunakan HTML, CSS, JS, dan PHP.",
    "Di luar teknis, saya aktif dalam kepanitiaan (DISCO & VIT-C Manifest) yang mengasah kemampuan kepemimpinan, kerja tim, dan manajemen logistik saya."
  ],
  avatarUrl: "https://i.ibb.co.com/HfBVwGjd/CEL00086.jpg",
  email: "fernandogunawan7@gmail.com",
  linkedin: "linkedin.com/in/fernando-gunawan7",
  github: "github.com/fernando-gunawan",
  location: "Tangerang, Indonesia",
  cvUrl: "https://drive.google.com/file/d/12nWaOfxS6V4PbREEDXqngaYUjx6hHEu1/view?usp=drive_link"
};

export const SKILLS: Skill[] = [
  // Hard Skills from Projects & Skills Section
  { name: "Data Analysis", category: "Soft Skill" },
  { name: "Machine Learning", category: "Framework" },
  { name: "Python", category: "Language" },
  { name: "MySQL", category: "Language" },
  { name: "PHP", category: "Language" },
  { name: "HTML/CSS/JS", category: "Language" },
  { name: "Bootstrap 5", category: "Framework" },
  { name: "XGBoost", category: "Framework" },
  { name: "Deep Learning (GAN)", category: "Framework" },
  // Soft Skills form CV
  { name: "Front End Dev", category: "Tool" },
  { name: "Teamwork", category: "Soft Skill" },
  { name: "Problem-Solving", category: "Soft Skill" },
  { name: "Leadership", category: "Soft Skill" },
];

// MANUAL PROJECTS INPUT
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "GENERATIVE ART WITH CYCLE GAN",
    description: "Arsitektur CycleGAN untuk mengubah foto real menjadi artwork gaya Monet tanpa data training berpasangan.",
    tags: ["Python", "Deep Learning", "CycleGAN", "Computer Vision"],
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    details: "Engineered an end-to-end CycleGAN architecture from scratch to perform unpaired image-to-image translation. Designed custom u-nit generator with skip connections and patch GAN discriminator utilizing instance normalization. Submitted to Kaggle Competition.",
    link: "", // Masukkan link jika ada
    notebookPath: "/notebooks/cyclegan.ipynb",
    stars: 0,
  },
  {
    id: 2,
    title: "DIABETES PREDICTION STUDY",
    description: "Analisis komparatif model Machine Learning untuk memprediksi diabetes menggunakan metrik klasifikasi standar.",
    tags: ["Machine Learning", "Python", "Classification", "Data Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    details: "Conducted a comparative analysis of machine learning models for diabetes prediction. Evaluated and compared model performance using standard classification metrics.",
    link: "",
    notebookPath: "/notebooks/diabetes-prediction.ipynb"
  },
  {
    id: 3,
    title: "ECOTECH (E-COMMERCE)",
    description: "Prototipe web e-commerce barang bekas menggunakan HTML, CSS, JS, Bootstrap5, PHP dan MySQL.",
    tags: ["Web Dev", "PHP", "MySQL", "Bootstrap5"],
    imageUrl: "/images/ecotech-illustration.png",
    details: "Making a second hand e-commerce web prototype with HTML, CSS, JavaScript, using Bootstrap5 for framework and MySQL and PHP for the backend systems. Features include Login, Product Browsing, Cart System, and Checkout.",
    link: "https://drive.google.com/file/d/1OMpewbf0wFY5pHJL-k42qzlOeIzBFg4c/view?usp=drive_link",
    reportPath: "/reports/ecotech-report.pdf"
  },
  {
    id: 4,
    title: "DIABETES RISK PREDICTION",
    description: "Model klasifikasi XGBoost (Akurasi 96.92%) menggunakan data Survey BRFSS 2021.",
    tags: ["Data Analysis", "XGBoost", "Health Tech"],
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
    details: "Creating a classification model able to predict diabetes from health indicators and lifestyle from BRFSS 2021 Survey datasets with XGBoost Algorithm, resulting with 96.92% accuracy. Made a web prototype and submitted for TSDN 2024.",
    link: "",
    notebookPath: "/notebooks/diabetes-risk.ipynb"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Part Time Barista",
    company: "Tomoro Coffee",
    period: "Jun 2025 – Aug 2025",
    description: [
      "Monitored stock levels of coffee beans, milk, and syrups, and performed daily cleaning.",
      "Prepared and served high-quality espresso-based beverages adhering to recipes.",
      "Delivered exceptional service to customers in a fast-paced environment.",
      "Managed high-volume orders during peak hours and processed payments accurately using POS."
    ]
  }
];

export const ORGANIZATIONS: Organization[] = [
  {
    id: 1,
    role: "Logistics & Consumptions Coordinator",
    name: "DISCO XII 2025",
    period: "Jan 2025 – Dec 2025",
    description: "Led team of 7 staff through 12-month preparation. Directed comprehensive logistical strategy for 3-day event ensuring zero operational disruptions for 100+ participants. Negotiated with vendors within budget."
  },
  {
    id: 2,
    role: "Logistics & Consumptions Staff",
    name: "DISCO XI 2024",
    period: "Jun 2024 – Dec 2024",
    description: "Managed end-to-end logistical operations and consumption planning for 100+ participants. Controlled inventory resulting in zero equipment loss."
  },
  {
    id: 3,
    role: "Medical Committee Member",
    name: "VIT-C Manifest UMN 2023",
    period: "Oct 2023 – Feb 2024",
    description: "Coordinated with security to mitigate health risks. Ensured safety of 2000+ participants and provided immediate first aid during emergencies."
  }
];

// KOSONGKAN REKOMENDASI KARENA TIDAK ADA DI CV
export const RECOMMENDATIONS: Recommendation[] = [];

export const RESUME_CONTEXT = `
Anda adalah asisten AI untuk portfolio Fernando.
Gunakan data berikut sebagai referensi:

Nama: ${USER_INFO.name}
Role: ${USER_INFO.role}
Tentang: ${USER_INFO.about}
Pendidikan: Multimedia Nusantara University (GPA 3.43)
Minat: ${USER_INFO.bio.join(' ')}

Skill: ${SKILLS.map(s => s.name).join(', ')}

Pengalaman Kerja:
${EXPERIENCES.map(e => `- ${e.role} di ${e.company} (${e.period}): ${e.description.join(' ')}`).join('\n')}

Organisasi:
${ORGANIZATIONS.map(o => `- ${o.role} di ${o.name} (${o.period}): ${o.description}`).join('\n')}

Proyek Portfolio:
${PROJECTS.map(p => `- ${p.title} (${p.tags.join(', ')}): ${p.details}`).join('\n')}

Jawab dengan profesional.
`;