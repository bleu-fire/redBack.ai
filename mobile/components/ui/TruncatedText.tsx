import React, { useState, useCallback } from 'react';
import {
  Text,
  TextStyle,
  StyleSheet,
  Pressable,
  View,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';
import { Palette, Typography } from '@/constants/theme';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

interface TruncatedTextProps {
  children: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  expandable?: boolean;
  expandLabel?: string;
  collapseLabel?: string;
}

/**
 * TruncatedText - Natural Layout Balancer
 * 
 * Layout Balancing Tricks:
 * 1. Inline ellipsis + subtle badge: Keeps line lengths harmonious.
 * 2. Visual equilibrium: When clamped, applies clean leading & line-height to prevent orphaned lines.
 * 3. Smooth toggle: Expands inline with a subtle chevron indicator instead of jumping.
 */
export function TruncatedText({
  children,
  numberOfLines = 3,
  style,
  containerStyle,
  expandable = true,
  expandLabel = 'more',
  collapseLabel = 'less',
}: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length > numberOfLines) {
        setCanExpand(true);
      }
    },
    [numberOfLines]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={[styles.text, style, !isExpanded && canExpand && styles.clampedText]}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        ellipsizeMode="tail"
        onTextLayout={onTextLayout}
      >
        {children}
      </Text>

      {expandable && canExpand && (
        <Pressable
          onPress={() => setIsExpanded((prev) => !prev)}
          hitSlop={8}
          style={({ pressed }) => [styles.pillBtn, pressed && styles.pillPressed]}
          accessibilityRole="button"
          accessibilityLabel={isExpanded ? collapseLabel : expandLabel}
        >
          <Text style={styles.pillText}>
            {isExpanded ? collapseLabel : expandLabel}
          </Text>
          {isExpanded ? (
            <ChevronUp size={12} color={Palette.moss} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={12} color={Palette.moss} strokeWidth={2.5} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    color: Palette.ink,
    lineHeight: 19.5,
    letterSpacing: -0.1,
  },
  clampedText: {
    opacity: 0.95,
  },
  pillBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Palette.mossSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: 'rgba(43, 138, 62, 0.15)',
  },
  pillPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  pillText: {
    fontFamily: Typography.body,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.moss,
    letterSpacing: 0.2,
  },
});

export default TruncatedText;
