import { useColorScheme } from 'react-native';

import {
  darkTheme,
  lightTheme,
} from '@/src/constants/theme';

export function useAppTheme() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';

  return {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
    colorScheme,
  };
}
