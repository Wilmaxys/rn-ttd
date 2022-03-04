import { StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import Notification from '../components/center/Notification';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { AppText } from '../components/global';

const CenterScreen = ({}) => {
  const { colors } = useSelector(themeSelector);

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
      backgroundColor: colors.secondaryLight,
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
        <AppText type='subtitle' style={{ marginBottom: 5, marginTop: 15 }}>
          Dans une semaine
        </AppText>
        <Notification />
        <Notification brown={true} />
        <AppText type='subtitle' style={{ marginBottom: 5, marginTop: 15 }}>
          Demain
        </AppText>
        <Notification />
        <Notification brown={true} />
        <Notification />
        <AppText type='subtitle' style={{ marginBottom: 5, marginTop: 15 }}>
          Hier
        </AppText>
        <Notification />
        <Notification brown={true} />
        <Notification brown={true} />
      </ScrollView>
      <LinearGradient
        colors={['transparent', colors.secondaryLight]}
        start={[0.5, 0.15]}
        end={[0.5, 0.4]}
        style={styles.footer}
      />
    </ImageBackground>
  );
};

export default CenterScreen;
