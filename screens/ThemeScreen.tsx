import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppButton } from "../components/global";
import { defaultTheme } from "../constants";
import { setTheme, themeSelector } from "../store/slices/user-slice";

const themes: (typeof defaultTheme & { label: string })[] = [
  {
    label: "Vert",
    dark: false,
    activeOpacity: 0.7,
    colors: {
      transparent: "transparent",
      black: "#202F26",
      gray: "#C4C4C4",
      white: "#F8F8F8",

      primary: "#779780",
      primaryDark: "#5F7966",
      primaryLight: "#B8D2C5",
      secondary: "#926953",
      secondaryDark: "#87573D",
      secondaryLight: "#A5806C",
      warning: "#F1FA8C",
      danger: "#FF6E67",
      background: "#EAE2D5",
      card: "#F8F8F8",
      text: "#202F26",
      border: "#C4C4C4",
      notification: "#B8D2C5",
    },
  },
  {
    label: "Néon",
    dark: false,
    activeOpacity: 0.7,
    colors: {
      transparent: "transparent",
      black: "#230728",
      gray: "#C4C4C4",
      white: "#F8F8F8",

      primary: "#974B96",
      primaryDark: "#591F65",
      primaryLight: "#EBBAF5",
      secondary: "#93B0E8",
      secondaryDark: "#8082D7",
      secondaryLight: "#CCE9FB",
      warning: "#F1FA8C",
      danger: "#FF6E67",
      background: "#F6EFF8",
      card: "#FFFFFF",
      text: "#230728",
      border: "#C4C4C4",
      notification: "#F8F8F8",
    },
  },
  {
    label: "Orange",
    dark: false,
    activeOpacity: 0.7,
    colors: {
      transparent: "transparent",
      black: "#3A1500",
      gray: "#C4C4C4",
      white: "#F8F8F8",

      primary: "#F38B0A",
      primaryDark: "#E4582C",
      primaryLight: "#FAA325",
      secondary: "#9470B5",
      secondaryDark: "#312F6E",
      secondaryLight: "#E0BBE6",
      warning: "#F1FA8C",
      danger: "#FF6E67",
      background: "#F8EDEB",
      card: "#F8F8F8",
      text: "#3A1500",
      border: "#C4C4C4",
      notification: "#B8D2C5",
    },
  },
  {
    label: "Canard",
    dark: false,
    activeOpacity: 0.7,
    colors: {
      transparent: "transparent",
      black: "#39210B",
      gray: "#C4C4C4",
      white: "#F8F8F8",

      primary: "#C98C55",
      primaryDark: "#A16229",
      primaryLight: "#E5AF80",
      secondary: "#28685F",
      secondaryDark: "#134039",
      secondaryLight: "#65867D",
      warning: "#F1FA8C",
      danger: "#FF6E67",
      background: "#EEE8E3",
      card: "#F8F8F8",
      text: "#39210B",
      border: "#C4C4C4",
      notification: "#B8D2C5",
    },
  },
  {
    label: "Dark blue",
    dark: true,
    activeOpacity: 0.7,
    colors: {
      transparent: "transparent",
      black: "#39210B",
      gray: "#C4C4C4",
      white: "#F8F8F8",

      primary: "#C98C55",
      primaryDark: "#A16229",
      primaryLight: "#E5AF80",
      secondary: "#28685F",
      secondaryDark: "#134039",
      secondaryLight: "#65867D",
      warning: "#F1FA8C",
      danger: "#FF6E67",
      background: "#222D3E",
      card: "#182130",
      text: "#F8F8F8",
      border: "#C4C4C4",
      notification: "#B8D2C5",
    },
  },
  {
    label: "Néon Dark",
    dark: true,
    activeOpacity: 0.7,
    colors: {
      transparent: "transparent",
      black: "#39210B",
      gray: "#C4C4C4",
      white: "#F8F8F8",

      primary: "#974B96",
      primaryDark: "#591F65",
      primaryLight: "#EBBAF5",
      secondary: "#93B0E8",
      secondaryDark: "#8082D7",
      secondaryLight: "#CCE9FB",
      warning: "#F1FA8C",
      danger: "#FF6E67",
      background: "#000000",
      card: "#212121",
      text: "#F8F8F8",
      border: "#C4C4C4",
      notification: "#F8F8F8",
    },
  },
];

type Props = {};

const ThemeScreen = ({}: Props) => {
  const dispatch = useDispatch();

  const { colors } = useSelector(themeSelector);

  return (
    <>
      <View
        style={{
          padding: 30,
          flex: 1,
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        {themes.map((theme, index) => (
          <AppButton
            key={`themeButton${index}`}
            text={theme.label}
            onPress={() => dispatch(setTheme(theme))}
            style={{ backgroundColor: theme.colors.primary }}
          />
        ))}
      </View>
      <View
        style={{
          marginVertical: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            borderRadius: 50,
            backgroundColor: colors.primaryDark,
            padding: 50,
          }}
        ></View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: colors.primary,
            padding: 50,
          }}
        ></View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: colors.primaryLight,
            padding: 50,
          }}
        ></View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: colors.secondaryDark,
            padding: 50,
          }}
        ></View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: colors.secondary,
            padding: 50,
          }}
        ></View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: colors.secondaryLight,
            padding: 50,
          }}
        ></View>
      </View>
    </>
  );
};

export default ThemeScreen;
