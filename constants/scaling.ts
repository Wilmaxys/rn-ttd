import { Dimensions } from 'react-native';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const width = Math.min(w, h);
const height = Math.max(w, h);

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { width, height, scale, verticalScale, moderateScale };
