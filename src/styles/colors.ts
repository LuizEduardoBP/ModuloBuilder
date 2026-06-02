export interface ThemeColors {
  '--theme-bg': string;
  '--theme-card': string;
  '--theme-border': string;
  '--theme-text': string;
  '--theme-text-muted': string;
  '--theme-brand': string;
  '--theme-brand-hover': string;
  '--theme-brand-light': string;
  '--theme-brand-border': string;
}

export type ThemeId = 'indigo-cyber' | 'emerald-mint' | 'rose-sunset' | 'amber-gold' | 'slate-classic' | 'crimson-cyberpunk' | 'light-theme' | 'dark-theme';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: ThemeColors;
  icon: string; // Nome do ícone Lucide
}

export const themes: ThemeConfig[] = [
  {
    id: 'indigo-cyber',
    name: 'Indigo Cyber',
    icon: 'Terminal',
    colors: {
      '--theme-bg': '#09090b', // zinc-950
      '--theme-card': '#18181b', // zinc-900
      '--theme-border': 'rgba(255, 255, 255, 0.05)',
      '--theme-text': '#f4f4f5', // zinc-100
      '--theme-text-muted': '#a1a1aa', // zinc-400
      '--theme-brand': '#6366f1', // indigo-500
      '--theme-brand-hover': '#4f46e5', // indigo-600
      '--theme-brand-light': 'rgba(99, 102, 241, 0.08)',
      '--theme-brand-border': 'rgba(99, 102, 241, 0.2)',
    }
  },
  {
    id: 'emerald-mint',
    name: 'Emerald Mint',
    icon: 'Leaf',
    colors: {
      '--theme-bg': '#050c08', // dark forest
      '--theme-card': '#0b1611', // medium forest
      '--theme-border': 'rgba(16, 185, 129, 0.06)',
      '--theme-text': '#f0fdf4', // emerald-50
      '--theme-text-muted': '#86efac', // emerald-300
      '--theme-brand': '#10b981', // emerald-500
      '--theme-brand-hover': '#059669', // emerald-600
      '--theme-brand-light': 'rgba(16, 185, 129, 0.08)',
      '--theme-brand-border': 'rgba(16, 185, 129, 0.2)',
    }
  },
  {
    id: 'rose-sunset',
    name: 'Rose Sunset',
    icon: 'Flame',
    colors: {
      '--theme-bg': '#0c070a', // deep violet-black
      '--theme-card': '#160d13',
      '--theme-border': 'rgba(244, 63, 94, 0.06)',
      '--theme-text': '#fff1f2',
      '--theme-text-muted': '#fda4af',
      '--theme-brand': '#f43f5e',
      '--theme-brand-hover': '#e11d48',
      '--theme-brand-light': 'rgba(244, 63, 94, 0.08)',
      '--theme-brand-border': 'rgba(244, 63, 94, 0.2)',
    }
  },
  {
    id: 'amber-gold',
    name: 'Amber Gold',
    icon: 'Crown',
    colors: {
      '--theme-bg': '#080705', // warm charcoal
      '--theme-card': '#14110d',
      '--theme-border': 'rgba(245, 158, 11, 0.06)',
      '--theme-text': '#fffbeb',
      '--theme-text-muted': '#fcd34d',
      '--theme-brand': '#f59e0b',
      '--theme-brand-hover': '#d97706',
      '--theme-brand-light': 'rgba(245, 158, 11, 0.08)',
      '--theme-brand-border': 'rgba(245, 158, 11, 0.2)',
    }
  },
  {
    id: 'slate-classic',
    name: 'Slate Classic',
    icon: 'Layers',
    colors: {
      '--theme-bg': '#0b0f19', // cool slate dark
      '--theme-card': '#121929',
      '--theme-border': 'rgba(56, 189, 248, 0.06)',
      '--theme-text': '#f8fafc',
      '--theme-text-muted': '#94a3b8',
      '--theme-brand': '#38bdf8', // sky-400
      '--theme-brand-hover': '#0ea5e9', // sky-500
      '--theme-brand-light': 'rgba(56, 189, 248, 0.08)',
      '--theme-brand-border': 'rgba(56, 189, 248, 0.2)',
    }
  },
  {
    id: 'crimson-cyberpunk',
    name: 'Crimson Cyber',
    icon: 'ShieldAlert',
    colors: {
      '--theme-bg': '#0a0505', // blood black
      '--theme-card': '#160d0d',
      '--theme-border': 'rgba(239, 68, 68, 0.06)',
      '--theme-text': '#fef2f2',
      '--theme-text-muted': '#fca5a5',
      '--theme-brand': '#ef4444',
      '--theme-brand-hover': '#dc2626',
      '--theme-brand-light': 'rgba(239, 68, 68, 0.08)',
      '--theme-brand-border': 'rgba(239, 68, 68, 0.2)',
    }
  },
  {
    id: 'light-theme',
    name: 'Clean Light',
    icon: 'Sun',
    colors: {
      '--theme-bg': '#f8fafc', // slate-50
      '--theme-card': '#ffffff', // pure white
      '--theme-border': 'rgba(15, 23, 42, 0.08)',
      '--theme-text': '#0f172a', // slate-900
      '--theme-text-muted': '#64748b', // slate-500
      '--theme-brand': '#4f46e5', // indigo-600
      '--theme-brand-hover': '#4338ca',
      '--theme-brand-light': 'rgba(79, 70, 229, 0.06)',
      '--theme-brand-border': 'rgba(79, 70, 229, 0.15)',
    }
  },
  {
    id: 'dark-theme',
    name: 'Standard Dark',
    icon: 'Moon',
    colors: {
      '--theme-bg': '#09090b', // zinc-950
      '--theme-card': '#18181b', // zinc-900
      '--theme-border': 'rgba(255, 255, 255, 0.06)',
      '--theme-text': '#f4f4f5', // zinc-100
      '--theme-text-muted': '#a1a1aa', // zinc-400
      '--theme-brand': '#3b82f6', // blue-500
      '--theme-brand-hover': '#2563eb',
      '--theme-brand-light': 'rgba(59, 130, 246, 0.08)',
      '--theme-brand-border': 'rgba(59, 130, 246, 0.2)',
    }
  }
];

export const getThemeById = (id: ThemeId): ThemeConfig => {
  return themes.find(theme => theme.id === id) || themes[0];
};
