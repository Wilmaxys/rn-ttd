import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../store/slices/user-slice';
import AppText from '../AppText';
import AppButton, { AppButtonsProps } from './AppButton';

type Props = AppButtonsProps & {
  checked: boolean;
  label?: string;
  onPress?: () => void;
};

const AppCheckBox = ({ checked, label = '', style = {}, ...props }: Props) => {
  const { colors } = useSelector(themeSelector);

  return (
    <AppButton
      style={{
        borderColor: colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: checked ? colors.primary : colors.white,
        padding: 5,
        ...(style as ViewStyle),
      }}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons color={colors.white} name='check' size={15} />
        {label !== '' && <AppText style={{ marginLeft: 5 }}>{label}</AppText>}
      </View>
    </AppButton>
  );
};

export default AppCheckBox;
