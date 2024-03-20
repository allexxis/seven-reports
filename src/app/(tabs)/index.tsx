import { StyleSheet } from 'react-native';
import { View } from '@src/components/Themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BarChart from '@components/BarChart';
import Button from '@src/components/Button';
import seven from '@src/lib/seven';
export default function TabOneScreen() {
   const { mutate, data, error } = seven.explotacion.useExplotacion({
      dates: {
         from: '2024-01-01',
         to: '2024-03-05',
      },
      type: 'TOTAL_BY_AGENCY',
      currencyId: 2,
      filters: {},
   });
   return (
      <GestureHandlerRootView style={styles.handler}>
         <View style={styles.container}>
            <Button
               fill
               text="Explotación"
               onPress={() => {
                  mutate();
               }}
            />
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
