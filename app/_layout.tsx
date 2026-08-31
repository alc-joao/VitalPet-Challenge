import { useEffect } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

import {
  Stack,
  router,
  useSegments,
} from 'expo-router';

import { StatusBar } from 'expo-status-bar';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  AuthProvider,
  useAuth,
} from '@/src/contexts/AuthContext';

const queryClient = new QueryClient();

const tutorProtectedRoutes = new Set([
  'tutor-home',
  'tutor-profile',
  'tutor-edit',
  'tutor-delete',

  'pet-detail',
  'pet-form',
  'pet-health',
  'pet-preferences',
  'pet-profile',
  'pet-score-detail',
  'pet-success',

  'score-home',
  'history-home',
  'chat-home',
  'more-home',

  'consults-home',
  'emergency-home',
  'medications-home',
  'plans-home',
  'reminders-home',
  'vaccines-home',
  'my-data',
]);

function ProtectedNavigation() {
  const segments = useSegments();

  const {
    authenticated,
    loadingAuth,
  } = useAuth();

  useEffect(() => {
    if (loadingAuth) {
      return;
    }

    const currentRoute =
      segments[0]?.toString() ?? '';

    const protectedRoute =
      tutorProtectedRoutes.has(currentRoute);

    if (
      protectedRoute &&
      !authenticated
    ) {
      router.replace('/tutor-login');
      return;
    }

    const tutorAuthRoute =
      currentRoute === 'tutor-login' ||
      currentRoute === 'tutor-create';

    if (
      tutorAuthRoute &&
      authenticated
    ) {
      router.replace('/tutor-home');
    }
  }, [
    authenticated,
    loadingAuth,
    segments,
  ]);

  if (loadingAuth) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FCFCFC',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#0A66C2"
        />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedNavigation />
      </AuthProvider>
    </QueryClientProvider>
  );
}
