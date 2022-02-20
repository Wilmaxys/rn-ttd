import React from 'react';
import { View } from 'react-native';
import AppButton from './AppButton';

type Props = {
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  variant?: 'primary' | 'secondary' | 'warning' | 'danger';
};

const FormButtons = ({
  cancelText = 'Annuler',
  okText = 'Confirmer',
  onCancel = () => {},
  onSubmit = () => {},
  variant = 'primary',
}: Props) => {
  return (
    <View>
      <AppButton onPress={onSubmit} variant={variant} style={{ flex: 1 }}>
        {okText}
      </AppButton>
      <AppButton onPress={onCancel} variant='secondary' style={{ flex: 1 }}>
        {cancelText}
      </AppButton>
    </View>
  );
};

export default FormButtons;
