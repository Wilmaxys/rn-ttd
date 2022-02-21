import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react';
import { ScrollView, View } from 'react-native';
import RNModal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { themeSelector } from '../../store/slices/user-slice';
import AppText from '../global/AppText';
import AppButton from '../global/inputs/AppButton';

type Props = {
  children?: ReactNode;
  onHide?: () => void;
  title?: string;
  visible: boolean;
};

const AppModal = ({
  children = [],
  onHide = () => {},
  title = '',
  visible,
}: Props) => {
  const { colors } = useSelector(themeSelector);

  const [scrollViewRef, setScrollViewRef] = useState<ScrollView | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  return (
    <RNModal
      isVisible={visible}
      avoidKeyboard
      backdropColor={colors.black}
      backdropOpacity={0.5}
      onModalHide={onHide}
      onBackButtonPress={onHide}
      onBackdropPress={onHide}
      onSwipeComplete={onHide}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      swipeDirection={['down']}
      scrollTo={(e) => scrollViewRef?.scrollTo(e)}
      scrollOffset={scrollOffset}
      scrollOffsetMax={500 - 400}
      propagateSwipe
      style={{
        justifyContent: 'flex-end',
        marginBottom: 0,
        marginHorizontal: 3,
      }}
    >
      <View
        style={{
          position: 'relative',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: 15,
          width: '100%',
          maxHeight: '95%',
          backgroundColor: colors.white,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 15,
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              borderRadius: 50,
              backgroundColor: colors.gray,
              width: 50,
              height: 5,
              opacity: 0.8,
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppText type='title' style={{ fontWeight: 'bold' }}>
            {title}
          </AppText>
        </View>
        <ScrollView
          ref={(ref) => setScrollViewRef(ref)}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      </View>
    </RNModal>
  );
};

export type AppModalProps = Props;

export default AppModal;
