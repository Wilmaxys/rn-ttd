import React from 'react';
import { PieChart as SvgPieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';

type Props = {};

const PieChart = ({}: Props) => {
  const { colors } = useSelector(themeSelector);
  const data = [
    {
      key: 1,
      amount: 50,
      svg: { fill: colors.primaryLight },
    },
    {
      key: 2,
      amount: 50,
      svg: { fill: colors.primary },
    },
    {
      key: 3,
      amount: 40,
      svg: { fill: colors.primaryDark },
    },
    {
      key: 4,
      amount: 95,
      svg: { fill: colors.secondary },
    },
    {
      key: 5,
      amount: 35,
      svg: { fill: colors.secondaryLight },
    },
  ];

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={0.2}
        >
          {data.amount}
        </Text>
      );
    });
  };

  return (
    <SvgPieChart
      style={{ height: 200 }}
      valueAccessor={({ item }) => item.amount}
      data={data}
      outerRadius={'95%'}
    >
      <Labels />
    </SvgPieChart>
  );
};

export default PieChart;
