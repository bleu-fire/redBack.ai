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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Send, Bot } from 'lucide-react-native';
import { Palette, Spacing, Radii, Typography } from '@/constants/theme';
import { askNaturalistAI } from '@/data/api/logic';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');
  const  SendMessageInto = async ()=>{
   try{
    if(inputText.trim()){
      const reply =  await askNaturalistAI(inputText)
      console.log(reply);
      setInputText('');
    }
   }
   catch(err){
    console.error("error in the chat");
   }
  }

  const [messages, setmessage] = useState<any[]>([]);

  

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
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => null}
            contentContainerStyle={styles.messagesList}
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
          />
          <Pressable style={styles.sendBtn}  onPress={SendMessageInto}>
            <Send size={18} color={Palette.paper} />
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
});
