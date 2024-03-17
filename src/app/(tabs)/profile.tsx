import { StyleSheet, View } from 'react-native';
import Text from '@components/Text';
import Ripple from '@src/components/RippleButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '@clerk/clerk-expo';
export default function TabTwoScreen() {
   const { signOut } = useAuth();
   return (
      <GestureHandlerRootView style={styles.handler}>
         <View style={styles.container}>
            <Ripple
               style={styles.buttton}
               onPress={() => {
                  signOut();
               }}
            >
               <Text style={styles.text} text="Cerrar Sesión" />
            </Ripple>
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
      backgroundColor: 'white',
   },
   buttton: {
      borderRadius: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
   },
   text: {
      color: 'black',
   },
});
