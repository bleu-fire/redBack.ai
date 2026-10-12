import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radii, Typography, TouchTargets } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // HUD Top
  topHud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
  },
  hudIconButton: {
    width: TouchTargets.iconBtn,
    height: TouchTargets.iconBtn,
    borderRadius: Radii.pill,
    backgroundColor: 'rgba(24, 32, 30, 0.65)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudIconButtonActive: {
    backgroundColor: 'rgba(250, 176, 5, 0.25)',
    borderColor: Colors.gold,
  },

  // Viewfinder
  viewfinderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  reticleBox: {
    width: 270,
    height: 270,
    position: 'relative',
  },
  reticleCorner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#FFFFFF',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3.5,
    borderLeftWidth: 3.5,
    borderTopLeftRadius: 10,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopRightRadius: 10,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3.5,
    borderLeftWidth: 3.5,
    borderBottomLeftRadius: 10,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3.5,
    borderRightWidth: 3.5,
    borderBottomRightRadius: 10,
  },

  // Bottom Action Deck
  bottomDeck: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.xxl,
    zIndex: 10,
  },
  sideDeckButton: {
    width: TouchTargets.iconBtn,
    height: TouchTargets.iconBtn,
    borderRadius: Radii.md,
    backgroundColor: 'rgba(24, 32, 30, 0.8)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 3,
    borderBottomColor: '#121816',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosDeckButton: {
    width: TouchTargets.iconBtn,
    height: TouchTargets.iconBtn,
    borderRadius: Radii.md,
    backgroundColor: Colors.crimson,
    borderWidth: 1.5,
    borderColor: '#EE4A4A',
    borderBottomWidth: 3,
    borderBottomColor: Colors.crimsonDark,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  sosText: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Mega Shutter
  shutterOuterRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  shutterInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.forestGreen,
    borderWidth: 1.5,
    borderColor: '#389A4B',
    borderBottomWidth: 3.5,
    borderBottomColor: Colors.forestDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterPressed: {
    transform: [{ scale: 0.94 }],
  },

  // Permissions
  permissionScreen: {
    flex: 1,
    backgroundColor: Colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  permissionCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: Colors.borderPressed,
    padding: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.md,
    width: '100%',
  },
  permissionIconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  permissionTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: '800',
    color: Colors.inkPrimary,
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: Typography.caption.fontSize,
    color: Colors.inkMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  permissionBtn: {
    backgroundColor: Colors.forestGreen,
    borderWidth: 1.5,
    borderColor: '#389A4B',
    borderBottomWidth: 3,
    borderBottomColor: Colors.forestDark,
    borderRadius: Radii.lg,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xxl,
    width: '100%',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  permissionBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
});
