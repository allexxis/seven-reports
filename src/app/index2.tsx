import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { View } from '@src/components/Themed';
import TextInput from '@src/components/TextInput';
export default function SignInScreen() {
   const { signIn, setActive, isLoaded } = useSignIn();

   const [emailAddress, setEmailAddress] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [error, setError] = React.useState('');
   const onSignInPress = async () => {
      if (emailAddress === '' || password === '') {
         return setError('Los campos no pueden estar vacios');
      }
      if (!isLoaded) {
         return;
      }

      try {
         const completeSignIn = await signIn.create({
            identifier: emailAddress,
            password,
         });
         // This is an important step,
         // This indicates the user is signed in
         await setActive({ session: completeSignIn.createdSessionId });
      } catch (err: any) {
         console.log(err);
      }
   };

   return (
      <View
         style={{
            flex: 1,
            display: 'flex',
            padding: 20,
            alignContent: 'center',
            justifyContent: 'center',
         }}
      >
         <TextInput
            type="email"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
         />

         <TextInput
            type="password"
            style={{ color: 'white', backgroundColor: 'white', marginTop: 10 }}
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
         />
      </View>
   );
}
