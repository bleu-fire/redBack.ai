import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { AppButton } from '@/components/ui';
import { LoginUser } from '@/data/api/logic';
import AsyncStorageManagement from "@/data/storage/asyncstorage";
import { useStore, StoreState } from '@/store/stores';
import { styles } from '@/components/auth/login.styles';

export default function LoginScreen() {
  const login = useStore((state: StoreState) => state.login);
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
      const user = response.data?.user || { email: email.trim() };

      login(response.token, user);
      await AsyncStorageManagement.setToken(response.token);
      await AsyncStorageManagement.setUserData(user);

      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Erreur de connexion';
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
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Welcome back,{'\n'}explorer.</Text>
            <Text style={styles.heroSubtitle}>
              Spiders help healthy ecosystems.{'\n'}Let’s keep discovering together.
            </Text>
            <Text style={styles.heroScript}>Small creatures big stories.</Text>
          </View>

          <View style={styles.formContainer}>
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

            <AppButton
              title="Log in"
              variant="primary"
              loading={loading}
              onPress={handleLogin}
              style={styles.loginButton}
            />
          </View>

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
