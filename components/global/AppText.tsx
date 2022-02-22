import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';

type Props = {
  children?: ReactNode;
  style?: TextStyle;
  type?: 'default' | 'title' | 'subtitle' | 'error';
};

const AppText = ({ children = '', style = {}, type = 'default' }: Props) => {
  const { colors } = useSelector(themeSelector);

  const defaultStyle: TextStyle = {
    fontFamily: 'open-sans',
    color: colors.text,
    fontSize: 14,
  };

  switch (type) {
    case 'title':
      defaultStyle.fontSize = 24;
      defaultStyle.fontWeight = 'bold';
      break;
    case 'subtitle':
      defaultStyle.fontSize = 18;
      defaultStyle.fontWeight = '600';
      break;
    case 'error':
      defaultStyle.color = colors.danger;
      defaultStyle.fontSize = 10;
      defaultStyle.fontWeight = 'bold';
      defaultStyle.textAlign = 'center';
      break;

    default:
      break;
  }

  return <Text style={{ ...defaultStyle, ...style }}>{children}</Text>;
};

export default AppText;
