import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/user-slice';
import { Module } from '../../types';
import { AppCard, AppText, AppModal } from '../global';

type ModuleGroup = {
  title: string;
  items: Module[];
};

type Props = {
  style?: ViewStyle;
};

const AddModule = ({ style = {} }: Props) => {
  const theme = useSelector(selectTheme);
  const { colors } = theme;

  const [modalVisible, setModalVisible] = useState(false);

  const moduleGroups: ModuleGroup[] = [
    {
      title: 'Listes',
      items: [
        {
          title: 'Basic',
          description: "Afficher une liste d'informations simple",
        },
        {
          title: 'Basic',
          description: "Afficher une liste d'informations simple",
        },
        {
          title: 'Basic',
          description: "Afficher une liste d'informations simple",
        },
        {
          title: 'Basic',
          description: "Afficher une liste d'informations simple",
        },
      ],
    },
    {
      title: 'Autres',
      items: [
        {
          title: 'Trackers',
          description: 'Suivez vous au rythme que vous souhaîtez',
        },
        {
          title: 'Trackers',
          description: 'Suivez vous au rythme que vous souhaîtez',
        },
        {
          title: 'Trackers',
          description: 'Suivez vous au rythme que vous souhaîtez',
        },
        {
          title: 'Trackers',
          description: 'Suivez vous au rythme que vous souhaîtez',
        },
      ],
    },
  ];

  const _renderModule = (module: Module) => {
    return (
      <AppCard title={module.title}>
        <AppText>{module.description}</AppText>
      </AppCard>
    );
  };

  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={theme.activeOpacity}
        style={{
          padding: 20,
          borderRadius: 50,
          backgroundColor: colors.lightGreen,
        }}
      >
        <MaterialCommunityIcons name='plus' size={30} color={colors.black} />
      </TouchableOpacity>
      <AppModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title='Sélectionner une module'
      >
        <ScrollView>
          {moduleGroups.map((group) => (
            <View>
              <AppText>{group.title}</AppText>
              <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
                <Carousel
                  data={group.items}
                  renderItem={({ item }) => _renderModule(item)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </AppModal>
    </View>
  );
};

export default AddModule;
