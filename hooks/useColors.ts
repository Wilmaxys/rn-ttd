import { useSelector } from "react-redux";
import { useAppSelector } from ".";
import { defaultColors, defaultTheme } from "../constants";
import { RootState } from "../store";
import { selectColors } from "../store/slices/user-slice";

/**
 * Hook that returns the current theme colors
 */
const useColors = () => useAppSelector(selectColors);

export default useColors;
