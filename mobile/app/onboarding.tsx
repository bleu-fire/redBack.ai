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
import * as Haptics from "expo-haptics";
import {
  ArrowRight,
} from "lucide-react-native";
import { Colors, Spacing, Radii } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  type: "welcome" | "discover" | "identify" | "learn" | "ready";
}

const slides: OnboardingSlide[] = [
  // 1. Welcome / Brand
  {
    id: 1,
    title: "Welcome,\nExplorer.",
    subtitle:
      "Your intelligent field companion to observe, identify, and explore wildlife safely.",
    image: require("@/assets/images/onboarding/slide1_welcome_art.png"),
    type: "welcome",
  },
  // 2. Discover
  {
    id: 2,
    title: "Discover Local\n& Global Species.",
    subtitle:
      "Explore regional biodiversity, habitats, and ecological behaviors on your trail.",
    image: require("@/assets/images/onboarding/slide2_discover_art.png"),
    type: "discover",
  },
  // 3. Identify (Camera Scanner)
  {
    id: 3,
    title: "Evidence-Based\nAI Identification.",
    subtitle:
      "Capture specimen traits with real-time macro guidance and verified certainty.",
    image: require("@/assets/images/onboarding/slide3_identify_art.png"),
    type: "identify",
  },
  // 4. Learn & Protect
  {
    id: 4,
    title: "Learn Anatomy\n& Stay Safe.",
    subtitle:
      "Understand venom significance, look-alike comparisons, and clinical first-aid rules.",
    image: require("@/assets/images/onboarding/slide4_learn_art.png"),
    type: "learn",
  },
  // 5. Ready
  {
    id: 5,
    title: "Turn Encounters\nInto Discovery.",
    subtitle:
      "Join curious naturalists, students, and hikers exploring the wild with confidence.",
    image: require("@/assets/images/onboarding/slide5_started_art.png"),
    type: "ready",
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const slide = slides[step];
  const isLast = step === slides.length - 1;

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isLast) {
      router.replace("/(auth)/login");
    } else {
      setStep((curr) => curr + 1);
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

        {/* Clean Reticle Brackets only for Step 3 (Identify) */}
        {slide.type === "identify" && (
          <View style={styles.scannerReticleOverlay} pointerEvents="none">
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
        )}

        {/* 2. Seamless Gradient Fade to Canvas Paper (Preserved exactly) */}
        <LinearGradient
          colors={[
            "rgba(250, 247, 242, 0)",
            "rgba(250, 247, 242, 0.25)",
            "rgba(250, 247, 242, 0.75)",
            "rgba(250, 247, 242, 0.96)",
            "#FAF7F2",
          ]}
          locations={[0, 0.38, 0.65, 0.88, 1]}
          style={styles.gradientOverlay}
          pointerEvents="none"
        />
      </View>

      {/* 3. Foreground Interactive Content */}
      <SafeAreaView style={styles.foregroundContainer} edges={["top", "bottom"]}>
        {/* Top Bar: Minimal step badge and Skip link */}
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
            <View style={{ width: 44 }} />
          )}
        </View>

        {/* Spacer that reveals artwork focal area */}
        <View style={styles.spacer} />

        {/* Narrative & Clean Information Content */}
        <View style={styles.contentSection}>
          <Text style={styles.titleText}>{slide.title}</Text>
          <Text style={styles.subtitleText}>{slide.subtitle}</Text>
        </View>

        {/* Footer: Pagination Dots (preserved) + Tactile Action Button */}
        <View style={styles.footerSection}>
          {/* Pagination Dots */}
          <View style={styles.paginationRow}>
            {slides.map((_, idx) => {
              const isActive = idx === step;
              return (
                <Pressable
                  key={idx}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setStep(idx);
                  }}
                  hitSlop={8}
                  style={[
                    styles.dot,
                    isActive ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              );
            })}
          </View>

          {/* Primary Action Button (Tactile Forest Green with arrow) */}
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={isLast ? "Get started" : "Next"}
          >
            <Text style={styles.actionButtonText}>
              {isLast ? "Get Started" : "Continue"}
            </Text>
            <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} style={styles.btnIcon} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
