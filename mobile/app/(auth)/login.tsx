import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react-native';
import { Palette, Radii, Spacing, Typography } from '@/constants/theme';
import { Button } from '@/components/ui';
import {LoginUser} from  '@/data/api/logic'
import AsyncStorageManagement  from "@/data/storage/asyncstorage"
import { isLoaded } from 'expo-font';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Champs requis', 'Veuillez entrer votre email et mot de passe.');
      return;
    }

    try {
      setLoading(true);
      const response = await LoginUser(email.trim(), password);

      // Save token and user details to storage
      await AsyncStorageManagement.setToken(response.token);
      if (response.data?.user) {
        await AsyncStorageManagement.setUserData(response.data.user);
      }

      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage =
        err.response?.data?.message || 'Email ou mot de passe incorrect.';
      Alert.alert('Erreur de connexion', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Hero Editorial Heading */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Welcome back,{'\n'}explorer.</Text>
            <Text style={styles.heroSubtitle}>
              Spiders help healthy ecosystems.{'\n'}Let’s keep discovering together.
            </Text>
            <Text style={styles.heroScript}>Small creatures big stories.</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={styles.inputCard}>
              <Mail size={20} color={Palette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor={Palette.mutedLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputCard}>
              <Lock size={20} color={Palette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={Palette.mutedLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={12}
                style={styles.eyeToggle}
              >
                {showPassword ? (
                  <EyeOff size={20} color={Palette.muted} />
                ) : (
                  <Eye size={20} color={Palette.muted} />
                )}
              </Pressable>
            </View>

            {/* Primary Action Button */}
            <Button
              title="Log in"
              variant="primary"
              size="lg"
              showArrow={false}
              loading={loading}
              onPress={handleLogin}
              style={styles.loginButton}
            />
          </View>

          {/* Footer Navigation */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>New here? </Text>
            <Link href="/(auth)/register" asChild>
              <Pressable hitSlop={10}>
                <Text style={styles.footerLink}>Create account</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Palette.canvas,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    justifyContent: 'space-between',
  },
  heroSection: {
    marginBottom: Spacing.xxxl,
  },
  heroTitle: {
    fontFamily: Typography.display,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    color: Palette.ink,
    letterSpacing: -0.8,
  },
  heroSubtitle: {
    fontFamily: Typography.body,
    fontSize: 14,
    lineHeight: 21,
    color: Palette.muted,
    marginTop: Spacing.sm,
  },
  heroScript: {
    fontFamily: Typography.display,
    fontSize: 14,
    fontStyle: 'italic',
    color: Palette.inkSecondary,
    marginTop: Spacing.md,
  },
  formContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  inputCard: {
    backgroundColor: Palette.paper,
    borderWidth: 1,
    borderColor: Palette.line,
    borderRadius: Radii.md,
    height: 56,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: Spacing.md,
  },
  textInput: {
    flex: 1,
    fontFamily: Typography.body,
    fontSize: 16,
    color: Palette.ink,
  },
  eyeToggle: {
    padding: Spacing.xs,
  },
  loginButton: {
    marginTop: Spacing.sm,
    shadowColor: Palette.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.lg,
  },
  footerText: {
    fontFamily: Typography.body,
    fontSize: 14,
    color: Palette.muted,
  },
  footerLink: {
    fontFamily: Typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.coral,
  },
});
