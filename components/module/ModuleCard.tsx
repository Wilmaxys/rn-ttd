import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import EditListModule from './EditListModule';
import EditTrackerModule from './EditTrackerModule';
import { themeSelector } from '../../store/slices/user-slice';
import { Module, ListModule, TrackerModule } from '../../types';
import { AppCard, AppText } from '../global';
import { ModalContext } from '../modal';

type Props = {
  module: Module;
};

const ModuleCard = ({ module }: Props) => {
  const { colors } = useSelector(themeSelector);

  const { showModal, setModalOptions } = useContext(ModalContext);

  const onPress = () => {
    if ((module as ListModule).items) {
      setModalOptions({
        title: 'Liste basique',
        renderBody: () => <EditListModule id={module.id} />,
      });
      showModal();
    } else if ((module as TrackerModule).days) {
      setModalOptions({
        title: 'Tracker',
        renderBody: () => <EditTrackerModule id={module.id} />,
      });
      showModal();
    }
  };

  const getIcon = () => {
    if ((module as ListModule).items) {
      return 'format-list-numbered';
    } else if ((module as TrackerModule).days) {
      return 'emoticon-happy-outline';
    }

    return 'tune';
  };

  return (
    <AppCard
      onPress={onPress}
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <AppText style={{ maxWidth: '80%', fontWeight: 'bold' }}>
        {module.title}
      </AppText>
      <MaterialCommunityIcons color={colors.text} name={getIcon()} size={24} />
    </AppCard>
  );
};

export default ModuleCard;
