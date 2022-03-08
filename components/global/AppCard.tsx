import React, { ReactNode } from "react";
import {
  Image,
  ImageRequireSource,
  ImageURISource,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import AppText from "./AppText";
import AppButton from "./inputs/AppButton";
import { themeSelector } from "../../store/slices/user-slice";
import { LinearGradient } from "expo-linear-gradient";

type Props = ViewProps & {
  children?: ReactNode;
  disabled?: boolean;
  imageSource?: ImageRequireSource | ImageURISource;
  onPress?: () => void;
  title?: string;
  titleStyle?: TextStyle;
  gradientColors?: string[];
};

const AppCard = ({
  children,
  disabled = false,
  imageSource,
  onPress,
  style = {},
  title,
  titleStyle = {},
  gradientColors,
  ...props
}: Props) => {
  const { colors } = useSelector(themeSelector);

  const _renderChildren = () => {
    return (
      <View
        style={{
          padding: 15,
          ...(style as ViewStyle),
          backgroundColor: colors.transparent,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          borderWidth: 0,
          elevation: 0,
        }}
      >
        {title !== undefined && (
          <AppText type="title" style={titleStyle}>
            {title}
          </AppText>
        )}
        {children}
      </View>
    );
  };

  return (
    <AppButton
      disabled={disabled || !onPress}
      onPress={onPress}
      style={{
        borderRadius: 15,
        backgroundColor: colors.card,
        overflow: "hidden",
        ...(style as ViewStyle),
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
      {...props}
    >
      <ImageBackground
        source={require("../../assets/images/frame.png")}
        imageStyle={{
          resizeMode: "repeat",
          overflow: "hidden",
          backfaceVisibility: "visible",
          flex: 1,
          opacity: 0.2,
        }}
        style={{
          width: "100%",
        }}
      >
        {imageSource !== undefined && (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Image
              source={imageSource}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 100,
              }}
            />
          </View>
        )}
        {gradientColors !== undefined ? (
          <LinearGradient
            colors={gradientColors}
            start={[0, 0.5]}
            end={[2, 0.5]}
          >
            {_renderChildren()}
          </LinearGradient>
        ) : (
          _renderChildren()
        )}
      </ImageBackground>
    </AppButton>
  );
};

export default AppCard;
