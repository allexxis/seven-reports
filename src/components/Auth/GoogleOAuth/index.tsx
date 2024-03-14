import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@src/hooks/useWarmUpBrowser';
import * as WebBrowser from 'expo-web-browser';
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
WebBrowser.maybeCompleteAuthSession();
interface Props {
   closeAuth: () => void;
   setErrorMessage: (message: string) => void;
}
const SignInWithOAuth: FC<Props> = ({ closeAuth, setErrorMessage }) => {
   // Warm up the android browser to improve UX
   // https://docs.expo.dev/guides/authentication/#improving-user-experience
   useWarmUpBrowser();

   const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
   useEffect(() => {
      onPress();
   }, []);

   const onPress = React.useCallback(async () => {
      try {
         const {
            createdSessionId,
            signIn,
            signUp,
            setActive,
            authSessionResult,
         } = await startOAuthFlow();
         if (authSessionResult) {
            const error = (authSessionResult as any).error;
            if (error) {
               if (
                  error
                     .toString()
                     .includes('The operation couldn’t be completed')
               ) {
                  setErrorMessage('Operación con google cancelada');
               } else {
                  setErrorMessage(error.toString());
               }
               console.error(error);

               closeAuth();
            }
         }
         if (createdSessionId) {
            if (setActive) {
               setActive({ session: createdSessionId });
            }
         } else {
            // Use signIn or signUp for next steps such as MFA
         }
      } catch (err) {
         closeAuth();
         console.error('OAuth error', err);
      }
   }, []);

   return <View />;
};
export default SignInWithOAuth;
