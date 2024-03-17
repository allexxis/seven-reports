import GoogleLogo from '@assets/images/google-logo.png';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import GoogleOAuth from '@components/Auth/GoogleOAuth';
import Button from '@components/Button';
import Container from '@components/Container';
import Header from '@components/Header';
import Image from '@components/Image';
import Input from '@components/Input';
import Text from '@components/Text';
import { THEME } from '@src/constants/theme';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = any;
const Login: React.FC<Props> = ({ ...props }) => {
   const [loading, setL] = useState(false);
   const { isSignedIn } = useAuth();
   const { signIn, setActive, isLoaded } = useSignIn();
   const [emailAddress, setEmailAddress] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [showGoogleAuth, setShowGoogleAuth] = useState(false);
   if (isLoaded && isSignedIn) router.replace('/(tabs)');

   useEffect(() => {
      if (isSignedIn) {
         router.replace('/(tabs)');
      }
   }, [isLoaded]);
   const onGooglePress = async () => {
      setShowGoogleAuth(true);
   };
   const onSignInPress = async () => {
      if (emailAddress === '' || password === '') {
         return setError('Los campos no pueden estar vacios');
      }
      if (!isLoaded) {
         return;
      }
      setL(true);
      try {
         const completeSignIn = await signIn.create({
            identifier: emailAddress,
            password,
         });
         // This is an important step,
         // This indicates the user is signed in
         await setActive({ session: completeSignIn.createdSessionId });
      } catch (err: any) {
         if (err.errors && err.errors.length > 0) {
            if (err.errors[0].code === 'form_identifier_not_found') {
               setError('Cuenta no encontrada');
            } else if (err.errors[0].code === 'form_password_incorrect') {
               setError('Contraseña incorrecta');
            } else {
               setError('Correo o contraseña incorrectos');
            }
         } else {
            setError('Correo o contraseña incorrectos');
         }
      }
      setL(false);
   };
   if (showGoogleAuth) {
      return (
         <Container safeArea>
            <GoogleOAuth
               closeAuth={() => {
                  setShowGoogleAuth(false);
               }}
               setErrorMessage={setError}
            />
         </Container>
      );
   }
   return (
      <GestureHandlerRootView>
         <Container safeArea>
            <View style={styles.main}>
               {/* <View alignSelf='center'>
          <PackingSvg heigth={450} width={450}/>
        </View> */}
               <Header
                  style={styles.header}
                  variant="h1"
                  bold
                  text="Iniciar Sesión"
               />
               <View style={styles.formHeader}>
                  <Header variant="h3" text="¡Bienvenido a seven app! " />
                  {/* <Ripple
                     onPress={() => {
                        // navigation.navigate(REGISTER);
                     }}
                  >
                     <Text style={styles.registerLink} text="Crear Cuenta" />
                  </Ripple> */}
               </View>
               <View style={styles.formBody}>
                  <Input
                     onChange={(e) => setEmailAddress(e.nativeEvent.text)}
                     type="text"
                     style={styles.input}
                     placeholder="Correo"
                  />

                  <Input
                     onChange={(e) => setPassword(e.nativeEvent.text)}
                     style={styles.input}
                     type="password"
                     placeholder="Contraseña"
                  />
                  {error && (
                     <Text
                        text={error}
                        style={{ marginTop: 5, color: 'red' }}
                     />
                  )}
                  <View style={styles.buttonsContainer}>
                     <Button
                        onPress={onSignInPress}
                        loading={loading}
                        disabled={loading}
                        fill
                        text="Continuar"
                     />
                     <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text text="o" style={styles.dividerText} />
                     </View>

                     <Button
                        style={styles.firstSocial}
                        transparent
                        iconOrientation="left"
                        icon={<Image type="icon" source={GoogleLogo} />}
                        fill
                        text="Continuar con Google"
                        onPress={onGooglePress}
                     />
                     {/* <Button
                        style={styles.secondSocial}
                        transparent
                        iconOrientation="left"
                        icon={<Image type="icon" source={Logo} />}
                        text="Continuar con Facebook"
                        onPress={() => {
                           console.log('login');
                           setL(true);
                        }}
                     /> */}
                  </View>
               </View>
            </View>
         </Container>
      </GestureHandlerRootView>
   );
};
const styles = StyleSheet.create({
   main: {
      justifyContent: 'center',
      flex: 1,
      height: '100%',
      margin: '5%',
      padding: 2,
   },
   header: {
      // marginTop: 50,
   },
   formHeader: {
      flexDirection: 'row',
      marginTop: 10,
   },
   formBody: {
      flexDirection: 'column',
   },
   input: {
      marginTop: THEME.sizes.marginBetweenInputs,
   },
   firstSocial: {},
   secondSocial: {
      marginTop: 10,
   },
   buttonsContainer: {
      marginTop: 20,
   },
   divider: {
      marginTop: 10,
      marginBottom: 20,
      display: 'flex',
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   dividerLine: {
      marginTop: 10,
      width: '100%',
      display: 'flex',
      backgroundColor: 'grey',
      height: 0.6,
      alignItems: 'center',
   },
   dividerText: {
      paddingHorizontal: 5,
      backgroundColor: 'white',
      fontSize: 18,
      color: 'grey',
      position: 'absolute',
      top: 2,
   },
   registerLink: {
      color: THEME.colors.primary,
      marginLeft: 5,
   },
});
export default Login;
