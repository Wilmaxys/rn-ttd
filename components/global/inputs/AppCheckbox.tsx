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
};

const AppCheckBox = ({ checked, label = '', style = {}, ...props }: Props) => {
  const { colors } = useSelector(themeSelector);

  return (
    <AppButton
      style={{
        borderColor: colors.primary,
        borderRadius: 5,
        backgroundColor: checked ? colors.primary : colors.gray,
        padding: 2,
        margin: 0,
        ...(style as ViewStyle),
      }}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons color={colors.white} name='check' size={20} />
        {label !== '' && <AppText style={{ marginLeft: 5 }}>{label}</AppText>}
      </View>
    </AppButton>
  );
};

export default AppCheckBox;
