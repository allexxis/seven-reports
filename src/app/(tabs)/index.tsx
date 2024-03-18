import { StyleSheet } from 'react-native';
import { View } from '@src/components/Themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BarChart from '@components/BarChart';
export default function TabOneScreen() {
   return (
      <GestureHandlerRootView style={styles.handler}>
         <View style={styles.container}>
            <BarChart />
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
});
