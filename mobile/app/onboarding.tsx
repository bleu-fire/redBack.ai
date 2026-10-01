import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import {
  Compass,
  Globe2,
  BookOpen,
  Camera,
  BookMarked,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Scan,
  ArrowRight,
} from "lucide-react-native";
import { Palette, Typography } from "@/constants/theme";

const { width } = Dimensions.get("window");

interface PillBadge {
  icon: any;
  label: string;
  sublabel?: string;
}

interface OnboardingSlide {
  id: number;
  stepName: string;
  title: string;
  subtitle: string;
  callout?: string;
  badges?: PillBadge[];
  type: "welcome" | "discover" | "identify" | "learn" | "ready";
}

const slides: OnboardingSlide[] = [
  // 1. Welcome / Brand
  {
    id: 1,
    stepName: "Welcome",
    title: "Welcome,\nExplorer.",
    subtitle:
      "Discover the amazing world of spiders and help protect biodiversity.",
    type: "welcome",
  },
  // 2. Discover
  {
    id: 2,
    stepName: "Discover",
    title: "Discover\nAmazing Species.",
    subtitle:
      "Explore a diverse world of spiders from around you and across the globe.",
    callout: "Small creatures, big stories.",
    badges: [
      { icon: Leaf, label: "2,500+", sublabel: "Species" },
      { icon: Globe2, label: "Global", sublabel: "Habitats" },
      { icon: BookOpen, label: "Trusted", sublabel: "Knowledge" },
    ],
    type: "discover",
  },
  // 3. Identify
  {
    id: 3,
    stepName: "Identify",
    title: "Identify with AI",
    subtitle:
      "Take a photo and let AI help you identify the spider in seconds.",
    type: "identify",
  },
  // 4. Learn & Protect
  {
    id: 4,
    stepName: "Learn",
    title: "Learn & Protect",
    subtitle:
      "Get detailed information, explore habitats, and learn how to keep spiders and ecosystems safe.",
    callout: "Observe • Learn • Respect • Protect",
    badges: [
      { icon: BookMarked, label: "Field Guide" },
      { icon: Leaf, label: "Safe Living Tips" },
      { icon: ShieldCheck, label: "Conservation" },
    ],
    type: "learn",
  },
  // 5. Get Started
  {
    id: 5,
    stepName: "Get Started",
    title: "You're all set!",
    subtitle:
      "Join a community of curious explorers and start your spider discovery journey.",
    type: "ready",
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const slide = slides[step];
  const isLast = step === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.replace("/(auth)/login");
    } else {
      setStep((curr) => curr + 1);
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={styles.stepIndicatorContainer}>
          <Text style={styles.stepIndicatorText}>
            {step + 1} / {slides.length}
          </Text>
        </View>
        {!isLast ? (
          <Pressable onPress={handleSkip} hitSlop={12} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Visual Canvas Area */}
      <View style={styles.visualContainer}>
        {slide.type === "welcome" && (
          <View style={styles.centerArtWrapper}>
            <View style={styles.spiderEmblemCard}>
              <Image
                source={require("@/assets/design/redback-logo.png")}
                style={styles.welcomeLogo}
                contentFit="contain"
              />
            </View>
            <View style={styles.brandRow}>
              <Text style={styles.brandMain}>redBack</Text>
              <Text style={styles.brandDot}>.ai</Text>
            </View>
            <Text style={styles.brandTagline}>DISCOVER • LEARN • PROTECT</Text>
          </View>
        )}

        {slide.type === "discover" && (
          <View style={styles.centerArtWrapper}>
            <View style={styles.botanicalHeroCard}>
              <Image
                source={require("@/assets/images/spider-3d.png")}
                style={styles.heroSpiderImage}
                contentFit="contain"
              />
              {slide.callout && (
                <View style={styles.speechBubble}>
                  <Text style={styles.speechBubbleText}>{slide.callout}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {slide.type === "identify" && (
          <View style={styles.centerArtWrapper}>
            <View style={styles.scannerHeroCard}>
              <Image
                source={require("@/assets/images/spider-bg.png")}
                style={styles.scannerBackground}
                contentFit="cover"
              />
              {/* Camera Reticle Overlay */}
              <View style={styles.scannerReticle}>
                <View style={[styles.corner, styles.cornerTL]} />
                <View style={[styles.corner, styles.cornerTR]} />
                <View style={[styles.corner, styles.cornerBL]} />
                <View style={[styles.corner, styles.cornerBR]} />
              </View>

              {/* Shutter Icon Badge */}
              <View style={styles.shutterBadge}>
                <Camera size={26} color="#FFFFFF" strokeWidth={2.2} />
              </View>
            </View>
          </View>
        )}

        {slide.type === "learn" && (
          <View style={styles.centerArtWrapper}>
            <View style={styles.fieldJournalCard}>
              <View style={styles.journalHeader}>
                <Text style={styles.journalLabel}>FIELD NOTES</Text>
                <View style={styles.journalPin} />
              </View>
              <Image
                source={require("@/assets/images/spider-3d.png")}
                style={styles.journalSpiderImage}
                contentFit="contain"
              />
              <View style={styles.journalTag}>
                <Text style={styles.journalTagText}>Habitat: Sheltered</Text>
              </View>
            </View>
            {slide.callout && (
              <Text style={styles.handwrittenNote}>{slide.callout}</Text>
            )}
          </View>
        )}

        {slide.type === "ready" && (
          <View style={styles.centerArtWrapper}>
            <View style={styles.successCard}>
              <View style={styles.successIconCircle}>
                <CheckCircle2 size={54} color={Palette.coral} strokeWidth={2.4} />
              </View>
              <View style={styles.readyEmblem}>
                <Compass size={28} color={Palette.moss} strokeWidth={2} />
                <Text style={styles.readyEmblemText}>Ready to Explore</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Narrative & Information Content */}
      <View style={styles.contentSection}>
        <Text style={styles.titleText}>{slide.title}</Text>
        <Text style={styles.subtitleText}>{slide.subtitle}</Text>

        {/* Feature Pill Badges for Discover & Learn */}
        {slide.badges && slide.badges.length > 0 && (
          <View style={styles.badgesRow}>
            {slide.badges.map((badge, idx) => {
              const IconComponent = badge.icon;
              return (
                <View key={idx} style={styles.badgePill}>
                  <View style={styles.badgeIconCircle}>
                    <IconComponent size={14} color={Palette.moss} strokeWidth={2.2} />
                  </View>
                  <Text style={styles.badgePrimaryText}>{badge.label}</Text>
                  {badge.sublabel && (
                    <Text style={styles.badgeSecondaryText}>{badge.sublabel}</Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Footer: Pagination Dots & Next Button */}
      <View style={styles.footerSection}>
        {/* Pagination Dots */}
        <View style={styles.paginationRow}>
          {slides.map((_, idx) => {
            const isActive = idx === step;
            return (
              <View
                key={idx}
                style={[
                  styles.dot,
                  isActive ? styles.dotActive : styles.dotInactive,
                ]}
              />
            );
          })}
        </View>

        {/* Action Button */}
        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
        >
          <Text style={styles.actionButtonText}>
            {isLast ? "Get started" : "Next"}
          </Text>
          <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginLeft: 6 }} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F4", // Naturalist Canvas Paper (#FBF9F4)
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 8,
    height: 44,
  },
  stepIndicatorContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#E6EFEA", // Sage tint
  },
  stepIndicatorText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2C4A3E",
    letterSpacing: 0.5,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6E7773",
  },

  /* Visual Canvas Area */
  visualContainer: {
    flex: 1.15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 4,
  },
  centerArtWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Slide 1 - Welcome / Brand */
  spiderEmblemCard: {
    width: 170,
    height: 170,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#17211F",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#EAE6DE",
    marginBottom: 16,
  },
  welcomeLogo: {
    width: 120,
    height: 120,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  brandMain: {
    fontSize: 28,
    fontWeight: "900",
    color: "#17211F",
    letterSpacing: -0.8,
    fontFamily: Typography.display,
  },
  brandDot: {
    fontSize: 28,
    fontWeight: "900",
    color: "#E04836", // Coral red
    fontFamily: Typography.display,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6E7773",
    letterSpacing: 2.2,
    marginTop: 6,
  },

  /* Slide 2 - Discover */
  botanicalHeroCard: {
    width: width * 0.78,
    height: 220,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EAE6DE",
    shadowColor: "#2C4A3E",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
    position: "relative",
  },
  heroSpiderImage: {
    width: 210,
    height: 180,
  },
  speechBubble: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#E6EFEA",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D2E2D8",
  },
  speechBubbleText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2C4A3E",
    fontStyle: "italic",
  },

  /* Slide 3 - Identify (Camera) */
  scannerHeroCard: {
    width: width * 0.78,
    height: 220,
    borderRadius: 28,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  scannerBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  scannerReticle: {
    width: 130,
    height: 130,
    position: "relative",
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
    borderTopWidth: 3.5,
    borderLeftWidth: 3.5,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3.5,
    borderLeftWidth: 3.5,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3.5,
    borderRightWidth: 3.5,
    borderBottomRightRadius: 6,
  },
  shutterBadge: {
    position: "absolute",
    bottom: 14,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E04836",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E04836",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  /* Slide 4 - Learn */
  fieldJournalCard: {
    width: width * 0.78,
    height: 210,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderWidth: 1,
    borderColor: "#EAE6DE",
    shadowColor: "#17211F",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
    alignItems: "center",
    position: "relative",
  },
  journalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0ECE4",
    paddingBottom: 6,
  },
  journalLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#6E7773",
  },
  journalPin: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E04836",
  },
  journalSpiderImage: {
    width: 140,
    height: 120,
    marginTop: 4,
  },
  journalTag: {
    position: "absolute",
    bottom: 12,
    right: 14,
    backgroundColor: "#FBF9F4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAE6DE",
  },
  journalTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#3C4543",
  },
  handwrittenNote: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "700",
    color: "#2C4A3E",
    letterSpacing: 0.8,
  },

  /* Slide 5 - Ready */
  successCard: {
    width: width * 0.78,
    height: 220,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EAE6DE",
    shadowColor: "#17211F",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    gap: 16,
  },
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FDEBE7",
    alignItems: "center",
    justifyContent: "center",
  },
  readyEmblem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6EFEA",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  readyEmblemText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2C4A3E",
  },

  /* Narrative & Content Section */
  contentSection: {
    paddingHorizontal: 28,
    paddingVertical: 8,
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#17211F",
    textAlign: "center",
    lineHeight: 38,
    letterSpacing: -0.8,
    fontFamily: Typography.display,
  },
  subtitleText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6E7773",
    textAlign: "center",
    marginTop: 10,
    maxWidth: 320,
  },

  /* Feature Badges */
  badgesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    width: "100%",
  },
  badgePill: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAE6DE",
    minWidth: 84,
    shadowColor: "#17211F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  badgeIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E6EFEA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  badgePrimaryText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#17211F",
    textAlign: "center",
  },
  badgeSecondaryText: {
    fontSize: 11,
    color: "#6E7773",
    fontWeight: "500",
    marginTop: 1,
    textAlign: "center",
  },

  /* Footer Section */
  footerSection: {
    paddingHorizontal: 28,
    paddingBottom: 24,
    paddingTop: 10,
    gap: 16,
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
    width: 24,
    backgroundColor: "#E04836", // Coral active capsule indicator
  },
  dotInactive: {
    width: 6,
    backgroundColor: "#EAE6DE",
  },
  actionButton: {
    backgroundColor: "#E04836", // Coral primary
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E04836",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
  },
  actionButtonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
});
