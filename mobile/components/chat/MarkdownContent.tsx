import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { Colors, Palette, Typography } from '@/constants/theme';

interface MarkdownContentProps {
  content: string;
}

/**
 * Tokenizes an inline string to format:
 * - ++green highlight badge++
 * - **bold text**
 * - *italic text*
 * - normal text
 */
export function renderInlineSpans(text: string): React.ReactNode {
  if (!text) return null;

  // Clean any stray || or ~ delimiters
  const sanitized = text
    .replace(/\|\|([^|\n]+)\|\|/g, '++$1++')
    .replace(/~~([^~\n]+)~~/g, '++$1++')
    .replace(/~([^~\n]+)~/g, '++$1++')
    .replace(/[|~]/g, '');

  const regex = /(\+\+[^+]+\+\+|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = sanitized.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith('++') && part.endsWith('++')) {
      const inner = part.slice(2, -2);
      return (
        <Text key={`hl-${idx}`} style={styles.greenHighlightBadge}>
          {` ${inner} `}
        </Text>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <Text key={`b-${idx}`} style={styles.boldSpan}>
          {inner}
        </Text>
      );
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      return (
        <Text key={`it-${idx}`} style={styles.italicSpan}>
          {inner}
        </Text>
      );
    }

    return <Text key={`txt-${idx}`}>{part}</Text>;
  });
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  if (!content) return null;

  const rawLines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let prevWasEmpty = false;

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i].trim();

    if (!rawLine) {
      if (!prevWasEmpty) {
        elements.push(<View key={`space-${i}`} style={styles.mdSpacer} />);
        prevWasEmpty = true;
      }
      continue;
    }
    prevWasEmpty = false;

    // 1. Heading (### Heading, ## Heading, # Heading)
    if (/^#{1,3}\s+/.test(rawLine)) {
      const headingText = rawLine.replace(/^#{1,3}\s+/, '');
      elements.push(
        <View key={`heading-${i}`} style={styles.mdHeadingRow}>
          <View style={styles.mdHeadingPill} />
          <Text style={styles.mdHeadingText}>{renderInlineSpans(headingText)}</Text>
        </View>
      );
      continue;
    }

    // 2. Bullet list item (- item, * item, • item)
    if (/^[-*•]\s+/.test(rawLine)) {
      const bulletText = rawLine.replace(/^[-*•]\s+/, '');
      elements.push(
        <View key={`bullet-${i}`} style={styles.mdBulletRow}>
          <View style={styles.mdBulletIconContainer}>
            <CheckCircle2 size={13} color={Palette.forestGreen} />
          </View>
          <Text style={styles.mdBulletText}>{renderInlineSpans(bulletText)}</Text>
        </View>
      );
      continue;
    }

    // 3. Numbered list item (1. item, 2. item)
    const numMatch = rawLine.match(/^(\d+)[.)]\s+(.+)$/);
    if (numMatch) {
      elements.push(
        <View key={`num-${i}`} style={styles.mdNumberedRow}>
          <View style={styles.mdNumberCircle}>
            <Text style={styles.mdNumberText}>{numMatch[1]}</Text>
          </View>
          <Text style={styles.mdNumberedText}>{renderInlineSpans(numMatch[2])}</Text>
        </View>
      );
      continue;
    }

    // 4. Ignore tap prompt or filter out
    if (/tap any of the/i.test(rawLine)) {
      continue;
    }

    // 5. Note / Tip text rendered cleanly without camera card
    if (/^\*?(Tip|Note):\s*/i.test(rawLine)) {
      const tipText = rawLine.replace(/^\*?(Tip|Note):\s*/i, '').replace(/\*+$/, '');
      elements.push(
        <Text key={`tip-${i}`} style={styles.mdNoteText}>
          {renderInlineSpans(tipText)}
        </Text>
      );
      continue;
    }

    // 5. Standard paragraph text
    elements.push(
      <Text key={`p-${i}`} style={styles.mdParagraph}>
        {renderInlineSpans(rawLine)}
      </Text>
    );
  }

  return <View style={styles.container}>{elements}</View>;
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  mdSpacer: {
    height: 4,
  },
  mdHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    marginBottom: 2,
  },
  mdHeadingPill: {
    width: 3.5,
    height: 14,
    backgroundColor: Palette.forestGreen,
    borderRadius: 2,
  },
  mdHeadingText: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.inkPrimary,
    letterSpacing: 0.2,
  },
  mdBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 1.5,
  },
  mdBulletIconContainer: {
    marginTop: 3,
  },
  mdBulletText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: Colors.inkPrimary,
  },
  mdNumberedRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 1.5,
  },
  mdNumberCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Palette.forestGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  mdNumberText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  mdNumberedText: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: Colors.inkPrimary,
  },
  mdParagraph: {
    fontFamily: Typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: Colors.inkPrimary,
  },
  mdNoteText: {
    fontFamily: Typography.body,
    fontSize: 12.5,
    fontStyle: 'italic',
    color: Colors.inkMuted,
    lineHeight: 17,
    marginTop: 4,
  },
  greenHighlightBadge: {
    backgroundColor: '#E8F5E9',
    color: '#1B5E20',
    fontWeight: '700',
    fontSize: 12.5,
  },
  boldSpan: {
    fontWeight: '700',
    color: Colors.inkPrimary,
  },
  italicSpan: {
    fontStyle: 'italic',
    color: Colors.inkPrimary,
  },
});
