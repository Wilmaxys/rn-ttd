import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { addModule, moduleSelector } from '../../store/slices/module-slice';
import { themeSelector } from '../../store/slices/user-slice';
import { ListModule } from '../../types';
import {
  AppButton,
  AppText,
  AppTextInput,
  FormButtons,
  FormInput,
} from '../global';
import { ModalContext } from '../modal/ModalProvider';

type Props = {
  id?: string;
};

const EditListModule = ({ id }: Props) => {
  const edit = id !== undefined && id !== '';

  const dispatch = useDispatch<AppDispatch>();

  const module: ListModule = (
    edit
      ? useSelector(moduleSelector(id))
      : {
          title: '',
          items: [],
        }
  ) as ListModule;

  const { hideModal } = useContext(ModalContext);

  const { colors } = useSelector(themeSelector);

  const [showErrors, setShowErrors] = useState(false);
  const [newItem, setNewItem] = useState('');

  const [title, setTitle] = useState(module.title);
  const [items, setItems] = useState(module.items);

  const saveList = () => {
    if (!title || items.length === 0) {
      setShowErrors(true);
      return;
    }

    dispatch(
      addModule({
        title,
        items,
      })
    );
    hideModal();
  };

  const _renderListItem = useCallback((item: string, index: number) => {
    return (
      <View
        key={`listItem${index}`}
        style={{
          elevation: 2,
          marginBottom: 5,
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AppText style={{ flex: 1 }}>
          <AppText style={{ marginHorizontal: 5, fontWeight: 'bold' }}>
            {`${index + 1}. `}
          </AppText>
          {item}
        </AppText>
      </View>
    );
  }, []);

  return (
    <View style={{ paddingHorizontal: 25 }}>
      <AppTextInput
        label='Titre'
        value={title}
        onChangeText={setTitle}
        required
        showErrors={showErrors}
      />

      <FormInput label='Éléments'>
        {items.length === 0 ? (
          <AppText>Vide...</AppText>
        ) : (
          items.map(_renderListItem)
        )}
      </FormInput>

      <View
        style={{
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <AppTextInput
          label='Nouvel élément'
          value={newItem}
          onChangeText={setNewItem}
          containerStyle={{ marginBottom: 0, flex: 1, marginRight: 5 }}
          style={{ borderWidth: 0 }}
        />

        <AppButton
          disabled={!newItem}
          onPress={() => {
            setItems([...items, newItem]);
            setNewItem('');
          }}
          style={{
            margin: 0,
            padding: 11,
          }}
          variant='secondary'
        >
          <MaterialCommunityIcons name='plus' size={25} />
        </AppButton>
      </View>

      <FormButtons
        okText={edit ? 'Modifier' : 'Ajouter'}
        onCancel={hideModal}
        onSubmit={saveList}
      />
    </View>
  );
};

export default EditListModule;
