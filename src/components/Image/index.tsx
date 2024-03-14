import React, {FC} from 'react';
import {
  Image as RNImage,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

interface ImageProps {
  style?: StyleProp<ImageStyle>;
  source: ImageSourcePropType;
  type?: 'icon';
}
const Image: FC<ImageProps> = ({source, style, type}) => {
  return (
    <RNImage
      style={[style, type === 'icon' ? styles.icon : null]}
      source={source}
    />
  );
};
const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
});
export default Image;
