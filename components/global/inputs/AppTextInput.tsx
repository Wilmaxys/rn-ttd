import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../store/slices/user-slice';
import FormInput from './FormInput';

type Props = TextInputProps & {
  containerStyle?: ViewStyle;
  errorMessage?: (value?: string) => string;
  label?: string;
  required?: boolean;
  showErrors?: boolean;
};

const AppTextInput = ({
  containerStyle = {},
  errorMessage,
  label,
  onBlur,
  onFocus,
  required = false,
  showErrors = false,
  style = {},
  value,
  ...props
}: Props) => {
  const { colors } = useSelector(themeSelector);

  const [hasFocus, setFocus] = useState(false);

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(false);
    onBlur?.(e);
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(true);
    onFocus?.(e);
  };

  const getErrorMessage = () => {
    if (!showErrors) return '';

    if (required && !value)
      return label
        ? `Le champ ${label.toLowerCase()} est obligatoire`
        : 'Le champ est obligatoire';

    return errorMessage?.(value);
  };

  return (
    <FormInput
      label={label && required ? `${label} *` : label}
      error={getErrorMessage()}
      style={containerStyle}
    >
      <TextInput
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={label ? `${label}...` : ''}
        style={[
          {
            borderColor: hasFocus ? colors.primary : colors.border,
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: colors.transparent,
            paddingHorizontal: 15,
            paddingVertical: 10,
            alignSelf: 'stretch',
            fontSize: 16,
            color: colors.text,
          },
          style,
        ]}
        {...props}
      />
    </FormInput>
  );
};

export default AppTextInput;
