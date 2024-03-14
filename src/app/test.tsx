import Button from '@components/Button';
import Input from '@components/Input';
import Ripple from '@components/RippleButton';
import FacebookLogo from '@assets/images/facebook-logo.png';
import GoogleLogo from '@assets/images/google-logo.png';
import { REGISTER } from '@src/constants/screens';
import { THEME } from '@src/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Container from '@components/Container';
import Header from '@components/Header';
import Image from '@components/Image';
import Text from '@components/Text';
import { useAssets } from 'expo-asset';

type Props = any;
const Login: React.FC<Props> = ({ navigation }) => {
   const [loading, setL] = useState(false);
   return (
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
               <Header variant="h3" text="¿No tienes una cuenta?" />
               <Ripple
                  onPress={() => {
                     navigation.navigate(REGISTER);
                  }}
               >
                  <Text style={styles.registerLink} text="Crear Cuenta" />
               </Ripple>
            </View>
            <View style={styles.formBody}>
               <Input type="text" style={styles.input} placeholder="Correo" />

               <Input
                  style={styles.input}
                  type="password"
                  placeholder="Contraseña"
               />

               <View style={styles.buttonsContainer}>
                  <Button
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
                     onPress={() => {
                        console.log('login');
                        setL(true);
                     }}
                  />
                  <Button
                     style={styles.secondSocial}
                     transparent
                     iconOrientation="left"
                     icon={<Image type="icon" source={FacebookLogo} />}
                     text="Continuar con Facebook"
                     onPress={() => {
                        console.log('login');
                        setL(true);
                     }}
                  />
               </View>
            </View>
         </View>
      </Container>
   );
};
const styles = StyleSheet.create({
   main: {
      flex: 1,
      height: '100%',
      margin: '5%',
      padding: 2,
   },
   header: {
      marginTop: 50,
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
