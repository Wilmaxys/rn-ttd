import React, { ReactNode } from 'react';
import {
  Image,
  ImageRequireSource,
  ImageURISource,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import AppText from './AppText';
import AppButton from './inputs/AppButton';
import { themeSelector } from '../../store/slices/user-slice';

type Props = {
  title?: string;
  children?: ReactNode;
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
  const { colors } = useSelector(themeSelector);

  return (
    <AppButton
      disabled={disabled || !onPress}
      onPress={onPress}
      style={{
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        padding: 0,
        overflow: 'hidden',
      }}
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
      <View style={{ padding: 15 }}>
        {title !== undefined && <AppText type='title'>{title}</AppText>}
        {children}
      </View>
    </AppButton>
  );
};

export default AppCard;
