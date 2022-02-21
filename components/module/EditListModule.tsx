import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { addModule, moduleSelector } from '../../store/slices/module-slice';
import { ListModule } from '../../types';
import {
  AppButton,
  AppText,
  AppTextInput,
  FormButtons,
  FormInput,
} from '../global';
import { ModalContext } from '../modal';

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
          items: [''],
        }
  ) as ListModule;

  const { hideModal } = useContext(ModalContext);

  const [showErrors, setShowErrors] = useState(false);

  const [title, setTitle] = useState(module.title);
  const [items, setItems] = useState(module.items);

  const updateItem = (index: number, item: string) => {
    const clone = [...items];
    clone[index] = item;
    setItems(clone);
  };

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
        {items.map((item, index) => (
          <AppTextInput
            key={`listItem${index}`}
            value={item}
            onChangeText={(text) => updateItem(index, text)}
            onSubmitEditing={() => {
              setItems([...items, '']);
            }}
            renderAfter={() => (
              <AppButton
                variant='secondary'
                onPress={() => {
                  if (items.length > 1) {
                    setItems(items.filter((_, i) => i !== index));
                  } else {
                    setItems(['']);
                  }
                }}
                style={{
                  padding: 8,
                }}
              >
                <MaterialCommunityIcons name='close' size={20} />
              </AppButton>
            )}
            renderBefore={() => (
              <AppText style={{ marginLeft: 10, fontWeight: 'bold' }}>
                {`${index + 1}. `}
              </AppText>
            )}
            style={{
              padding: 5,
            }}
            containerStyle={{
              flex: 1,
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          />
        ))}
      </FormInput>

      <FormButtons
        okText={edit ? 'Modifier' : 'Ajouter'}
        onCancel={hideModal}
        onSubmit={saveList}
      />
    </View>
  );
};

export default EditListModule;
