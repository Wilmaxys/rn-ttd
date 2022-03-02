import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './navigation';
import { Loader } from './components/global';
import { ModalProvider } from './components/modal';
import moment from 'moment';
import 'moment/locale/fr';

const loadResourcesAsync = async (): Promise<void> => {
  moment.locale('fr');
  return await Font.loadAsync({
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
    montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
  });
};

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ModalProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='auto' />
            <AppNavigator />
          </SafeAreaView>
        </ModalProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
