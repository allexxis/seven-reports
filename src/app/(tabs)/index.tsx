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
   const { mutate, data, error, isPending } = seven.explotacion.useExplotacion(
      reports.explotacion.form
   );
   useEffect(() => {
      if (data) {
         console.log(data.results[0]);
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
            <Button
               loading={isPending}
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
