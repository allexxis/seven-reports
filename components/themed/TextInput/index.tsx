import React, { useState, FC } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { THEME } from '@/constants/theme';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import {
   TouchableWithoutFeedback,
   NativeViewGestureHandler,
   GestureHandlerRootView,
} from 'react-native-gesture-handler';

export interface InputProps extends TextInputProps {
   type: 'password' | 'text' | 'email' | 'number' | 'phone' | 'search' | 'url';
}
const Input: FC<InputProps> = ({ type, ...props }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [focus, setFocus] = useState(false);
   const passwordIcon = showPassword ? 'eye-outline' : 'eye-off-outline';

   return (
      <GestureHandlerRootView>
         <View
            style={[
               styles.inputContainer,
               props.style,
               focus ? styles.focus : styles.blur,
            ]}
         >
            {type === 'search' && (
               <Ionicons size={22} name={'search'} color={'gray'} />
            )}
            <TextInput
               secureTextEntry={type === 'password' && showPassword}
               selectionColor={THEME.colors.inputBorderFocus}
               placeholderTextColor={THEME.colors.textPlaceholder}
               onBlur={() => {
                  setFocus(false);
               }}
               onFocus={() => {
                  setFocus(true);
               }}
               placeholder={props.placeholder}
               style={[styles.input, type === 'search' ? styles.search : null]}
            />
            {type === 'password' && (
               <TouchableWithoutFeedback
                  onPress={() => {
                     setShowPassword(!showPassword);
                  }}
               >
                  <Ionicons name={passwordIcon} size={22} color={'gray'} />
               </TouchableWithoutFeedback>
            )}
         </View>
      </GestureHandlerRootView>
   );
};
const styles = StyleSheet.create({
   search: {
      paddingLeft: 10,
   },
   inputContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: THEME.sizes.inputHeight,
      height: THEME.sizes.inputHeight,
      borderWidth: THEME.sizes.defaultBorderWidth,
      width: '100%',
      borderRadius: THEME.sizes.defaultRadius,
      paddingHorizontal: THEME.sizes.inputPaddingHorizontal,
      backgroundColor: THEME.colors.inputBackgroung,
   },
   input: {
      flex: 1,
      width: '100%',
      fontSize: THEME.sizes.inputFontSize,
   },
   focus: {
      borderColor: THEME.colors.inputBorderFocus,
   },
   blur: {
      borderColor: THEME.colors.inputBorderBlur,
   },
});
export default Input;
