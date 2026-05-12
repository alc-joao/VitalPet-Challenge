import { Text as RNText, TextProps } from 'react-native';
import { colors } from '@/src/constants/colors';

type Props = TextProps & {
  size?: number;
  weight?: '400' | '500' | '600' | '700';
  color?: string;
  align?: 'left' | 'center' | 'right';
};

export function Text({
  children,
  size = 16,
  weight = '400',
  color = colors.black,
  align = 'left',
  style,
  ...rest
}: Props) {
  return (
    <RNText
      style={[
        {
          fontSize: size,
          fontWeight: weight,
          color,
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}