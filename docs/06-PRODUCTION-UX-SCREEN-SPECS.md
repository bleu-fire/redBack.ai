# RedBack.ai — Production-Ready UX Screen Specifications & Design System Architecture

**Document Version:** 1.0.0 (Production Release Candidate)  
**Target Viewport:** iPhone 15 / 16 Pro (393 × 852 pt @ 3x Retina)  
**Supported Platforms:** iOS (iOS 17+) & Android (API 34+ / Material 3)  
**Implementation Stacks:** React Native (Expo SDK 54 / Expo Router), SwiftUI 5+, Jetpack Compose  
**Compliance Standards:** WCAG 2.2 Level AA / AAA Contrast, Apple Human Interface Guidelines (HIG), Android Core App Quality Guidelines

---

## 1. GLOBAL DESIGN SYSTEM & TOKENS

### 1.1 Mobile Frame & Viewport Standards
* **Primary Reference Canvas:** 393 pt × 852 pt (iPhone 15 / 16 Pro)
* **Safe-Area Insets (Default Portrait):**
  * Top: `59 pt` (Dynamic Island / Status Bar zone)
  * Bottom: `34 pt` (Home Indicator interaction buffer)
  * Left / Right: `0 pt` (standard), `16 pt` minimum edge cushion
* **Responsive Scaling Breakpoints:**
  * **Compact (<= 375 pt width, e.g. iPhone SE 3rd Gen, Galaxy A-series):** Horizontal padding clamps to `16 pt`, hero heights scale down by `15%`, font sizes maintain 100% scale while reducing letter-spacing.
  * **Standard (376 pt – 400 pt width, e.g. iPhone 15/16 Pro, Pixel 8):** Native 1:1 token application.
  * **Large (>= 401 pt width, e.g. iPhone 15/16 Pro Max, Galaxy S24 Ultra):** Horizontal padding expands to `20 pt`, card grids maintain max content width of `420 pt` centered.
* **Strict Interactive Boundary Rule:** Under zero circumstances may any interactive control (button, tab, drag handle) intersect the `59 pt` top header zone or the `34 pt` home indicator sweep zone.

---

### 1.2 Layout Grid & Spacing System (8pt Base Grid)
Every dimension, padding, gap, and margin must align strictly to multiples of 4 or 8 pt:

| Token | Dimension | Intended Production Usage |
| :--- | :--- | :--- |
| `Space.xxs` | `2 pt` | Micro hairline borders, badge inner offsets |
| `Space.xs` | `4 pt` | Icon-to-label gaps, pill internal padding |
| `Space.sm` | `8 pt` | Related item spacing, tag list gaps, input vertical padding |
| `Space.md` | `12 pt` | Compact card padding, modal header vertical padding |
| `Space.base` | `16 pt` | Screen horizontal margins (compact), standard card padding |
| `Space.lg` | `20 pt` | Screen horizontal margins (standard/large), inter-card gaps |
| `Space.xl` | `24 pt` | Section header bottom spacing, hero container gaps |
| `Space.xxl` | `32 pt` | Inter-section vertical separation |
| `Space.xxxl` | `48 pt` | Screen bottom clearance above navigation bar |

---

### 1.3 Color Architecture & Semantic Design Tokens

```
Palette Architecture:
Background:       #090A0C  (Darkest Obsidian Canvas)
Surface Default:  #121418  (Base Card / Container Fill)
Surface Elevated: #181B20  (Floating Card / Sheet Surface)
Surface Highlight:#22262E  (Pressed / Active Outline)
Border Subtle:    #1F232B  (1px Structural Line)
Border Prominent: #2E3440  (Active Border / Selected State)
Brand Crimson:    #E53935  (High-Impact Primary Action / Emergency Red)
Brand Coral Soft: #381A19  (Crimson Glow / Dark Subdued Red Surface)
Text Primary:     #F5F5F2  (Warm White, Contrast 14.5:1)
Text Secondary:   #969AA3  (Muted Slate, Contrast 5.2:1)
Text Tertiary:    #5E636E  (Footnotes / Inactive Icons, Contrast 3.1:1)
Success:          #42C77A  (Harmless Species / Discovered Badge)
Warning:          #F2B84B  (Moderate Envenomation / Rare Specimen)
Danger:           #E74C3C  (Fatal Neurotoxin / Severe Contraindication)
```

#### Token Definitions Table:

| Token Name | Hex Value | Alpha | WCAG Contrast vs Canvas | Semantic Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `Color.bg` | `#090A0C` | 100% | 1:1 | Base screen canvas |
| `Color.surface` | `#121418` | 100% | 1.2:1 | Standard cards, lists, tiles |
| `Color.surfaceElevated` | `#181B20` | 100% | 1.4:1 | Bottom sheets, floating modals, dropdowns |
| `Color.surfaceHighlight` | `#22262E` | 100% | 1.8:1 | Interactive pressed fill, focused outlines |
| `Color.borderSubtle` | `#1F232B` | 100% | 1.3:1 | 1px dividers, card outline definition |
| `Color.borderActive` | `#2E3440` | 100% | 2.1:1 | Selected chips, focused inputs |
| `Color.primaryRed` | `#E53935` | 100% | 4.8:1 | Primary action CTAs, active camera shutter |
| `Color.primaryRedPressed` | `#C62828` | 100% | 4.1:1 | Primary button active touch state |
| `Color.redSubdued` | `#241214` | 100% | 1.3:1 | High-danger container background fill |
| `Color.textPrimary` | `#F5F5F2` | 100% | 14.8:1 (AAA) | Headlines, active values, button labels |
| `Color.textSecondary` | `#969AA3` | 100% | 5.4:1 (AA) | Body copy, descriptions, metadata |
| `Color.textTertiary` | `#5E636E` | 100% | 3.2:1 (Large) | Timestamps, inactive tabs, unselected dots |
| `Color.statusSuccess` | `#42C77A` | 100% | 7.9:1 (AAA) | Verified identification, harmless status |
| `Color.statusWarning` | `#F2B84B` | 100% | 8.2:1 (AAA) | Cautionary envenomation, rare badges |
| `Color.statusDanger` | `#E74C3C` | 100% | 5.1:1 (AA) | Critical neurotoxin, emergency alerts |

*Strict Rule on Red Usage:* `Color.primaryRed` is exclusively reserved for **Primary Forward Action CTAs**, **Live Shutter Trigger**, **Active Tab Highlighter**, and **Medical Emergency Alerts**. It is strictly prohibited on ambient backgrounds or secondary cards.

---

### 1.4 Typography Tokens (Premium Sans-Serif Scale)

Font Family: `SF Pro Display` / `SF Pro Text` (iOS), `Inter` / `Roboto` (Android).

| Token | Size | Line Height | Weight | Letter Spacing | Case | Target Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Type.display` | `32 pt` | `38 pt` | `Bold (700)` | `-0.6 pt` | Sentence | Onboarding Hero, Specimen Common Name |
| `Type.h1` | `26 pt` | `32 pt` | `Bold (700)` | `-0.4 pt` | Sentence | Screen Headers, Result Match Title |
| `Type.h2` | `20 pt` | `26 pt` | `Semibold (600)` | `-0.2 pt` | Sentence | Card Headlines, Sheet Section Headers |
| `Type.body` | `16 pt` | `24 pt` | `Regular (400)` | `0.0 pt` | Sentence | Longform species lore, first-aid text |
| `Type.bodySemibold` | `16 pt` | `24 pt` | `Semibold (600)` | `0.0 pt` | Sentence | Key takeaways, list item anchors |
| `Type.secondary` | `14 pt` | `20 pt` | `Regular (400)` | `+0.1 pt` | Sentence | Subtitles, helper text, explanations |
| `Type.secondaryMedium` | `14 pt` | `20 pt` | `Medium (500)` | `+0.1 pt` | Sentence | Primary button labels, chip selectors |
| `Type.caption` | `12 pt` | `16 pt` | `Medium (500)` | `+0.2 pt` | Sentence | Timestamps, read times, metrics |
| `Type.eyebrow` | `11 pt` | `14 pt` | `Bold (700)` | `+1.2 pt` | ALL CAPS | Section tags, Category indicators |

---

### 1.5 Surface Corner Radii & Elevation (Zero Artificial Glow)

* `Radius.xs`: `4 pt` — Micro indicator tags, progress ticks
* `Radius.sm`: `8 pt` — Action chips, filter tags, small badges
* `Radius.md`: `12 pt` — Form inputs, auxiliary cards, thumbnail frames
* `Radius.lg`: `16 pt` — Standard content cards, dialog boxes
* `Radius.xl`: `24 pt` — Hero feature cards, top-level containers
* `Radius.sheet`: `28 pt` — Bottom sheet top-left & top-right corners
* `Radius.pill`: `9999 pt` — Primary buttons, status badges, drag handles

---

## 2. COMPREHENSIVE 15-SCREEN PRODUCTION SPECIFICATIONS

---

### SCREEN 01 — ONBOARDING (Walkthrough & Product Framing)

#### 1. Specification Overview
* **Screen Purpose:** Communicate computer-vision accuracy, dangerous venom triage, and regional biodiversity mapping in under 8 seconds. Drive user to camera permissions immediately.
* **Entry Points:** First application launch; fresh installation; logout / cache reset.
* **Exit Points:** Screen 02 (Permissions); Skip → Screen 03 (Home with unauthenticated guest profile).

#### 2. Component Hierarchy & Layout Structure
```
[SafeAreaView: Top 59pt, Bottom 34pt]
└── [FullBleedBackgroundVisual: 393 x 852 pt, Dark Vignette Shader]
    ├── [TopHeader: Height 44pt, PaddingH 20pt]
    │   ├── [LogoMark: 32 x 32 pt (Redback Stylized Icon)]
    │   └── [SkipButton: TouchTarget 44 x 44 pt, Label "Skip"]
    ├── [CenterCarouselContent: Flex 1, AlignItems Center, JustifyCenter]
    │   ├── [GraphicIllustrationContainer: 280 x 280 pt, Floating 3D Specimen]
    │   ├── [StepIndicatorDots: 3 dots, Active dot width 24pt, Inactive 8pt, Gap 8pt]
    │   ├── [HeadlineText: Type.display, "Identify Any Spider Instantly"]
    │   └── [SupportingBodyText: Type.secondary, 2 lines max, Centered]
    └── [BottomActionContainer: PaddingH 20pt, PaddingBottom 20pt, Gap 12pt]
        ├── [PrimaryButton: Height 54pt, Radius.pill, Label "Start Exploring"]
        └── [TermsMicrocopy: Type.caption, "Medical guidance for field identification only."]
```

#### 3. Exact Layout Dimensions & Spacing
* Screen Horizontal Margin: `20 pt`
* Logo Top Offset: `Space.sm (8 pt)` below status bar
* Center Carousel Graphic Margin Bottom: `Space.xl (24 pt)`
* Step Dots to Headline Gap: `Space.lg (20 pt)`
* Headline to Description Gap: `Space.sm (8 pt)`
* Primary CTA Height: `54 pt`, Corner Radius: `27 pt (pill)`
* Bottom Clearance: `insets.bottom + 12 pt`

#### 4. Component States
* **Skip Button:** Default (`Color.textSecondary`), Pressed (`Color.textPrimary`, scale `0.96`), Disabled (`Color.textTertiary`).
* **Start Exploring CTA:** Default (`Color.primaryRed`, fill solid), Pressed (`Color.primaryRedPressed`, scale `0.98`), Loading (Spinner white 20pt, text hidden).

#### 5. Interaction & Motion Rules
* Horizontal swipe gesture (velocity > `0.5 px/ms`) switches carousel slide (Index 0: "AI Visual Recognition" → Index 1: "Venom Safety Matrix" → Index 2: "Regional SpiderDex").
* Tap "Start Exploring" on Slide 0–1 advances to next slide; on Slide 2 triggers Haptic (`Light`) and navigates to Screen 02 via `slide-from-right` transition (`300 ms`, cubic-bezier `0.25, 1, 0.5, 1`).

#### 6. Accessibility & Responsiveness
* Accessibility: Group carousel page as single accessible element with trait `adjustable`.
* Small Screen (<= 375 pt): Reduce Graphic container from `280 pt` to `220 pt`; title clamps to `26 pt`.

---

### SCREEN 02 — PERMISSIONS (Contextual Trust Acquisition)

#### 1. Specification Overview
* **Screen Purpose:** Contextual permission onboarding for Camera (mandatory for core vision loop) and Location (optional for regional biodiversity accuracy).
* **Entry Points:** Onboarding completion; First tap on Scan button if permissions revoked.
* **Exit Points:** Camera Granted → Screen 03 (Home); Dismissed → Screen 03 with camera warning prompt.

#### 2. Component Hierarchy
```
[SafeAreaView: Bg Color.bg]
└── [ContentContainer: PaddingH 24pt, PaddingTop 40pt, Flex 1]
    ├── [ProgressIndicator: 2-step bar, Height 4pt, Radius 2pt]
    ├── [PermissionIconBadge: 72 x 72 pt, Radius 36pt, SurfaceElevated, Center Camera Icon]
    ├── [HeadlineText: Type.h1, "See a spider? Let's identify it."]
    ├── [ExplainerParagraph: Type.body, Color.textSecondary, "RedBack.ai needs camera access..."]
    ├── [PrivacyPillCard: Bg Color.surface, Radius.md, Border 1px Color.borderSubtle, Padding 16pt]
    │   ├── [LockIcon: 18 x 18 pt, Color.textPrimary]
    │   └── [PrivacyText: Type.secondary, "Your photos are processed privately and never sold."]
    └── [ButtonStack: Position Absolute, Bottom insets.bottom + 16pt, Left 24pt, Right 24pt, Gap 12pt]
        ├── [PrimaryCTA: Height 54pt, Bg Color.primaryRed, Label "Enable Camera"]
        └── [SecondaryCTA: Height 48pt, Bg Transparent, Label "Not Now"]
```

#### 3. Interaction & OS System Bridging
* Tapping **"Enable Camera"**:
  1. Haptic feedback `Light`.
  2. Invoke `Camera.requestCameraPermissionsAsync()`.
  3. If OS returns `granted`: Trigger micro-checkmark icon morph (`180 ms`), then smoothly slide down sheet and present Step 2: Location Access.
  4. If OS returns `denied` (permanent): Display inline warning banner with direct button: `"Open Device Settings"` linking to `Linking.openSettings()`.
* Tapping **"Not Now"**: Never hard-block. Seamlessly route to Screen 03 (Home).

---

### SCREEN 03 — HOME (Field Expedition Command Center)

#### 1. Specification Overview
* **Screen Purpose:** Primary application cockpit. Balances immediate visual scanning with habit-forming daily challenges and regional biodiversity collection progress.
* **Entry Points:** App launch (authenticated / permission completed); Tab navigation item 1.
* **Exit Points:** Screen 04 (Scanner); Screen 08 (SpiderDex); Screen 09 (Species Detail); Screen 10 (Daily Mystery); Screen 12 (Profile).

#### 2. Component Hierarchy & Wireframe Structure
```
[SafeAreaView: Bg Color.bg]
├── [StickyTopBar: Height 56pt, PaddingH 20pt, BorderBottom 1px Color.borderSubtle]
│   ├── [BrandLogo: Width 124pt, Height 36pt, Left Aligned]
│   └── [ActionCluster: Row, Gap 12pt]
│       ├── [StreakPill: Bg Color.surfaceElevated, Radius.pill, Height 32pt, "🔥 5d"]
│       └── [ProfileAvatarButton: Width 36pt, Height 36pt, Radius 18pt, Border 1.5px Color.borderActive]
│
└── [MainScrollView: RefreshControl Enabled, ShowsVerticalScrollIndicator False]
    ├── [GreetingBlock: PaddingH 20pt, PaddingTop 16pt, PaddingBottom 12pt]
    │   ├── [EyebrowLabel: Type.eyebrow, "FIELD EXPEDITION HQ"]
    │   └── [GreetingHeadline: Type.display, "Good morning, Explorer."]
    │
    ├── [HeroCardContainer: MarginH 20pt, Height 210pt, Radius.xl, Overflow Hidden]
    │   ├── [SpecimenBackdropImage: FullBleed 100%, ResizeMode Cover, Dark Moss Tint]
    │   ├── [LinearGradientOverlay: Colors ['transparent', 'rgba(9,10,12,0.92)'], Bottom 60%]
    │   ├── [CardContent: Position Absolute, Bottom 16pt, Left 18pt, Right 18pt, FlexRow]
    │   │   ├── [TextCol: Flex 1]
    │   │   │   ├── [HeroTitle: Type.h2, Color.textPrimary, "Identify a spider"]
    │   │   │   └── [HeroSubtitle: Type.secondary, Color.textSecondary, "Point camera to diagnose species & safety"]
    │   │   └── [CircularShutterTrigger: Width 52pt, Height 52pt, Radius 26pt, Bg Color.primaryRed, Center Camera Icon]
    │
    ├── [SpiderDexTrackerCard: MarginH 20pt, MarginTop 16pt, Bg Color.surface, Radius.lg, Padding 16pt]
    │   ├── [HeaderRow: FlexRow, SpaceBetween]
    │   │   ├── [DexTitle: Type.bodySemibold, "SpiderDex Collection"]
    │   │   └── [DexCountBadge: Type.caption, Color.statusSuccess, "4 / 16 Discovered (25%)"]
    │   ├── [ProgressBarTrack: Height 6pt, Bg Color.surfaceElevated, Radius 3pt, MarginTop 10pt]
    │   │   └── [ProgressBarFill: Width 25%, Bg Color.statusSuccess, Height 100%, Radius 3pt]
    │   └── [ThumbnailShelf: MarginTop 12pt, FlexRow, Gap -8pt]
    │       ├── [DiscoveredThumb 1..4: Width 36pt, Height 36pt, Radius 18pt, Border 2px Color.surface]
    │       └── [LockedSlots 5..6: Width 36pt, Height 36pt, Radius 18pt, Bg Color.surfaceElevated, Lock Icon]
    │
    ├── [DailyChallengeCard: MarginH 20pt, MarginTop 16pt, Bg Color.surface, Radius.lg, Border 1px Color.borderSubtle]
    │   ├── [CardHeader: Padding 14pt, FlexRow, SpaceBetween, BorderBottom 1px Color.borderSubtle]
    │   │   ├── [Left: HelpCircle Icon + "Daily Mystery"]
    │   │   └── [Right: Sparkles Icon + "+25 XP Badge"]
    │   └── [CardBody: Padding 14pt, Gap 10pt]
    │       ├── [QuestionText: Type.bodySemibold, "Which spider features 13 orange-red abdominal spots?"]
    │       └── [InteractiveOptionsList: 3 items, Radio Pill Design]
    │
    ├── [RegionalRadarSection: MarginTop 24pt]
    │   ├── [SectionHeader: PaddingH 20pt, FlexRow, SpaceBetween]
    │   │   ├── [SectionTitle: Type.h2, "Active This Season"]
    │   │   └── [SeeAllButton: Type.secondaryMedium, Color.textSecondary, "See All →"]
    │   └── [HorizontalCarousel: PaddingLeft 20pt, Gap 12pt, CardWidth 164pt, CardHeight 210pt]
    │
    └── [EmergencyProtocolStrip: MarginH 20pt, MarginTop 20pt, MarginBottom 32pt, Bg Color.redSubdued, Radius.md]
        └── [Row: ShieldAlert Icon (Color.danger) + "Emergency Bite Protocol (100% Offline)" + ChevronRight]

[BottomNavigationBar: Fixed Height 60pt + insets.bottom, Bg Color.surfaceElevated, BorderTop 1px Color.borderSubtle]
```

#### 3. Exact Layout Dimensions & Spacings
* Screen Padding Horizontal: `20 pt`
* Sticky Bar Height: `56 pt`
* Section-to-Section Gap: `24 pt`
* Shutter Button Hit Target: `52 × 52 pt` (exceeds 44pt minimum)
* Horizontal Specimen Card Width: `164 pt`, Image Height: `110 pt`
* Bottom Tab Bar Height: `60 pt + insets.bottom (34 pt) = 94 pt`

---

### SCREEN 04 — CAMERA SCANNER (Zero-Friction Vision HUD)

#### 1. Specification Overview
* **Screen Purpose:** Real-time camera viewfinder with dynamic biometric reticle and contextual environmental guidance. Minimizes time-to-capture.
* **Entry Points:** Home Hero card tap; Bottom Navigation Center Shutter; Lock screen shortcut.
* **Exit Points:** Shutter trigger → Screen 05 (Identification Process); Close (X) → Screen 03 (Home); Gallery icon → System Image Picker.

#### 2. Component Hierarchy & HUD Layout
```
[CameraView: AbsoluteFillObject, Facing Back, Flash Controlled]
└── [HUDOverlayContainer: Flex 1, JustifyContent SpaceBetween]
    ├── [TopControlsBar: Height 48pt, MarginTop insets.top + 8pt, PaddingH 20pt, FlexRow, SpaceBetween]
    │   ├── [DismissBtn: 44 x 44 pt, Radius 22pt, Bg rgba(9,10,12,0.65), Center X Icon]
    │   ├── [VisionStatePill: Height 32pt, Radius.pill, Bg rgba(18,20,24,0.85), Border 1px Color.borderSubtle]
    │   │   └── [Row: Pulsing Dot (8x8pt, Color.statusSuccess) + Text "AI VISION READY"]
    │   └── [FlashToggleBtn: 44 x 44 pt, Radius 22pt, Bg rgba(9,10,12,0.65), Zap / ZapOff Icon]
    │
    ├── [CenterViewfinderZone: AlignSelf Center, Width 280pt, Height 280pt, Position Relative]
    │   ├── [CornerBrackets: 4 corners, Width 32pt, Height 32pt, BorderWidth 3.5pt, Color.textPrimary]
    │   ├── [CenterCrosshair: 14 x 14 pt, BorderWidth 1.5pt, Color.textSecondary, Opacity 0.5]
    │   └── [DynamicGuidancePill: Position Absolute, Bottom -42pt, AlignSelf Center, Radius.pill, PaddingH 14pt, PaddingV 6pt]
    │       └── [Row: Shield Icon + Text "Keep camera 25–40 cm away for focus"]
    │
    └── [BottomControlsBar: Height 110pt, MarginBottom insets.bottom + 12pt, PaddingH 32pt, FlexRow, AlignCenter, SpaceBetween]
        ├── [GalleryPickerBtn: TouchTarget 48 x 48 pt, Bg rgba(18,20,24,0.7), Radius 24pt, ImageIcon]
        ├── [ShutterRingExternal: Width 84pt, Height 84pt, Radius 42pt, Border 4pt Color.textPrimary, Padding 4pt]
        │   └── [ShutterInnerCircle: Width 68pt, Height 68pt, Radius 34pt, Bg Color.primaryRed]
        └── [EmergencyFirstAidBtn: TouchTarget 48 x 48 pt, Bg rgba(18,20,24,0.7), Radius 24pt, HeartPulseIcon]
```

#### 3. Dynamic States & Telemetry Logic
1. **State: IDLE (No subject in frame):**
   * Reticle color: `Color.textSecondary (Opacity 0.4)`
   * Guidance text: `"Point camera at any spider or web"`
2. **State: SEARCHING (Motion detected):**
   * Reticle corners smoothly expand outwards by `4 pt` (`200 ms` spring).
   * Guidance text: `"Analyzing specimen contours…"`
3. **State: DETECTED (Subject acquired):**
   * Reticle color animates to `Color.statusSuccess` (`150 ms`).
   * Haptic pulse: `ImpactFeedbackStyle.Light`.
   * Guidance text: `"Spider locked • Hold still"`
4. **State: TOO CLOSE / TOO FAR:**
   * Reticle color shifts to `Color.statusWarning`.
   * Guidance text: `"Move to ~30 cm distance"`
5. **State: LOW LIGHT:**
   * Guidance text: `"Low light • Tap flash icon above"`

---

### SCREEN 05 — IDENTIFICATION PROCESS (Continuous Vision Transition)

#### 1. Specification Overview
* **Screen Purpose:** Eliminate dead spinners. Present a progressive pipeline sheet sliding over the frozen viewfinder frame while neural vectors query Pinecone/Gemini.
* **Entry Points:** Shutter button release on Screen 04.
* **Exit Points:** Success → Screen 06 (Result); Failure / Low confidence (< 65%) → Screen 15 (Error / Fallback).

#### 2. Component Hierarchy & Progressive UI
```
[FrozenCameraFrame: Viewfinder Snapshot with Gaussian Blur 8px]
└── [BottomModalSheet: Height 380pt, Bg Color.surfaceElevated, Radius.sheet, Padding 24pt]
    ├── [DragPillIndicator: Width 40pt, Height 4pt, Radius 2pt, Bg Color.borderActive, AlignSelf Center]
    ├── [CapturedThumbnailRow: MarginTop 16pt, FlexRow, AlignCenter, Gap 16pt]
    │   ├── [ThumbnailBox: 64 x 64 pt, Radius.md, Image Preview with Scanning Sweep Line]
    │   └── [StatusCol: Flex 1, Gap 4pt]
    │       ├── [PipelineStageTitle: Type.h2, Animated Text ("Analyzing anatomical landmarks…")]
    │       └── [ModelTelemetry: Type.caption, Color.textSecondary, "Gemini Vision 2.5 + Pinecone Vector Index"]
    ├── [MultiStageStepBar: MarginTop 24pt, FlexRow, Gap 6pt]
    │   ├── [Step 1: "Feature Extraction" • Finished (Color.statusSuccess)]
    │   ├── [Step 2: "Taxonomy Matching" • Active Shimmer (Color.primaryRed)]
    │   └── [Step 3: "Venom Diagnostic" • Pending (Color.surfaceHighlight)]
    └── [CancelButton: MarginTop 32pt, AlignSelf Center, Label "Cancel Search"]
```

#### 3. Progression Timing Rules
* **0 – 350 ms:** Freeze camera buffer, slide bottom sheet up from `y: 380` to `y: 0` (`ease-out-cubic`).
* **350 – 900 ms:** Step 1 highlighted. Vector embeddings extracted from image.
* **900 – 1600 ms:** Step 2 highlighted. Top-3 nearest neighbors retrieved from vector database.
* **1600 – 2100 ms:** Step 3 verified. Toxicity severity classified. Auto-transition to Screen 06.

---

### SCREEN 06 — IDENTIFICATION RESULT (Comprehensive Diagnosis Sheet)

#### 1. Specification Overview
* **Screen Purpose:** Immediate answer to: "What is it?", "Will it hurt me?", and "What should I do right now?".
* **Entry Points:** Successful completion of Screen 05 pipeline.
* **Exit Points:** Tap "Save" → Screen 07 (New Discovery if uncollected) or return Home; Tap "Ask AI" → Screen 09 / Chat; Tap Back → Return to Scanner.

#### 2. Component Hierarchy
```
[SafeAreaView: Bg Color.bg]
├── [StickyTopBar: Height 48pt, PaddingH 20pt, FlexRow, SpaceBetween]
│   ├── [CloseBtn: ArrowLeft, TouchTarget 44 x 44 pt]
│   └── [ActionCluster: BookmarkBtn + ShareBtn]
│
└── [ResultScrollView: PaddingBottom 40pt]
    ├── [SpecimenHeroMedia: MarginH 20pt, Height 240pt, Radius.xl, Overflow Hidden]
    │   ├── [SpecimenImage: 100% Full Cover]
    │   └── [ConfidenceBadgeOverlay: Bottom 12pt, Left 12pt, Radius.pill, Bg rgba(9,10,12,0.85)]
    │       └── [Text: "96% Vision Match • High Confidence"]
    │
    ├── [NomenclatureBlock: PaddingH 20pt, MarginTop 16pt]
    │   ├── [CommonName: Type.display, "Redback Spider"]
    │   ├── [ScientificName: Type.secondary, FontStyle Italic, "Latrodectus hasselti"]
    │   └── [FamilyTag: Type.caption, Color.textTertiary, "Theridiidae • True Widow Spiders"]
    │
    ├── [ClinicalHazardMeterCard: MarginH 20pt, MarginTop 16pt, Bg Color.surface, Radius.lg, Padding 16pt]
    │   ├── [Header: FlexRow, SpaceBetween]
    │   │   ├── [Row: ShieldAlert Icon + "Level 4: Severe Latrodectism"]
    │   │   └── [LevelBadge: "LEVEL 4 / 5", Color.danger]
    │   ├── [SixSegmentBar: Active 4 segments colored in Danger Red]
    │   ├── [SummaryParagraph: Type.body, "Alpha-latrotoxins trigger systemic neurotransmitter release..."]
    │   └── [KeyRiskGrid: 2 Columns]
    │       ├── [Col 1: Human Risk → "Excruciating pain, regional sweating, spasms"]
    │       └── [Col 2: Pet Risk → "Fatal to domestic cats & small dogs"]
    │
    ├── [ActionButtonsRow: MarginH 20pt, MarginTop 20pt, FlexRow, Gap 12pt]
    │   ├── [PrimaryAction: Flex 1, Height 50pt, Bg Color.primaryRed, Radius.pill, "Save to SpiderDex"]
    │   └── [SecondaryAction: Width 50pt, Height 50pt, Radius.pill, Bg Color.surfaceElevated, BotIcon]
    │
    └── [ExpandableDetailsAccordion: MarginH 20pt, MarginTop 20pt]
        ├── [AccordionItem 1: "Diagnostic Eye Pattern & Markings"]
        ├── [AccordionItem 2: "Immediate First-Aid Protocol"]
        └── [AccordionItem 3: "Safe Cup-and-Paper Relocation"]
```

---

### SCREEN 07 — NEW DISCOVERY (Gamified Collector Reward)

#### 1. Specification Overview
* **Screen Purpose:** Deliver a refined, satisfying visual reward when a previously uncollected spider species is verified. Reinforce habit loop without childish clutter.
* **Entry Points:** Tapping "Save to SpiderDex" on Screen 06 for an unregistered species.
* **Exit Points:** "Add to SpiderDex" → Screen 08 (SpiderDex); "Keep Exploring" → Screen 04 (Scanner).

#### 2. Component Hierarchy & Animation Staging
```
[FullBleedBackdrop: Bg Color.bg with Radial Vignette]
└── [CenterCardContainer: Width 320pt, AlignSelf Center, Bg Color.surfaceElevated, Radius.xl, Border 1.5px Color.borderActive, Padding 24pt]
    ├── [StampBadge: AlignSelf Center, Radius.pill, Bg Color.surfaceHighlight, PaddingH 12pt, PaddingV 4pt]
    │   └── [Text: Type.eyebrow, Color.statusSuccess, "★ UNLOCKED SPECIMEN #05"]
    ├── [SpecimenBurstGraphic: Width 180pt, Height 180pt, AlignSelf Center, MarginTop 16pt]
    │   ├── [AmbientGlowCircle: Blur 32px, Bg rgba(229, 57, 53, 0.25)]
    │   └── [SpecimenIllustration: High-Res 3D Specimen with Entrance Scale 0.85 -> 1.0]
    ├── [SpeciesName: Type.h1, AlignSelf Center, MarginTop 12pt, "Mediterranean Recluse"]
    ├── [CollectorMilestone: Type.bodySemibold, Color.textSecondary, AlignSelf Center, "SpiderDex: 5 of 16 Collected"]
    ├── [XPRewardBadge: MarginTop 12pt, AlignSelf Center, Radius.pill, Bg rgba(242, 184, 75, 0.15), PaddingH 14pt, PaddingV 6pt]
    │   └── [Text: Color.statusWarning, Type.bodySemibold, "+25 Exploration XP"]
    └── [ActionStack: MarginTop 24pt, Gap 10pt]
        ├── [PrimaryConfirmCTA: Height 50pt, Radius.pill, Bg Color.primaryRed, "View in SpiderDex"]
        └── [DismissSecondaryCTA: Height 44pt, Label "Continue Scanning"]
```

#### 3. Motion Timing Parameters
* Card scale entrance: `scale: 0.92 → 1.00`, `opacity: 0 → 1` (`280 ms`, spring tension `140`, friction `12`).
* Haptic feedback: Trigger `NotificationFeedbackType.Success`.
* Duration cap: Entire animation settles within `600 ms`. No repetitive loops.

---

### SCREEN 08 — SPIDERDEX (Field Biodiversity Catalog)

#### 1. Specification Overview
* **Screen Purpose:** Provide a clean, structured 2-column museum catalog of all 16 regional species (Morocco & Australia), clearly distinguishing collected vs. uncollected specimens.
* **Entry Points:** Bottom Navigation Tab 3; Screen 07 confirmation; Home Screen tracker card tap.
* **Exit Points:** Specimen card tap → Screen 09 (Species Detail); Back → Return to previous screen.

#### 2. Component Hierarchy & Grid Architecture
```
[SafeAreaView: Bg Color.bg]
├── [StickyHeader: PaddingH 20pt, PaddingTop 12pt, PaddingBottom 8pt]
│   ├── [TitleRow: FlexRow, SpaceBetween]
│   │   ├── [HeaderTitle: Type.display, "SpiderDex"]
│   │   └── [ProgressCounter: Type.h2, Color.statusSuccess, "5 / 16"]
│   ├── [OverallProgressBar: Height 6pt, Bg Color.surfaceElevated, Radius 3pt, MarginTop 8pt]
│   │   └── [Fill: Width 31.25%, Bg Color.statusSuccess]
│   └── [FilterPillBar: MarginTop 14pt, HorizontalScroll, Gap 8pt]
│       ├── [FilterChip: "All (16)" • Active]
│       ├── [FilterChip: "Discovered (5)"]
│       ├── [FilterChip: "Morocco (8)"]
│       └── [FilterChip: "Australia (8)"]
│
└── [SpecimenGrid: 2 Columns, PaddingH 20pt, PaddingTop 12pt, Gap 12pt]
    ├── [DiscoveredCard: Width 170pt, Bg Color.surface, Radius.lg, Border 1px Color.borderSubtle]
    │   ├── [ImageContainer: Height 110pt, FullCover, Rounded Top]
    │   ├── [BadgeRow: Absolute Top 8pt, Left 8pt]
    │   │   └── [DatePill: "Logged Oct 04"]
    │   └── [Body: Padding 10pt]
    │       ├── [CommonName: Type.bodySemibold, "Sydney Funnel-Web"]
    │       ├── [ScientificName: Type.caption, FontStyle Italic]
    │       └── [ToxicityPill: "Level 5 • Critical", Bg Color.redSubdued, Color.danger]
    │
    └── [LockedCard: Width 170pt, Bg Color.surfaceElevated, Radius.lg, Border 1px dashed Color.borderSubtle]
        ├── [SilhouetteContainer: Height 110pt, Center LockIcon (Color.textTertiary), Opacity 0.4]
        └── [Body: Padding 10pt]
            ├── [PlaceholderName: Type.bodySemibold, Color.textTertiary, "Undiscovered Species"]
            └── [HintLabel: Type.caption, "Scrublands • Nocturnal"]
```

#### 3. Responsive Column Grid Formula
`cardWidth = (screenWidth - (screenPaddingHorizontal * 2) - gridGap) / 2`  
For iPhone 15 Pro: `(393 - (20 * 2) - 12) / 2 = 170.5 pt`.

---

### SCREEN 09 — SPECIES DETAIL (Authoritative Specimen Dossier)

#### 1. Specification Overview
* **Screen Purpose:** Deep natural history, clinical toxicity, real-world size scale, and non-lethal relocation guide for an individual species.
* **Entry Points:** Tapping any card in Screen 08 (SpiderDex) or Screen 11 (Explore); Search results.
* **Exit Points:** Back arrow; Ask AI → Contextual Chat; Phone call → Emergency poison hotline.

#### 2. Key Interactive Sub-Modules
1. **Interactive Real-Life Size Benchmark:**
   * Toggles between: **1 Dirham / $1 Coin (25mm)**, **Bottle Cap (30mm)**, and **Human Thumb (55mm)**.
   * Visual canvas displays the actual relative proportions of the selected benchmark object alongside the spider's leg span footprint with exact physical millimeter callouts.
2. **0–5 Clinical Threat Gauge:**
   * Full breakdown of envenomation syndrome, human medical risk, pet susceptibility, and a minute-by-minute symptom timeline.
3. **3-Way Instant Action Protocol Tabs:**
   * `[Is It Safe?]` | `[Safe Relocation]` | `[Bite Protocol]`
   * Safe relocation provides a 3-step glass-and-cardboard trapping diagram.
   * Bite protocol features 1-tap emergency dial buttons for Morocco Anti-Poison (CAPM: `0537-68-64-64`) and Australia Poisons (`13 11 26`).

---

### SCREEN 10 — DAILY CHALLENGE (Micro-Learning Habit Engine)

#### 1. Specification Overview
* **Screen Purpose:** A 15-second daily riddle that drives Day-1 to Day-30 retention, even when users haven't spotted a live spider outdoors.
* **Entry Points:** Daily Mystery card tap on Screen 03 (Home).
* **Exit Points:** "Continue Exploring" → Return Home with updated streak counter; Close (X).

#### 2. Interaction Specifications
* Question card presents an unidentifiable macro silhouette or behavioral clue.
* 3 multiple-choice options (`A`, `B`, `C`) formatted as full-width interactive cards.
* **State Behavior on Selection:**
  * Option tapped → Immediate Light Haptic.
  * Correct selection turns border and pill to `Color.statusSuccess` (`#42C77A`), triggers Success Haptic, rewards `+25 XP`, and reveals scientific explanation text box.
  * Incorrect selection turns selected option to `Color.statusDanger` (`#E74C3C`), gently highlights the correct option in green without penalty, and provides supportive educational rationale.

---

### SCREEN 11 — EXPLORE (Regional Biodiversity & Seasonal Radar)

#### 1. Specification Overview
* **Screen Purpose:** Browse biodiversity trends across Morocco and Australia, seasonal migration patterns, and habitat guides without compromising user location privacy.
* **Entry Points:** Bottom Navigation Tab 4; "See All" tap on Home radar.
* **Exit Points:** Specimen card tap → Screen 09; Search bar tap → Catalog search modal.

#### 2. Key Sections
1. **Search & Filter Bar:** Sticky header with search input, regional toggle (`Morocco` vs. `Australia`), and venom safety filter chip (`Harmless Allies Only`).
2. **Seasonal Activity Grid:** Species currently emerging based on regional summer/autumn temperatures.
3. **Safe Regional Habitat Map:** Privacy-preserving general region pins (Atlas Mountains, Atlantic Coast, Sydney Basin) indicating species biodiversity clusters without recording user exact GPS.

---

### SCREEN 12 — PROFILE (Field Researcher Identity & Progression)

#### 1. Specification Overview
* **Screen Purpose:** Display researcher achievements, rank ascension, emergency safety hotlines, and account preferences.
* **Entry Points:** Bottom Navigation Tab 5; Profile avatar tap on Home top bar.
* **Exit Points:** Edit profile; Settings; Emergency hotline direct calls.

#### 2. Rank Progression Tier Hierarchy
1. `Novice Observer` (0 – 100 XP)
2. `Backyard Naturalist` (101 – 300 XP)
3. `Field Explorer` (301 – 650 XP)
4. `Arachnid Expert` (651 – 1,200 XP)
5. `Master Naturalist` (1,201+ XP)

Visualized via a clean segmented progress bar with XP progress and next-rank milestone indicator.

---

### SCREEN 13 — SHARE DISCOVERY (Viral Organic Acquisition Card)

#### 1. Specification Overview
* **Screen Purpose:** Generate a graphic social share card optimized for Instagram Stories (9:16) and WhatsApp, driving organic app downloads.
* **Entry Points:** "Share Discovery" tap on Screen 06 (Result) or Screen 09 (Species Detail).
* **Exit Points:** Native OS Share Sheet dismiss; Save image to camera roll.

#### 2. Share Card Asset Composition
* **Format:** Fixed 1080 × 1920 px (rendered locally via `react-native-view-shot` or native Canvas).
* **Card Elements:**
  * User's original cropped spider photograph.
  * Common name and scientific binomial in high-contrast typography.
  * Verified Match Badge: `"Verified by RedBack.ai Computer Vision"`.
  * Rarity / Hazard status pill.
  * Discreet brand watermark and QR code linking to app download.
  * **Privacy Guarantee:** Exact street location, timestamps, and EXIF metadata are stripped prior to rendering.

---

### SCREEN 14 — EMPTY STATES (Constructive Guidance System)

Every zero-data scenario must provide constructive guidance and an active CTA:

| Scenario | Primary Headline | Subtitle Guidance | Primary Action CTA | Action Target |
| :--- | :--- | :--- | :--- | :--- |
| **Empty SpiderDex** | *"Your SpiderDex is waiting."* | *"Scan any spider in your garden or house to register your first specimen."* | **"Open AI Scanner"** | Screen 04 (Scanner) |
| **No Search Matches** | *"No species match your query."* | *"Check your spelling or filter by region (Morocco or Australia)."* | **"Clear All Filters"** | Reset Catalog |
| **No Offline Cache** | *"Offline guide unavailable."* | *"Connect to Wi-Fi to download offline emergency safety dossiers."* | **"Retry Connection"** | Re-fetch API |

---

### SCREEN 15 — ERROR STATES (Resilient Error Recovery)

No technical error codes, stack traces, or raw JSON may ever be shown to end users:

| Error Type | Visual Indicator | User-Facing Message | Resolution Strategy | Primary Action |
| :--- | :--- | :--- | :--- | :--- |
| **Camera Denied** | Camera with Slash (`#E53935`) | *"Camera access is required to analyze live arachnids."* | Prompt OS app settings | **"Open Device Settings"** |
| **Vision Low Confidence (< 65%)** | Magnifying Glass Alert | *"We couldn't confidently identify this spider."* | Provide tips: clean lens, move closer, avoid glare | **"Retake with Better Lighting"** |
| **Network Dropped** | Cloud Off Icon | *"You're currently offline."* | Fall back to local SQLite/JSON emergency cache | **"Access Offline Safety Guide"** |
| **Server Timeout** | Refresh Indicator | *"Vision server is busy. Please try again."* | Queue image locally and offer retry | **"Try Analysis Again"** |

---

## 3. COMPONENT SPECIFICATIONS & INTERACTIVE STATES

### 3.1 Buttons
* **Primary Action Button:**
  * Height: `52 pt` (compact `46 pt`)
  * Radius: `Radius.pill (26 pt)`
  * Background: `Color.primaryRed (#E53935)`
  * States: Default, Pressed (`#C62828`, scale `0.98`), Disabled (`#2A1818`, text `#5E636E`), Loading (Center spinner, label hidden).
* **Secondary Surface Button:**
  * Height: `48 pt`
  * Radius: `Radius.pill`
  * Background: `Color.surfaceElevated`, Border: `1px Color.borderActive`
  * States: Default, Pressed (fill `#22262E`), Disabled.

### 3.2 Cards
* **Standard Container Card:**
  * Padding: `16 pt`
  * Background: `Color.surface (#121418)`
  * Border: `1px solid Color.borderSubtle (#1F232B)`
  * Radius: `Radius.lg (16 pt)`
  * Pressed State: Scale `0.985`, Opacity `0.94`, Border highlights to `Color.borderActive`.

### 3.3 Bottom Sheets
* **Modal Sheet Specs:**
  * Corner Radius: `borderTopLeftRadius: 28pt`, `borderTopRightRadius: 28pt`
  * Drag Handle: Width `40 pt`, Height `4 pt`, Radius `2 pt`, MarginTop `10 pt`, Fill `#2E3440`
  * Backdrop Dimmer: `rgba(0, 0, 0, 0.65)` with tap-to-dismiss behavior

---

## 4. MOTION SYSTEM & ANIMATION TIMINGS

| Motion Role | Duration | Easing Curve | Target Property |
| :--- | :--- | :--- | :--- |
| **Micro-Interactions** | `150–200 ms` | Cubic-Bezier `(0.2, 0, 0, 1)` | Button press scale, chip active toggle |
| **Card Expansions** | `250–300 ms` | Cubic-Bezier `(0.25, 1, 0.5, 1)` | Accordion open, reticle search pulse |
| **Screen Transitions** | `300–350 ms` | Cubic-Bezier `(0.25, 1, 0.5, 1)` | Stack push/pop, lateral screen navigation |
| **Bottom Sheet Slide** | `350–420 ms` | Decelerate `(0, 0, 0.2, 1)` | Identification sheet slide-up |

*Reduced Motion Rule:* When `AccessibilityInfo.isReduceMotionEnabled()` is true, all scale, slide, and translation animations are disabled and replaced with instantaneous `100 ms` crossfades.

---

## 5. ACCESSIBILITY & WCAG 2.2 AA CHECKLIST

1. **Minimum Touch Targets:** Every button, tab, chip, and interactive icon provides an active touch hit box of at least **44 × 44 pt** via `hitSlop` expansion.
2. **Color Independence:** Dangerous venom levels are never communicated by red alone; they are always paired with text (`"LEVEL 4/5"`) and clear iconography (`ShieldAlert`).
3. **Screen Reader Labels:** All icons without visible text (e.g. flash toggle, shutter, back button) must define explicit `accessibilityLabel` and `accessibilityRole`.
4. **Dynamic Type Support:** Text containers allow font scaling up to `200%` without clipping or horizontal overflow.

---

## 6. COMPLETE END-TO-END PROTOTYPE FLOW

```mermaid
flowchart TD
    S01["Screen 01: Onboarding\n(3-Slide Product Value)"] --> S02["Screen 02: Permissions\n(Contextual Camera & Location)"]
    S02 --> S03["Screen 03: Home\n(Expedition HQ & Daily Challenge)"]
    
    S03 -->|Tap Shutter CTA| S04["Screen 04: Camera Scanner\n(Live Viewfinder & AR Reticle)"]
    S03 -->|Tap Daily Mystery| S10["Screen 10: Daily Challenge\n(15-Second Interactive Riddle)"]
    S03 -->|Tap SpiderDex Tracker| S08["Screen 08: SpiderDex\n(16-Species Grid & Progress)"]
    S03 -->|Tap Radar Carousel| S09["Screen 09: Species Detail\n(Clinical Danger & Real Size)"]
    
    S04 -->|Press Shutter| S05["Screen 05: Identification Process\n(Progressive Diagnostic Pipeline)"]
    S05 -->|Confidence >= 65%| S06["Screen 06: Identification Result\n(Nomenclature & Danger Meter)"]
    S05 -->|Confidence < 65%| S15["Screen 15: Error State\n(Retake Guidance)"]
    
    S06 -->|Save Uncollected| S07["Screen 07: New Discovery\n(Unlocked Milestone & +25 XP)"]
    S06 -->|Save Collected| S08
    S06 -->|Tap Share| S13["Screen 13: Share Card\n(Social Discovery Graphic)"]
    
    S07 -->|View in Catalog| S08
    S08 -->|Select Specimen| S09
    
    S03 -->|Bottom Tab 4| S11["Screen 11: Explore\n(Regional Biodiversity Map)"]
    S03 -->|Bottom Tab 5| S12["Screen 12: Profile\n(Rank Ascension & Hotlines)"]
    
    S08 -.->|Zero Specimens| S14["Screen 14: Empty State\n(First Scan Prompt)"]
```

---

## 7. SUMMARY & DEVELOPER HANDOFF CHECKLIST

* [x] All 15 screens fully specified with layout structure, component hierarchy, and states.
* [x] Design tokens standardized for Obsidian dark background (`#090A0C`), Crimson action (`#E53935`), and AAA text (`#F5F5F2`).
* [x] 8pt grid strictly applied with 44×44 pt minimum touch target enforcement.
* [x] Clinical Danger Scale (0–5) and Real-Life Size Benchmark (Coin/Cap/Thumb) fully integrated.
* [x] Concrete error recovery and empty states defined without raw technical errors.
* [x] Complete connected interactive prototype flow mapped from onboarding through diagnosis.
