import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Camera, Mic, Send } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { QUICK_PROMPTS } from './chatUtils';
import { styles } from './chat.styles';

interface ChatInputDeckProps {
  inputText: string;
  setInputText: (text: string) => void;
  loading: boolean;
  onSend: (overrideText?: string) => void;
}

export const ChatInputDeck: React.FC<ChatInputDeckProps> = ({
  inputText,
  setInputText,
  loading,
  onSend,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  return (
    <>
      {/* Streamlined Quick Prompt Chips */}
      {inputText.length === 0 && (
        <View style={styles.quickPromptsBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickPromptsScroll}
            keyboardShouldPersistTaps="handled"
          >
            {QUICK_PROMPTS.map((q) => {
              const IconComp = q.icon;
              return (
                <Pressable
                  key={q.id}
                  style={({ pressed }) => [styles.quickChip, pressed && styles.quickChipPressed]}
                  onPress={() => onSend(q.label)}
                >
                  <IconComp size={12} color={Colors.forestGreen} strokeWidth={2.4} />
                  <Text style={styles.quickChipLabel}>{q.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Minimalist Input Bar */}
      <View style={styles.inputDeck}>
        <Pressable
          style={({ pressed }) => [styles.cameraBtn, pressed && styles.cameraBtnPressed]}
          onPress={() => router.push('/(tabs)/scanner' as any)}
          accessibilityLabel="Attach Photo"
        >
          <Camera size={19} color={Colors.inkPrimary} strokeWidth={2.2} />
        </Pressable>

        <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="Ask Reddy anything..."
            placeholderTextColor={Colors.inkMuted}
            value={inputText}
            onChangeText={setInputText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={() => onSend()}
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
              <Mic size={18} color={Colors.inkMuted} strokeWidth={2.2} />
            </Pressable>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            inputText.trim().length > 0 ? styles.sendButtonActive : styles.sendButtonInactive,
            pressed && inputText.trim().length > 0 && styles.sendButtonPressed,
            loading && styles.sendButtonDisabled,
          ]}
          onPress={() => onSend()}
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
    </>
  );
};
