import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { useNavigation } from '@react-navigation/native';
import { AppButton, AppCard } from '../components/global';
import { LineChart, PieChart, ProgressChart } from '../components/charts';
import { moderateScale } from '../constants';

const ProfileScreen = ({}) => {
  const { colors } = useSelector(themeSelector);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    screen: {
      flexGrow: 1,
    },
    top: {
      width: '100%',
      height: 170,
      backgroundColor: colors.white,
      marginBottom: 40,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageContainer: {
      position: 'absolute',
      top: 20,
      left: 15,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: colors.background,
      width: 150,
      height: 150,
      overflow: 'hidden',
      marginVertical: 30,
    },
    contentContainer: {
      marginTop: 60,
      marginLeft: 190,
      right: 10,
    },
    contentContainerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    name: {
      fontSize: 18,
    },
  });

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.top}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/profil.png')}
            resizeMode='cover'
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentContainerTop}>
            <View>
              <Text style={styles.name}>John</Text>
              <Text style={styles.name}>Simon</Text>
            </View>
            <AppButton
              onPress={() => navigation.navigate('QuestionsStart')}
              variant='secondary'
              style={{ margin: 0 }}
            >
              <MaterialCommunityIcons name='cog' size={24} />
            </AppButton>
          </View>
          <View>
            <Text>Misogyne oui, mais antisémite non.</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <AppCard
          title='Utilisation du temps'
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            flex: 1,
            flexBasis: moderateScale(200),
            elevation: 2,
          }}
        >
          <PieChart />
        </AppCard>
        <AppCard
          title='Atteinte des objectifs'
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            flex: 1,
            flexBasis: moderateScale(200),
            elevation: 2,
          }}
        >
          <ProgressChart />
        </AppCard>
        <AppCard
          title='Résultats des trackers'
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            flex: 1,
            flexBasis: moderateScale(300),
            elevation: 2,
          }}
        >
          <LineChart />
        </AppCard>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
