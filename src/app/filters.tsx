import Text from '@components/Text';
import Button from '@src/components/Button';
import Select from '@src/components/Select';
import seven from '@src/lib/seven';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, StyleSheet, View, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { THEME } from '@src/constants/theme';
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
               <View style={styles.container}>
                  <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                  {data &&
                     data.map((filter) => {
                        const query = filter.query
                           ? seven.fdk[
                                filter.values.toString() as keyof typeof seven
                             ]
                           : undefined;
                        if (filter.type === 'select') {
                           return (
                              <View style={styles.filter} key={filter.key}>
                                 <Text
                                    style={styles.header}
                                    text={filter.label.toUpperCase()}
                                 />

                                 <Select
                                    filterKey={filter.key}
                                    required={filter.required}
                                    query={filter.query ? query : undefined}
                                    values={filter.values}
                                    onChange={(value) => {
                                       updateForm(
                                          filter.type,
                                          filter.key,
                                          value
                                       );
                                    }}
                                 />
                              </View>
                           );
                        }
                        return (
                           <View
                              style={{ display: 'none', width: 0, height: 0 }}
                           />
                        );
                     })}
               </View>
            </ScrollView>
         </View>
         <View style={styles.buttonsContainer}>
            <View style={{ width: '40%' }}>
               <Button
                  fill
                  text="Cancelar"
                  onPress={() => {
                     console.log('Cancelar');
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
   container: {
      paddingTop: 20,
      paddingHorizontal: 20,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: THEME.colors.defaultBackground,
   },
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
   header: {
      fontSize: 18,
      textAlign: 'left',
      fontWeight: '300',
      color: THEME.colors.textPrimary,
   },
   filter: {
      width: '100%',
      display: 'flex',
      paddingVertical: 0,
      margin: 0,
   },
});
