import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { slides } from "@/components/onboarding/onboardingData";
import { styles } from "@/components/onboarding/onboarding.styles";

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

        {/* 2. Seamless Gradient Fade to Canvas Paper */}
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

        {/* Footer: Pagination Dots + Tactile Action Button */}
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

          {/* Primary Action Button */}
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
