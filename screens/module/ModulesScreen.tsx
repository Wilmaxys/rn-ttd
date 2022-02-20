import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import Card from '../../components/module/Card';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';
import { SelectNewModule } from '../../components/module';

const ModulesScreen = ({}) => {
  const theme = useSelector(themeSelector);
  const { colors } = theme;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      position: 'relative',
    },
    container: {
      flex: 1,
      margin: 20,
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.primaryLight,
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    input: {
      paddingVertical: 10,
      flex: 1,
    },
    inputVector: {
      color: colors.primaryLight,
      marginRight: 10,
    },
    title: {
      fontSize: 18,
      color: colors.text,
      marginVertical: 10,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      height: 50,
      width: '100%',
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  return (
    <View style={styles.screen}>
      <Header title='Modules' />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Ionicons style={styles.inputVector} size={24} name='search' />
          <TextInput
            blurOnSubmit
            placeholder='Rechercher...'
            autoCorrect={false}
            style={styles.input}
          />
        </View>
        <ScrollView style={{ flex: 1, paddingBottom: 200 }}>
          <Text style={styles.title}>Récents</Text>
          <View
            onStartShouldSetResponder={() => true}
            style={styles.cardContainer}
          >
            <Card />
            <Card />
            <Card />
          </View>
          <Text style={styles.title}>Modules</Text>
          <View
            onStartShouldSetResponder={() => true}
            style={styles.cardContainer}
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </View>
        </ScrollView>
        <SelectNewModule
          style={{ position: 'absolute', bottom: 0, right: 15 }}
        />
      </View>
    </View>
  );
};

export default ModulesScreen;
