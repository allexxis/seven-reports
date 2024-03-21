import { StyleSheet } from 'react-native';
import { View } from '@src/components/Themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BarChart from '@components/BarChart';
import Button from '@src/components/Button';
import seven from '@src/lib/seven';
import { FC, useContext, useEffect, useState } from 'react';
import AppContext from '@src/context/AppContex';
import arrays from '@src/utils/arrays';
const TabOneScreen: FC = () => {
   const { reports, setReports } = useContext(AppContext);
   const { mutate, data, error, isPending } = seven.explotacion.useExplotacion(
      reports.explotacion.form
   );
   const [title, setTitle] = useState<string>('');
   useEffect(() => {
      if (data) {
         setTitle(data.hotel);
         console.log(data.table[0]);
         console.log('Largo total: ', data.table.length);
         const grouped = arrays.groupByIndex(data.table, 2);
         Object.keys(grouped).forEach((key) => {
            const value = arrays.aggregateByIndex(grouped[key], 35);
            grouped[key] = value;
         });

         console.log(grouped);
      }
      if (error) {
         console.log(error);
      }
   }, [data, error]);
   useEffect(() => {
      if (reports.explotacion.form) {
         console.log(reports.explotacion.form);
      }
   }, [reports]);
   return (
      <GestureHandlerRootView style={styles.handler}>
         <View style={styles.container}>
            <BarChart title={title} />
            <View
               style={{
                  marginTop: 60,
                  width: 100,
                  height: 20,
                  backgroundColor: 'white',
               }}
            >
               <Button
                  loading={isPending}
                  fill
                  text="Explotación"
                  onPress={() => {
                     mutate();
                  }}
               />
            </View>
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
