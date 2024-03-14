import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { FC, useEffect } from 'react';
interface Props {
   children: React.ReactNode;
}

const AuthWrapper: FC<Props> = ({ children }) => {
   const { isSignedIn, isLoaded } = useAuth();
   useEffect(() => {
      if (isLoaded && !isSignedIn) {
         router.replace('/');
      }
   }, [isLoaded]);
   return <>{children}</>;
};
export default AuthWrapper;
