import { StyleSheet, ScrollView, ImageBackground, View } from 'react-native';
import Notification from '../components/center/Notification';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { modulesSelector } from '../store/slices/module-slice';
import { TrackerModule } from '../types';
import moment from 'moment';
import TrackerCard from '../components/activity/TrackerCard';
import { AppText } from '../components/global';

const ActivityScreen = ({}) => {
  const { colors } = useSelector(themeSelector);

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
    container: {
      flexGrow: 1,
    },
    screen: {
      paddingBottom: 100,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      marginTop: 10,
      color: colors.text,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      height: 150,
      width: '100%',
    },
    image: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.background,
    },
  });

  return (
    <ImageBackground
      source={require('../assets/images/frame.png')}
      imageStyle={{
        resizeMode: 'repeat',
        overflow: 'visible',
        backfaceVisibility: 'visible',
        flex: 1,
        opacity: 0.3,
      }}
      style={styles.container}
    >
      <Header title='Activités' />
      <ScrollView contentContainerStyle={styles.screen}>
        {Object.keys(dates)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((key, dateIndex) => {
            const date = moment(key);
            const displayDate = date.calendar(null, {
              sameDay: "[Aujourd'hui]",
              lastDay: '[Hier]',
              sameElse: date.format('DD MMMM YYYY'),
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
                <Notification />
                <Notification brown={true} />
              </View>
            );
          })}
      </ScrollView>
      <LinearGradient
        colors={['transparent', colors.background]}
        start={[0.5, 0.15]}
        end={[0.5, 0.4]}
        style={styles.footer}
      />
    </ImageBackground>
  );
};

export default ActivityScreen;
