import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { THEME } from '@src/constants/theme';
import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ContainerProps = {
   overrideStyles?: boolean;
   style?: StyleProp<ViewStyle>;
   children?: ReactNode;
   safeArea?: boolean;
};

const Container: FC<ContainerProps> = ({
   overrideStyles,
   style,
   children,
   safeArea,
}) => {
   if (safeArea) {
      return (
         <SafeAreaView
            style={overrideStyles ? style : [styles.container, style]}
         >
            {children}
         </SafeAreaView>
      );
   }
   return (
      <View style={overrideStyles ? style : [styles.container, style]}>
         {children}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      height: '100%',
      width: '100%',
      backgroundColor: THEME.colors.defaultBackground,
   },
});
export default Container;
