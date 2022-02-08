import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectColors } from '../../store/slices/user-slice';

const Card = ({}) => {
  const colors = useSelector(selectColors);

  const styles = StyleSheet.create({
    cardContainer: {
      width: '50%',
      padding: 5,
    },
    cardNotif: {
      backgroundColor: colors.secondaryLight,
      paddingVertical: 10,
      paddingHorizontal: 10,
      overflow: 'hidden',
    },
    cardNotifTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardNotifTopVector: {
      borderRadius: 2,
      padding: 5,
      alignSelf: 'flex-start',
    },
    cardNotifTopText: {
      paddingVertical: 15,
      fontSize: 16,
    },
    cardNotifBottomText: {
      paddingVertical: 5,
      fontSize: 34,
      color: colors.text,
      marginLeft: 5,
    },
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardNotif}>
        <View style={styles.cardNotifTop}>
          <View style={styles.cardNotifTopText}>
            <Text>Task2</Text>
            <Text>Completed</Text>
          </View>
          <View style={styles.cardNotifTopVector}>
            <Ionicons name='options' color={colors.text} size={24} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
