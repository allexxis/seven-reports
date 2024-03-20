import { UIFilter, UIFilterType } from '@src/app/filters';
import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Block from '../Block';
import { THEME } from '@src/constants/theme';

interface FilterListProps {
   filters: UIFilter[] | undefined;
   updateForm: (type: UIFilterType, key: string, value: any) => void;
}
const FilterList: FC<FilterListProps> = ({ filters, updateForm }) => {
   return (
      <View style={styles.container}>
         {filters &&
            filters.map((filter) => {
               if (filter.type === 'select') {
                  return (
                     <Block
                        key={filter.key}
                        filter={filter}
                        updateForm={updateForm}
                     />
                  );
               }
               return (
                  <View
                     key={filter.key}
                     style={{
                        display: 'none',
                        width: 0,
                        height: 0,
                     }}
                  />
               );
            })}
      </View>
   );
};
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
});

export default FilterList;
