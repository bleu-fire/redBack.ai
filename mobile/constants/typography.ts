import { Colors } from './colors';
import {
  FontFamilies,
  FontSizes,
  LineHeights,
  FontWeights,
  LetterSpacings,
  Fonts,
} from './fontTokens';

export {
  FontFamilies,
  FontSizes,
  LineHeights,
  FontWeights,
  LetterSpacings,
  Fonts,
};

export const Typography = {
  display: Fonts.display,
  displayBold: Fonts.displayBold,
  displayMedium: Fonts.displayMedium,
  displayLight: Fonts.displayLight,
  displayItalic: Fonts.displayItalic,
  displayBoldItalic: Fonts.displayBoldItalic,
  body: FontFamilies.sans,
  mono: FontFamilies.mono,

  fonts: FontFamilies,

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

  hero: {
    fontFamily: Fonts.displayBold,
    fontSize: FontSizes.hero,
    lineHeight: LineHeights.hero,
    letterSpacing: LetterSpacings.tighter,
    color: Colors.inkPrimary,
  },
  displayXl: {
    fontFamily: Fonts.displayBold,
    fontSize: FontSizes.displayXl,
    lineHeight: LineHeights.displayXl,
    letterSpacing: LetterSpacings.tight,
    color: Colors.inkPrimary,
  },
  h1: {
    fontFamily: Fonts.displayBold,
    fontSize: FontSizes.h1,
    lineHeight: LineHeights.h1,
    letterSpacing: LetterSpacings.tight,
    color: Colors.inkPrimary,
  },
  h2: {
    fontFamily: Fonts.displayBold,
    fontSize: FontSizes.h2,
    lineHeight: LineHeights.h2,
    letterSpacing: LetterSpacings.tight,
    color: Colors.inkPrimary,
  },
  h3: {
    fontFamily: Fonts.displayBold,
    fontSize: FontSizes.h3,
    lineHeight: LineHeights.h3,
    letterSpacing: LetterSpacings.normal,
    color: Colors.inkPrimary,
  },
  h4: {
    fontFamily: Fonts.displayMedium,
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
    fontFamily: Fonts.displayItalic,
    fontSize: FontSizes.bodySm,
    lineHeight: LineHeights.bodySm,
    color: Colors.inkMuted,
  },
  taxaLarge: {
    fontFamily: Fonts.displayItalic,
    fontSize: FontSizes.bodyLg,
    lineHeight: LineHeights.bodyLg,
    color: Colors.inkMuted,
  },
  statCounter: {
    fontFamily: Fonts.displayBold,
    fontSize: 28,
    lineHeight: 32,
    color: Colors.inkPrimary,
  },
  badge: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.badge,
    fontWeight: FontWeights.bold,
    letterSpacing: LetterSpacings.wide,
  },
  button: {
    fontFamily: FontFamilies.sans,
    fontSize: FontSizes.body,
    fontWeight: FontWeights.bold,
    letterSpacing: LetterSpacings.wide,
  },
  monoStyle: {
    fontFamily: FontFamilies.mono,
    fontSize: FontSizes.bodySm,
    lineHeight: LineHeights.bodySm,
    color: Colors.inkPrimary,
  },
};
