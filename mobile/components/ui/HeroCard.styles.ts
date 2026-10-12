import { StyleSheet } from 'react-native';
import { Palette, Radii, Typography } from '@/constants/theme';

export const styles = StyleSheet.create({
  // Base Card Styles
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },

  // 1. Discovery Styles
  discoveryCard: {
    height: 200,
    backgroundColor: '#1C2E26',
    justifyContent: 'flex-end',
  },
  discoverySpiderImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  discoveryGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  discoveryBottomContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  discoveryTextContainer: {
    flex: 1,
    paddingRight: 14,
  },
  discoveryTitle: {
    fontFamily: Typography.displayBold,
    fontSize: 19,
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  discoverySubtitle: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: '#E6EFEA',
    lineHeight: 17,
  },
  shutterActionGroup: {
    alignItems: 'center',
    gap: 3,
  },
  cameraShutterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  // 2. Lesson Styles
  lessonCard: {
    backgroundColor: Palette.moss,
    padding: 20,
    minHeight: 180,
  },
  lessonContent: {
    zIndex: 2,
    maxWidth: '75%',
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '133%',
    marginTop: 14,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  metaPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  coralCircleBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  // 3. Spotlight Styles
  spotlightCard: {
    backgroundColor: '#1C2E25',
    paddingVertical: 18,
    paddingHorizontal: 16,
    minHeight: 175,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotlightContent: {
    flex: 1.1,
    zIndex: 2,
    paddingRight: 8,
  },
  spotlightTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8BA096',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  spotlightSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: '#C5C9C8',
    lineHeight: 16,
    marginBottom: 14,
  },
  whitePillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FDEBE7',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
  },
  pillBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },

  // Shared Typography & Artwork
  sideSpiderArt: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 175,
    height: 175,
    zIndex: 1,
  },
  tag: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: '#E6EFEA',
    marginBottom: 4,
  },
  title: {
    fontFamily: Typography.displayBold,
    fontSize: 19,
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  titleLarge: {
    fontFamily: Typography.displayBold,
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: '#E6EFEA',
    lineHeight: 17,
  },
});
