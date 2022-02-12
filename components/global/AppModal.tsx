import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/user-slice';
import AppText from './AppText';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: JSX.Element[] | JSX.Element;
  title?: string;
};

const AppModal = ({
  visible,
  setVisible,
  children = [],
  title = '',
}: Props) => {
  const theme = useSelector(selectTheme);
  const { colors } = theme;

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      animationType='slide'
      onDismiss={handleClose}
      onRequestClose={handleClose}
      style={{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 15,
        width: '100%',
      }}
      transparent
      visible={visible}
    >
      <View>
        <View
          style={{
            marginBottom: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText type='subtitle'>{title}</AppText>
          <TouchableOpacity
            activeOpacity={theme.activeOpacity}
            onPress={handleClose}
            style={{ padding: 15 }}
          >
            <MaterialCommunityIcons name='close' color={colors.text} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default AppModal;
