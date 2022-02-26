import React from 'react';
import {
  Pressable,
  PressableProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../store/slices/user-slice';
import AppText from '../AppText';

type Props = PressableProps & {
  text?: string;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'warning' | 'danger';
};

const AppButton = ({
  children = [],
  disabled = false,
  style = {},
  text = '',
  textStyle = {},
  variant = 'primary',
  ...props
}: Props) => {
  const { colors } = useSelector(themeSelector);

  const backgroundColor =
    variant === 'secondary' ? colors.transparent : colors[variant];
  const textColor = variant === 'secondary' ? colors.text : colors.white;

  return (
    <View
      style={{
        margin: 5,
        borderRadius: 50,
        backgroundColor: disabled ? colors.gray : backgroundColor,
        ...(style as ViewStyle),
        overflow: 'hidden',
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
    >
      <Pressable
        android_ripple={{
          color: `${colors.black}22`,
          radius: 20,
          borderless: true,
        }}
        disabled={disabled}
        style={{
          padding: 15,
          ...(style as ViewStyle),
          borderWidth: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
        }}
        {...props}
      >
        {text !== '' || typeof children == 'string' ? (
          <AppText
            style={{
              color: textColor,
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
              ...textStyle,
            }}
          >
            {text || children}
          </AppText>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
};

export type AppButtonsProps = Props;

export default AppButton;
