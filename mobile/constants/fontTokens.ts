import { Platform } from 'react-native';

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
    web: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
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
