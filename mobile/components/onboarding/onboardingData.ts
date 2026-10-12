export interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  image: any;
  type: "welcome" | "discover" | "identify" | "learn" | "ready";
}

export const slides: OnboardingSlide[] = [
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
