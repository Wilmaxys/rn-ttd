import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { AppButton, AppText } from './global';

type Props = {
  title: string;
  onPress?: () => void;
};

const Header = ({ title = '', onPress = () => {} }: Props) => {
  const { colors } = useSelector(themeSelector);

  const styles = StyleSheet.create({
    header: {
      padding: 15,
      width: '100%',
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
            onPress={onPress}
          >
            <MaterialCommunityIcons name='menu' size={30} color={colors.text} />
          </AppButton>
          <AppButton
            variant='secondary'
            style={{
              padding: 5,
            }}
            onPress={onPress}
          >
            <MaterialCommunityIcons name='apps' size={30} color={colors.text} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

export default Header;
