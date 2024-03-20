import { StyleSheet } from 'react-native';
import { View } from '@src/components/Themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BarChart from '@components/BarChart';
import Button from '@src/components/Button';
import seven from '@src/lib/seven';
import { FC, useContext, useEffect } from 'react';
import AppContext from '@src/context/AppContex';
const TabOneScreen: FC = () => {
   const { reports, setReports } = useContext(AppContext);
   console.log(reports);
   const { mutate, data, error, isPending } = seven.explotacion.useExplotacion({
      dates: {
         from: '2024-01-01',
         to: '2024-03-05',
      },
      type: 'TOTAL_BY_AGENCY',
      currencyId: 2,
      filters: {},
   });
   useEffect(() => {
      if (data) {
         console.log(data.results[0]);
      }
      if (error) {
         console.log(error);
      }
   }, [data, error]);

   return (
      <GestureHandlerRootView style={styles.handler}>
         <View style={styles.container}>
            <Button
               loading={isPending}
               fill
               text="Explotación"
               onPress={() => {
                  setReports({ explotacion: 'hola' });
               }}
            />
            <BarChart />
         </View>
      </GestureHandlerRootView>
   );
};

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
export default TabOneScreen;
