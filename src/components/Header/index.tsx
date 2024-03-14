import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { THEME } from '@src/constants/theme';
import { StyleProp, ViewStyle } from 'react-native';

export type HeaderProps = {
   text: string;
   bold?: boolean;
   variant: HeaderVariant;
   style?: StyleProp<ViewStyle>;
};

export type HeaderVariant = 'h1' | 'h2' | 'h3';

const Header: FC<HeaderProps> = ({ text, bold, variant, style }) => {
   return (
      <Text
         style={[
            styles.header,
            bold ? styles.bold : null,
            {
               fontSize: THEME.sizes[variant],
            },
            style,
         ]}
      >
         {text}
      </Text>
   );
};
const styles = StyleSheet.create({
   bold: {
      fontWeight: 'bold',
   },
   header: {
      fontSize: THEME.sizes.h1,
      color: THEME.colors.textPrimary,
   },
});
export default Header;
