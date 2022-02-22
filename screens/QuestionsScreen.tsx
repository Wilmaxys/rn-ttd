import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageRequireSource, ImageURISource, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AppButton, AppText } from '../components/global';
import { themeSelector } from '../store/slices/user-slice';

type Page = {
  title: string;
  question: string;
  image: ImageRequireSource | ImageURISource;
  buttons: string[];
};

const pages: Page[] = [
  {
    title: 'Questionnaire',
    question:
      "Nous allons maintenant vous poser quelques questions.\n\nCela nous permettra de mieux vous connaitre et d'adapter l'application pour qu'elle vous ressemble.",
    image: require('../assets/images/questions/questions.png'),
    buttons: ['Commencer'],
  },
  {
    title: 'Organisation',
    question: 'Travaillez-vous beaucoup ?',
    image: require('../assets/images/questions/work.png'),
    buttons: ['Beaucoup', 'Normal', 'Un peu'],
  },
  {
    title: 'Organisation',
    question: 'Prenez-vous le temps de vous reposer ?',
    image: require('../assets/images/questions/relax.png'),
    buttons: ['Souvent', 'Des fois', 'Pas trop'],
  },
  {
    title: 'Santé',
    question: 'Êtes-vous heureux ?',
    image: require('../assets/images/questions/happy.png'),
    buttons: ['Complètement', 'Ça va', 'Aidez-moi'],
  },
  {
    title: 'Santé',
    question: 'Mangez-vous correctement ?',
    image: require('../assets/images/questions/health.png'),
    buttons: ['Oui', 'Non', "C'est qui correctement ?"],
  },
  {
    title: 'Quotidien',
    question: 'Avez-vous un journal intime ?',
    image: require('../assets/images/questions/book.png'),
    buttons: ['Oui', 'Non', 'Je vous dirais pas'],
  },
  {
    title: 'Quotidien',
    question: 'Prenez-vous souvent des photos ?',
    image: require('../assets/images/questions/photos.png'),
    buttons: ['Oui', "Ça m'arrive", 'Pas trop'],
  },
  {
    title: 'Fin',
    question:
      'Vous avez fini, bravo !\n\nVous pouvez maintenant profiter de votre application personnalisée !',
    image: require('../assets/images/questions/celebrate.png'),
    buttons: ['Commencer'],
  },
];

type Props = {};

const QuestionsStartScreen = ({}: Props) => {
  const navigation = useNavigation();

  const { colors } = useSelector(themeSelector);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          position: 'relative',
          paddingHorizontal: 15,
          paddingVertical: 25,
          overflow: 'visible',
        }}
      >
        <AppText type='title' style={{ fontSize: 32 }}>
          {pages[currentPage].title}
        </AppText>
        <Image
          source={pages[currentPage].image}
          style={{ margin: '5%', width: '90%', height: 250 }}
          resizeMode='contain'
        />
        <View
          style={{
            position: 'absolute',
            bottom: -15,
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            zIndex: 90,
          }}
        >
          {pages.map((_, index) => {
            const isPassed = index < currentPage;
            const isSelected = index === currentPage;

            if (index === 0 || index === pages.length - 1) return;

            return (
              <View
                key={`pageNumber${index}`}
                style={{
                  borderColor: isSelected ? colors.primary : colors.white,
                  borderRadius: 50,
                  borderWidth: isPassed ? 0 : 4,
                  backgroundColor: isPassed ? colors.primary : colors.white,
                  padding: isPassed ? 4 : 0,
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isPassed ? (
                  <MaterialCommunityIcons
                    name='check'
                    color={colors.white}
                    size={20}
                  />
                ) : (
                  <AppText>{index}</AppText>
                )}
              </View>
            );
          })}
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: 25,
          paddingVertical: 50,
          flex: 1,
        }}
      >
        <AppText>{pages[currentPage].question}</AppText>
        <View style={{ padding: 15 }}>
          {pages[currentPage].buttons.map((button, index) => (
            <AppButton
              key={`pageButton${index}`}
              variant='secondary'
              onPress={() => {
                if (currentPage < pages.length - 1) {
                  setCurrentPage(currentPage + 1);
                } else {
                  navigation.navigate('Home');
                }
              }}
              style={{
                borderColor: colors.border,
                borderRadius: 10,
                borderWidth: 1,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <AppText>{button}</AppText>
              <MaterialCommunityIcons
                name='chevron-right'
                color={colors.text}
                size={20}
              />
            </AppButton>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuestionsStartScreen;
