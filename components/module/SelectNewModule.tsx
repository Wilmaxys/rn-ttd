import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ReactNode, useCallback, useContext } from 'react';
import {
  Dimensions,
  ImageRequireSource,
  ImageURISource,
  View,
  ViewStyle,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import EditListModule from './EditListModule';
import { themeSelector } from '../../store/slices/user-slice';
import { BaseModule } from '../../types';
import { AppCard, AppText, AppButton } from '../global';
import { ModalContext } from '../modal';
import EditTrackerModule from './EditTrackerModule';
import { moderateScale } from '../../constants';

type ModuleSelectorItem = BaseModule & {
  component: () => ReactNode;
  image: ImageURISource | ImageRequireSource;
  description: string;
};

const modules: ModuleSelectorItem[] = [
  {
    title: 'Liste basique',
    description: "Afficher une liste d'information simple",
    image: require('../../assets/images/numberedlist.jpg'),
    component: () => <EditListModule />,
  },
  {
    title: 'Tracker',
    description: 'Suivez vous au rythme que vous souhaîtez',
    image: require('../../assets/images/trackers.png'),
    component: () => <EditTrackerModule />,
  },
  {
    title: 'Liste basique',
    description: "Afficher une liste d'information simple",
    image: require('../../assets/images/numberedlist.jpg'),
    component: () => <EditListModule />,
  },
  {
    title: 'Tracker',
    description: 'Suivez vous au rythme que vous souhaîtez',
    image: require('../../assets/images/trackers.png'),
    component: () => <EditTrackerModule />,
  },
];

type Props = {
  style?: ViewStyle;
};

const SelectNewModule = ({ style = {} }: Props) => {
  const { colors } = useSelector(themeSelector);

  const { showModal, setModalOptions } = useContext(ModalContext);

  const _renderModalBody = useCallback(() => {
    return (
      <View style={{ paddingBottom: 15 }}>
        <Carousel
          data={modules}
          itemWidth={Dimensions.get('window').width - moderateScale(150)}
          loop
          renderItem={({ item: module }) => (
            <AppCard
              title={module.title}
              onPress={() => {
                setModalOptions({
                  title: module.title,
                  renderBody: module.component,
                });
              }}
              imageSource={module.image}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <AppText>{module.description}</AppText>
            </AppCard>
          )}
          sliderWidth={Dimensions.get('window').width - 6}
        />
      </View>
    );
  }, [modules]);

  return (
    <View style={style}>
      <AppButton
        onPress={() => {
          setModalOptions({
            title: 'Sélectionner un module',
            renderBody: _renderModalBody,
          });
          showModal();
        }}
        style={{
          padding: 20,
          borderRadius: 50,
          backgroundColor: colors.primaryLight,
        }}
      >
        <MaterialCommunityIcons name='plus' size={30} color={colors.black} />
      </AppButton>
    </View>
  );
};

export default SelectNewModule;
