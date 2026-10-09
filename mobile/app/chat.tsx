import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  ArrowLeft,
  Send,
  Plus,
  Mic,
  Camera,
  BookOpen,
  GraduationCap,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  Layers,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { askNaturalistAI } from '@/data/api/logic';

interface StructuredChatMessage {
  id: string;
  sender: 'user' | 'bot';
  time: string;
  text?: string;
  // Bot Structured Fields from Design
  intro?: string;
  supportingPoints?: string[];
  uncertainPoints?: string[];
  // Comparison Widget Variant
  comparison?: {
    speciesA: { name: string; sci: string; image: any };
    speciesB: { name: string; sci: string; image: any };
    rows: { label: string; a: string; b: string }[];
  };
  // Guidance / Next Steps Variant
  actionSteps?: { number: number; text: string }[];
  tip?: string;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContextCard] = useState(true);

  // Initial Conversation seeded from the exact screen design
  const [messages, setMessages] = useState<StructuredChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      time: '9:42 AM',
      text: 'Why do you think this is a Redback? What features support this identification?',
    },
    {
      id: 'm2',
      sender: 'bot',
      time: '9:42 AM',
      intro: 'Good question! Based on the image, these features support the identification:',
      supportingPoints: [
        'Distinct red/orange abdominal marking',
        'Glossy dark body shape',
        'Typical web-associated posture',
      ],
      uncertainPoints: [
        'Clearer view of the abdomen angle',
        'Lighting makes leg details less visible',
      ],
    },
    {
      id: 'm3',
      sender: 'user',
      time: '9:44 AM',
      text: 'This looks very helpful. What else should I check to be more confident?',
    },
    {
      id: 'm4',
      sender: 'bot',
      time: '9:44 AM',
      intro: 'To improve confidence, try to capture:',
      actionSteps: [
        { number: 1, text: 'Clearer view of the abdomen (side angle)' },
        { number: 2, text: 'Web structure' },
        { number: 3, text: 'Eye arrangement (if possible)' },
        { number: 4, text: 'Habitat context' },
      ],
      tip: 'Get a closer, well-lit photo from the side (20-30 cm) and include the full body.',
    },
  ]);

  const quickPrompts = [
    { id: 'compare', icon: Layers, label: 'Compare with similar' },
    { id: 'explain', icon: CheckCircle2, label: 'Explain evidence' },
    { id: 'anatomy', icon: BookOpen, label: 'Show anatomy' },
  ];

  const suggestedNextSteps = [
    {
      id: 'photo',
      icon: Camera,
      title: 'Take another photo',
      subtitle: '(Improve confidence)',
      action: () => router.push('/(tabs)/scanner' as any),
    },
    {
      id: 'anatomy',
      icon: BookOpen,
      title: 'Learn anatomy',
      subtitle: '(Body parts & ID)',
      action: () => router.push('/(tabs)/learn' as any),
    },
    {
      id: 'quiz',
      icon: GraduationCap,
      title: 'Take a quiz',
      subtitle: '(Test your skills)',
      action: () => router.push('/(tabs)/learn' as any),
    },
  ];

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || loading) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInputText('');

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: StructuredChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      time: timeStr,
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await askNaturalistAI(textToSend, {
        name: 'Redback Spider',
        scientific: 'Latrodectus hasselti',
      });

      const botMsg: StructuredChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intro: reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat send error:', err);
      const errorMsg: StructuredChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intro: "I couldn't reach the naturalist database right now. Please verify your connection or consult the offline field guide.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 150);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        
        {/* ================= 1. CHAT HEADER ================= */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressedSubtle]}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ArrowLeft size={20} color={Palette.ink} />
          </Pressable>

          {/* Reddy Mascot Identity */}
          <View style={styles.reddyProfileWrap}>
            <View style={styles.reddyAvatarContainer}>
              <Image
                source={require('@/assets/images/spider-logo-3d.png')}
                style={styles.reddyAvatarImg}
                resizeMode="cover"
              />
            </View>
            <View style={styles.headerTitleGroup}>
              <Text style={styles.headerTitle}>Reddy</Text>
              <View style={styles.statusRow}>
                <Text style={styles.headerSubtitle}>Field Assistant • Online</Text>
                <View style={styles.onlineDot} />
              </View>
            </View>
          </View>

          {/* Emergency Shortcut Pill */}
          <Pressable
            onPress={() => router.push('/(tabs)/learn' as any)}
            style={({ pressed }) => [styles.emergencyBtn, pressed && styles.pressedSubtle]}
            accessibilityRole="button"
            accessibilityLabel="Emergency Protocol"
          >
            <Plus size={16} color="#FFFFFF" strokeWidth={3} />
            <Text style={styles.emergencyBtnText}>Emergency</Text>
          </Pressable>
        </View>

        {/* ================= 2. CONTEXT OBSERVATION CARD ================= */}
        {showContextCard && (
          <View style={styles.contextCardWrap}>
            <Pressable
              onPress={() => router.push('/species/latrodectus-tredecimguttatus' as any)}
              style={({ pressed }) => [styles.contextCard, pressed && styles.pressedSubtle]}
            >
              <Image
                source={require('@/assets/images/spider-3d.png')}
                style={styles.contextSpiderThumb}
                resizeMode="cover"
              />

              <View style={styles.contextInfoCol}>
                <Text style={styles.contextEyebrow}>Current Observation</Text>
                <Text style={styles.contextSpeciesName}>Redback Spider</Text>
                <Text style={styles.contextSciName}>Latrodectus hasselti</Text>

                <View style={styles.contextBadgesRow}>
                  <View style={styles.dangerBadge}>
                    <ShieldAlert size={11} color={Palette.danger} />
                    <Text style={styles.dangerBadgeText}>High Risk</Text>
                  </View>
                  <View style={styles.confidencePill}>
                    <Text style={styles.confidenceText}>82% confidence</Text>
                  </View>
                </View>
              </View>

              <ChevronRight size={18} color={Palette.muted} />
            </Pressable>
          </View>
        )}

        {/* ================= 3. MESSAGES STREAM ================= */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (item.sender === 'user') {
              return (
                <View style={styles.userMessageRow}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userBubbleText}>{item.text}</Text>
                    <View style={styles.userMetaRow}>
                      <Text style={styles.userTimestamp}>{item.time}</Text>
                      <Text style={styles.checkmarks}>✓✓</Text>
                    </View>
                  </View>
                  <Image
                    source={require('@/assets/the_pfp/Spider_in_watercolor_and_ink_20261002135412.jpg')}
                    style={styles.userAvatar}
                  />
                </View>
              );
            }

            // BOT (REDDY) STRUCTURED MESSAGE
            return (
              <View style={styles.botMessageRow}>
                <Image
                  source={require('@/assets/images/spider-logo-3d.png')}
                  style={styles.botAvatar}
                />

                <View style={styles.botCardContainer}>
                  <View style={styles.botBubble}>
                    {Boolean(item.intro) && (
                      <Text style={styles.botIntroText}>{item.intro}</Text>
                    )}

                    {/* Supporting Points Section */}
                    {item.supportingPoints && item.supportingPoints.length > 0 && (
                      <View style={styles.pointsBlock}>
                        {item.supportingPoints.map((pt: string, i: number) => (
                          <View key={i} style={styles.pointRow}>
                            <View style={styles.pointIconCircleSuccess}>
                              <CheckCircle2 size={13} color={Palette.forestGreen} />
                            </View>
                            <Text style={styles.pointText}>{pt}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Uncertain / Need More Evidence Section */}
                    {item.uncertainPoints && item.uncertainPoints.length > 0 && (
                      <View style={styles.uncertainCard}>
                        <View style={styles.uncertainHeader}>
                          <HelpCircle size={14} color="#D97706" />
                          <Text style={styles.uncertainTitle}>
                            Uncertain or need more evidence:
                          </Text>
                        </View>
                        {item.uncertainPoints.map((pt: string, i: number) => (
                          <View key={i} style={styles.pointRow}>
                            <View style={styles.pointIconCircleWarning}>
                              <HelpCircle size={11} color={Palette.muted} />
                            </View>
                            <Text style={styles.uncertainText}>{pt}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Action Steps Section */}
                    {item.actionSteps && item.actionSteps.length > 0 && (
                      <View style={styles.actionStepsBlock}>
                        {item.actionSteps.map((step: any) => (
                          <View key={step.number} style={styles.actionStepRow}>
                            <View style={styles.stepNumberBadge}>
                              <Text style={styles.stepNumberText}>{step.number}</Text>
                            </View>
                            <Text style={styles.stepText}>{step.text}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Field Photography Tip Box */}
                    {Boolean(item.tip) && (
                      <View style={styles.tipBox}>
                        <Camera size={14} color={Palette.muted} />
                        <Text style={styles.tipText}>
                          <Text style={styles.tipBold}>Tip: </Text>
                          {item.tip}
                        </Text>
                      </View>
                    )}

                    <Text style={styles.botTimestamp}>{item.time}</Text>
                  </View>

                  {/* Message Action Toolbar (Thumbs, Copy, Share) */}
                  <View style={styles.botToolbar}>
                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                    >
                      <ThumbsUp size={14} color={Palette.muted} />
                    </Pressable>
                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                    >
                      <ThumbsDown size={14} color={Palette.muted} />
                    </Pressable>
                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                    >
                      <Copy size={14} color={Palette.muted} />
                    </Pressable>
                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                    >
                      <Share2 size={14} color={Palette.muted} />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <Image
                  source={require('@/assets/images/spider-logo-3d.png')}
                  style={styles.botAvatarLoading}
                />
                <View style={styles.loadingBubble}>
                  <ActivityIndicator size="small" color={Palette.forestGreen} />
                  <Text style={styles.loadingText}>Reddy is analyzing observations...</Text>
                </View>
              </View>
            ) : null
          }
        />

        {/* ================= 4. QUICK CONTEXT ACTIONS ================= */}
        <View style={styles.quickActionsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {quickPrompts.map((q) => {
              const IconComp = q.icon;
              return (
                <Pressable
                  key={q.id}
                  style={({ pressed }) => [styles.quickActionChip, pressed && styles.pressedSubtle]}
                  onPress={() => handleSend(q.label)}
                >
                  <IconComp size={15} color={Palette.forestGreen} />
                  <Text style={styles.quickActionLabel}>{q.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ================= 5. SUGGESTED NEXT STEPS ================= */}
        <View style={styles.nextStepsSection}>
          <Text style={styles.nextStepsHeader}>Suggested next steps</Text>
          <View style={styles.nextStepsGrid}>
            {suggestedNextSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <Pressable
                  key={step.id}
                  style={({ pressed }) => [styles.nextStepCard, pressed && styles.pressedSubtle]}
                  onPress={step.action}
                >
                  <View style={styles.nextStepHeaderRow}>
                    <StepIcon size={16} color={Palette.forestGreen} />
                    <ChevronRight size={13} color={Palette.muted} />
                  </View>
                  <Text style={styles.nextStepTitle}>{step.title}</Text>
                  <Text style={styles.nextStepSubtitle}>{step.subtitle}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ================= 6. MESSAGE INPUT DECK ================= */}
        <View style={styles.inputDeck}>
          <Pressable
            style={({ pressed }) => [styles.inputIconButton, pressed && styles.pressedSubtle]}
            onPress={() => router.push('/(tabs)/scanner' as any)}
            accessibilityLabel="Attach Photo"
          >
            <Camera size={20} color={Palette.ink} />
          </Pressable>

          <TextInput
            style={styles.textInput}
            placeholder="Ask Reddy about this observation..."
            placeholderTextColor={Palette.muted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
            editable={!loading}
          />

          <Pressable
            style={({ pressed }) => [styles.micButton, pressed && styles.pressedSubtle]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            accessibilityLabel="Voice Note"
          >
            <Mic size={19} color={Palette.ink} />
          </Pressable>

          <Pressable
            style={[styles.sendButton, loading && styles.sendButtonDisabled]}
            onPress={() => handleSend()}
            disabled={loading}
            accessibilityLabel="Send Message"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Send size={18} color="#FFFFFF" strokeWidth={2.5} />
            )}
          </Pressable>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  container: {
    flex: 1,
  },

  // 1. Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: Palette.canvas,
    borderBottomWidth: 1,
    borderBottomColor: Palette.borderLine,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: Radii.pill,
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 2.5,
    borderBottomColor: '#D8D0C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reddyProfileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginLeft: 10,
  },
  reddyAvatarContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    overflow: 'hidden',
  },
  reddyAvatarImg: {
    width: '100%',
    height: '100%',
  },
  headerTitleGroup: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '800',
    color: Palette.ink,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1,
  },
  headerSubtitle: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.muted,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.forestGreen,
  },
  emergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.spicyCrimson,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    borderBottomWidth: 3,
    borderBottomColor: Palette.spicyCrimsonDark,
  },
  emergencyBtnText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // 2. Context Observation Card
  contextCardWrap: {
    paddingHorizontal: Spacing.md,
    paddingTop: 10,
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.paper,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: 12,
    gap: 12,
  },
  contextSpiderThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: Palette.surfaceSubtle,
  },
  contextInfoCol: {
    flex: 1,
    gap: 2,
  },
  contextEyebrow: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '700',
    color: Palette.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contextSpeciesName: {
    fontFamily: Typography.display,
    fontSize: 15,
    fontWeight: '800',
    color: Palette.ink,
  },
  contextSciName: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontStyle: 'italic',
    color: Palette.muted,
  },
  contextBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  dangerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFEBE8',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  dangerBadgeText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '800',
    color: Palette.danger,
  },
  confidencePill: {
    backgroundColor: '#F3EFE8',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  confidenceText: {
    fontFamily: Typography.body,
    fontSize: 10,
    fontWeight: '600',
    color: Palette.ink,
  },

  // 3. Messages Stream
  messagesList: {
    paddingHorizontal: Spacing.md,
    paddingTop: 14,
    paddingBottom: 10,
    gap: 14,
  },
  userMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 8,
  },
  userBubble: {
    backgroundColor: '#1E4D36', // Deep Tactical Green
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  userBubbleText: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    color: '#FFFFFF',
    lineHeight: 19,
  },
  userMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  userTimestamp: {
    fontFamily: Typography.body,
    fontSize: 10,
    color: '#B2D8C5',
  },
  checkmarks: {
    fontSize: 11,
    color: '#B2D8C5',
    fontWeight: '700',
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
  },

  botMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    maxWidth: '92%',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: 2,
  },
  botCardContainer: {
    flex: 1,
  },
  botBubble: {
    backgroundColor: Palette.paper,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: 14,
    gap: 10,
  },
  botIntroText: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    color: Palette.ink,
    lineHeight: 19,
    fontWeight: '500',
  },

  // Structured bot sections
  pointsBlock: {
    gap: 6,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  pointIconCircleSuccess: {
    marginTop: 2,
  },
  pointText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
    lineHeight: 17,
  },

  uncertainCard: {
    backgroundColor: '#FBF8F0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFE7D2',
    padding: 10,
    gap: 6,
  },
  uncertainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  uncertainTitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
  },
  pointIconCircleWarning: {
    marginTop: 3,
  },
  uncertainText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.inkSecondary,
    lineHeight: 16,
  },

  actionStepsBlock: {
    gap: 6,
  },
  actionStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Palette.forestGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.ink,
  },

  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: '#F5EFE6',
    borderRadius: 10,
    padding: 9,
  },
  tipBold: {
    fontWeight: '800',
    color: Palette.ink,
  },
  tipText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 11.5,
    color: Palette.inkSecondary,
    lineHeight: 16,
  },
  botTimestamp: {
    fontFamily: Typography.body,
    fontSize: 10,
    color: Palette.muted,
    alignSelf: 'flex-end',
    marginTop: 2,
  },

  botToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
    marginLeft: 6,
  },
  toolbarIconBtn: {
    padding: 4,
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  botAvatarLoading: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.paper,
    borderRadius: Radii.pill,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  loadingText: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },

  // 4. Quick Context Actions
  quickActionsContainer: {
    paddingVertical: 4,
  },
  quickActionsScroll: {
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  quickActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 2.5,
    borderBottomColor: '#D8D0C5',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.pill,
  },
  quickActionLabel: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },

  // 5. Suggested Next Steps
  nextStepsSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Palette.borderLine,
  },
  nextStepsHeader: {
    fontFamily: Typography.display,
    fontSize: 12,
    fontWeight: '800',
    color: Palette.muted,
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  nextStepsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  nextStepCard: {
    flex: 1,
    backgroundColor: Palette.paper,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    padding: 10,
    gap: 2,
  },
  nextStepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  nextStepTitle: {
    fontFamily: Typography.display,
    fontSize: 11.5,
    fontWeight: '800',
    color: Palette.ink,
  },
  nextStepSubtitle: {
    fontFamily: Typography.body,
    fontSize: 9.5,
    color: Palette.muted,
  },

  // 6. Message Input Deck
  inputDeck: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 8,
    paddingBottom: Spacing.xs,
    backgroundColor: Palette.canvas,
    gap: 8,
  },
  inputIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.paper,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    borderBottomWidth: 3,
    borderBottomColor: '#D8D0C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: Palette.paper,
    borderRadius: Radii.pill,
    borderWidth: 1.5,
    borderColor: Palette.borderLine,
    paddingHorizontal: 14,
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.ink,
  },
  micButton: {
    width: 38,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.forestGreen,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: Palette.forestGreenDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },

  pressedSubtle: {
    opacity: 0.9,
    transform: [{ translateY: 1 }],
  },
});
