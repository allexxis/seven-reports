import LoadingBounce from '@components/LoadingBounce';
import RippleButton from '@components/RippleButton';
import { THEME } from '@src/constants/theme';
import React from 'react';
import {
   Pressable,
   ButtonProps as RNButtonProps,
   StyleProp,
   StyleSheet,
   Text,
   View,
   ViewStyle,
} from 'react-native';

export type ButtonProps = Omit<RNButtonProps, 'title'> & {
   style?: StyleProp<ViewStyle>;
   fill?: boolean;
   loading?: boolean;
   onPress?: () => void;
   text: string;
   icon?: any;
   iconOrientation?: 'left' | 'right';
   transparent?: boolean;
};
const childrenWithProps = (icon: any, props: any) =>
   React.Children.map(icon, (child) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (React.isValidElement(child)) {
         return React.cloneElement(child, { ...props });
      }
      return child;
   });
const Button: React.FC<ButtonProps> = ({
   transparent,
   text,
   onPress,
   fill,
   disabled,
   loading,
   icon,
   iconOrientation,
   style,
}) => {
   const styles = StyleSheet.create({
      loading: {
         position: 'absolute',
         left: 0,
         top: 0,
      },
      icon: {},
      iconViewLeft: {
         height: THEME.sizes.buttonHeight,
         justifyContent: 'center',
         position: 'absolute',
         left: 0,
         top: 0,
         marginLeft: 20,
      },
      iconViewRight: {
         height: THEME.sizes.buttonHeight,
         justifyContent: 'center',
         position: 'absolute',
         right: 0,
         top: 0,
         marginRight: 20,
      },
      text: {
         color: transparent
            ? THEME.colors.textPrimary
            : THEME.colors.buttonFillText,
         fontSize: THEME.sizes.button.text,
         alignSelf: 'center',
         textAlign: 'center',
         justifyContent: 'center',
      },
      button: {
         flexDirection: 'row',
         alignContent: 'center',
         justifyContent: 'center',
         borderRadius: THEME.sizes.buttonBorderRadius,
         borderWidth: THEME.sizes.defaultBorderWidth,
         borderStyle: 'solid',
         height: THEME.sizes.buttonHeight,
         width: '100%',
         backgroundColor: transparent
            ? THEME.colors.defaultBackground
            : loading || disabled
            ? THEME.colors.button.disabledBackground
            : fill
            ? THEME.colors.buttonFillBackground
            : THEME.colors.buttonOutLineBackground,
         borderColor: THEME.colors.buttonOutlineBorder,
         color: fill
            ? THEME.colors.buttonFillText
            : THEME.colors.buttonOutlineText,
      },
   });
   if (disabled || loading) {
      return (
         <Pressable style={[styles.button, style]}>
            {loading && (
               <LoadingBounce style={styles.loading} start={loading} />
            )}
            <Text style={styles.text}>{text}</Text>
         </Pressable>
      );
   }
   if (icon) {
      return (
         <RippleButton
            transparent
            style={[styles.button, style]}
            disable={disabled}
            backgroundColor={transparent ? '#FFF' : fill ? '#4952C7' : ''}
            fill
            radius="button"
            onPress={disabled ? () => {} : onPress}
         >
            <View
               style={
                  iconOrientation === 'left'
                     ? styles.iconViewLeft
                     : styles.iconViewRight
               }
            >
               {childrenWithProps(icon, {
                  style: styles.icon,
               })}
            </View>

            <Text style={styles.text}>{text}</Text>
         </RippleButton>
      );
   }
   return (
      <RippleButton
         style={styles.button}
         disable={disabled}
         backgroundColor={fill ? '#4952C7' : ''}
         fill
         radius="button"
         onPress={disabled ? () => {} : onPress}
      >
         <Text style={styles.text}>{text}</Text>
      </RippleButton>
   );
};

export default Button;
