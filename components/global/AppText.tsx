import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { selectColors } from '../../store/slices/user-slice';

type Props = {
  children: JSX.Element[] | JSX.Element | string;
  style?: TextStyle;
  type?: 'default' | 'title' | 'subtitle' | 'error';
};

const AppText = ({ children = '', style = {}, type = 'default' }: Props) => {
  const colors = useSelector(selectColors);

  const defaultStyle: TextStyle = {
    color: colors.text,
    fontSize: 12,
  };

  switch (type) {
    case 'title':
      defaultStyle.fontSize = 24;
      defaultStyle.fontWeight = 'bold';
      break;
    case 'subtitle':
      defaultStyle.fontSize = 18;
      break;
    case 'error':
      defaultStyle.color = colors.danger;
      break;

    default:
      break;
  }

  return <Text style={{ ...defaultStyle, ...style }}>{children}</Text>;
};

export default AppText;
