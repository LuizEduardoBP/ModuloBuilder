export interface ThemeColors {
  '--theme-bg': string;
  '--theme-card': string;
  '--theme-surface-inset': string;
  '--theme-border': string;
  '--theme-border-strong': string;
  '--theme-text': string;
  '--theme-text-muted': string;
  '--theme-text-subtle': string;
  '--theme-brand': string;
  '--theme-brand-hover': string;
  '--theme-brand-light': string;
  '--theme-brand-border': string;
  '--theme-brand-fg': string;
  '--theme-success': string;
  '--theme-success-bg': string;
  '--theme-success-border': string;
  '--theme-error': string;
  '--theme-error-bg': string;
  '--theme-error-border': string;
  '--theme-warning': string;
  '--theme-warning-bg': string;
  '--theme-warning-border': string;
}

export type ThemeId = 'oficina' | 'grafite' | 'prancheta' | 'salvia';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  mode: 'light' | 'dark';
  preview: {
    bg: string;
    card: string;
    brand: string;
  };
  colors: ThemeColors;
}

export const DEFAULT_THEME_ID: ThemeId = 'oficina';

export const themes: ThemeConfig[] = [
  {
    id: 'oficina',
    name: 'Oficina',
    description: 'Claro quente',
    mode: 'light',
    preview: {
      bg: '#F6F4EF',
      card: '#FFFFFF',
      brand: '#D94E28',
    },
    colors: {
      '--theme-bg': '#F6F4EF',
      '--theme-card': '#FFFFFF',
      '--theme-surface-inset': '#EFECE5',
      '--theme-border': '#E2DDD3',
      '--theme-border-strong': '#CEC7BA',
      '--theme-text': '#181715',
      '--theme-text-muted': '#5E5A52',
      '--theme-text-subtle': '#8A8478',
      '--theme-brand': '#D94E28',
      '--theme-brand-hover': '#BD401E',
      '--theme-brand-light': 'rgba(217, 78, 40, 0.09)',
      '--theme-brand-border': 'rgba(217, 78, 40, 0.28)',
      '--theme-brand-fg': '#FFFFFF',
      '--theme-success': '#157A4B',
      '--theme-success-bg': 'rgba(21, 122, 75, 0.08)',
      '--theme-success-border': 'rgba(21, 122, 75, 0.25)',
      '--theme-error': '#C83232',
      '--theme-error-bg': 'rgba(200, 50, 50, 0.08)',
      '--theme-error-border': 'rgba(200, 50, 50, 0.25)',
      '--theme-warning': '#B4690E',
      '--theme-warning-bg': 'rgba(180, 105, 14, 0.09)',
      '--theme-warning-border': 'rgba(180, 105, 14, 0.26)',
    },
  },
  {
    id: 'grafite',
    name: 'Grafite',
    description: 'Escuro quente',
    mode: 'dark',
    preview: {
      bg: '#131311',
      card: '#1B1A18',
      brand: '#E86A3E',
    },
    colors: {
      '--theme-bg': '#131311',
      '--theme-card': '#1B1A18',
      '--theme-surface-inset': '#10100E',
      '--theme-border': '#2C2A25',
      '--theme-border-strong': '#3E3B34',
      '--theme-text': '#F2EFE9',
      '--theme-text-muted': '#A6A095',
      '--theme-text-subtle': '#726D63',
      '--theme-brand': '#E86A3E',
      '--theme-brand-hover': '#F07D54',
      '--theme-brand-light': 'rgba(232, 106, 62, 0.12)',
      '--theme-brand-border': 'rgba(232, 106, 62, 0.3)',
      '--theme-brand-fg': '#131311',
      '--theme-success': '#38B87C',
      '--theme-success-bg': 'rgba(56, 184, 124, 0.1)',
      '--theme-success-border': 'rgba(56, 184, 124, 0.28)',
      '--theme-error': '#F06464',
      '--theme-error-bg': 'rgba(240, 100, 100, 0.1)',
      '--theme-error-border': 'rgba(240, 100, 100, 0.28)',
      '--theme-warning': '#E8A23E',
      '--theme-warning-bg': 'rgba(232, 162, 62, 0.1)',
      '--theme-warning-border': 'rgba(232, 162, 62, 0.28)',
    },
  },
  {
    id: 'prancheta',
    name: 'Prancheta',
    description: 'Escuro técnico',
    mode: 'dark',
    preview: {
      bg: '#0E151F',
      card: '#141E2B',
      brand: '#3898FF',
    },
    colors: {
      '--theme-bg': '#0E151F',
      '--theme-card': '#141E2B',
      '--theme-surface-inset': '#0A1018',
      '--theme-border': '#233245',
      '--theme-border-strong': '#334863',
      '--theme-text': '#EBF1F8',
      '--theme-text-muted': '#96A8BE',
      '--theme-text-subtle': '#62768F',
      '--theme-brand': '#3898FF',
      '--theme-brand-hover': '#58AAFF',
      '--theme-brand-light': 'rgba(56, 152, 255, 0.12)',
      '--theme-brand-border': 'rgba(56, 152, 255, 0.3)',
      '--theme-brand-fg': '#09121D',
      '--theme-success': '#34C78B',
      '--theme-success-bg': 'rgba(52, 199, 139, 0.1)',
      '--theme-success-border': 'rgba(52, 199, 139, 0.28)',
      '--theme-error': '#F26B6B',
      '--theme-error-bg': 'rgba(242, 107, 107, 0.1)',
      '--theme-error-border': 'rgba(242, 107, 107, 0.28)',
      '--theme-warning': '#E8AC42',
      '--theme-warning-bg': 'rgba(232, 172, 66, 0.1)',
      '--theme-warning-border': 'rgba(232, 172, 66, 0.28)',
    },
  },
  {
    id: 'salvia',
    name: 'Sálvia',
    description: 'Claro botânico',
    mode: 'light',
    preview: {
      bg: '#F3F6F4',
      card: '#FFFFFF',
      brand: '#157A6E',
    },
    colors: {
      '--theme-bg': '#F3F6F4',
      '--theme-card': '#FFFFFF',
      '--theme-surface-inset': '#E9EFEA',
      '--theme-border': '#D8E2DB',
      '--theme-border-strong': '#BFCFCA',
      '--theme-text': '#141F19',
      '--theme-text-muted': '#4F6358',
      '--theme-text-subtle': '#7C9084',
      '--theme-brand': '#157A6E',
      '--theme-brand-hover': '#106258',
      '--theme-brand-light': 'rgba(21, 122, 110, 0.09)',
      '--theme-brand-border': 'rgba(21, 122, 110, 0.28)',
      '--theme-brand-fg': '#FFFFFF',
      '--theme-success': '#157A4B',
      '--theme-success-bg': 'rgba(21, 122, 75, 0.08)',
      '--theme-success-border': 'rgba(21, 122, 75, 0.25)',
      '--theme-error': '#C83232',
      '--theme-error-bg': 'rgba(200, 50, 50, 0.08)',
      '--theme-error-border': 'rgba(200, 50, 50, 0.25)',
      '--theme-warning': '#B4690E',
      '--theme-warning-bg': 'rgba(180, 105, 14, 0.09)',
      '--theme-warning-border': 'rgba(180, 105, 14, 0.26)',
    },
  },
];

export const isThemeId = (value: string | null): value is ThemeId => {
  return themes.some((theme) => theme.id === value);
};

export const getThemeById = (id: string | null | undefined): ThemeConfig => {
  return themes.find((theme) => theme.id === id) || themes[0];
};
