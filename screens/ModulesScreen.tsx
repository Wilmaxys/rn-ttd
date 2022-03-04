import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import ModuleCard from '../components/module/ModuleCard';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { SelectNewModule } from '../components/module';
import { modulesSelector } from '../store/slices/module-slice';
import moment, { Moment } from 'moment';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AppText, AppTextInput } from '../components/global';

const ModulesScreen = ({}) => {
  const theme = useSelector(themeSelector);
  const { colors } = theme;

  const modules = useSelector(modulesSelector);

  const [recentLimit, setRecentLimit] = useState<Moment | null>(null);

  useFocusEffect(
    useCallback(() => {
      setRecentLimit(moment().subtract(3, 'd'));
    }, [])
  );

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      position: 'relative',
    },
    container: {
      flex: 1,
      margin: 20,
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

  const recentModules = modules.filter((module) =>
    moment(module.lastUsedAt).isAfter(recentLimit)
  );
  const oldModules = modules.filter((module) =>
    moment(module.lastUsedAt).isBefore(recentLimit)
  );

  return (
    <View style={styles.screen}>
      <Header title='Modules' />
      <View style={styles.container}>
        <AppTextInput
          placeholder='Rechercher...'
          renderBefore={() => (
            <MaterialCommunityIcons
              color={colors.primary}
              name='magnify'
              size={24}
              style={{ marginLeft: 15 }}
            />
          )}
          style={{ backgroundColor: colors.white }}
        />
        <ScrollView
          style={{
            flex: 1,
            paddingBottom: 200,
          }}
        >
          {recentModules.length > 0 && (
            <View>
              <AppText type='subtitle'>Récents</AppText>
              <View
                onStartShouldSetResponder={() => true}
                style={styles.cardContainer}
              >
                {recentModules.map((module, index) => (
                  <View
                    key={`recentModule${index}`}
                    style={{
                      width: '47%',
                      marginRight: '2%',
                    }}
                  >
                    <ModuleCard module={module} />
                  </View>
                ))}
              </View>
            </View>
          )}
          {oldModules.length > 0 && (
            <View
              style={{
                marginTop: 15,
                borderColor: colors.border,
                borderTopWidth: 1,
                paddingTop: 15,
              }}
            >
              <View
                onStartShouldSetResponder={() => true}
                style={styles.cardContainer}
              >
                {oldModules.map((module, index) => (
                  <View
                    key={`oldModule${index}`}
                    style={{
                      width: '47%',
                      marginRight: '2%',
                    }}
                  >
                    <ModuleCard module={module} />
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
        <SelectNewModule
          style={{ position: 'absolute', bottom: 0, right: 15 }}
        />
      </View>
    </View>
  );
};

export default ModulesScreen;
