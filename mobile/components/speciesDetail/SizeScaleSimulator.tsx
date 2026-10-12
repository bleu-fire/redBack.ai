import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ruler, Bug } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { SpeciesDetail, SizeScaleProfile } from '@/data/speciesData';
import { ScaleBenchmark } from './speciesDetail.types';
import { styles } from './SizeScaleSimulator.styles';

interface SizeScaleSimulatorProps {
  species: SpeciesDetail;
  sizeScale: SizeScaleProfile;
  activeBenchmark: ScaleBenchmark;
  onSelectBenchmark: (b: ScaleBenchmark) => void;
}

export const SizeScaleSimulator: React.FC<SizeScaleSimulatorProps> = ({
  species,
  sizeScale,
  activeBenchmark,
  onSelectBenchmark,
}) => {
  const spiderBoxSize = Math.min(Math.max(sizeScale.legSpanMm * 1.8, 32), 120);
  const spiderIconSize = Math.min(Math.max(sizeScale.legSpanMm * 1.2, 22), 80);

  return (
    <View style={styles.sizeScaleCard}>
      <View style={styles.sizeScaleHeader}>
        <View>
          <Text style={styles.sizeScaleEyebrow}>REAL-LIFE SCALE</Text>
          <Text style={styles.sizeScaleTitle}>Size in Real Life</Text>
        </View>
        <View style={styles.sizeScalePill}>
          <Ruler size={12} color={Palette.ink} />
          <Text style={styles.sizeScalePillText}>
            {sizeScale.bodyMm} mm body • {sizeScale.legSpanMm} mm span
          </Text>
        </View>
      </View>

      {/* Interactive Benchmark Selector Buttons */}
      <View style={styles.benchmarkSelectorRow}>
        <Pressable
          onPress={() => onSelectBenchmark('coin')}
          style={[
            styles.benchmarkBtn,
            activeBenchmark === 'coin' && styles.benchmarkBtnActive,
          ]}
        >
          <Text
            style={[
              styles.benchmarkBtnText,
              activeBenchmark === 'coin' && styles.benchmarkBtnTextActive,
            ]}
          >
            1 Dirham / $1 Coin (25mm)
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onSelectBenchmark('cap')}
          style={[
            styles.benchmarkBtn,
            activeBenchmark === 'cap' && styles.benchmarkBtnActive,
          ]}
        >
          <Text
            style={[
              styles.benchmarkBtnText,
              activeBenchmark === 'cap' && styles.benchmarkBtnTextActive,
            ]}
          >
            Bottle Cap (30mm)
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onSelectBenchmark('thumb')}
          style={[
            styles.benchmarkBtn,
            activeBenchmark === 'thumb' && styles.benchmarkBtnActive,
          ]}
        >
          <Text
            style={[
              styles.benchmarkBtnText,
              activeBenchmark === 'thumb' && styles.benchmarkBtnTextActive,
            ]}
          >
            Human Thumb (55mm)
          </Text>
        </Pressable>
      </View>

      {/* Visual Scale Canvas */}
      <View style={styles.scaleCanvas}>
        <View style={styles.scaleObjectWrap}>
          {activeBenchmark === 'coin' && (
            <View style={styles.coinCircle}>
              <Text style={styles.coinText}>1 DH</Text>
              <Text style={styles.coinSubText}>25 mm</Text>
            </View>
          )}

          {activeBenchmark === 'cap' && (
            <View style={styles.capCircle}>
              <Text style={styles.capText}>CAP</Text>
              <Text style={styles.capSubText}>30 mm</Text>
            </View>
          )}

          {activeBenchmark === 'thumb' && (
            <View style={styles.thumbPill}>
              <Text style={styles.thumbText}>THUMB</Text>
              <Text style={styles.thumbSubText}>55 mm</Text>
            </View>
          )}
        </View>

        {/* Spider Visual Footprint */}
        <View style={styles.scaleSpiderWrap}>
          <View
            style={[
              styles.scaleSpiderSilhouette,
              {
                width: spiderBoxSize,
                height: spiderBoxSize,
              },
            ]}
          >
            <Bug size={spiderIconSize} color="#FFFFFF" />
          </View>
          <Text style={styles.scaleSpiderLabel}>
            {species.name.split(' ')[0]} ({sizeScale.legSpanMm} mm)
          </Text>
        </View>
      </View>

      <Text style={styles.scaleComparisonText}>
        {sizeScale.comparisonText}
      </Text>
    </View>
  );
};
