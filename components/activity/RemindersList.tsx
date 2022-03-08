import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import Notification from "../center/Notification";
import { useSelector } from "react-redux";
import { themeSelector } from "../../store/slices/user-slice";
import { AppText } from "../global";

const CenterScreen = ({}) => {
  const { colors } = useSelector(themeSelector);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    screen: {
      paddingBottom: 100,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      marginTop: 10,
      color: colors.text,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      height: 150,
      width: "100%",
    },
    image: {
      flex: 1,
      width: "100%",
      backgroundColor: colors.secondaryLight,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <AppText type="subtitle" style={{ marginTop: 15 }}>
        Aujourd'hui
      </AppText>
      <Notification />
      <Notification brown={true} />
      <Notification brown={true} />
      <AppText type="subtitle" style={{ marginTop: 15 }}>
        Demain
      </AppText>
      <Notification />
      <Notification brown={true} />
      <Notification />
      <AppText type="subtitle" style={{ marginTop: 15 }}>
        La semaine prochaine
      </AppText>
      <Notification />
      <Notification brown={true} />
    </ScrollView>
  );
};

export default CenterScreen;
