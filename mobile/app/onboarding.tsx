import { router } from "expo-router";
import { Camera, BookOpen, Compass } from "lucide-react-native";
import { Image, ImageBackground } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Palette } from "@/constants/theme";
import { BrandLogo, ProgressDots } from "@/components/ui/branding";
import { OnboardingButton } from "@/components/ui/buttons";

const slides = [
  {
    eyebrow: "WELCOME TO redBack.ai",
    title: "Look closer.\nDiscover more.",
    body: "A curious field guide for the tiny creatures sharing your world.",
    icon: Compass,
    image: require("@/assets/images/spider-3d.png"),
  },
  {
    eyebrow: "IDENTIFY WITH CONFIDENCE",
    title: "Every spider\nhas a story.",
    body: "Take a photo and let our AI help you understand what you found.",
    icon: Camera,
    image: require("@/assets/images/spider-3d.png"),
  },
  {
    eyebrow: "LEARN & PROTECT",
    title: "Knowledge makes\nus kinder.",
    body: "Build your field notes, explore species, and learn how to share habitats safely.",
    icon: BookOpen,
    image: require("@/assets/images/spider-3d.png"),
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const slide = slides[step];
  const Icon = slide.icon;
  const isLast = step === slides.length - 1;

  const next = () =>
    isLast ? router.replace("/(auth)/login") : setStep((value) => value + 1);

  return (
    <ImageBackground
      source={require("@/assets/images/spider-bg.png")}
      contentFit="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.topbar}>
            <BrandLogo />
            <Pressable onPress={() => router.replace("/(auth)/login")}>
              <Text style={styles.skip}>Skip</Text>
            </Pressable>
          </View>
          <View style={styles.artArea}>
            <View style={styles.glow} />
            <Image
              source={slide.image}
              contentFit="contain"
              style={styles.spider}
            />
            <View style={styles.iconBadge}>
              <Icon size={22} color={Palette.paper} />
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.body}>{slide.body}</Text>
          </View>
          <View style={styles.footer}>
            <ProgressDots total={slides.length} active={step} />
            <OnboardingButton
              label={isLast ? "Get started" : "Continue"}
              onPress={next}
            />
            <Text style={styles.legal}>
              Educational identification only. Stay curious, stay safe.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(23, 33, 31, 0.84)" },
  safe: { flex: 1, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20 },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skip: { color: "#D6DED8", fontWeight: "700", fontSize: 14 },
  artArea: {
    flex: 1,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glow: {
    position: "absolute",
    width: 290,
    height: 290,
    borderRadius: 150,
    backgroundColor: "rgba(232, 75, 60, 0.14)",
  },
  spider: { width: 300, height: 300 },
  iconBadge: {
    position: "absolute",
    right: 18,
    bottom: 42,
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Palette.coral,
    borderWidth: 4,
    borderColor: "#536A5C",
  },
  content: { paddingBottom: 28 },
  eyebrow: {
    color: "#E9A299",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.7,
    marginBottom: 14,
  },
  title: {
    color: Palette.paper,
    fontSize: 40,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  body: {
    color: "#C7D1CA",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    maxWidth: 330,
  },
  footer: { paddingTop: 4 },
  legal: { color: "#95A79B", textAlign: "center", fontSize: 10, marginTop: 15 },
});
