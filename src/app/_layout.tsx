import { ClerkProvider } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@src/components/useColorScheme';
import { defaultAppContext } from '@src/context/AppContex';
import AppProvider from '@src/context/AppProvider';
import { tokenCache } from '@src/lib/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

const queryClient = new QueryClient();
export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
   // Ensure that reloading on `/modal` keeps a back button present.
   initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const [loaded, error] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      ...FontAwesome.font,
   });

   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
   useEffect(() => {
      if (error) throw error;
   }, [error]);

   useEffect(() => {
      if (loaded) {
         SplashScreen.hideAsync();

         return;
      }
   }, [loaded]);

   if (!loaded) {
      return null;
   }

   return <RootLayoutNav />;
}

function RootLayoutNav() {
   const colorScheme = useColorScheme();

   return (
      <QueryClientProvider client={queryClient}>
         <ClerkProvider
            tokenCache={tokenCache}
            publishableKey={
               'pk_test_ZnVsbC1zbmlwZS01Mi5jbGVyay5hY2NvdW50cy5kZXYk'
            }
         >
            <AppProvider value={defaultAppContext}>
               <ThemeProvider
                  value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}
               >
                  <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
                  <Stack>
                     <Stack.Screen
                        name="index"
                        options={{
                           headerShown: false,
                        }}
                     />
                     <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                     />
                     <Stack.Screen
                        name="filters"
                        options={{ presentation: 'modal', title: 'Filtros' }}
                     />
                     <Stack.Screen
                        name="modal"
                        options={{ presentation: 'modal' }}
                     />
                  </Stack>
               </ThemeProvider>
            </AppProvider>
         </ClerkProvider>
      </QueryClientProvider>
   );
}
