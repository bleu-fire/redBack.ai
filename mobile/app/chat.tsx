import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Send,
  Sparkles,
  AlertTriangle,
  Bot,
  User,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { useStore } from '@/store/stores';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function AIChatScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ speciesName?: string; scientificName?: string }>();
  const user = useStore((state) => state.user);

  const speciesName = params.speciesName || 'Redback spider';
  const scientificName = params.scientificName || 'Latrodectus hasselti';

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const INITIAL_MESSAGES: ChatMessage[] = [
    {
      id: '1',
      sender: 'ai',
      text: `Hello Explorer! I am your redBack.ai Naturalist Assistant. I see you just scanned a **${speciesName}** (*${scientificName}*).\n\nAsk me anything about its venom, bite first aid, habitat, or how to safely relocate it without harm.`,
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);

  const QUICK_PROMPTS = [
    '🚨 Is it dangerous to humans?',
    '🩹 What if I get bitten?',
    '🏡 How do I safely remove it?',
    '🔍 How can I identify a female?',
  ];

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('bite') || q.includes('bitten') || q.includes('first aid') || q.includes('stung')) {
      return `🩹 **First Aid for ${speciesName} Bites:**\n\n1. **Stay calm** and keep the patient still to minimize venom circulation.\n2. **Apply a cold ice pack** or cold compress wrapped in a towel directly to the bite site to alleviate local pain (do NOT apply excessive pressure).\n3. **Do NOT use a pressure immobilization bandage** or tourniquet (pressure immobilization is for funnel-webs, not redbacks).\n4. **Seek urgent medical attention** at your nearest hospital or emergency center. Highly effective antivenom is readily available in Australia.`;
    }

    if (q.includes('dangerous') || q.includes('danger') || q.includes('poison') || q.includes('venom') || q.includes('kill') || q.includes('deadly')) {
      return `⚠️ **Toxicity & Hazard Level:**\n\nYes, the female **${speciesName}** (*${scientificName}*) possesses potent neurotoxic venom containing **alpha-latrotoxin**.\n\nA bite can cause severe localized pain that spreads, intense sweating, nausea, headache, and muscle weakness. While fatal cases have been extremely rare since the introduction of antivenom in 1956, children and the elderly are at higher risk. Treat with extreme respect and do not handle!`;
    }

    if (q.includes('remove') || q.includes('relocate') || q.includes('catch') || q.includes('kill') || q.includes('get rid')) {
      return `🏡 **Safe Relocation Technique:**\n\n1. **Wear protective gloves** and long sleeves.\n2. Place an open, clean glass jar or clear container over the spider.\n3. Gently slide a stiff piece of cardboard or heavy paper underneath the jar's opening to seal the spider inside.\n4. Carefully carry the secured container outside and release the spider into dense bushland, compost, or shrubbery away from building entryways.\n*Avoid using pesticides indoors as redbacks are beneficial insect predators.*`;
    }

    if (q.includes('female') || q.includes('male') || q.includes('identify') || q.includes('look like') || q.includes('color')) {
      return `🔍 **Physical Identification:**\n\n• **Female (High Concern)**: Has a rounded, pea-sized glossy black abdomen with the signature longitudinal **crimson-red stripe** on top and an hourglass mark underneath (~10 mm body size).\n• **Male (Harmless)**: Much smaller (~3–4 mm), light brown with pale white or red markings, and its fangs are generally too small to penetrate human skin.`;
    }

    if (q.includes('web') || q.includes('nest') || q.includes('habitat') || q.includes('where') || q.includes('hide')) {
      return `🕸️ **Web & Habitat Traits:**\n\nRedbacks construct irregular, tangled, messy webs made of extremely strong, elastic silk threads. They prefer dry, sheltered, warm environments such as garden sheds, under outdoor furniture, mailboxes, under eaves, and among discarded timber or bricks.`;
    }

    return `Thank you for asking about the **${speciesName}** (*${scientificName}*)! It plays an important ecological role keeping insect and cockroach populations in balance.\n\nIs there something specific you'd like to check, such as **bite safety**, **safe relocation**, or **distinctive anatomy**?`;
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={[styles.inner, { paddingTop: insets.top, paddingBottom: insets.bottom + 8 }]}>
        {/* 1. Header with Species Avatar and Specialist Indicator */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={22} color={Palette.ink} />
          </Pressable>

          <View style={styles.headerCenter}>
            <View style={styles.avatarWrap}>
              <Image
                source={require('@/assets/images/spider-3d.png')}
                style={styles.avatarImg}
                resizeMode="contain"
              />
              <View style={styles.onlineDot} />
            </View>

            <View style={styles.headerInfo}>
              <View style={styles.headerTitleRow}>
                <Text style={styles.headerTitle}>AI Naturalist</Text>
                <Sparkles size={14} color={Palette.gold} />
              </View>
              <Text style={styles.headerSub} numberOfLines={1}>
                {speciesName} Specialist
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleResetChat}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Reset conversation"
          >
            <RotateCcw size={18} color={Palette.muted} />
          </Pressable>
        </View>

        {/* 2. Official Medical Disclaimer Banner */}
        <View style={styles.disclaimerBanner}>
          <ShieldAlert size={16} color={Palette.danger} style={styles.disclaimerIcon} />
          <Text style={styles.disclaimerText}>
            Educational identification only. If bitten or experiencing symptoms, seek emergency medical care immediately.
          </Text>
        </View>

        {/* 3. Messages Scroll View */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((item) => {
            const isAI = item.sender === 'ai';
            return (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  isAI ? styles.messageRowAI : styles.messageRowUser,
                ]}
              >
                {isAI && (
                  <View style={styles.aiBadgeIcon}>
                    <Bot size={15} color="#FFFFFF" />
                  </View>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    isAI ? styles.aiBubble : styles.userBubble,
                  ]}
                >
                  <Text style={[styles.bubbleText, isAI ? styles.aiText : styles.userText]}>
                    {item.text}
                  </Text>
                  <Text style={[styles.timestampText, isAI ? styles.aiTimestamp : styles.userTimestamp]}>
                    {item.timestamp}
                  </Text>
                </View>

                {!isAI && (
                  <View style={styles.userBadgeIcon}>
                    <User size={15} color={Palette.moss} />
                  </View>
                )}
              </View>
            );
          })}

          {isTyping && (
            <View style={[styles.messageRow, styles.messageRowAI]}>
              <View style={styles.aiBadgeIcon}>
                <Bot size={15} color="#FFFFFF" />
              </View>
              <View style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}>
                <ActivityIndicator size="small" color={Palette.moss} />
                <Text style={styles.typingText}>Analyzing taxonomy & safety...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* 4. Quick Suggested Questions */}
        <View style={styles.quickPromptsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickPromptsScroll}
          >
            {QUICK_PROMPTS.map((prompt) => (
              <Pressable
                key={prompt}
                onPress={() => handleSend(prompt)}
                style={({ pressed }) => [styles.promptChip, pressed && styles.pressed]}
              >
                <Text style={styles.promptChipText}>{prompt}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 5. Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={`Ask about ${speciesName}...`}
            placeholderTextColor={Palette.mutedLight}
            style={styles.textInput}
            multiline={false}
            returnKeyType="send"
            onSubmitEditing={() => handleSend()}
          />

          <Pressable
            onPress={() => handleSend()}
            disabled={!input.trim()}
            style={({ pressed }) => [
              styles.sendBtn,
              !input.trim() && styles.sendBtnDisabled,
              pressed && styles.pressed,
            ]}
          >
            <Send size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  inner: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
    backgroundColor: Palette.canvas,
  },
  iconBtn: {
    padding: Spacing.xs,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: Radii.pill,
    backgroundColor: Palette.mossSoft,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarImg: {
    width: 28,
    height: 28,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  headerInfo: {
    alignItems: 'flex-start',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: 16,
    fontWeight: '800',
    color: Palette.ink,
  },
  headerSub: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
  },
  disclaimerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.coralSoft,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Palette.dangerBorder,
  },
  disclaimerIcon: {
    flexShrink: 0,
  },
  disclaimerText: {
    fontFamily: Typography.body,
    fontSize: 11,
    color: Palette.danger,
    fontWeight: '600',
    flex: 1,
    lineHeight: 14,
  },
  messagesList: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    gap: 14,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  messageRowAI: {
    justifyContent: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  aiBadgeIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.moss,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  userBadgeIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Palette.mossSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  aiBubble: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Palette.moss,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontFamily: Typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  aiText: {
    color: Palette.ink,
  },
  userText: {
    color: '#FFFFFF',
  },
  timestampText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  aiTimestamp: {
    color: Palette.mutedLight,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  typingText: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    color: Palette.muted,
    fontStyle: 'italic',
  },
  quickPromptsContainer: {
    paddingVertical: 6,
    backgroundColor: Palette.canvas,
  },
  quickPromptsScroll: {
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  promptChip: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.pill,
  },
  promptChipText: {
    fontFamily: Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: Palette.inkSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
    backgroundColor: Palette.canvas,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: Palette.ink,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: Palette.mutedLight,
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.85,
  },
});
