import Text from '@components/Text';
import Button from '@src/components/Button';
import Select from '@src/components/Select';
import { THEME } from '@src/constants/theme';
import seven from '@src/lib/seven';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FilterList from '@src/components/Filter/FilterList';

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
   const { data, error } = seven.explotacion.useExplotacionFilters();
   const [form, setForm] = useState<any>({});
   const [savedForm, setSavedForm] = useState<any>({});

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
   console.log(form);
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
                     console.log('Aplicar');
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
