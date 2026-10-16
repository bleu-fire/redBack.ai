import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Lock } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { getFullImageUrl } from '@/data/api/api';
import { dexStyles } from './homeSpiderDexCard.styles';

interface HomeSpiderDexCardProps {
  progressPercent: number;
  discoveredPreview: any[];
}

export const HomeSpiderDexCard: React.FC<HomeSpiderDexCardProps> = ({
  progressPercent,
  discoveredPreview,
}) => {
  return (
    <Pressable
      onPress={() => router.push('/(tabs)/explore' as any)}
      style={({ pressed }) => [dexStyles.dexCard, pressed && dexStyles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel="Open SpiderDex"
    >
      <View style={dexStyles.dexCardHeader}>
        <View>
          <Text style={dexStyles.dexCardEyebrow}>FIELD JOURNAL</Text>
          <Text style={dexStyles.dexCardTitle}>SpiderDex Collection</Text>
        </View>
        <View style={dexStyles.dexPercentPill}>
          <Text style={dexStyles.dexPercentText}>{progressPercent}% Logged</Text>
        </View>
      </View>

      <View style={dexStyles.dexProgressBarBg}>
        <View style={[dexStyles.dexProgressBarFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={dexStyles.dexShelfRow}>
        <View style={dexStyles.dexAvatarsGroup}>
          {discoveredPreview.map((item, idx) => {
            const imgUrl = getFullImageUrl(item.serverImage);
            return (
              <View
                key={item.id}
                style={[dexStyles.dexAvatarWrap, { marginLeft: idx === 0 ? 0 : -10 }]}
              >
                <Image
                  source={imgUrl ? { uri: imgUrl } : item.localImageFallback}
                  style={dexStyles.dexAvatarImg}
                  resizeMode="cover"
                />
              </View>
            );
          })}

          <View style={[dexStyles.dexAvatarWrap, dexStyles.dexLockedAvatar, { marginLeft: -10 }]}>
            <Lock size={12} color={Palette.muted} />
          </View>
          <View style={[dexStyles.dexAvatarWrap, dexStyles.dexLockedAvatar, { marginLeft: -10 }]}>
            <Lock size={12} color={Palette.muted} />
          </View>
        </View>

        <View style={dexStyles.dexActionHint}>
          <Text style={dexStyles.dexActionText}>View Catalog</Text>
          <ChevronRight size={14} color={Palette.ink} />
        </View>
      </View>
    </Pressable>
  );
};
