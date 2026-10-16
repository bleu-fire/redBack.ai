import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ChevronRight, MapPin } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { getFullImageUrl } from '@/data/api/api';
import { getSeasonalBadgeStyle } from './homeUtils';
import { seasonalStyles } from './homeSeasonalRadar.styles';

interface HomeSeasonalRadarProps {
  seasonalSpecies: any[];
}

export const HomeSeasonalRadar: React.FC<HomeSeasonalRadarProps> = ({ seasonalSpecies }) => {
  return (
    <View style={seasonalStyles.seasonalSection}>
      <View style={seasonalStyles.sectionHeader}>
        <Text style={seasonalStyles.sectionTitle}>Active This Season</Text>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push('/(tabs)/explore' as any);
          }}
          style={seasonalStyles.seeAllBtn}
          accessibilityRole="button"
          accessibilityLabel="See all active seasonal species"
        >
          <Text style={seasonalStyles.seeAllText}>See all</Text>
          <ChevronRight size={13} color={Palette.muted} strokeWidth={2.2} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={seasonalStyles.seasonalScroll}>
        {seasonalSpecies.map((sp) => {
          const imgUrl = getFullImageUrl(sp.serverImage);
          const badgeStyle = getSeasonalBadgeStyle(sp.badgeText);

          return (
            <Pressable
              key={sp.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push(`/species/${sp.id}` as any);
              }}
              style={({ pressed }) => [seasonalStyles.seasonalCard, pressed && seasonalStyles.cardPressed]}
              accessibilityRole="button"
              accessibilityLabel={`${sp.name}, ${sp.scientificName}`}
            >
              <Image
                source={imgUrl ? { uri: imgUrl } : sp.localImageFallback}
                style={seasonalStyles.seasonalCardImg}
                resizeMode="cover"
              />

              <View style={seasonalStyles.seasonalCardBody}>
                <View style={seasonalStyles.seasonalBadgeRow}>
                  <View style={seasonalStyles.regionTag}>
                    <MapPin size={11} color={Palette.muted} />
                    <Text style={seasonalStyles.regionTagText}>{sp.region}</Text>
                  </View>
                  <View style={[seasonalStyles.toxPill, { backgroundColor: badgeStyle.bg }]}>
                    <Text style={[seasonalStyles.toxPillText, { color: badgeStyle.color }]}>{sp.badgeText}</Text>
                  </View>
                </View>

                <Text style={seasonalStyles.seasonalCardName} numberOfLines={1}>
                  {sp.name}
                </Text>
                <Text style={seasonalStyles.seasonalCardSciName} numberOfLines={1}>
                  {sp.scientificName}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
