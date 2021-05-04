import { createTheming } from '@callstack/react-theme-provider';
import createSpacing from '@theme/createSpacing';
import createTypography from '@theme/createTypography';
import color from 'color';

export const animationOutTiming = 300;
const defaultSpacing = 8;
const typography = createTypography();
const spacing = createSpacing(defaultSpacing);
const iconSize = 24;
const primaryMainColor = '#1F1F1F';
const actionHeight = 56;
const actionHeightDense = 30;
const actionPadding = 12;
const dividerColor = color(primaryMainColor).alpha(0.2).rgb().toString();

const textPrimaryColor = color(primaryMainColor).alpha(0.5).rgb().toString();

const textSecondaryColor = primaryMainColor;

const { ThemeProvider, useTheme, withTheme } = createTheming({
  palette: {
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    primary: {
      main: primaryMainColor,
      constrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3B3B3B',
      constrastText: '#FFFFFF',
    },
    error: {
      tomato: '#FF6347',
      main: '#FF0000',
    },
    success: {
      main: '#66C759',
    },
    text: {
      primary: textPrimaryColor,
      secondary: textSecondaryColor,
    },
    orange: {
      main: '#EA9000',
    },
    purple: {
      main: '#4556AC',
    },
    divider: dividerColor,
    background: {
      paper: '#FFFFFF',
      disabled: color(dividerColor).alpha(0.05).rgb().toString(),
      backdrop: 'rgba(0, 0, 0, 0.7)',
    },
    action: {
      activeBackground: dividerColor,
      disabled: dividerColor,
      disabledText: color(primaryMainColor).alpha(0.5).rgb().toString(),
    },
    lightGreen: {
      main: '#c8e6c9',
    },
  },
  navigation: {
    header: {
      backgroundColor: primaryMainColor,
    },
  },
  container: {
    spacingTimes: 2,
  },
  tabBar: {
    height: actionHeight,
  },
  icon: {
    size: iconSize,
  },
  modal: {
    animationOutTiming,
  },
  input: {
    labelColor: textPrimaryColor,
    borderColor: dividerColor,
    borderWidth: 1,
    height: actionHeight,
    paddingLeft: actionPadding,
    paddingLeftWithIcon: iconSize + spacing(2),
    paddingRight: actionPadding,
  },
  button: {
    activeOpacity: 0.7,
    medium: {
      height: 46,
      paddingHorizontal: actionPadding,
    },
    dense: {
      height: actionHeightDense,
      paddingHorizontal: actionPadding,
    },
    fixedContainer: {
      medium: {
        height: actionHeight + spacing(4),
      },
    },
  },
  shape: {
    borderRadius: 5,
  },
  typography,
  spacing,
});

export { ThemeProvider, useTheme, withTheme, spacing };
