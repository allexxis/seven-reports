import LottieView from 'lottie-react-native';
import loadingBounce from '@assets/images/loading-bounce.json';
import React, { FC, useEffect } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type LoadingBounceProps = {
   start?: boolean;
   style?: StyleProp<ViewStyle>;
};
const LoadingBounce: FC<LoadingBounceProps> = ({ start, style }) => {
   let animation = React.createRef<any>();

   useEffect(() => {
      animation.current.play();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <LottieView
         ref={animation}
         loop={true}
         style={[styles.view, style]}
         source={loadingBounce}
         autoPlay={start}
      />
   );
};
const styles = StyleSheet.create({
   view: {
      width: 50,
      height: 50,
   },
});
export default LoadingBounce;
