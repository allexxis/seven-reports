import Text from '@components/Text';
import Button from '@src/components/Button';
import Select from '@src/components/Select';
import { THEME } from '@src/constants/theme';
import seven from '@src/lib/seven';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FilterList from '@src/components/Filter/FilterList';
import AppContext from '@src/context/AppContex';

export type UIFilterType =
   | 'select'
   | 'date-range'
   | 'number'
   | 'text'
   | 'date'
   | 'header';
export interface UIFilter {
   label: string;
   key: string;
   values?: any;
   query?: true;
   type: UIFilterType;
   section?: string;
   required?: boolean;
}
export default function FiltersScreen() {
   const { setReports } = useContext(AppContext);
   const { data, error, mutate } = seven.explotacion.useExplotacionFilters();
   const [form, setForm] = useState<any>({});
   const [savedForm, setSavedForm] = useState<any>({});
   useEffect(() => {
      mutate();
   }, []);
   const updateForm = (type: UIFilterType, key: string, value: any) => {
      if (key.includes('.')) {
         const keys = key.split('.');
         const parent = keys[0];
         const child = keys[1];
         setForm((prev: any) => ({
            ...prev,
            [parent]: {
               ...form[parent],
               [child]: value,
            },
         }));
      } else {
         setForm((prev: any) => ({ ...prev, [key]: value }));
      }
   };
   return (
      <GestureHandlerRootView style={{ display: 'flex', flex: 1 }}>
         <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white' }}>
               <FilterList filters={data} updateForm={updateForm} />
            </ScrollView>
         </View>
         <View style={styles.buttonsContainer}>
            <View style={{ width: '40%' }}>
               <Button
                  fill
                  text="Cancelar"
                  onPress={() => {
                     router.back();
                  }}
               />
            </View>
            <View style={{ width: '40%' }}>
               <Button
                  fill
                  text="Aplicar"
                  onPress={() => {
                     setReports({
                        explotacion: {
                           form: {
                              dates: {
                                 from: '2024-01-01',
                                 to: '2024-03-05',
                              },
                              type: 'TOTAL_BY_AGENCY',
                              currencyId: 2,
                              filters: {},
                           },
                        },
                     });
                  }}
               />
            </View>
         </View>
      </GestureHandlerRootView>
   );
}

const styles = StyleSheet.create({
   buttonsContainer: {
      width: '100%',
      flexDirection: 'row',
      display: 'flex',
      paddingHorizontal: 20,
      backgroundColor: THEME.colors.defaultBackground,
      paddingBottom: 20,
      justifyContent: 'space-between',
      gap: 10,
   },
});
