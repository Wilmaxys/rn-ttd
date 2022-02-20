import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';

type props = {
  color?: string;
};

const Loader = ({ color }: props) => {
  const { colors } = useSelector(themeSelector);

  return <ActivityIndicator color={color || colors.primary} />;
};

export default Loader;
