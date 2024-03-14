import { StyleSheet } from 'react-native';

import Button from '@components/Button';
import EditScreenInfo from '@src/components/EditScreenInfo';
import { Text, View } from '@src/components/Themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '@clerk/clerk-expo';
import AuthWrapper from '@components/AuthWrapper';

export default function TabOneScreen() {
   const { signOut } = useAuth();
   return (
      <GestureHandlerRootView style={styles.handler}>
         <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>

            <View
               style={styles.separator}
               lightColor="#eee"
               darkColor="rgba(255,255,255,0.1)"
            />

            <EditScreenInfo path="app/(tabs)/index.tsx" />
            <Button
               fill
               style={{ backgroundColor: 'red', marginTop: 100 }}
               text="Salir"
               onPress={() => {
                  signOut();
               }}
            />
         </View>
      </GestureHandlerRootView>
   );
}

const styles = StyleSheet.create({
   handler: {
      flex: 1,
      display: 'flex',
   },
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
   },
});
