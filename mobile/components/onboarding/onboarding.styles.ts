import { StyleSheet, Dimensions } from "react-native";
import { Colors, Spacing, Radii } from "@/constants/theme";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.canvas,
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.54,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "72%",
  },
  foregroundContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  // Top Bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xs,
    height: 44,
  },
  stepIndicatorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
  },
  stepIndicatorText: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.forestGreen,
    letterSpacing: 0.5,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderWidth: 1.5,
    borderColor: Colors.borderLine,
  },
  skipText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.inkMuted,
  },
  spacer: {
    flex: 1,
    minHeight: height * 0.16,
  },

  // Reticle Overlay for Step 3
  scannerReticleOverlay: {
    position: "absolute",
    top: "18%",
    left: "16%",
    width: "68%",
    height: "56%",
  },
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#FFFFFF",
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },

  // Narrative Content
  contentSection: {
    paddingHorizontal: Spacing.xxl,
    alignItems: "center",
    gap: Spacing.sm,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.inkPrimary,
    textAlign: "center",
    lineHeight: 38,
    letterSpacing: -0.6,
  },
  subtitleText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.inkMuted,
    textAlign: "center",
    maxWidth: 320,
    fontWeight: "400",
  },

  // Footer Section
  footerSection: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.sm,
    gap: Spacing.lg,
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 22,
    backgroundColor: Colors.forestGreen,
  },
  dotInactive: {
    width: 6,
    backgroundColor: "#D6D0C5",
  },

  // Action Button (Tactile 3D Depth)
  actionButton: {
    backgroundColor: Colors.forestGreen,
    borderWidth: 1.5,
    borderColor: '#389A4B',
    borderBottomWidth: 4,
    borderBottomColor: Colors.forestDark,
    paddingVertical: 15,
    borderRadius: Radii.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonPressed: {
    backgroundColor: Colors.forestDark,
    transform: [{ translateY: 2 }],
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
  btnIcon: {
    marginLeft: 6,
  },
});
