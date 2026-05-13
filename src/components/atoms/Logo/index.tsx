import LogoBlue from '@/assets/logos/logo-blue.svg';
import LogoWhite from '@/assets/logos/logo-white.svg';

type Props = {
  variant?: 'blue' | 'white';
  width?: number;
  height?: number;
};

export function Logo({ variant = 'blue', width = 180, height = 120 }: Props) {
  const SelectedLogo = variant === 'white' ? LogoWhite : LogoBlue;

  return <SelectedLogo width={width} height={height} />;
}