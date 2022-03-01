import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { AppButton, AppText } from './global';

type Props = {
  title: string;
};

const Header = ({ title = '' }: Props) => {
  const { colors } = useSelector(themeSelector);

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      width: '100%',
      height: 80,
      justifyContent: 'flex-end',
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerVectorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <AppText type='title'>{title}</AppText>
        <View style={styles.headerVectorContainer}>
          <AppButton
            variant='secondary'
            style={{
              padding: 5,
            }}
          >
            <MaterialCommunityIcons name='menu' size={30} color={colors.text} />
          </AppButton>
          <AppButton
            variant='secondary'
            style={{
              padding: 5,
            }}
          >
            <MaterialCommunityIcons name='apps' size={30} color={colors.text} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

export default Header;
