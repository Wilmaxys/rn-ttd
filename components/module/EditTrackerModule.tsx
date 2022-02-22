import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  addModule,
  moduleSelector,
  updateModule,
} from '../../store/slices/module-slice';
import { TrackerModule } from '../../types';
import { AppTextInput, FormButtons } from '../global';
import { ModalContext } from '../modal';

type Props = {
  id?: string;
};

const EditTrackerModule = ({ id }: Props) => {
  const edit = id !== undefined && id !== '';

  const dispatch = useDispatch<AppDispatch>();

  const module: TrackerModule = (
    edit
      ? useSelector(moduleSelector(id))
      : {
          title: '',
          days: [],
        }
  ) as TrackerModule;

  const { hideModal } = useContext(ModalContext);

  const [showErrors, setShowErrors] = useState(false);

  const [title, setTitle] = useState(module.title);

  const saveList = () => {
    if (!title) {
      setShowErrors(true);
      return;
    }

    dispatch(
      edit
        ? updateModule({
            id,
            title,
            days: module.days,
          })
        : addModule({
            title,
            days: [],
          })
    );
    hideModal();
  };

  return (
    <View style={{ paddingHorizontal: 25 }}>
      <AppTextInput
        label='Titre'
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={saveList}
        required
        showErrors={showErrors}
      />

      <FormButtons
        okText={edit ? 'Modifier' : 'Ajouter'}
        onCancel={hideModal}
        onSubmit={saveList}
      />
    </View>
  );
};

export default EditTrackerModule;
