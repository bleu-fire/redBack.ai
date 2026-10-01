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
  Globe2,
  BookOpen,
  Camera,
  BookMarked,
  ShieldCheck,
  Leaf,
  ArrowRight,
} from "lucide-react-native";
import { Palette, Typography } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

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
  image: any;
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
    image: require("@/assets/images/onboarding/slide1_welcome_art.png"),
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
    image: require("@/assets/images/onboarding/slide2_discover_art.png"),
    badges: [
      { icon: Leaf, label: "2,500+", sublabel: "Species" },
      { icon: Globe2, label: "Global", sublabel: "Habitats" },
      { icon: BookOpen, label: "Trusted", sublabel: "Knowledge" },
    ],
    type: "discover",
  },
  // 3. Identify (Camera Scanner)
  {
    id: 3,
    stepName: "Identify",
    title: "Identify with AI",
    subtitle:
      "Take a photo and let AI help you identify the spider in seconds.",
    image: require("@/assets/images/onboarding/slide3_identify_art.png"),
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
    image: require("@/assets/images/onboarding/slide4_learn_art.png"),
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
    image: require("@/assets/images/onboarding/slide5_started_art.png"),
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
    <View style={styles.container}>
      {/* 1. Full Top Background Artwork */}
      <View style={styles.headerBackground}>
        <Image
          source={slide.image}
          style={styles.backgroundImage}
          contentFit="cover"
          transition={300}
        />

        {/* Scanner Overlay for Step 3 */}
        {slide.type === "identify" && (
          <View style={styles.scannerReticleOverlay}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            <View style={styles.cameraShutterBadge}>
              <Camera size={22} color="#FFFFFF" strokeWidth={2.4} />
            </View>
          </View>
        )}

        {/* Step 4 Habitat Tag Badge */}
        {slide.type === "learn" && (
          <View style={styles.habitatPinBadge}>
            <Text style={styles.habitatPinText}>Habitat</Text>
          </View>
        )}

        {/* 2. Seamless Gradient Fade to Canvas Background */}
        <LinearGradient
          colors={[
            "rgba(251, 249, 244, 0)",
            "rgba(251, 249, 244, 0.2)",
            "rgba(251, 249, 244, 0.7)",
            "rgba(251, 249, 244, 0.95)",
            "#FBF9F4",
          ]}
          locations={[0, 0.4, 0.68, 0.88, 1]}
          style={styles.gradientOverlay}
          pointerEvents="none"
        />
      </View>

      {/* 3. Foreground Interactive Content */}
      <SafeAreaView style={styles.foregroundContainer} edges={["top", "bottom"]}>
        {/* Top Bar with Step counter and Skip */}
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

        {/* Spacer that reveals artwork focal area */}
        <View style={styles.spacer} />

        {/* Narrative & Information Content */}
        <View style={styles.contentSection}>
          {slide.callout && (
            <Text style={styles.calloutNoteText}>{slide.callout}</Text>
          )}
          <Text style={styles.titleText}>{slide.title}</Text>
          <Text style={styles.subtitleText}>{slide.subtitle}</Text>

          {/* Feature Badges for Discover & Learn */}
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

        {/* Footer: Numbered Step Pagination & Action Button */}
        <View style={styles.footerSection}>
          {/* Pagination Dots */}
          <View style={styles.paginationRow}>
            {slides.map((_, idx) => {
              const isActive = idx === step;
              return (
                <Pressable
                  key={idx}
                  onPress={() => setStep(idx)}
                  hitSlop={8}
                  style={[
                    styles.dot,
                    isActive ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              );
            })}
          </View>

          {/* Primary Action Button */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F4", // Naturalist Canvas Paper (#FBF9F4)
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.52,
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
    height: "70%",
  },
  foregroundContainer: {
    flex: 1,
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
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(234, 230, 222, 0.7)",
  },
  stepIndicatorText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2C4A3E",
    letterSpacing: 0.5,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    borderWidth: 1,
    borderColor: "rgba(234, 230, 222, 0.7)",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6E7773",
  },
  spacer: {
    flex: 1,
    minHeight: height * 0.18,
  },

  /* Scanner Reticle Overlay for Step 3 */
  scannerReticleOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#FFFFFF",
  },
  cornerTL: {
    top: 35,
    left: 45,
    borderTopWidth: 3.5,
    borderLeftWidth: 3.5,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: 35,
    right: 45,
    borderTopWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: 50,
    left: 45,
    borderBottomWidth: 3.5,
    borderLeftWidth: 3.5,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: 50,
    right: 45,
    borderBottomWidth: 3.5,
    borderRightWidth: 3.5,
    borderBottomRightRadius: 6,
  },
  cameraShutterBadge: {
    position: "absolute",
    bottom: 36,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E04836",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  /* Step 4 Habitat Tag */
  habitatPinBadge: {
    position: "absolute",
    bottom: 32,
    right: 24,
    backgroundColor: "#FFF9EE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0E4CE",
  },
  habitatPinText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#6E5B3E",
  },

  calloutNoteText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#2C4A3E",
    letterSpacing: 0.5,
    fontStyle: "italic",
  },

  /* Narrative & Content Section */
  contentSection: {
    paddingHorizontal: 28,
    paddingVertical: 8,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#17211F",
    textAlign: "center",
    lineHeight: 36,
    letterSpacing: -0.8,
    fontFamily: Typography.display,
  },
  subtitleText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6E7773",
    textAlign: "center",
    marginTop: 8,
    maxWidth: 320,
  },

  /* Feature Badges */
  badgesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    width: "100%",
  },
  badgePill: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 80,
  },
  badgeIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E6EFEA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  badgePrimaryText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#17211F",
    textAlign: "center",
  },
  badgeSecondaryText: {
    fontSize: 10,
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
    gap: 14,
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
    width: 20,
    backgroundColor: "#E04836", // Coral active capsule indicator
  },
  dotInactive: {
    width: 6,
    backgroundColor: "#D6D0C5", // Subtle dot indicator
  },
  actionButton: {
    backgroundColor: "#E04836", // Coral primary
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
