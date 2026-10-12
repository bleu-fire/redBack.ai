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
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react-native';
import { Palette } from '@/constants/theme';
import { AppButton } from '@/components/ui';
import { registerUser } from '@/data/api/logic';
import AsyncStorageManagement from "@/data/storage/asyncstorage";
import { useStore, StoreState } from '@/store/stores';
import { styles } from '@/components/auth/register.styles';

export default function RegisterScreen() {
  const login = useStore((state: StoreState) => state.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser(name.trim(), email.trim(), password);
      const user = response.data?.user || { name: name.trim(), email: email.trim() };

      login(response.token, user);
      await AsyncStorageManagement.setToken(response.token);
      await AsyncStorageManagement.setUserData(user);

      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Register error:', err);
      const errorMessage = err.response?.data?.message || "Erreur d'inscription";
      Alert.alert("Erreur d'inscription", errorMessage);
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
            <Text style={styles.heroTitle}>Join the field{'\n'}network.</Text>
            <Text style={styles.heroSubtitle}>
              Help map spider biodiversity and safety protocols.
            </Text>
            <Text style={styles.heroScript}>Your field notebook awaits.</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputCard}>
              <User size={20} color={Palette.muted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                placeholderTextColor={Palette.mutedLight}
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

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
              title="Create account"
              variant="primary"
              loading={loading}
              onPress={handleRegister}
              style={styles.registerButton}
            />
          </View>

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