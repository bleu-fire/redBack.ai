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

export const FontFamilies = {
  sentient: {
    regular: 'Sentient-Regular',
    medium: 'Sentient-Medium',
    bold: 'Sentient-Bold',
    light: 'Sentient-Light',
    extraLight: 'Sentient-Extralight',
    italic: 'Sentient-Italic',
    mediumItalic: 'Sentient-MediumItalic',
    boldItalic: 'Sentient-BoldItalic',
    lightItalic: 'Sentient-LightItalic',
    extraLightItalic: 'Sentient-ExtralightItalic',
  },
  sans: Platform.select({
    ios: 'system-ui',
    android: 'normal',
    web: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    default: 'normal',
  }) as string,
  mono: Platform.select({
    ios: 'ui-monospace',
    android: 'monospace',
    web: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    default: 'monospace',
  }) as string,
};

export const FontSizes = {
  hero: 36,
  displayXl: 32,
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLg: 16,
  body: 15,
  bodySm: 13,
  caption: 12,
  captionSm: 11,
  badge: 10,
  tiny: 9,
};

export const LineHeights = {
  hero: 42,
  displayXl: 38,
  h1: 34,
  h2: 30,
  h3: 26,
  h4: 24,
  bodyLg: 22,
  body: 21,
  bodySm: 18,
  caption: 16,
  captionSm: 15,
  badge: 13,
  tiny: 12,
};

export const FontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const LetterSpacings = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.3,
  wider: 0.6,
  widest: 1.0,
};

export const Fonts = {
  display: 'Sentient-Regular',
  displayBold: 'Sentient-Bold',
  displayMedium: 'Sentient-Medium',
  displayItalic: 'Sentient-Italic',
  displayBoldItalic: 'Sentient-BoldItalic',
  displayLight: 'Sentient-Light',
  serif: 'Sentient-Regular',
  sans: FontFamilies.sans,
  mono: FontFamilies.mono,
  rounded: FontFamilies.sans,
};

export const Typography = {
  // Primary Family Handles
  display: 'Sentient-Regular',
  displayBold: 'Sentient-Bold',
  displayMedium: 'Sentient-Medium',
  displayLight: 'Sentient-Light',
  displayItalic: 'Sentient-Italic',
  displayBoldItalic: 'Sentient-BoldItalic',
  body: FontFamilies.sans,
  mono: FontFamilies.mono,

  // Direct access to all font families and variants
  fonts: FontFamilies,

  // Helper function to resolve specific Sentient weight and style
  sentient: (
    weight: 'regular' | 'medium' | 'bold' | 'light' | 'extralight' = 'regular',
    italic = false
  ): string => {
    if (weight === 'bold') return italic ? 'Sentient-BoldItalic' : 'Sentient-Bold';
    if (weight === 'medium') return italic ? 'Sentient-MediumItalic' : 'Sentient-Medium';
    if (weight === 'light') return italic ? 'Sentient-LightItalic' : 'Sentient-Light';
    if (weight === 'extralight') return italic ? 'Sentient-ExtralightItalic' : 'Sentient-Extralight';
    return italic ? 'Sentient-Italic' : 'Sentient-Regular';
  },

  // Complete Typography Scale & Preset Styles
  hero: {
    fontFamily: 'Sentient-Bold',
    fontSize: FontSizes.hero,
    lineHeight: LineHeights.hero,
    letterSpacing: LetterSpacings.tighter,
    color: Colors.inkPrimary,
  },
  displayXl: {
    fontFamily: 'Sentient-Bold',
    fontSize: FontSizes.displayXl,
    lineHeight: LineHeights.displayXl,
    letterSpacing: LetterSpacings.tight,
    color: Colors.inkPrimary,
  },
  h1: {
    fontFamily: 'Sentient-Bold',
    fontSize: FontSizes.h1,
    lineHeight: LineHeights.h1,
    letterSpacing: LetterSpacings.tight,
    color: Colors.inkPrimary,
  },
  h2: {
    fontFamily: 'Sentient-Bold',
    fontSize: FontSizes.h2,
    lineHeight: LineHeights.h2,
    letterSpacing: LetterSpacings.tight,
    color: Colors.inkPrimary,
  },
  h3: {
    fontFamily: 'Sentient-Bold',
    fontSize: FontSizes.h3,
    lineHeight: LineHeights.h3,
    letterSpacing: LetterSpacings.normal,
    color: Colors.inkPrimary,
  },
  h4: {
    fontFamily: 'Sentient-Medium',
    fontSize: FontSizes.h4,
    lineHeight: LineHeights.h4,
    color: Colors.inkPrimary,
  },
  bodyLarge: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.bodyLg,
    lineHeight: LineHeights.bodyLg,
    color: Colors.inkPrimary,
  },
  bodyStyle: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.body,
    lineHeight: LineHeights.body,
    color: Colors.inkPrimary,
  },
  bodySmall: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.bodySm,
    lineHeight: LineHeights.bodySm,
    color: Colors.inkPrimary,
  },
  caption: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.caption,
    lineHeight: LineHeights.caption,
    color: Colors.inkMuted,
  },
  small: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.captionSm,
    lineHeight: LineHeights.captionSm,
    color: Colors.inkMuted,
  },
  taxa: {
    fontFamily: 'Sentient-Italic',
    fontSize: FontSizes.bodySm,
    lineHeight: LineHeights.bodySm,
    color: Colors.inkMuted,
  },
  taxaLarge: {
    fontFamily: 'Sentient-Italic',
    fontSize: FontSizes.bodyLg,
    lineHeight: LineHeights.bodyLg,
    color: Colors.inkMuted,
  },
  statCounter: {
    fontFamily: 'Sentient-Bold',
    fontSize: 28,
    lineHeight: 32,
    color: Colors.inkPrimary,
  },
  badge: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.badge,
    fontWeight: '700' as const,
    letterSpacing: LetterSpacings.wide,
  },
  button: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.body,
    fontWeight: '700' as const,
    letterSpacing: LetterSpacings.wide,
  },
  monoStyle: {
    fontFamily: FontFamilies.mono,
    fontSize: FontSizes.bodySm,
    lineHeight: LineHeights.bodySm,
    color: Colors.inkPrimary,
  },
};

export const TouchTargets = {
  min: 48,
  iconBtn: 48,
  buttonHeight: 52,
};

