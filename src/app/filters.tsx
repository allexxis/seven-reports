import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import Text from '@components/Text';
import { useState } from 'react';
import Select from '@src/components/Select';
import seven from '@src/lib/seven';

export interface UIFilter {
   label: string;
   key: string;
   values?: any;
   query?: true;
   type: 'select' | 'date-range' | 'number' | 'text' | 'date' | 'header';
   section?: string;
}
export default function FiltersScreen() {
   const { data, error } = seven.explotacion.useExplotacionFilters();
   return (
      <View style={styles.container}>
         <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
         {data &&
            data.map((filter) => {
               if (filter.type === 'select' && !filter.query) {
                  return (
                     <View style={styles.filter} key={filter.key}>
                        <Text
                           style={styles.header}
                           text={filter.label.toUpperCase()}
                        />
                        <Select
                           values={filter.values}
                           onChange={(value) => {
                              console.log(value);
                           }}
                        />
                        {/* <View
                           style={{
                              height: 1,
                              backgroundColor: 'grey',
                              opacity: 0.5,
                              width: '100%',
                           }}
                        /> */}
                     </View>
                  );
               }
               return <View style={{ display: 'none', width: 0, height: 0 }} />;
            })}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
   },
   header: {
      fontSize: 18,
      textAlign: 'left',
      fontWeight: '300',
      color: 'black',
   },
   filter: {
      paddingHorizontal: 10,
      width: '100%',
      display: 'flex',
      paddingVertical: 0,
      margin: 0,
   },
});
