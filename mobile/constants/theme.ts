/**
 * redBack.ai Design System & Theme Tokens
 * Derived from high-fidelity field-journal and explorer design concepts:
 * (explorer-ui-concept, student-ui-concept, auth-ui-concept, ui-components-kit)
 */

import { Platform } from 'react-native';

export const Palette = {
  // Brand & Action (Redback Crimson)
  coral: '#E04836',
  coralSoft: '#FDEBE7',
  coralDark: '#C83D32',

  // Botanical & Ecology (Deep Forest Moss)
  moss: '#2C4A3E',
  mossDark: '#1E352C',
  mossSoft: '#E6EFEA', // Soft sage

  // Canvas & Surfaces (Warm Naturalist Paper)
  canvas: '#FBF9F4',
  paper: '#FFFFFF',
  surfaceSubtle: '#F4EFEA',
  line: '#EAE6DE',
  lineSubtle: '#F0ECE4',

  // Typography & Inks
  ink: '#17211F',
  inkSecondary: '#3C4543',
  muted: '#6E7773',
  mutedLight: '#9AA39F',

  // Gamification & Streaks (Solar Amber)
  gold: '#E59824',
  goldSoft: '#FFF4DE',

  // Venom & Safety Warnings
  danger: '#D32F2F',
  dangerSoft: '#FDE8E4',
  dangerBorder: '#F7B5A8',
};

const tintColorLight = Palette.coral;
const tintColorDark = Palette.coral;

export const Colors = {
  light: {
    text: Palette.ink,
    textSecondary: Palette.inkSecondary,
    textMuted: Palette.muted,
    background: Palette.canvas,
    card: Palette.paper,
    cardSubtle: Palette.surfaceSubtle,
    border: Palette.line,
    tint: tintColorLight,
    icon: Palette.muted,
    iconActive: Palette.coral,
    tabBar: Palette.paper,
    tabIconDefault: Palette.muted,
    tabIconSelected: tintColorLight,
    badgeVenomous: Palette.coralSoft,
    badgeCommon: Palette.mossSoft,
    badgePopular: Palette.goldSoft,
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#C5C9C8',
    textMuted: '#9BA1A6',
    background: '#121A18',
    card: '#1B2624',
    cardSubtle: '#222E2B',
    border: '#2A3633',
    tint: tintColorDark,
    icon: '#9BA1A6',
    iconActive: Palette.coral,
    tabBar: '#17211F',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    badgeVenomous: '#3D1C17',
    badgeCommon: '#1B2E24',
    badgePopular: '#332711',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  pill: 9999,
};

export const Typography = {
  display: Platform.select({
    ios: 'ui-serif',
    android: 'serif',
    web: "Georgia, 'Times New Roman', serif",
    default: 'serif',
  }),
  body: Platform.select({
    ios: 'system-ui',
    android: 'normal',
    web: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    default: 'normal',
  }),
  mono: Platform.select({
    ios: 'ui-monospace',
    android: 'monospace',
    web: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    default: 'monospace',
  }),
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
