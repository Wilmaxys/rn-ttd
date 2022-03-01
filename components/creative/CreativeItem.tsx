import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Image, PanResponder, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  creativeItemSelector,
  lowestCreativeItemZIndexSelector,
  removeCreativeItem,
  updateCreativeItem,
} from '../../store/slices/creative-slice';
import { themeSelector } from '../../store/slices/user-slice';
import { AppButton } from '../global';

type Props = {
  id: string;
  focused?: boolean;
  onPress?: () => void;
};

const CreativeItem = ({ id, focused = false, onPress = () => {} }: Props) => {
  const dispatch = useDispatch();

  const { colors } = useSelector(themeSelector);
  const zindex = useSelector(lowestCreativeItemZIndexSelector);

  const item = useSelector(creativeItemSelector(id));

  if (!item) {
    return <MaterialCommunityIcons name='help' size={30} color={colors.text} />;
  }

  const coordinates = useRef(
    new Animated.ValueXY({ x: item.x, y: item.y })
  ).current;

  const scale = useRef(new Animated.Value(1)).current;

  const size = useRef(
    new Animated.ValueXY({ x: item.width, y: item.y })
  ).current;
  // const [size, setSize] = useState({
  //   height: new Animated.Value(item.height),
  //   width: new Animated.Value(item.width),
  // });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        coordinates.setOffset({
          x: coordinates.x._value as number,
          y: coordinates.y._value as number,
        });
        coordinates.setValue({ x: 0, y: 0 });
        Animated.spring(scale, {
          toValue: 1.1,
          friction: 3,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: coordinates.x, dy: coordinates.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        coordinates.flattenOffset();
        dispatch(
          updateCreativeItem({
            ...item,
            x: coordinates.x._value,
            y: coordinates.y._value,
          })
        );
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const resizeResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        size.setOffset({
          x: coordinates.x._value as number,
          y: coordinates.y._value as number,
        });
        size.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: size.x, dy: size.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        coordinates.flattenOffset();
        dispatch(
          updateCreativeItem({
            ...item,
            height: size.y._value - coordinates.y._value,
            width: size.x._value - coordinates.x._value,
          })
        );
      },
    })
  ).current;

  const _renderItem = useCallback(() => {
    switch (item?.type) {
      case 'module': {
        break;
      }
      case 'image': {
        return (
          <Image
            source={{ uri: item.value }}
            style={{ height: item.height, width: item.width }}
            resizeMode='cover'
          />
        );
      }
      case 'shape': {
        break;
      }
    }
  }, [item]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: 'absolute',
        transform: [...coordinates.getTranslateTransform(), { scale }],
        zIndex: item.z,
      }}
    >
      <View
        style={{
          position: 'relative',
          borderColor: colors.primary,
          borderRadius: 12,
          borderWidth: focused ? 4 : 0,
          backgroundColor: colors.white,
          padding: focused ? 4 : 0,
        }}
      >
        <AppButton
          onPress={() => {
            dispatch(updateCreativeItem({ ...item, z: zindex }));
            onPress?.();
          }}
          style={{ margin: 0, borderRadius: 10, padding: 0 }}
        >
          {_renderItem()}
        </AppButton>
        {focused && (
          <View
            style={{
              position: 'absolute',
              top: -28,
              left: -28,
            }}
          >
            <AppButton
              onPress={() => dispatch(removeCreativeItem(item))}
              style={{
                borderColor: colors.white,
                borderRadius: 50,
                borderWidth: 4,
                backgroundColor: colors.danger,
                padding: 5,
              }}
            >
              <MaterialCommunityIcons
                name='trash-can-outline'
                color={colors.white}
                size={25}
              />
            </AppButton>
          </View>
        )}
        {focused && (
          <View
            style={{
              position: 'absolute',
              top: -23,
              right: -23,
              borderColor: colors.white,
              borderRadius: 50,
              borderWidth: 4,
              backgroundColor: colors.primary,
              padding: 5,
            }}
          >
            <MaterialCommunityIcons
              name='redo'
              size={25}
              color={colors.white}
              style={{
                transform: [{ rotate: '45deg' }],
              }}
            />
          </View>
        )}
        {focused && (
          <Animated.View
            {...resizeResponder.panHandlers}
            style={{
              position: 'absolute',
              bottom: -23,
              right: -23,
              borderColor: colors.white,
              borderRadius: 50,
              borderWidth: 4,
              backgroundColor: colors.primary,
              padding: 5,
            }}
          >
            <MaterialCommunityIcons
              name='arrow-top-left-bottom-right-bold'
              size={25}
              color={colors.white}
            />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

export default CreativeItem;
