import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, View } from '@/components/Themed';
import TextInput from '@/components/themed/TextInput';
export default function SignInScreen() {
   const { signIn, setActive, isLoaded } = useSignIn();

   const [emailAddress, setEmailAddress] = React.useState('');
   const [password, setPassword] = React.useState('');

   const onSignInPress = async () => {
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
      <View style={{ flex: 1, display: 'flex' }}>
         <View style={{}}>
            <TextInput
               type="email"
               autoCapitalize="none"
               value={emailAddress}
               placeholder="Email..."
               onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
         </View>

         <View style={{}}>
            <TextInput
               type="password"
               style={{ color: 'white', backgroundColor: 'white' }}
               value={password}
               placeholder="Password..."
               secureTextEntry={true}
               onChangeText={(password) => setPassword(password)}
            />
         </View>

         <TouchableOpacity onPress={onSignInPress}>
            <Text>Sign in</Text>
         </TouchableOpacity>
      </View>
   );
}
