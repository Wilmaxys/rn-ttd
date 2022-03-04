import React, { ReactNode, useCallback } from 'react';
import {
  Image,
  ImageRequireSource,
  ImageURISource,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import AppText, { AppTextProps } from './AppText';
import AppButton from './inputs/AppButton';
import { themeSelector } from '../../store/slices/user-slice';
import { LinearGradient } from 'expo-linear-gradient';

type Props = ViewProps & {
  children?: ReactNode;
  disabled?: boolean;
  imageSource?: ImageRequireSource | ImageURISource;
  onPress?: () => void;
  title?: string;
  titleProps?: AppTextProps;
  gradientColors?: string[];
};

const AppCard = ({
  children,
  disabled = false,
  imageSource,
  onPress,
  style = {},
  title,
  titleProps = {},
  gradientColors,
  ...props
}: Props) => {
  const { colors } = useSelector(themeSelector);

  const _renderChildren = useCallback(() => {
    return (
      <View
        style={{
          padding: 15,
          ...(style as ViewStyle),
          backgroundColor: colors.transparent,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          borderWidth: 0,
          elevation: 0,
        }}
      >
        {title !== undefined && (
          <AppText type='title' {...titleProps}>
            {title}
          </AppText>
        )}
        {children}
      </View>
    );
  }, []);

  return (
    <AppButton
      disabled={disabled || !onPress}
      onPress={onPress}
      style={{
        borderRadius: 15,
        backgroundColor: colors.card,
        overflow: 'hidden',
        ...(style as ViewStyle),
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
      {...props}
    >
      {imageSource !== undefined && (
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Image
            source={imageSource}
            resizeMode='cover'
            style={{
              width: '100%',
              height: 100,
            }}
          />
        </View>
      )}
      {gradientColors !== undefined ? (
        <LinearGradient colors={gradientColors} start={[0, 0.5]} end={[2, 0.5]}>
          {_renderChildren()}
        </LinearGradient>
      ) : (
        _renderChildren()
      )}
    </AppButton>
  );
};

export default AppCard;
