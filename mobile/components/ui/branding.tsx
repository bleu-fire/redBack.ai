import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Palette } from '@/constants/theme';

export function BrandLogo({ width = 148, height = 54 }: { width?: number; height?: number }) { return <Image source={require('@/assets/design/redback-logo.png')} contentFit="contain" style={{ width, height }} />; }
export function ProgressDots({ total, active }: { total: number; active: number }) { return <View style={styles.progressDots}>{Array.from({ length: total }).map((_, index) => <View key={index} style={[styles.progressDot, index === active && styles.progressDotActive]} />)}</View>; }

const styles = StyleSheet.create({
    progressDots: {
        flexDirection:
            'row', gap: 7,
        marginBottom: 18
    },
    progressDot: {
        width: 7,
        height: 7,
        borderRadius: 5, backgroundColor: '#688073'
    }, progressDotActive: {
         width: 27,
         backgroundColor: Palette.coral }
});
