import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment, { Moment } from 'moment';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateModule } from '../../store/slices/module-slice';
import { themeSelector } from '../../store/slices/user-slice';
import { TrackerModule } from '../../types';
import { AppButton, AppCard, AppText } from '../global';

type Props = {
  module: TrackerModule;
  date?: Moment;
  value?: number;
};

const TrackerCard = ({ module, date, value }: Props) => {
  const { colors } = useSelector(themeSelector);
  const dispatch = useDispatch();

  const getValueColor = (v: number) => {
    switch (v) {
      case 1:
        return '#cb4b4e';
      case 2:
        return '#f8c94f';
      case 3:
        return '#f7f393';
      case 4:
        return '#a1e967';
      case 5:
        return '#6daa6c';

      default:
        return '#000000';
    }
  };

  const _renderValuePicker = (
    v: number,
    selected = false,
    disabled = false
  ) => {
    const color = getValueColor(v);

    return (
      <AppButton
        key={`tracker${module.title}${date}${v}`}
        disabled={disabled}
        onPress={() => {
          dispatch(
            updateModule({
              ...module,
              days: [
                ...module.days,
                { date: new Date().toISOString(), value: v },
              ],
            })
          );
        }}
        style={{
          margin: 3,
          borderColor: disabled ? colors.transparent : `${colors.border}44`,
          borderRadius: 10,
          borderWidth: selected ? 0 : 3,
          backgroundColor: color,
          padding: selected ? 20 : 17,
        }}
      ></AppButton>
    );
  };

  return (
    <AppCard
      style={{
        marginHorizontal: 0,
        paddingHorizontal: 3,
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          marginRight: 8,
          borderRadius: 10,
          backgroundColor: colors.primary,
          padding: 10,
          alignSelf: 'center',
        }}
      >
        <MaterialCommunityIcons
          color={colors.white}
          name='emoticon-happy-outline'
          size={35}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <AppText>{module.title}</AppText>
          {date !== undefined && <AppText>{date.format('HH:mm')}</AppText>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((v) =>
            _renderValuePicker(v, value === v, value !== undefined)
          )}
        </View>
      </View>
    </AppCard>
  );
};

export default TrackerCard;
