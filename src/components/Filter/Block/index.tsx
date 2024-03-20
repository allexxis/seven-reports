import { View, StyleSheet } from 'react-native';
import Text from '@components/Text';
import Select from '@src/components/Select';
import { THEME } from '@src/constants/theme';
import { UIFilter, UIFilterType } from '@src/app/filters';
import { FC } from 'react';
import seven from '@src/lib/seven';

interface BlockProps {
   filter: UIFilter;
   updateForm: (type: UIFilterType, key: string, value: any) => void;
}
const Block: FC<BlockProps> = ({ filter, updateForm }) => {
   const query = filter.query
      ? seven.fdk[filter.values.toString() as keyof typeof seven]
      : undefined;
   return (
      <View style={styles.filter} key={filter.key}>
         <Text style={styles.header} text={filter.label.toUpperCase()} />

         <Select
            filterKey={filter.key}
            required={filter.required}
            query={filter.query ? query : undefined}
            values={filter.values}
            onChange={(value) => {
               updateForm(filter.type, filter.key, value);
            }}
         />
      </View>
   );
};
export default Block;
const styles = StyleSheet.create({
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
