import { useSession } from '@clerk/clerk-expo';
import { Picker } from '@react-native-picker/picker';
import { FC, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface SelectedValue {
   label: string;
   value: any;
}
interface SelectProps {
   style?: StyleProp<ViewStyle>;
   values: SelectedValue[];
   onChange: (value?: any) => void;
   query?: any;
   required?: boolean;
   filterKey?: string;
}
const Select: FC<SelectProps> = ({
   style,
   values,
   onChange,
   query,
   required,
   filterKey,
}) => {
   const { session } = useSession();
   const [newValues, setNewValues] = useState<any[]>([]);
   useEffect(() => {
      if (query && required) {
         setNewValues([]);
      } else if (!query && required) {
         setNewValues(values);
      } else if (!required) {
         setNewValues([
            { label: 'Seleccionar', valeue: 'undefined' },
            ...newValues,
         ]);
      }
      const execQuery = async () => {
         const token = await session?.getToken();

         query(token)
            .then((data: any) => {
               setNewValues((prev) => [...prev, ...data]);
               if (required && data.length > 0) {
                  onChange(data[0].value);
               }
            })
            .catch((error: any) => {
               console.error('MSG ' + filterKey, error.message);
            });
      };
      if (typeof query === 'function') {
         execQuery();
      } else {
         if (required && values.length > 0) {
            onChange(values[0].value);
         }
         setNewValues((prev) => [...prev, ...values]);
      }
   }, []);
   const [selectedValue, setSelectedValue] = useState('undefined');

   return (
      <Picker
         selectedValue={selectedValue}
         itemStyle={{
            height: 100,
            margin: 0,
            padding: 0,
            color: 'black',
            backgroundColor: 'white',
            fontSize: 15,
            borderRadius: 100,
         }}
         style={[
            style,
            {
               height: 100,
               width: '100%',
               color: 'black',
               backgroundColor: 'white',
               margin: 0,
               padding: 0,
            },
         ]}
         onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            if (itemValue === 'undefined') {
               onChange(undefined);
            } else {
               onChange(itemValue);
            }
         }}
      >
         {newValues.map((value, i) => (
            <Picker.Item
               style={{ color: 'black', backgroundColor: 'white' }}
               key={value.value + value.label + i}
               label={value.label}
               value={value.value}
            />
         ))}
      </Picker>
   );
};
export default Select;
