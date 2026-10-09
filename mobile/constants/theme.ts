/**
 * redBack.ai — Single Source of Truth UI Design Tokens
 * Conforming strictly to:
 * - 60 / 30 / 10 Adventure Naturalist Palette
 * - 8dp Spacing System (4, 8, 12, 16, 20, 24, 32)
 * - Nunito / SF Pro Rounded Typography Hierarchy
 * - Standardized Touch Target Dimensions (>= 48dp)
 */

import { Platform } from 'react-native';

export const Colors = {
  // 1. Primary / Nature
  forestGreen: '#2B8A3E',    // Primary actions, active states
  forestDark: '#1E6332',     // Pressed state, shadows, dark emphasis
  sageSubtle: '#EBFBEE',     // Success backgrounds, soft tint

  // 2. Semantic & Signal
  crimson: '#E03131',        // Danger, emergency SOS, critical alerts
  crimsonDark: '#B02525',    // Danger pressed state
  crimsonSoft: '#FDE8E4',    // Soft danger tint
  amber: '#F59E0B',          // Warning, attention, caution
  amberSoft: '#FFFBEB',      // Soft warning tint
  gold: '#FAB005',           // XP, achievements, streak flame
  goldSoft: '#FFF9DB',       // Soft gold tint

  // 3. Neutrals (60% / 30% ratio)
  inkPrimary: '#18201E',     // Primary body and title text
  inkMuted: '#6B7672',       // Secondary field text, captions
  canvas: '#FAF7F2',         // Main app background (parchment)
  card: '#FFFFFF',           // Card and surface background
  borderLine: '#E4DDD3',     // Clean consistent dividers & borders
  borderPressed: '#D8D0C5',  // Pressed border color
};

// Backwards-compatible alias for existing views
export const Palette = {
  forestGreen: Colors.forestGreen,
  forestGreenDark: Colors.forestDark,
  moss: Colors.forestGreen,
  mossDark: Colors.forestDark,
  mossSoft: Colors.sageSubtle,
  sageSubtle: Colors.sageSubtle,

  coral: Colors.crimson,
  coralDark: Colors.crimsonDark,
  coralSoft: Colors.crimsonSoft,
  spicyCrimson: Colors.crimson,
  spicyCrimsonDark: Colors.crimsonDark,
  danger: Colors.crimson,
  dangerSoft: Colors.crimsonSoft,
  dangerBorder: '#F7B5A8',

  amber: Colors.amber,
  solarAmber: Colors.gold,
  gold: Colors.gold,
  goldSoft: Colors.goldSoft,

  ink: Colors.inkPrimary,
  inkSecondary: '#3C4543',
  muted: Colors.inkMuted,
  mutedLight: '#9AA39F',

  canvas: Colors.canvas,
  paper: Colors.card,
  surfaceSubtle: '#F4EFEA',
  line: Colors.borderLine,
  lineSubtle: '#F0ECE4',
  borderLine: Colors.borderLine,
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
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 9999,
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

const bodyFont = Platform.select({
  ios: 'system-ui',
  android: 'normal',
  web: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  default: 'normal',
}) as string;

const displayFont = Platform.select({
  ios: 'ui-serif',
  android: 'serif',
  web: "Georgia, 'Times New Roman', serif",
  default: 'serif',
}) as string;

const monoFont = Platform.select({
  ios: 'ui-monospace',
  android: 'monospace',
  web: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  default: 'monospace',
}) as string;

export const Typography = {
  display: displayFont,
  body: bodyFont,
  mono: monoFont,
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 38,
    color: Colors.inkPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
    color: Colors.inkPrimary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
    color: Colors.inkPrimary,
  },
  bodyStyle: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
    color: Colors.inkPrimary,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
    color: Colors.inkMuted,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: Colors.inkMuted,
  },
};

export const TouchTargets = {
  min: 48,
  iconBtn: 48,
  buttonHeight: 52,
};

