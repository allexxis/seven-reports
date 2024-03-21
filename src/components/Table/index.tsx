import { FC } from 'react';
import { View } from 'react-native';

interface TableProps {
   table: any[];
   headers: any[];
}
const Table: FC<TableProps> = ({ table, headers }) => {
   return (
      <View>
         {table.map((row, i) => (
            <View key={i}>
               {row.map((cell: any, j: number) => (
                  <View key={j}>{cell}</View>
               ))}
            </View>
         ))}
         {table.map((row, i) => (
            <View key={i}>
               {row.map((cell: any, j: number) => (
                  <View key={j}>{cell}</View>
               ))}
            </View>
         ))}
      </View>
   );
};
export default Table;
