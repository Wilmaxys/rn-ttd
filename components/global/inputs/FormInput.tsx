import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import AppText from '../AppText';

type Props = {
  children: ReactNode;
  error?: string;
  label?: string;
  style?: ViewStyle;
};

const FormInput = ({ children, error = '', label = '', style = {} }: Props) => {
  return (
    <View style={{ marginBottom: 15, ...style }}>
      {label !== '' && (
        <AppText
          style={{
            marginBottom: 4,
            fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </AppText>
      )}

      {children}

      {error !== '' && (
        <AppText type='error' style={{ marginTop: 3 }}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export default FormInput;
