import React from 'react';
import {
  Image,
  ImageRequireSource,
  ImageSourcePropType,
  ImageURISource,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppText } from '.';
import { selectTheme } from '../../store/slices/user-slice';

type Props = {
  title?: string;
  children?: JSX.Element[] | JSX.Element;
  onPress?: () => void;
  disabled?: boolean;
  imageSource?: ImageRequireSource | ImageURISource;
};

const AppCard = ({
  title,
  children,
  onPress,
  disabled = false,
  imageSource,
}: Props) => {
  const theme = useSelector(selectTheme);
  const { colors } = theme;

  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      disabled={disabled || !onPress}
      onPress={() => onPress?.()}
      style={{ borderRadius: 50, backgroundColor: colors.card }}
    >
      {imageSource !== undefined && (
        <Image
          source={imageSource}
          resizeMode='contain'
          style={{ width: '100%', height: 150 }}
        />
      )}
      <View style={{ padding: 15 }}>
        {title !== undefined && <AppText type='title'>{title}</AppText>}
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default AppCard;
