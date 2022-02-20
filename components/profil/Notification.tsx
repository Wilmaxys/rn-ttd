import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';

const Notification = ({}) => {
  const { colors } = useSelector(themeSelector);

  const styles = StyleSheet.create({
    cardNotif: {
      backgroundColor: colors.secondaryLight,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      flex: 1,
    },
    cardNotifTop: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardNotifTopVector: {
      backgroundColor: colors.secondaryLight,
      borderRadius: 2,
      padding: 5,
    },
    cardNotifTopText: {
      fontSize: 16,
      marginLeft: 10,
    },
    cardNotifBottomText: {
      paddingVertical: 5,
      fontSize: 34,
      color: colors.text,
      marginLeft: 5,
    },
  });

  return (
    <View style={styles.cardNotif}>
      <View style={styles.cardNotifTop}>
        <View style={styles.cardNotifTopVector}>
          <Ionicons name='boat' color={colors.white} size={24} />
        </View>
        <View style={styles.cardNotifTopText}>
          <Text>Task2</Text>
          <Text>Completed</Text>
        </View>
      </View>
      <Text style={styles.cardNotifBottomText}>12</Text>
    </View>
  );
};

export default Notification;
