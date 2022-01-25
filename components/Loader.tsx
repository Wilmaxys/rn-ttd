import React from "react";
import { ActivityIndicator } from "react-native";
import { useColors } from "../hooks";

type props = {
  color?: string;
};

const Loader = ({ color }: props) => {
  const colors = useColors();

  return <ActivityIndicator color={color || colors.primary} />;
};

export default Loader;
