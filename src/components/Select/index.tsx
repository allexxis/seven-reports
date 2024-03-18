import { Picker, PickerIOS } from '@react-native-picker/picker';
import { FC, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface SelectedValue {
   label: string;
   value: string;
}
interface SelectProps {
   style?: StyleProp<ViewStyle>;
   values: SelectedValue[];
   onChange: (value?: SelectedValue) => void;
}
const Select: FC<SelectProps> = ({ style, values, onChange }) => {
   const [selectedValue, setSelectedValue] = useState('undefined');
   const newValues = [
      { label: 'Sin seleccionar', value: 'undefined' },
      ...values,
   ];
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
         }}
         style={[
            style,
            {
               height: 150,
               width: '100%',
               color: 'black',
               backgroundColor: 'white',
               margin: 0,
               padding: 0,
            },
         ]}
         onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue.toString());
            if (itemValue === 'undefined') {
               onChange(undefined);
            } else {
               onChange(values[itemIndex]);
            }
         }}
      >
         {newValues.map((value) => (
            <Picker.Item
               style={{ color: 'black', backgroundColor: 'white' }}
               key={value.value + value.label}
               label={value.label}
               value={value.value}
            />
         ))}
      </Picker>
   );
};
export default Select;
