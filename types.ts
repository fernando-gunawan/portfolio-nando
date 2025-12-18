import React from 'react';

export interface VisualConfig {
  type: 'bar' | 'iframe';
  data?: {
    labels: string[];
    values: number[];
  };
  embedUrl?: string; // Opsional untuk future proofing (misal embed Tableau)
}

export interface Project {
  id: number;
  title: string;
  description: string | null;
  tags: string[];
  imageUrl: string;
  link?: string; // Link ke repository atau live demo luar (opsional)
  details: string; // Deskripsi detail untuk AI Context
  stars?: number; // Input manual jika ingin pamer star
  forks?: number; // Input manual

  // Manual File Paths
  notebookPath?: string; // Path ke file lokal (misal: /assets/analysis.html)
  reportPath?: string;   // Path/Link ke file laporan PDF (misal: /assets/report.pdf atau Google Drive preview link)
  datasetPath?: string;  // Path ke file dataset (misal: /assets/data.csv)
  datasetName?: string;  // Nama dataset untuk ditampilkan

  // Interactive Visualization
  visualConfig?: VisualConfig;

  // Gallery for Web Prototypes
  gallery?: string[]; // Array URL gambar screenshot
}

export interface Skill {
  name: string;
  category: 'Language' | 'Tool' | 'Soft Skill' | 'Framework';
  icon?: React.ReactNode;
  level?: number; // 0 - 100
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Organization {
  id: number;
  role: string;
  name: string;
  period: string;
  description: string;
}

export interface Recommendation {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}