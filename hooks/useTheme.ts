import { useSelector } from 'react-redux';
import { defaultTheme } from '../constants';

/**
 * Hook that returns the current theme
 */
const useTheme = () => {
  const theme = useSelector((state) => state.user.theme);

  return theme || defaultTheme;
};

export default useTheme;
