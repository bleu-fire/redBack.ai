# redBack.ai Modern Design System Specification

Welcome to the definitive **Design System Specification** for redBack.ai. This system bridges **naturalist field-journal authenticity** with **modern, responsive mobile UI standards** for React Native and Expo SDK 54.

Visual references:
- **Master UI Design Sheet (12 Screens)**: [`mobile/assets/design/redBack.ai_Spider_Discovery_App_UI-1.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/redBack.ai_Spider_Discovery_App_UI-1.png)
- **UI Kit & Components**: [`mobile/assets/design/ui-components-kit.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/ui-components-kit.png)
- **Explorer & Scanner Flow**: [`mobile/assets/design/explorer-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/explorer-ui-concept.png)
- **Learning & Taxonomy Flow**: [`mobile/assets/design/student-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/student-ui-concept.png)
- **Authentication Flow**: [`mobile/assets/design/auth-ui-concept.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/auth-ui-concept.png)

---

## 1. Color Palette Tokens

All colors are strictly mapped to tokens in [`mobile/constants/theme.ts`](file:///c:/Users/user/Desktop/redBack.ai/mobile/constants/theme.ts).

| Token Name | Hex Code | Role & Usage | Visual Category |
|---|---|---|---|
| `Palette.coral` | `#E04836` | Signature Redback Crimson. Primary CTA buttons, camera shutter, active tab indicators, venom alert highlights. | Brand Primary |
| `Palette.coralSoft` | `#FDEBE7` | Soft coral background for warning badges, hazard highlights, and alert cards. | Accent / Alert |
| `Palette.coralDark` | `#C83D32` | Pressed button states, high-contrast borders. | Interactive |
| `Palette.moss` | `#2C4A3E` | Deep botanical forest green. Primary hero cards, quiz CTAs, dark container surfaces. | Ecological Brand |
| `Palette.mossDark` | `#1E352C` | Deep night moss. AI match badge container, high-contrast dark accents. | Brand Surface Dark |
| `Palette.mossSoft` | `#E6EFEA` | Soft sage green. Non-venomous/common species pills, icon circle backgrounds, quiz success feedback. | Ecological Subtle |
| `Palette.canvas` | `#FBF9F4` | Warm naturalist paper canvas. Global screen background. | Surface Base |
| `Palette.paper` | `#FFFFFF` | Pure white. Floating cards, modal sheets, bottom tab bar, form inputs. | Card Surface |
| `Palette.surfaceSubtle` | `#F4EFEA` | Subtle warm tinted card container. | Secondary Surface |
| `Palette.ink` | `#17211F` | Deep charcoal ink. Primary display headings, high-contrast text. | Typography |
| `Palette.inkSecondary` | `#3C4543` | Charcoal body text. High readability on warm paper. | Typography Body |
| `Palette.muted` | `#6E7773` | Subdued gray-green slate. Subtitles, metadata, inactive tab icons. | Typography Subtle |
| `Palette.mutedLight` | `#9AA39F` | Pale slate. Unselected borders, inactive toggle states. | Typography Muted |
| `Palette.line` | `#EAE6DE` | Warm border delimiter for cards, dividers, input outlines. | Border |
| `Palette.lineSubtle` | `#F0ECE4` | Ultra-light dividing lines inside compound cards. | Border Subtle |
| `Palette.gold` | `#E59824` | Solar amber. Streak flames, XP counters, "Popular" tags, quiz rewards. | Gamification |
| `Palette.goldSoft` | `#FFF4DE` | Soft solar amber container. Streak pill background. | Gamification Subtle |
| `Palette.danger` | `#D32F2F` | Medical alert red. Venomous classification, urgent bite warnings. | Safety Critical |
| `Palette.dangerSoft` | `#FDE8E4` | Venom hazard container tint. | Safety Critical Soft |
| `Palette.dangerBorder` | `#F7B5A8` | Venom card 1px border. | Safety Critical Border |

---

## 2. Typography Pairings & Hierarchy

redBack.ai uses a distinct **Editorial Field-Journal Hierarchy**:

```text
Display & Headings: Editorial Serif (ui-serif, Georgia, Times New Roman)
Body & Controls:    Crisp Modern Sans-Serif (system-ui, -apple-system, Roboto)
Scientific Taxa:    Italicized Editorial Serif (ui-serif, Georgia)
Data & Taxa Codes:  Monospace (ui-monospace, SFMono-Regular, Menlo)
```

### Hierarchy Scale
- **Display Hero (H1)**: 28–32pt, Serif, Bold (`#17211F`). Line height: 34–38pt.  
  *Examples*: *"Discover the spiders around you."*, *"Good morning, Explorer."*, *"Good to see you, Explorer."*
- **Section Heading (H2)**: 20–24pt, Serif or SemiBold Sans (`#17211F`).  
  *Examples*: *"Featured species"*, *"Continue learning"*, *"Nearby species"*, *"Explore spiders"*
- **Card Title (H3)**: 16–18pt, Bold Sans or Serif (`#17211F` on paper, `#FFFFFF` on moss).  
  *Examples*: *"Redback spider"*, *"Spider Anatomy"*, *"Web building and silk"*
- **Body Regular**: 14–15pt, Sans-serif, Regular (`#3C4543`), Line-height: 20–22pt.  
  *Examples*: Explanations, safety guidance, habitat descriptions.
- **Scientific Taxa**: 13–14pt, Serif, *Italic* (`#6E7773`), e.g. *Latrodectus hasselti*, *Heteropoda sp.*
- **Badge / Pill Label**: 11–12pt, Sans-serif, SemiBold/Bold, Letter-spacing +0.4.
- **Metric Counter Display**: 22–28pt, Bold Sans-serif (`#17211F`).

---

## 3. Card Theme Catalog (`CardTheme`)

Based on the master UI design sheet ([`redBack.ai_Spider_Discovery_App_UI-1.png`](file:///c:/Users/user/Desktop/redBack.ai/mobile/assets/design/redBack.ai_Spider_Discovery_App_UI-1.png)), redBack.ai utilizes **11 specialized card themes**.

> [!IMPORTANT]
> **Strict Flat Design Principle**: In redBack.ai, all cards are flat. **NO DROP SHADOWS** (`elevation: 0`, `shadowOpacity: 0`). Visual separation is achieved strictly through warm 1px borders (`#EAE6DE`), soft organic fills (`#FFFFFF`, `#FBF9F4`, `#E6EFEA`, `#2C4A3E`), and consistent border radii.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        CARD THEME MATRIX                               │
├──────────────────────────┬──────────────────────┬──────────────────────┤
│ Card Theme               │ Surface / Border     │ Visual Anchors       │
├──────────────────────────┼──────────────────────┼──────────────────────┤
│ 1. HeroDiscoveryCard     │ Moss #2C4A3E / None  │ 3D Spider, Coral FAB │
│ 2. FieldMetricsCard      │ Paper #FFFFFF / Line │ 3-Column Counter     │
│ 3. SpeciesGridCard       │ Paper #FFFFFF / Line │ 1:1 Photo, Taxa, Pill│
│ 4. SpeciesListCard       │ Paper #FFFFFF / Line │ Left Thumb, Chevron  │
│ 5. SafetyWarningCard     │ CoralSoft / Danger   │ Alert Icon, Red Title│
│ 6. QuickFactsGridCard    │ Paper #FFFFFF / Line │ Sage Circle, Metric  │
│ 7. LearningHeroCard      │ Moss #2C4A3E / None  │ Spider Art, Coral CTA│
│ 8. QuizOptionCard        │ Paper #FFFFFF / Line │ Radio Pill, Selected │
│ 9. QuizFeedbackCard      │ MossSoft #E6EFEA     │ Check Circle, Button │
│ 10. CommunityFeedCard    │ Paper #FFFFFF / Line │ Avatar, Photo, Likes │
│ 11. MapPreviewCard       │ Paper #FFFFFF / Line │ Floating Sheet, Dist │
└──────────────────────────┴──────────────────────┴──────────────────────┘
```

### Theme 1: Hero Discovery Card (`CardTheme.HeroDiscovery`)
- **Usage**: Top hero card on Home screen (`/(tabs)`).
- **Surface**: `backgroundColor: Palette.moss` (`#2C4A3E`), `borderRadius: 24`, `overflow: 'hidden'`.
- **Content Layout**:
  - Left / Top: Title *"Identify a spider"* (Serif, 20pt, Bold, White), Subtitle *"Take a photo to find out what spider it is."* (Sans, 14pt, `#E6EFEA`).
  - Right: Circular Coral action button (`#E04836`, 48x48pt) with white Camera icon (`Camera`, 22pt) and right arrow indicator (`ArrowRight`, 16pt).
  - Background Artwork: Macro redback spider resting on natural stone or bark texture.

### Theme 2: 3-Column Field Metrics Card (`CardTheme.FieldMetrics`)
- **Usage**: Quick-stats counter on Home (`/(tabs)`) and User Profile (`/(tabs)/profile`).
- **Surface**: `backgroundColor: Palette.paper` (`#FFFFFF`), `borderWidth: 1`, `borderColor: Palette.line` (`#EAE6DE`), `borderRadius: 20`, `paddingVertical: 16`, `paddingHorizontal: 8`.
- **Layout**: Horizontal flex with 3 equal columns separated by two 1px vertical dividers (`backgroundColor: Palette.line`, height: 36pt).
- **Columns**:
  1. `2,847` (Bold Sans, 22pt, `#17211F`) + Caption *"Spiders identified"* (Sans, 11pt, `#6E7773`).
  2. `156` (Bold Sans, 22pt, `#17211F`) + Caption *"Species"* (Sans, 11pt, `#6E7773`).
  3. `12` (Bold Sans, 22pt, `#17211F`) + Caption *"Habitats"* (Sans, 11pt, `#6E7773`).

### Theme 3: Species Catalog Card - Grid View (`CardTheme.SpeciesGrid`)
- **Usage**: 2-Column species browsing grid on Explore (`/(tabs)/explore`).
- **Surface**: `backgroundColor: Palette.paper` (`#FFFFFF`), `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 16`, `overflow: 'hidden'`.
- **Visuals**:
  - Image: Aspect ratio 1:1 or 4:3 with top rounded corners (`borderTopLeftRadius: 15`, `borderTopRightRadius: 15`), `contentFit="cover"`.
  - Body Padding: `12pt`.
  - Title: *"Redback spider"* (Serif, 15pt, Bold, `#17211F`).
  - Taxa: *Latrodectus hasselti* (Serif Italic, 12pt, `#6E7773`).
  - Badge: Pill tag below name e.g. Venomous (`#FDEBE7` with red text) or Common (`#E6EFEA` with moss text).

### Theme 4: Species Catalog Card - List Item View (`CardTheme.SpeciesList`)
- **Usage**: "Featured species" on Home and "Saved species" on Profile.
- **Surface**: `backgroundColor: Palette.paper`, `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 16`, `padding: 12`, `flexDirection: 'row'`, `alignItems: 'center'`.
- **Layout**:
  - Left: 60x60pt square thumbnail with `borderRadius: 12`, `contentFit="cover"`.
  - Middle: Flex 1, `marginLeft: 12`. Common name (Serif Bold, 16pt), Scientific name (*Italic*, 13pt), Status pill.
  - Right: Arrow indicator (`ChevronRight`, 20pt, `#6E7773`).

### Theme 5: Safety Warning / Toxicity Card (`CardTheme.SafetyWarning`)
- **Usage**: Identification results (`/results`) and species detail overview (`/species/[id]`).
- **Surface**: `backgroundColor: Palette.coralSoft` (`#FDEBE7`), `borderWidth: 1`, `borderColor: Palette.dangerBorder` (`#F7B5A8`), `borderRadius: 18`, `padding: 16`.
- **Layout**:
  - Header: `flexDirection: 'row'`, `alignItems: 'center'`, `marginBottom: 6`.
  - Icon: `AlertTriangle` in `#D32F2F` (20pt).
  - Title: *"Safety warning"* (Sans, 15pt, Bold, `#D32F2F`).
  - Message: *"Redback spider bites can be serious. Avoid handling, keep your distance, and seek medical advice if bitten."* (Sans, 13pt, Regular, `#17211F`, `lineHeight: 18`).

### Theme 6: Quick Facts Matrix Card (2x2) (`CardTheme.QuickFacts`)
- **Usage**: Species detail quick facts matrix (`/species/[id]`).
- **Surface**: `backgroundColor: Palette.paper` (`#FFFFFF`), `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 16`, `padding: 14`, `flexDirection: 'row'`, `alignItems: 'center'`.
- **Layout**:
  - Icon Capsule: 40x40pt circular container (`backgroundColor: Palette.mossSoft` `#E6EFEA`, `borderRadius: 20`, centered icon e.g. `Ruler`, `Clock`, `Leaf`, `MapPin` in `#2C4A3E`).
  - Text Group: `marginLeft: 12`.
    - Metric Label: *"Size"*, *"Lifespan"*, *"Diet"*, *"Habitat"* (Sans, 11pt, Medium, `#6E7773`).
    - Metric Value: *"~ 10 mm"*, *"1 - 3 years"*, *"Small insects"*, *"Urban areas"* (Sans, 13pt, Bold, `#17211F`).

### Theme 7: Learning Hero & Lesson Card (`CardTheme.LearningHero`)
- **Usage**: Today's featured lesson on Learn (`/(tabs)/learn`).
- **Surface**: `backgroundColor: Palette.moss` (`#2C4A3E`), `borderRadius: 24`, `padding: 20`, `overflow: 'hidden'`.
- **Layout**:
  - Header: Category tag *"Today's lesson"* (Sans, 12pt, `#E6EFEA`, `fontWeight: '600'`).
  - Title: *"Spider Anatomy"* (Serif, 22pt, Bold, `#FFFFFF`).
  - Description: *"Explore the remarkable design behind their success."* (Sans, 14pt, `#E6EFEA`, `marginBottom: 16`).
  - Meta Row: Clock pill (`Clock` icon + *"10 min"*), XP pill (`Sparkles` + *"+50 XP"*).
  - CTA Button: Circular Coral button (`#E04836`, 44x44pt) with `ArrowRight` (White, 20pt).
  - Visual: Detailed 3D anatomical spider model on the right.

### Theme 8: Quiz Option Card (`CardTheme.QuizOption`)
- **Usage**: Interactive quiz question options on (`/quiz` or `/learn/[id]`).
- **Surface (Default)**: `backgroundColor: Palette.paper`, `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 16`, `paddingVertical: 14`, `paddingHorizontal: 16`, `flexDirection: 'row'`, `alignItems: 'center'`, `marginBottom: 12`.
- **Surface (Selected / Correct)**: `backgroundColor: Palette.paper`, `borderWidth: 2`, `borderColor: Palette.moss` (`#2C4A3E`).
- **Layout**:
  - Letter Badge: 32x32pt rounded rectangle (`backgroundColor: Palette.surfaceSubtle`, `borderRadius: 8`, centered letter e.g. `A, B, C, D`, Bold, 14pt, `#17211F`).
  - Option Label: Flex 1, `marginLeft: 12`, Sans, 15pt, Medium, `#17211F`.
  - Trailing State: Green checkmark in circle (`CheckCircle2`, 22pt, `#2C4A3E`) when correct.

### Theme 9: Quiz Feedback Alert Card (`CardTheme.QuizFeedback`)
- **Usage**: Bottom evaluation banner in Quiz after answer submission.
- **Surface**: `backgroundColor: Palette.mossSoft` (`#E6EFEA`), `borderRadius: 18`, `padding: 16`, `marginBottom: 16`.
- **Layout**:
  - Header: `flexDirection: 'row'`, `alignItems: 'center'`, `marginBottom: 6`.
  - Icon: `CheckCircle2` (20pt, `#2C4A3E`).
  - Title: *"Correct!"* (Sans, 15pt, Bold, `#2C4A3E`).
  - Explanation: *"The abdomen contains the spider's main organs, including the digestive, respiratory and reproductive systems."* (Sans, 13pt, `#17211F`, `lineHeight: 18`).
  - Action: Primary Deep Moss CTA button *"Next question ->"* (`backgroundColor: Palette.moss`, `borderRadius: 24`, `height: 52`).

### Theme 10: Community Sighting Feed Card (`CardTheme.CommunityFeed`)
- **Usage**: Community feed (`/(tabs)/community` or `/(tabs)/saved`).
- **Surface**: `backgroundColor: Palette.paper`, `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 18`, `padding: 16`, `marginBottom: 14`.
- **Layout**:
  - Author Header: Circular avatar (36x36pt), Author name *"Alex Morgan"* (Sans, 14pt, Bold), Timestamp *"2h ago"* (Sans, 12pt, `#6E7773`).
  - Sighting Attachment: Rounded image container (height: 180–220pt, `borderRadius: 12`, `contentFit="cover"`, `marginVertical: 10`).
  - Caption: *"Found this little one in my garden. Is it a juvenile redback?"* (Sans, 14pt, `#17211F`, `lineHeight: 20`).
  - Social Stats Row: `flexDirection: 'row'`, `gap: 20`, `marginTop: 8`.
    - Likes: `Heart` icon (18pt, `#6E7773`) + Count *"12"*.
    - Comments: `MessageSquare` icon (18pt, `#6E7773`) + Count *"4"*.

### Theme 11: Map Sighting Preview Floating Card (`CardTheme.MapPreview`)
- **Usage**: Bottom floating preview sheet on Nearby Map screen.
- **Surface**: `backgroundColor: Palette.paper`, `borderWidth: 1`, `borderColor: Palette.line`, `borderRadius: 18`, `padding: 12`, `flexDirection: 'row'`, `alignItems: 'center'`.
- **Layout**:
  - Left: 54x54pt thumbnail with `borderRadius: 12`.
  - Center: Flex 1, `marginLeft: 12`. Name *"Redback spider"* (Serif, 15pt, Bold), Distance Indicator *`~ 1.2 km away`* (Sans, 12pt, `#6E7773`).
  - Right: Navigation chevron (`ChevronRight`, 20pt, `#6E7773`).

---

## 4. Design Instructions & Standards

### Instruction 1: Flat Naturalist Aesthetic (Zero Shadows)
- **Rule**: Eliminate all elevation, drop shadows, and glow effects:
  ```ts
  // Prohibited:
  shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, elevation: 4
  // Mandatory:
  borderWidth: 1, borderColor: Palette.line, elevation: 0, shadowOpacity: 0
  ```
- **Rationale**: The field-journal design philosophy emulates botanical specimen charts and tactile pressed paper. Depth is expressed through crisp lines, layered natural card fills, and generous whitespace.

### Instruction 2: Iconography Mapping (`lucide-react-native`)
Every icon across the 12 screens maps to standard Lucide React Native icons:

| Category | Purpose | Lucide Icon Component | Color & Styling |
|---|---|---|---|
| **Navigation** | Home Tab | `Home` | Inactive: `Palette.muted`, Active: `Palette.coral` |
| **Navigation** | Explore Tab | `Compass` or `Binoculars` | Inactive: `Palette.muted`, Active: `Palette.coral` |
| **Navigation** | Scanner Shutter | `Camera` | Shutter button: White icon inside Coral circle |
| **Navigation** | Learn Tab | `BookOpen` | Inactive: `Palette.muted`, Active: `Palette.coral` |
| **Navigation** | Profile Tab | `User` | Inactive: `Palette.muted`, Active: `Palette.coral` |
| **Navigation** | Saved Observations | `Bookmark` | Header/Card action: `Palette.muted` or `Palette.ink` |
| **Navigation** | Community | `MessageSquare` | Bottom tab / Feed action |
| **Actions** | Flash Shutter Toggle | `Zap` / `ZapOff` | Camera header: White |
| **Actions** | Shutter Reticle Tips | `HelpCircle` / `Lightbulb` | Camera bottom bar: White |
| **Actions** | Gallery Picker | `Image` | Camera bottom bar: White |
| **Actions** | Search Field | `Search` | Search input leading icon: `Palette.muted` |
| **Actions** | Filter Controls | `SlidersHorizontal` / `Filter` | Filter button: `Palette.moss` or `Palette.ink` |
| **Actions** | Close / Cancel | `X` | Screen header close action |
| **Actions** | Back Navigation | `ArrowLeft` or `ChevronLeft` | Screen header back action |
| **Actions** | Next / Forward | `ArrowRight` or `ChevronRight` | Card chevron or button suffix |
| **Nature / Safety**| Venomous Warning | `AlertTriangle` | Hazard pill: `Palette.danger` |
| **Nature / Safety**| Safe / Common | `Leaf` | Botanical pill: `Palette.moss` |
| **Nature / Safety**| Size / Measurement | `Ruler` | Quick facts: `Palette.moss` |
| **Nature / Safety**| Lifespan / Time | `Clock` | Quick facts: `Palette.moss` |
| **Nature / Safety**| Diet / Ecology | `PawPrint` or `Apple` | Quick facts: `Palette.moss` |
| **Nature / Safety**| Habitat / Map | `MapPin` | Quick facts: `Palette.moss` |
| **Gamification** | Daily Streak | `Flame` | Amber streak badge: `Palette.gold` |
| **Gamification** | XP / Level Award | `Sparkles` or `Trophy` | Level badge: `Palette.gold` |
| **Verification**| AI Identification | `CheckCircle2` | AI Match badge: `#FFFFFF` on `#1E352C` |

### Instruction 3: Pill & Badge Token Standards
Badges must adhere strictly to these color and padding pairings:
- **Venomous**: `backgroundColor: Palette.coralSoft` (`#FDEBE7`), `color: Palette.danger` (`#D32F2F`), text: *"● Venomous"*, `borderRadius: 9999`, `paddingHorizontal: 10`, `paddingVertical: 4`.
- **Common**: `backgroundColor: Palette.mossSoft` (`#E6EFEA`), `color: Palette.moss` (`#2C4A3E`), text: *"● Common"*, `borderRadius: 9999`.
- **Active at Night**: `backgroundColor: Palette.surfaceSubtle` (`#F4EFEA`), `color: Palette.muted` (`#6E7773`), text: *"● Active at night"*.
- **AI Match Tag**: `backgroundColor: Palette.mossDark` (`#1E352C`), `color: '#FFFFFF'`, text: *"✓ AI IDENTIFICATION  96% match"*, `paddingHorizontal: 12`, `paddingVertical: 6`.
- **Streak Pill**: `backgroundColor: Palette.goldSoft` (`#FFF4DE`), `color: Palette.gold` (`#E59824`), text: *"🔥 7 day streak"*.

### Instruction 4: Camera Scanner & Viewfinder Reticle
- **Viewfinder Reticle**:
  - Centered square frame (width: ~280pt, height: ~280pt).
  - 4 corner brackets (3pt stroke width, 24pt arm length, color: `'#FFFFFF'`).
  - Text prompts above reticle: *"Position the spider in the frame"* (Bold White, 16pt) + *"For best results, keep the spider in focus and well lit."* (White 70%, 13pt).
- **Zoom Segmented Control**:
  - Three pills: `.5`, `1x`, `3`. Active pill has white background with dark ink text; inactive pills have translucent dark background with white text.
- **Shutter Button**:
  - Outer ring: 76x76pt circular border (3pt solid white).
  - Inner trigger: 64x64pt solid Crimson Coral circle (`#E04836`).

### Instruction 5: Floating Bottom Pill Navigation
- **Container**: `backgroundColor: Palette.paper` (`#FFFFFF`), `borderWidth: 1`, `borderColor: Palette.line` (`#EAE6DE`), `borderRadius: 32`, `height: 64`, `marginHorizontal: 16`, `marginBottom: insets.bottom + 8`.
- **Tabs (5 items)**: Home, Explore, Scanner (Center / FAB), Learn, Profile.
- **Active Tab Styling**:
  - Icon: `Palette.coral` (`#E04836`).
  - Label: Bold, 11pt, `Palette.coral`.
  - Active Indicator Dot: 4x4pt circular dot positioned 2pt directly underneath active icon or label.
- **Inactive Tab Styling**:
  - Icon: `Palette.muted` (`#6E7773`).
  - Label: Regular, 11pt, `Palette.muted`.

---

## 5. Spacing, Touch Targets & Border Radii Tokens

```ts
Spacing: {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32
}
Radii: {
  xs: 6, sm: 10, md: 14, lg: 18, xl: 22, xxl: 28, pill: 9999
}
TouchTargets: {
  minHeight: 44, // Minimum iOS/Android touchable height
  buttonHeight: 52 // Standard primary/secondary button height
}
```

- **Cards**: `Radii.lg` (18pt) or `Radii.xl` (22pt)
- **Action Buttons**: `Radii.xxl` (24–28pt) or `Radii.pill` (9999)
- **Badges/Pills**: `Radii.pill` (9999)
- **Text Inputs**: `Radii.md` (14–16pt)
- **Thumbnails**: `Radii.sm` (10–12pt)

