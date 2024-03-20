import Text from '@components/Text';
import Select from '@src/components/Select';
import seven from '@src/lib/seven';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, ScrollView } from 'react-native';
export interface UIFilter {
   label: string;
   key: string;
   values?: any;
   query?: true;
   type: 'select' | 'date-range' | 'number' | 'text' | 'date' | 'header';
   section?: string;
   required?: boolean;
}
export default function FiltersScreen() {
   const { data, error } = seven.explotacion.useExplotacionFilters();
   return (
      <ScrollView>
         <View style={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            {data &&
               data.map((filter) => {
                  const query = filter.query
                     ? seven.fdk[filter.values.toString() as keyof typeof seven]
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
                              onChange={(value) => {}}
                           />
                        </View>
                     );
                  }
                  return (
                     <View style={{ display: 'none', width: 0, height: 0 }} />
                  );
               })}
         </View>
      </ScrollView>
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
      backgroundColor: 'white',
   },
   header: {
      fontSize: 18,
      textAlign: 'left',
      fontWeight: '300',
      color: 'black',
   },
   filter: {
      width: '100%',
      display: 'flex',
      paddingVertical: 0,
      margin: 0,
   },
});
