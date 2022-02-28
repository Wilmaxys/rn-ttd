import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useState } from 'react';
import { FlatList, Image, ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AppButton, AppCard, AppText } from '../components/global';
import { moderateScale } from '../constants';
import { modulesSelector } from '../store/slices/module-slice';
import { themeSelector } from '../store/slices/user-slice';

type Tab = {
  title: string;
  items: ReactNode[];
};
type Props = {};

const CreativeScreen = ({}: Props) => {
  const navigation = useNavigation();

  const { colors } = useSelector(themeSelector);

  const modules = useSelector(modulesSelector);

  const [currentTab, setCurrentTab] = useState(0);
  const [tabOpen, setTabOpen] = useState(true);

  const tabs: Tab[] = [
    {
      title: 'Modules',
      items: modules.map((module) => (
        <AppCard>
          <AppText style={{ fontWeight: 'bold' }}>{module.title}</AppText>
        </AppCard>
      )),
    },
    {
      title: 'Images',
      items: [
        'https://images.unsplash.com/photo-1608592077365-c6399182e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1517328894681-0f5dfabd463c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        'https://images.unsplash.com/photo-1612981453053-184fd648b66b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1413&q=80',
        'https://images.unsplash.com/photo-1609154767012-331529e7d73b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=671&q=80',
      ].map((uri) => (
        <AppCard style={{ padding: 0 }}>
          <Image
            source={{ uri }}
            style={{ width: moderateScale(75), height: moderateScale(50) }}
            resizeMode='cover'
          />
        </AppCard>
      )),
    },
    {
      title: 'Dessin',
      items: (
        [
          'brush',
          'pencil-outline',
          'format-color-fill',
          'eyedropper',
          'format-color-text',
        ] as (
          | 'brush'
          | 'pencil-outline'
          | 'format-color-fill'
          | 'eyedropper'
          | 'format-color-text'
        )[]
      ).map((item) => (
        <AppCard>
          <MaterialCommunityIcons name={item} color={colors.text} size={30} />
        </AppCard>
      )),
    },
    {
      title: 'Formes',
      items: (
        [
          'square-outline',
          'vector-line',
          'circle-outline',
          'hexagon-outline',
          'star-outline',
          'heart-outline',
          'message-outline',
        ] as (
          | 'square-outline'
          | 'vector-line'
          | 'circle-outline'
          | 'hexagon-outline'
          | 'star-outline'
          | 'heart-outline'
          | 'message-outline'
        )[]
      ).map((item) => (
        <AppCard>
          <MaterialCommunityIcons name={item} color={colors.text} size={30} />
        </AppCard>
      )),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 15,
          width: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AppText type='title'>Création</AppText>
          <AppButton
            onPress={() => navigation.navigate('Home')}
            variant='secondary'
            style={{
              padding: 5,
            }}
          >
            <MaterialCommunityIcons name='cog' size={30} color={colors.text} />
          </AppButton>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FlatList
            keyExtractor={(_, index) => `tab${index}`}
            data={tabs}
            horizontal
            renderItem={({ item, index }) => (
              <AppButton
                onPress={() => {
                  setCurrentTab(index);
                  setTabOpen(true);
                }}
                variant='secondary'
                style={{ padding: 5 }}
              >
                <AppText
                  type='subtitle'
                  style={{
                    fontWeight: 'bold',
                    opacity: currentTab === index ? 1 : 0.5,
                  }}
                >
                  {item.title}
                </AppText>
              </AppButton>
            )}
          />
          <AppButton
            variant='secondary'
            style={{ padding: 5 }}
            onPress={() => setTabOpen(!tabOpen)}
          >
            <MaterialCommunityIcons
              name={tabOpen ? 'chevron-up' : 'chevron-down'}
              color={colors.text}
              size={30}
            />
          </AppButton>
        </View>
        {tabOpen && (
          <FlatList
            keyExtractor={(_, index) => `tabOptions${index}`}
            data={tabs[currentTab].items}
            renderItem={({ item }) => <View>{item}</View>}
            horizontal
          />
        )}
      </View>

      <View
        style={{ position: 'relative', backgroundColor: colors.white, flex: 1 }}
      >
        <ImageBackground
          source={require('../assets/images/creative/dots.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
          resizeMode='repeat'
        ></ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default CreativeScreen;
