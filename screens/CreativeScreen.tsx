import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  useWindowDimensions,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CreativeItem } from '../components/creative';
import { AppButton, AppCard, AppText } from '../components/global';
import { moderateScale } from '../constants';
import {
  addCreativeItem,
  creativeItemsSelector,
  lowestCreativeItemZIndexSelector,
} from '../store/slices/creative-slice';
import { modulesSelector } from '../store/slices/module-slice';
import { themeSelector } from '../store/slices/user-slice';

type Tab = {
  title: string;
  items: ReactNode[];
};
type Props = {};

const CreativeScreen = ({}: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { colors } = useSelector(themeSelector);

  const modules = useSelector(modulesSelector);
  const creativeItems = useSelector(creativeItemsSelector);
  const lowestZ = useSelector(lowestCreativeItemZIndexSelector);

  const [currentTab, setCurrentTab] = useState(0);
  const [tabOpen, setTabOpen] = useState(true);

  const { height, width } = useWindowDimensions();

  const addItem = useCallback(
    (value: string, type: 'image' | 'module' | 'shape') => {
      dispatch(
        addCreativeItem({
          value,
          type,
          x: 0,
          y: 0,
          z: lowestZ,
          height: moderateScale(150),
          width: moderateScale(200),
          rotation: '0deg',
        })
      );
    },
    [width, height, lowestZ]
  );

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
        'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80',
      ].map((uri) => (
        <AppCard onPress={() => addItem(uri, 'image')} style={{ padding: 0 }}>
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

  const [focusedItemId, setFocusedItemId] = useState('');

  return (
    <View style={{ flex: 1 }}>
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
            contentContainerStyle={{
              minHeight: moderateScale(60),
              alignItems: 'center',
            }}
          />
        )}
      </View>

      <ImageBackground
        source={require('../assets/images/creative/dots.png')}
        style={{
          position: 'relative',
          backgroundColor: colors.white,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        resizeMode='repeat'
      >
        {creativeItems.map(({ id = '' }, index) => (
          <CreativeItem
            key={`creativeItem${index}`}
            id={id}
            focused={id === focusedItemId}
            onPress={() => setFocusedItemId(id)}
          />
        ))}
      </ImageBackground>
    </View>
  );
};

export default CreativeScreen;
