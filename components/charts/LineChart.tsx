import React from 'react';
import { ClipPath, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { AreaChart, Path } from 'react-native-svg-charts';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';

type Props = {};

const LineChart = ({}: Props) => {
  const { colors } = useSelector(themeSelector);

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, 80];
  const indexToClipFrom = 10;

  const Gradient = () => (
    <Defs key={'defs'}>
      <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={colors.primary} stopOpacity={0.8} />
        <Stop offset={'100%'} stopColor={colors.primary} stopOpacity={0.2} />
      </LinearGradient>
    </Defs>
  );

  const Clips = ({ x, width }) => (
    <Defs key={'clips'}>
      <ClipPath id={'clip-path-1'} key={'0'}>
        <Rect x={0} y={'0'} width={x(indexToClipFrom)} height={'100%'} />
      </ClipPath>
      <ClipPath id='clip-path-2' key={'1'}>
        <Rect
          x={x(indexToClipFrom)}
          y={'0'}
          width={width - x(indexToClipFrom)}
          height={'100%'}
        />
      </ClipPath>
    </Defs>
  );

  const Line = ({ line }) => (
    <Path
      key={'line'}
      d={line}
      stroke={colors.primaryDark}
      fill={'none'}
      clipPath={'url(#clip-path-1)'}
    />
  );

  const DashedLine = ({ line }) => (
    <Path
      key={'dashed-line'}
      stroke={colors.primaryDark}
      d={line}
      fill={'none'}
      clipPath={'url(#clip-path-2)'}
      strokeDasharray={[4, 4]}
    />
  );
  return (
    <AreaChart
      style={{ marginTop: 10, height: 200 }}
      data={data}
      contentInset={{ top: 30, bottom: 30 }}
      svg={{
        fill: 'url(#gradient)',
        clipPath: 'url(#clip-path-1)',
      }}
    >
      <Gradient />
      <Clips />
      <Line />
      <DashedLine />
    </AreaChart>
  );
};

export default LineChart;
