import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';

type Props = {};

const ProgressChart = ({}: Props) => {
  const { colors } = useSelector(themeSelector);

  return (
    <ProgressCircle
      style={{ marginTop: 10, height: 200 }}
      progress={0.7}
      progressColor={colors.primary}
      startAngle={-Math.PI * 0.8}
      endAngle={Math.PI * 0.8}
    />
  );
};

export default ProgressChart;
