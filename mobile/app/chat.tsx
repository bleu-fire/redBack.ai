import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Text,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/theme';
import { askNaturalistAI } from '@/data/api/logic';
import { StructuredChatMessage } from '@/components/chat/chat.types';
import { getInitialMessages, parseAiResponse } from '@/components/chat/chatUtils';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessageItem } from '@/components/chat/ChatMessageItem';
import { ChatInputDeck } from '@/components/chat/ChatInputDeck';
import { styles } from '@/components/chat/chat.styles';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

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
  const [showContextBanner, setShowContextBanner] = useState(true);
  const [likedMessages, setLikedMessages] = useState<Record<string, 'up' | 'down' | undefined>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<StructuredChatMessage[]>(() =>
    getInitialMessages(speciesName, scientificName)
  );

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
        <ChatHeader
          speciesName={speciesName}
          confidenceText={confidenceText}
          showContextBanner={showContextBanner}
          onDismissBanner={() => setShowContextBanner(false)}
        />

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          renderItem={({ item }) => (
            <ChatMessageItem
              item={item}
              isLiked={likedMessages[item.id] === 'up'}
              isDisliked={likedMessages[item.id] === 'down'}
              isCopied={copiedId === item.id}
              onFeedback={handleFeedback}
              onCopy={handleCopyMessage}
              onShare={handleShareMessage}
            />
          )}
          ListFooterComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <Image
                  source={require('@/assets/images/spider-logo-3d.png')}
                  style={styles.botAvatarLoading}
                />
                <View style={styles.loadingBubble}>
                  <ActivityIndicator size="small" color={Colors.forestGreen} />
                  <Text style={styles.loadingText}>Reddy is thinking...</Text>
                </View>
              </View>
            ) : null
          }
        />

        <ChatInputDeck
          inputText={inputText}
          setInputText={setInputText}
          loading={loading}
          onSend={handleSend}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
