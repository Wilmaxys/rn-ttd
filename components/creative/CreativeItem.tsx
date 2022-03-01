import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Image,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DragResizeBlock } from 'react-native-drag-resize';
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

  const _renderItem = useCallback(() => {
    switch (item?.type) {
      case 'module': {
        break;
      }
      case 'image': {
        return (
          <Image
            source={{ uri: item.value }}
            style={{
              height: '100%',
              width: '100%',
            }}
            resizeMode='cover'
          />
        );
      }
      case 'shape': {
        break;
      }
    }
  }, [item]);

  const scale = useRef(new Animated.Value(1)).current;

  return (
    <DragResizeBlock
      x={item.x}
      y={item.y}
      zIndex={item.z}
      minH={100}
      minW={100}
      w={item.width}
      h={item.height}
      connectors={focused ? ['mr', 'br', 'bm', 'c'] : []}
      onDragStart={() => {
        Animated.spring(scale, {
          toValue: 1.1,
          friction: 3,
          useNativeDriver: false,
        }).start();
      }}
      onDragEnd={([x, y]: [number, number]) => {
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: false,
        }).start();
        dispatch(updateCreativeItem({ ...item, x, y }));
      }}
    >
      <Animated.View
        style={{
          position: 'relative',
          borderColor: colors.primary,
          borderRadius: 12,
          borderWidth: focused ? 4 : 0,
          backgroundColor: colors.white,
          padding: focused ? 4 : 0,
          transform: [{ scale }],
        }}
        onLayout={({ nativeEvent: { layout } }: LayoutChangeEvent) =>
          dispatch(
            updateCreativeItem({
              ...item,
              width: layout.width + 8,
              height: layout.height + 8,
            })
          )
        }
      >
        <AppButton
          onPress={() => {
            dispatch(updateCreativeItem({ ...item, z: zindex }));
            onPress();
          }}
          style={{ margin: 0, borderRadius: 10, padding: 0 }}
        >
          {_renderItem()}
        </AppButton>
        {focused && (
          <View
            style={{
              position: 'absolute',
              top: -26,
              left: -26,
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
      </Animated.View>
    </DragResizeBlock>
  );
};

export default CreativeItem;
