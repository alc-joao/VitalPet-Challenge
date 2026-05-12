import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text } from '../Text';
import { colors } from '@/src/constants/colors';

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, style, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          width: '100%',
          height: 56,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
        },
        style,
      ]}
      {...rest}
    >
      <Text size={16} weight="700" color={colors.white}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}