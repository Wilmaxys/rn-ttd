import { StyleSheet, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { modulesSelector } from '../../store/slices/module-slice';
import { TrackerModule } from '../../types';
import moment from 'moment';
import TrackerCard from '../activity/TrackerCard';
import { AppText } from '../global';

const ActivityScreen = ({}) => {
  const modules = useSelector(modulesSelector);
  const trackers = modules.filter(
    (module) => (module as TrackerModule).days
  ) as TrackerModule[];

  const dates: { [key: string]: { tracker: TrackerModule; value?: number }[] } =
    {};

  const currentDate = moment().format('YYYYMMDD');
  trackers.forEach((tracker) => {
    let currentDateDone = false;

    tracker.days.forEach((day) => {
      const date = moment(day.date).format('YYYYMMDD');

      if (date === currentDate) {
        currentDateDone = true;
      }

      if (!dates[date]) {
        dates[date] = [];
      }

      dates[date].push({
        tracker: tracker,
        value: day.value,
      });
    });

    if (!currentDateDone) {
      if (!dates[currentDate]) {
        dates[currentDate] = [];
      }

      dates[currentDate].push({ tracker });
    }
  });

  const styles = StyleSheet.create({
    screen: {
      paddingBottom: 100,
      paddingHorizontal: 20,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {Object.keys(dates)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((key, dateIndex) => {
          const date = moment(key);
          const displayDate = date.calendar(null, {
            sameDay: "[Aujourd'hui]",
            lastDay: '[Hier]',
            sameElse: date.format('DD MMM YYYY'),
          });

          return (
            <View key={`date${dateIndex}`}>
              <AppText
                type='subtitle'
                style={{ marginBottom: 5, marginTop: 15 }}
              >
                {displayDate}
              </AppText>
              {dates[key].map(({ tracker, value }, index) => (
                <TrackerCard
                  key={`tracker${index}`}
                  module={tracker}
                  date={date}
                  value={value}
                />
              ))}
            </View>
          );
        })}
    </ScrollView>
  );
};

export default ActivityScreen;
