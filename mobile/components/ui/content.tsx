import type React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette } from '@/constants/theme';

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 },
  eyebrow: { color: Palette.coral, fontSize: 11, fontWeight: '800', letterSpacing: 1.4, marginBottom: 4 },
  sectionTitle: { color: Palette.ink, fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  action: { color: Palette.coral, fontSize: 13, fontWeight: '700', paddingBottom: 2 },
  pill: { backgroundColor: Palette.mossSoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  pillCoral: { backgroundColor: Palette.coralSoft }, pillGold: { backgroundColor: Palette.goldSoft },
  pillText: { color: Palette.moss, fontSize: 11, fontWeight: '800' },
});

export const contentStyles = styles;

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return <View style={styles.sectionHeader}><View>{eyebrow && <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>}<Text style={styles.sectionTitle}>{title}</Text></View>{action && <Text style={styles.action}>{action}</Text>}</View>;
}

export function Pill({ children, tone = 'moss' }: { children: React.ReactNode; tone?: 'moss' | 'coral' | 'gold' }) {
  return <View style={[styles.pill, tone === 'coral' && styles.pillCoral, tone === 'gold' && styles.pillGold]}><Text style={styles.pillText}>{children}</Text></View>;
}
