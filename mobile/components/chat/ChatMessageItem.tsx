import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import {
  CheckCircle2,
  CheckCheck,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
} from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { StructuredChatMessage } from './chat.types';
import { styles } from './ChatMessageItem.styles';

import { MarkdownContent, renderInlineSpans } from './MarkdownContent';

interface ChatMessageItemProps {
  item: StructuredChatMessage;
  isLiked?: boolean;
  isDisliked?: boolean;
  isCopied?: boolean;
  onFeedback: (msgId: string, type: 'up' | 'down') => void;
  onCopy: (msg: StructuredChatMessage) => void;
  onShare: (msg: StructuredChatMessage) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  item,
  isLiked = false,
  isDisliked = false,
  isCopied = false,
  onFeedback,
  onCopy,
  onShare,
}) => {
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

  return (
    <View style={styles.botMessageRow}>
      <Image
        source={require('@/assets/images/spider-logo-3d.png')}
        style={styles.botAvatar}
        resizeMode="cover"
      />

      <View style={styles.botCardContainer}>
        <View style={styles.botBubble}>
          {Boolean(item.intro || item.text) && (
            <MarkdownContent content={item.intro || item.text || ''} />
          )}

          {/* Supporting Points / Key Evidence */}
          {item.supportingPoints && item.supportingPoints.length > 0 && (
            <View style={styles.cleanListBlock}>
              {item.supportingPoints.map((pt, i) => (
                <View key={i} style={styles.cleanListRow}>
                  <CheckCircle2
                    size={13}
                    color={Palette.forestGreen}
                    style={styles.listIcon}
                  />
                  <Text style={styles.cleanListText}>{renderInlineSpans(pt)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Uncertainty Points */}
          {item.uncertainPoints && item.uncertainPoints.length > 0 && (
            <View style={styles.cleanListBlock}>
              {item.uncertainPoints.map((pt, i) => (
                <View key={i} style={styles.cleanListRow}>
                  <HelpCircle size={13} color="#D97706" style={styles.listIcon} />
                  <Text style={styles.uncertainListText}>{renderInlineSpans(pt)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Action Steps */}
          {item.actionSteps && item.actionSteps.length > 0 && (
            <View style={styles.cleanListBlock}>
              {item.actionSteps.map((step) => (
                <View key={step.number} style={styles.cleanListRow}>
                  <View style={styles.stepNumCircle}>
                    <Text style={styles.stepNumCircleText}>{step.number}</Text>
                  </View>
                  <Text style={styles.cleanListText}>{renderInlineSpans(step.text)}</Text>
                </View>
              ))}
            </View>
          )}



          <Text style={styles.botTimestamp}>{item.time}</Text>
        </View>

        {/* Minimalist Message Actions Toolbar */}
        <View style={styles.botToolbar}>
          <Pressable
            style={({ pressed }) => [
              styles.toolbarIconBtn,
              isLiked && styles.toolbarIconBtnActive,
              pressed && styles.toolbarIconBtnPressed,
            ]}
            onPress={() => onFeedback(item.id, 'up')}
            accessibilityLabel="Helpful"
          >
            <ThumbsUp
              size={13}
              color={isLiked ? Palette.forestGreen : Palette.muted}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.toolbarIconBtn,
              isDisliked && styles.toolbarIconBtnActive,
              pressed && styles.toolbarIconBtnPressed,
            ]}
            onPress={() => onFeedback(item.id, 'down')}
            accessibilityLabel="Not helpful"
          >
            <ThumbsDown
              size={13}
              color={isDisliked ? Palette.danger : Palette.muted}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.toolbarIconBtn,
              isCopied && styles.toolbarIconBtnActive,
              pressed && styles.toolbarIconBtnPressed,
            ]}
            onPress={() => onCopy(item)}
            accessibilityLabel="Copy"
          >
            {isCopied ? (
              <CheckCircle2 size={13} color={Palette.forestGreen} />
            ) : (
              <Copy size={13} color={Palette.muted} />
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.toolbarIconBtn,
              pressed && styles.toolbarIconBtnPressed,
            ]}
            onPress={() => onShare(item)}
            accessibilityLabel="Share"
          >
            <Share2 size={13} color={Palette.muted} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
