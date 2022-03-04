import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';
import { AppCheckBox } from '../global';

const Notification = ({ brown = false }) => {
  const { colors } = useSelector(themeSelector);

  const styles = StyleSheet.create({
    card: {
      width: '100%',
      // shadowColor: "black",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowRadius: 6,
      // shadowOpacity: 0.26,
      // elevation: 5,
      paddingTop: 20,
      paddingBottom: 15,
      paddingHorizontal: 10,
      flexDirection: 'row',
      height: 100,
    },

    cardVectorText: {
      color: colors.white,
    },
    cardContent: {
      paddingLeft: 10,
      flex: 1,
    },
    cardContentTop: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardContentBottom: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 5,
    },
    cardContentTopTitle: {
      color: colors.text,
    },
    tag: {
      backgroundColor: colors.primaryLight,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 5,
      borderRadius: 3,
      justifyContent: 'center',
    },
    tagText: {
      color: colors.text,
    },
    cardStatus: {
      borderWidth: 4,
      borderColor: colors.white,
      borderRadius: 6,
      position: 'absolute',
      top: -20,
      right: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hourText: {
      color: colors.text,
    },
    image: {
      marginTop: 30,
      borderRadius: 10,
      backgroundColor: colors.white,
      width: '100%',
    },
    image2: {
      width: 55,
      height: 55,
      backgroundColor: brown ? colors.secondary : colors.primary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    cardVector: {
      overflow: 'hidden',
      borderRadius: 6,
    },
  });

  return (
    <ImageBackground
      source={require('../../assets/images/frame.png')}
      imageStyle={{
        resizeMode: 'repeat',
        overflow: 'hidden',
        backfaceVisibility: 'visible',
        flex: 1,
        opacity: 0.2,
      }}
      style={styles.image}
    >
      <View style={styles.card}>
        <View style={styles.cardStatus}>
          <AppCheckBox checked={false} />
        </View>
        <View style={styles.cardVector}>
          <ImageBackground
            source={require('../../assets/images/frame.png')}
            imageStyle={{
              resizeMode: 'repeat',
              overflow: 'visible',
              backfaceVisibility: 'visible',
              flex: 1,
              opacity: 1,
            }}
            style={styles.image2}
          >
            <Text style={styles.cardVectorText}>
              <Ionicons
                name='alarm-outline'
                color={colors.background}
                size={36}
              />
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardContentTop}>
            <Text style={styles.cardContentTopTitle}>TDD Wireframe</Text>
            <Text style={styles.hourText}>13:42</Text>
          </View>
          <View style={styles.cardContentBottom}>
            <View style={{ ...styles.tag, backgroundColor: colors.background }}>
              <Text style={{ ...styles.tagText, color: colors.text }}>
                test
              </Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>test</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Notification;
