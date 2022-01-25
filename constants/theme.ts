const defaultColors = {
  darkGreen: '#779780',
  lightGreen: '#B8D2C5',

  darkOrange: '#926953',
  lightOrange: '#EAE2D5',

  black: '#1B1F24',
  gray: '#C4C4C4',
  white: '#FFFFFF',
  transparent: 'transparent',
};

const defaultTheme = {
  dark: false,
  activeOpacity: 0.7,
  colors: {
    ...defaultColors,
    primary: defaultColors.darkGreen,
    primaryLight: defaultColors.lightGreen,
    secondary: defaultColors.darkOrange,
    secondaryLight: defaultColors.lightOrange,
    background: defaultColors.transparent,
    card: defaultColors.white,
    text: defaultColors.black,
    border: defaultColors.gray,
    notification: defaultColors.white,
  },
};

export { defaultTheme, defaultColors };
