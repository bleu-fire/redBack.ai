import React, { useState } from 'react';
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Send, Bot } from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { askNaturalistAI } from '@/data/api/logic';

export default function ChatScreen() {

  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');
  const [messages, setmessage] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const SendMessageInto = async () => {
    try {
      if (!inputText.trim() || loading) return;

      const userText = inputText.trim();
      setInputText('');

      const userMsg = { id: Date.now().toString(), text: userText, sender: 'user' };
      setmessage((prevMessages) => {
        const newArry = [...prevMessages];
        newArry.push(userMsg);
        return newArry;
      });

      setLoading(true);

      const reply = await askNaturalistAI(userText);

      const userBot = { id: (Date.now() + 1).toString(), text: reply, sender: 'bot' };
      setmessage((prevMessages) => {
        const newArry = [...prevMessages];
        newArry.push(userBot);
        return newArry;
      });

    } catch (err) {
      console.error("error in the chat", err);
      const errorBot = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't reach the server. Please try again.",
        sender: 'bot',
      };
      setmessage((prevMessages) => [...prevMessages, errorBot]);
    } finally {
      setLoading(false);
    }
  };
  

  

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={22} color={Palette.ink} />
          </Pressable>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Naturalist AI</Text>
            <Text style={styles.headerSubtitle}>Spider Identification & Safety</Text>
          </View>
        </View>

        {/* Messages List Area */}
        <View style={styles.messagesContainer}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.sender === 'user' ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.sender === 'user' ? styles.userText : styles.botText,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.messagesList}
            ListFooterComponent={
              loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={Palette.moss} />
                  <Text style={styles.loadingText}>Naturalist AI is thinking...</Text>
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View style={styles.botIconCircle}>
                  <Bot size={28} color={Palette.moss} />
                </View>
                <Text style={styles.emptyTitle}>Ask me anything</Text>
                <Text style={styles.emptySubtitle}>
                  Ask questions about spiders, bite safety, habitats, or taxonomy.
                </Text>
              </View>
            }
          />
        </View>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={Palette.muted}
            value={inputText}
            onChangeText={setInputText}
            editable={!loading}
          />
          <Pressable
            style={[styles.sendBtn, loading && styles.sendBtnDisabled]}
            onPress={SendMessageInto}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={Palette.paper} />
            ) : (
              <Send size={18} color={Palette.paper} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Palette.paper,
    borderBottomWidth: 1,
    borderBottomColor: Palette.line,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radii.pill,
    backgroundColor: Palette.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  headerTitleGroup: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
  },
  headerSubtitle: {
    fontFamily: Typography.body,
    fontSize: 12,
    color: Palette.muted,
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  botIconCircle: {
    width: 60,
    height: 60,
    borderRadius: Radii.pill,
    backgroundColor: Palette.mossSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontFamily: Typography.display,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.ink,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontFamily: Typography.body,
    fontSize: 13,
    color: Palette.muted,
    textAlign: 'center',
    lineHeight: 18,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Palette.paper,
    borderTopWidth: 1,
    borderTopColor: Palette.line,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: Palette.canvas,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.lg,
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.ink,
    borderWidth: 1,
    borderColor: Palette.line,
    marginRight: Spacing.sm,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: Radii.pill,
    backgroundColor: Palette.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    backgroundColor: Palette.surfaceSubtle,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  loadingText: {
    fontSize: 12,
    fontFamily: Typography.body,
    color: Palette.muted,
  },
  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.lg,
    marginBottom: Spacing.sm,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Palette.coral,
    borderBottomRightRadius: 2,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Typography.body,
  },
  userText: {
    color: Palette.paper,
  },
  botText: {
    color: Palette.ink,
  },
});
