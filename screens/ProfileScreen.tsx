import { View, StyleSheet, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Notification from '../components/profil/Notification';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from '../components/global';

const ProfileScreen = ({}) => {
  const { colors } = useSelector(themeSelector);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    screen: {
      flexGrow: 1,
      backgroundColor: colors.white,
    },
    top: {
      width: '100%',
      height: 170,
      backgroundColor: colors.background,
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
      borderColor: colors.white,
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
    bottom: {
      marginHorizontal: 20,
    },
    bottomNotif: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    bottomTabs: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      borderRadius: 3,
    },
    bottomTab: {
      flex: 1,
      margin: 2,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 3,
    },
    bottomTabSelected: {
      backgroundColor: colors.white,
    },
    bottomTabText: {
      color: colors.text,
      fontSize: 18,
    },
    bottomTabTextSelected: {
      color: colors.text,
    },
  });

  return (
    <View style={styles.screen}>
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
      <View style={styles.bottom}>
        <View style={styles.bottomNotif}>
          <Notification />
          <Notification />
        </View>
        <View style={styles.bottomTabs}>
          <View style={{ ...styles.bottomTab, ...styles.bottomTabSelected }}>
            <Text
              style={{
                ...styles.bottomTabText,
                ...styles.bottomTabTextSelected,
              }}
            >
              Test
            </Text>
          </View>
          <View style={styles.bottomTab}>
            <Text style={styles.bottomTabText}>Test</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
