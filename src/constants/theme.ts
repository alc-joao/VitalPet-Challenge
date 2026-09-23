export const lightTheme = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceSecondary: '#E8F1FF',
  text: '#0F172A',
  textSecondary: '#7D7D7D',
  border: '#D1D5DB',
  primary: '#0A66C2',
  primaryText: '#FFFFFF',
  danger: '#B42318',
  tabInactive: '#D9D9D9',
};

export const darkTheme: typeof lightTheme = {
  background: '#0B1220',
  surface: '#172033',
  surfaceSecondary: '#243653',
  text: '#F8FAFC',
  textSecondary: '#A8B3C5',
  border: '#39465C',
  primary: '#60A5FA',
  primaryText: '#08111F',
  danger: '#FDA4AF',
  tabInactive: '#344155',
};

export type AppTheme = typeof lightTheme;
