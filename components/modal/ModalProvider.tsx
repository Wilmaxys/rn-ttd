import React, { ReactNode, useState } from 'react';
import AppModal, { AppModalProps } from './AppModal';

type ModalOptions = Omit<AppModalProps, 'visible' | 'children'> & {
  renderBody: () => ReactNode;
};

const defaultModalOptions: ModalOptions = {
  onHide: () => {},
  renderBody: () => null,
  title: '',
};

type Props = {
  children: ReactNode;
};

const ModalProvider = ({ children = [] }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState(defaultModalOptions);

  const providerValue = {
    showModal: () => setModalVisible(true),
    hideModal: () => {
      setModalVisible(false);
    },
    setModalOptions: (options: ModalOptions) =>
      setModalOptions({ ...modalOptions, ...options }),
  };

  return (
    <ModalContext.Provider value={providerValue}>
      {children}
      <AppModal
        {...modalOptions}
        visible={modalVisible}
        onHide={() => {
          setModalVisible(false);
          modalOptions.onHide?.();
        }}
      >
        {modalOptions.renderBody()}
      </AppModal>
    </ModalContext.Provider>
  );
};

export const ModalContext = React.createContext({
  showModal: () => {},
  hideModal: () => {},
  setModalOptions: (options: ModalOptions) => {},
});

export default ModalProvider;
