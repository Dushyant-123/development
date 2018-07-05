import { Dimensions, Platform } from 'react-native';
import moment from 'moment';
const window = Dimensions.get('window');
export const width = (pers) => {return pers / 100 * window.width};
export const height = (pers) => {return pers / 100 * window.height};
export const isIphoneX = () => Platform.OS === 'ios' && (window.height === 812 || window.width === 812);
export const widthForOr = (initialOrientationKey, orientationkey) => initialOrientationKey == 'PORTRAIT'? orientationkey == 'PORTRAIT' ? width : height: orientationkey == 'LANDSCAPE' ? height : width;
