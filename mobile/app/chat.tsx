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
  Share,
  Modal,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  ArrowLeft,
  Send,
  Mic,
  Camera,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  CheckCheck,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  Layers,
  BookOpen,
  X,
  PhoneCall,
} from 'lucide-react-native';
import { Palette, Spacing, Radii } from '@/constants/theme';
import { askNaturalistAI } from '@/data/api/logic';

interface StructuredChatMessage {
  id: string;
  sender: 'user' | 'bot';
  time: string;
  text?: string;
  intro?: string;
  supportingPoints?: string[];
  uncertainPoints?: string[];
  actionSteps?: { number: number; text: string }[];
  tip?: string;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const textInputRef = useRef<TextInput>(null);

  // Read species query params if opened from a scan or species page
  const params = useLocalSearchParams<{
    speciesName?: string;
    scientificName?: string;
    confidence?: string;
  }>();

  const speciesName = params.speciesName || 'Redback Spider';
  const scientificName = params.scientificName || 'Latrodectus hasselti';
  const confidenceText = params.confidence || '82% match';

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showContextBanner, setShowContextBanner] = useState(true);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [likedMessages, setLikedMessages] = useState<Record<string, 'up' | 'down' | undefined>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initial Seeded Conversation tailored to the active species
  const [messages, setMessages] = useState<StructuredChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      time: '9:42 AM',
      text: `Why do you think this is a ${speciesName}? What features support this identification?`,
    },
    {
      id: 'm2',
      sender: 'bot',
      time: '9:42 AM',
      intro: `Based on your observation photo, these features support ${speciesName} (${scientificName}):`,
      supportingPoints: [
        'Distinct vivid red/orange abdominal dorsal marking pattern',
        'Glossy spherical dark body shape typical of Latrodectus',
        'Characteristic tangled irregular cobweb structure and posture',
      ],
      uncertainPoints: [
        'Clearer view of ventral hourglass marking needed to confirm sex',
        'Lighting makes leg segment spines less distinct',
      ],
    },
    {
      id: 'm3',
      sender: 'user',
      time: '9:44 AM',
      text: 'What should I photograph next to confirm this with higher confidence?',
    },
    {
      id: 'm4',
      sender: 'bot',
      time: '9:44 AM',
      intro: 'To elevate identification confidence, try to capture:',
      actionSteps: [
        { number: 1, text: 'Clearer side-angle profile of abdomen and dorsal markings' },
        { number: 2, text: 'Web structure (irregular tangled maze vs orb sheet)' },
        { number: 3, text: 'Ventral underside to inspect hourglass pattern if safely visible' },
      ],
      tip: 'Maintain safe distance (20–30 cm). Use 2x or 3x optical zoom with daylight rather than getting close.',
    },
  ]);

  // Streamlined Quick Prompts
  const quickPrompts = [
    { id: 'compare', icon: Layers, label: 'Compare look-alikes' },
    { id: 'explain', icon: CheckCircle2, label: 'Explain evidence' },
    { id: 'anatomy', icon: BookOpen, label: 'Key anatomy' },
    { id: 'danger', icon: ShieldAlert, label: 'Is it dangerous?' },
  ];

  // Helper parser for dynamic AI responses into clean points and tips
  const parseAiResponse = (raw: string): { intro: string; points?: string[]; tip?: string } => {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    const points: string[] = [];
    const introLines: string[] = [];
    let tipText: string | undefined;

    for (const line of lines) {
      if (line.toLowerCase().startsWith('tip:') || line.toLowerCase().startsWith('note:')) {
        tipText = line.replace(/^(tip:|note:)\s*/i, '');
      } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
        points.push(line.replace(/^[-*•]\s*/, ''));
      } else {
        introLines.push(line);
      }
    }

    return {
      intro: introLines.join('\n\n') || raw,
      points: points.length > 0 ? points : undefined,
      tip: tipText,
    };
  };

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
        name: speciesName,
        scientific: scientificName,
      });

      const parsed = parseAiResponse(reply);

      const botMsg: StructuredChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intro: parsed.intro,
        supportingPoints: parsed.points,
        tip: parsed.tip,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: StructuredChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intro: `Operating in offline field mode. Consult the offline guide for ${speciesName} (${scientificName}) morphology keys.`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 150);
    }
  };

  const handleFeedback = (msgId: string, type: 'up' | 'down') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLikedMessages((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? undefined : type,
    }));
  };

  const handleShareMessage = async (msg: StructuredChatMessage) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const content = msg.text || msg.intro || 'Observation insights from redBack.ai';
    await Share.share({
      message: `🕷️ redBack.ai:\n\n${content}`,
    });
  };

  const handleCopyMessage = (msg: StructuredChatMessage) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        
        {/* ================= 1. CLEAN, AIRY TOP BAR ================= */}
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
              <View style={styles.onlineBadgeRing} />
            </View>
            <View style={styles.headerTitleGroup}>
              <Text style={styles.headerTitle}>Reddy</Text>
              <Text style={styles.headerSubtitle}>Field Assistant</Text>
            </View>
          </View>

          {/* Subtle Emergency SOS Link */}
          <Pressable
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
              setShowEmergencyModal(true);
            }}
            style={({ pressed }) => [styles.emergencyBtn, pressed && styles.pressedSubtle]}
            accessibilityRole="button"
            accessibilityLabel="Emergency Protocol"
          >
            <ShieldAlert size={13} color={Palette.danger} />
            <Text style={styles.emergencyBtnText}>SOS</Text>
          </Pressable>
        </View>

        {/* ================= 2. LIGHTWEIGHT CONTEXT BANNER ================= */}
        {showContextBanner && (
          <View style={styles.contextBanner}>
            <Pressable
              onPress={() => router.push('/species/latrodectus-tredecimguttatus' as any)}
              style={styles.contextBannerLeft}
            >
              <Image
                source={require('@/assets/images/spider-3d.png')}
                style={styles.contextThumbMini}
                resizeMode="cover"
              />
              <Text style={styles.contextBannerText} numberOfLines={1}>
                {speciesName} <Text style={styles.contextMutedDot}>•</Text> {confidenceText}
              </Text>
              <ChevronRight size={13} color={Palette.forestGreen} />
            </Pressable>

            <Pressable
              onPress={() => setShowContextBanner(false)}
              style={styles.contextDismissBtn}
              accessibilityLabel="Dismiss observation header"
            >
              <X size={14} color={Palette.muted} />
            </Pressable>
          </View>
        )}

        {/* ================= 3. AIRY, SPACIOUS MESSAGE STREAM ================= */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          renderItem={({ item }) => {
            if (item.sender === 'user') {
              return (
                <View style={styles.userMessageRow}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userBubbleText}>{item.text}</Text>
                    <View style={styles.userMetaRow}>
                      <Text style={styles.userTimestamp}>{item.time}</Text>
                      <CheckCheck size={13} color="#A8D0BC" />
                    </View>
                  </View>
                </View>
              );
            }

            // REDDY (BOT) ASSISTANT MESSAGE
            const isLiked = likedMessages[item.id] === 'up';
            const isDisliked = likedMessages[item.id] === 'down';
            const isCopied = copiedId === item.id;

            return (
              <View style={styles.botMessageRow}>
                <Image
                  source={require('@/assets/images/spider-logo-3d.png')}
                  style={styles.botAvatar}
                  resizeMode="cover"
                />

                <View style={styles.botCardContainer}>
                  <View style={styles.botBubble}>
                    {Boolean(item.intro) && (
                      <Text style={styles.botIntroText}>{item.intro}</Text>
                    )}

                    {/* Supporting Points / Key Evidence */}
                    {item.supportingPoints && item.supportingPoints.length > 0 && (
                      <View style={styles.cleanListBlock}>
                        {item.supportingPoints.map((pt: string, i: number) => (
                          <View key={i} style={styles.cleanListRow}>
                            <CheckCircle2 size={13} color={Palette.forestGreen} style={styles.listIcon} />
                            <Text style={styles.cleanListText}>{pt}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Uncertainty Points */}
                    {item.uncertainPoints && item.uncertainPoints.length > 0 && (
                      <View style={styles.cleanListBlock}>
                        {item.uncertainPoints.map((pt: string, i: number) => (
                          <View key={i} style={styles.cleanListRow}>
                            <HelpCircle size={13} color="#D97706" style={styles.listIcon} />
                            <Text style={styles.uncertainListText}>{pt}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Action Steps */}
                    {item.actionSteps && item.actionSteps.length > 0 && (
                      <View style={styles.cleanListBlock}>
                        {item.actionSteps.map((step: any) => (
                          <View key={step.number} style={styles.cleanListRow}>
                            <View style={styles.stepNumCircle}>
                              <Text style={styles.stepNumCircleText}>{step.number}</Text>
                            </View>
                            <Text style={styles.cleanListText}>{step.text}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Field Photography Tip */}
                    {Boolean(item.tip) && (
                      <View style={styles.cleanTipStrip}>
                        <Camera size={13} color={Palette.forestGreen} />
                        <Text style={styles.cleanTipText}>{item.tip}</Text>
                      </View>
                    )}

                    <Text style={styles.botTimestamp}>{item.time}</Text>
                  </View>

                  {/* Minimalist Message Actions Toolbar */}
                  <View style={styles.botToolbar}>
                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => handleFeedback(item.id, 'up')}
                      accessibilityLabel="Helpful"
                    >
                      <ThumbsUp size={13} color={isLiked ? Palette.forestGreen : Palette.muted} />
                    </Pressable>

                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => handleFeedback(item.id, 'down')}
                      accessibilityLabel="Not helpful"
                    >
                      <ThumbsDown size={13} color={isDisliked ? Palette.danger : Palette.muted} />
                    </Pressable>

                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => handleCopyMessage(item)}
                      accessibilityLabel="Copy"
                    >
                      {isCopied ? (
                        <CheckCircle2 size={13} color={Palette.forestGreen} />
                      ) : (
                        <Copy size={13} color={Palette.muted} />
                      )}
                    </Pressable>

                    <Pressable
                      style={styles.toolbarIconBtn}
                      onPress={() => handleShareMessage(item)}
                      accessibilityLabel="Share"
                    >
                      <Share2 size={13} color={Palette.muted} />
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
                  <Text style={styles.loadingText}>Reddy is thinking...</Text>
                </View>
              </View>
            ) : null
          }
        />

        {/* ================= 4. STREAMLINED QUICK PROMPT CHIPS ================= */}
        {inputText.length === 0 && (
          <View style={styles.quickPromptsBar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickPromptsScroll}
              keyboardShouldPersistTaps="handled"
            >
              {quickPrompts.map((q) => {
                const IconComp = q.icon;
                return (
                  <Pressable
                    key={q.id}
                    style={({ pressed }) => [styles.quickChip, pressed && styles.pressedSubtle]}
                    onPress={() => handleSend(q.label)}
                  >
                    <IconComp size={12} color={Palette.forestGreen} />
                    <Text style={styles.quickChipLabel}>{q.label}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* ================= 5. MINIMALIST INPUT BAR ================= */}
        <View style={styles.inputDeck}>
          <Pressable
            style={({ pressed }) => [styles.cameraBtn, pressed && styles.pressedSubtle]}
            onPress={() => router.push('/(tabs)/scanner' as any)}
            accessibilityLabel="Attach Photo"
          >
            <Camera size={19} color={Palette.ink} />
          </Pressable>

          <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
            <TextInput
              ref={textInputRef}
              style={styles.textInput}
              placeholder="Ask Reddy anything..."
              placeholderTextColor={Palette.muted}
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
              editable={!loading}
            />

            {inputText.trim().length === 0 && (
              <Pressable
                style={styles.micInlineBtn}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setInputText('Is this spider safe to observe?');
                }}
                accessibilityLabel="Voice Prompt"
              >
                <Mic size={18} color={Palette.muted} />
              </Pressable>
            )}
          </View>

          <Pressable
            style={[
              styles.sendButton,
              inputText.trim().length > 0 ? styles.sendButtonActive : styles.sendButtonInactive,
              loading && styles.sendButtonDisabled,
            ]}
            onPress={() => handleSend()}
            disabled={!inputText.trim() || loading}
            accessibilityLabel="Send Message"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Send size={16} color="#FFFFFF" strokeWidth={2.5} />
            )}
          </Pressable>
        </View>

        {/* ================= 6. EMERGENCY BITE PROTOCOL MODAL ================= */}
        <Modal
          visible={showEmergencyModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowEmergencyModal(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.emergencyModalCard}>
              <View style={styles.emergencyModalHeader}>
                <View style={styles.emergencyIconRing}>
                  <ShieldAlert size={22} color="#FFFFFF" />
                </View>
                <View style={styles.emergencyHeaderTextWrap}>
                  <Text style={styles.emergencyModalTitle}>Bite Safety Protocol</Text>
                  <Text style={styles.emergencyModalSubtitle}>
                    Immediate first-aid actions
                  </Text>
                </View>
                <Pressable
                  onPress={() => setShowEmergencyModal(false)}
                  style={styles.modalCloseBtn}
                >
                  <X size={18} color={Palette.ink} />
                </Pressable>
              </View>

              <View style={styles.emergencyStepsList}>
                <View style={styles.emergencyStepItem}>
                  <Text style={styles.emergencyStepNum}>1</Text>
                  <Text style={styles.emergencyStepText}>
                    <Text style={styles.boldText}>Stay Calm & Still: </Text>
                    Immobilize the affected limb to slow venom flow.
                  </Text>
                </View>
                <View style={styles.emergencyStepItem}>
                  <Text style={styles.emergencyStepNum}>2</Text>
                  <Text style={styles.emergencyStepText}>
                    <Text style={styles.boldText}>Do NOT Cut or Tourniquet: </Text>
                    Avoid suction, incisions, or tourniquets.
                  </Text>
                </View>
                <View style={styles.emergencyStepItem}>
                  <Text style={styles.emergencyStepNum}>3</Text>
                  <Text style={styles.emergencyStepText}>
                    <Text style={styles.boldText}>Apply Cold Pack: </Text>
                    Wrapped cold pack relieves localized pain.
                  </Text>
                </View>
                <View style={styles.emergencyStepItem}>
                  <Text style={styles.emergencyStepNum}>4</Text>
                  <Text style={styles.emergencyStepText}>
                    <Text style={styles.boldText}>Seek Hospital Care: </Text>
                    Contact poison control or local emergency services.
                  </Text>
                </View>
              </View>

              {/* Emergency Hotline Buttons */}
              <View style={styles.emergencyHotlinesBlock}>
                <Pressable
                  style={styles.hotlineActionBtn}
                  onPress={() => Linking.openURL('tel:0537686464')}
                >
                  <PhoneCall size={15} color="#FFFFFF" />
                  <Text style={styles.hotlineActionText}>
                    Morocco CAPM • 0537-68-64-64
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.hotlineActionBtn, styles.hotlineSecBtn]}
                  onPress={() => Linking.openURL('tel:000')}
                >
                  <PhoneCall size={15} color={Palette.danger} />
                  <Text style={[styles.hotlineActionText, { color: Palette.danger }]}>
                    Australia Emergency • 000 / 13 11 26
                  </Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => setShowEmergencyModal(false)}
                style={styles.dismissEmergencyBtn}
              >
                <Text style={styles.dismissEmergencyText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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

  // ================= 1. CLEAN TOP BAR =================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: Palette.canvas,
    borderBottomWidth: 1,
    borderBottomColor: '#EDE7DC',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reddyProfileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginLeft: 6,
  },
  reddyAvatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    overflow: 'hidden',
    position: 'relative',
  },
  reddyAvatarImg: {
    width: '100%',
    height: '100%',
  },
  onlineBadgeRing: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Palette.forestGreen,
    borderWidth: 1.5,
    borderColor: Palette.paper,
  },
  headerTitleGroup: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Palette.ink,
  },
  headerSubtitle: {
    fontSize: 11,
    color: Palette.muted,
    marginTop: 1,
  },
  emergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF2F0',
    borderWidth: 1,
    borderColor: '#FAD5CF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  emergencyBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: Palette.danger,
    letterSpacing: 0.4,
  },

  // ================= 2. LIGHTWEIGHT CONTEXT BANNER =================
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Palette.paper,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEAE2',
  },
  contextBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  contextThumbMini: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },
  contextBannerText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.ink,
  },
  contextMutedDot: {
    color: Palette.muted,
    fontWeight: '400',
  },
  contextDismissBtn: {
    padding: 4,
    marginLeft: 8,
  },

  // ================= 3. MESSAGE STREAM =================
  messagesList: {
    paddingHorizontal: Spacing.md,
    paddingTop: 12,
    paddingBottom: 10,
    gap: 14,
  },

  // User Message
  userMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  userBubble: {
    backgroundColor: '#1E4D36', // Tactical Forest Green
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '82%',
  },
  userBubbleText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    fontWeight: '400',
  },
  userMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  userTimestamp: {
    fontSize: 10,
    color: '#A8D0BC',
  },

  // Bot Message
  botMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    maxWidth: '92%',
  },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 2,
  },
  botCardContainer: {
    flex: 1,
  },
  botBubble: {
    backgroundColor: Palette.paper,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    padding: 13,
    gap: 9,
    shadowColor: '#17211F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  botIntroText: {
    fontSize: 13.5,
    color: Palette.ink,
    lineHeight: 20,
  },

  // Clean Bullet Points (No nested boxes)
  cleanListBlock: {
    gap: 6,
    paddingVertical: 2,
  },
  cleanListRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  listIcon: {
    marginTop: 3,
  },
  cleanListText: {
    flex: 1,
    fontSize: 13,
    color: Palette.ink,
    lineHeight: 18,
  },
  uncertainListText: {
    flex: 1,
    fontSize: 12.5,
    color: '#8A5300',
    lineHeight: 18,
  },
  stepNumCircle: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: Palette.forestGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumCircleText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Delicate Tip Strip
  cleanTipStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F2EDE4',
  },
  cleanTipText: {
    flex: 1,
    fontSize: 12,
    fontStyle: 'italic',
    color: Palette.muted,
    lineHeight: 16,
  },

  botTimestamp: {
    fontSize: 10,
    color: Palette.muted,
    alignSelf: 'flex-end',
    marginTop: 1,
  },

  // Minimal Toolbar
  botToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
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
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.paper,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  loadingText: {
    fontSize: 12,
    color: Palette.muted,
  },

  // ================= 4. STREAMLINED QUICK PROMPTS =================
  quickPromptsBar: {
    paddingVertical: 4,
  },
  quickPromptsScroll: {
    paddingHorizontal: Spacing.md,
    gap: 6,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  quickChipLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: Palette.ink,
  },

  // ================= 5. MINIMALIST INPUT BAR =================
  inputDeck: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 6,
    paddingBottom: Spacing.xs,
    backgroundColor: Palette.canvas,
    gap: 8,
  },
  cameraBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: '#E4DDD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.paper,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: '#E4DDD3',
    paddingHorizontal: 12,
    height: 40,
  },
  inputWrapperFocused: {
    borderColor: Palette.forestGreen,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 13.5,
    color: Palette.ink,
    paddingVertical: 0,
  },
  micInlineBtn: {
    padding: 4,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: Palette.forestGreen,
  },
  sendButtonInactive: {
    backgroundColor: '#DCD6CD',
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },

  // ================= 6. EMERGENCY MODAL =================
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  emergencyModalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Palette.paper,
    borderRadius: 20,
    padding: Spacing.lg,
    gap: 12,
  },
  emergencyModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emergencyIconRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Palette.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyHeaderTextWrap: {
    flex: 1,
  },
  emergencyModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Palette.ink,
  },
  emergencyModalSubtitle: {
    fontSize: 11.5,
    color: Palette.muted,
  },
  modalCloseBtn: {
    padding: 6,
  },
  emergencyStepsList: {
    backgroundColor: '#FFF8F6',
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  emergencyStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  emergencyStepNum: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Palette.danger,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 16,
  },
  emergencyStepText: {
    flex: 1,
    fontSize: 11.5,
    color: Palette.ink,
    lineHeight: 16,
  },
  boldText: {
    fontWeight: '800',
  },
  emergencyHotlinesBlock: {
    gap: 6,
  },
  hotlineActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Palette.danger,
    borderRadius: Radii.pill,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  hotlineSecBtn: {
    backgroundColor: '#FFF2F0',
    borderWidth: 1,
    borderColor: '#FAD5CF',
  },
  hotlineActionText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dismissEmergencyBtn: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  dismissEmergencyText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Palette.muted,
  },

  pressedSubtle: {
    opacity: 0.8,
  },
});
