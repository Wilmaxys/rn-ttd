import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';

type props = {
  title: string;
};

const Header = ({ title = '' }) => {
  const { colors } = useSelector(themeSelector);

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      width: '100%',
      height: 80,
      // shadowColor: "black",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowRadius: 6,
      // shadowOpacity: 0.26,
      // elevation: 5,
      justifyContent: 'flex-end',
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontFamily: 'open-sans',
      fontSize: 24,
      color: colors.text,
      fontWeight: '700',
    },
    headerVectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerVectorIcon: {
      marginLeft: 5,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerVectorContainer}>
          <Ionicons
            style={styles.headerVectorIcon}
            name='menu'
            color={colors.text}
            size={30}
          />
          <Ionicons
            style={styles.headerVectorIcon}
            name='apps'
            color={colors.text}
            size={22}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
