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
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react-native';
import { Palette, Radii, Spacing, Typography } from '@/constants/theme';
import { Button } from '@/components/ui';
import { registerUser } from '@/data/logic';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your full name, email, and password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser(name.trim(), email.trim(), password);
      console.log('Register successful:', data);
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Register error:', err);
      const message =
        err.response?.data?.message || 'Failed to create account. Please check your details and try again.';
      Alert.alert('Registration failed', message);
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
            <Text style={styles.heroTitle}>Start your{'\n'}field notes.</Text>
            <Text style={styles.heroSubtitle}>
              Join a community of curious minds exploring Australia's amazing spiders and the natural world.
            </Text>
            <Text style={styles.heroScript}>Small creatures big stories.</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            {/* Full Name Field */}
            <View style={styles.inputCard}>
              <User size={20} color={Palette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Full name"
                placeholderTextColor={Palette.mutedLight}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

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
              title="Create account"
              variant="primary"
              size="lg"
              showArrow={false}
              loading={loading}
              onPress={handleRegister}
              style={styles.registerButton}
            />
          </View>

          {/* Footer Navigation */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <Pressable hitSlop={10}>
                <Text style={styles.footerLink}>Log in</Text>
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
    marginBottom: Spacing.xxl,
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
    marginBottom: Spacing.xl,
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
  registerButton: {
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