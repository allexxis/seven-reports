import { FC } from 'react';
import { View } from 'react-native';
import { BarChart as Chart } from 'react-native-gifted-charts';

const BarChart: FC = () => {
   const barData = [
      { value: 250, label: 'M' },
      { value: 500, label: 'T', frontColor: '#177AD5' },
      { value: 745, label: 'W', frontColor: '#177AD5' },
      { value: 320, label: 'T' },
      { value: 600, label: 'F', frontColor: '#177AD5' },
      { value: 256, label: 'S' },
      { value: 300, label: 'S' },
   ];
   return (
      <View>
         <Chart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
         />
      </View>
   );
};

export default BarChart;
