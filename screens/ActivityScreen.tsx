import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RemindersList, TrackersList } from '../components/activity';
import Header from '../components/Header';
import { themeSelector } from '../store/slices/user-slice';

const ActivityScreen = ({}) => {
  const { colors } = useSelector(themeSelector);

  const [showTrackers, setShowTrackers] = useState(true);

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
      {showTrackers ? <TrackersList /> : <RemindersList />}
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
