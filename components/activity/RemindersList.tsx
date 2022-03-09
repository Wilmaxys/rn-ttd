import { StyleSheet, ScrollView } from 'react-native';
import Notification from '../center/Notification';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';
import { AppText } from '../global';

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
    <ScrollView contentContainerStyle={styles.screen}>
      <AppText type='subtitle' style={{ marginTop: 15 }}>
        Aujourd'hui
      </AppText>
      <Notification title='Rappeler maman' time='13:42' />
      <Notification
        title='Dessiner un dragon'
        time='14:50'
        brown={true}
        important
        urgent
      />
      <Notification title='Aller à la piscine' time='17:00' important />
      <AppText type='subtitle' style={{ marginTop: 30 }}>
        Demain
      </AppText>
      <Notification
        title='Ajouter des flammes au dragon'
        time='08:05'
        brown={true}
        important
        urgent
      />
      <Notification
        title='Aller au restaurant avec le groupe'
        time='18:15'
        important
      />
      <Notification
        title='Rendre les 2€ pour le café du lundi'
        time='18:20'
        urgent
      />
      <AppText type='subtitle' style={{ marginTop: 30 }}>
        La semaine prochaine
      </AppText>
      <Notification
        title='Créer un wireframe du projet'
        time='09:30'
        brown={true}
        important
      />
      <Notification title='Acheter des chaussures' time='14:00' />
    </ScrollView>
  );
};

export default CenterScreen;
