import React, { ReactNode, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../../store/slices/user-slice';
import FormInput from './FormInput';

type Props = TextInputProps & {
  containerStyle?: ViewStyle;
  errorMessage?: (value?: string) => string;
  label?: string;
  getRef?: (ref: TextInput) => void;
  renderAfter?: () => ReactNode;
  renderBefore?: () => ReactNode;
  required?: boolean;
  showErrors?: boolean;
};

const AppTextInput = ({
  containerStyle = {},
  errorMessage,
  getRef = (ref) => {},
  label,
  onBlur,
  onFocus,
  renderAfter,
  renderBefore,
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
      <View
        style={{
          borderColor: hasFocus ? colors.primary : colors.border,
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: colors.transparent,
          alignSelf: 'stretch',
          ...(style as ViewStyle),
          padding: 0,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {renderBefore?.()}
        <TextInput
          ref={getRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={label ? `${label}...` : ''}
          style={{
            backgroundColor: colors.transparent,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            color: colors.text,
            ...(style as TextStyle),
            margin: 0,
            borderWidth: 0,
            flex: 1,
          }}
          value={value}
          placeholderTextColor={colors.text + 99}
          {...props}
        />
        {renderAfter?.()}
      </View>
    </FormInput>
  );
};

export default AppTextInput;
