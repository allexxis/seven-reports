const groupByIndex = (arr: any[], index: number) =>
   arr.reduce((acc, curr) => {
      const key = curr[index];
      acc[key] = acc[key] || [];
      acc[key].push(curr);
      return acc;
   }, {});
const aggregateByIndex = (arr: any[], index: number) => {
   return arr.reduce((acc, curr) => {
      if (typeof curr[index] === 'number') {
         return acc + curr[index];
      }
      return acc;
   }, 0);
};
const aggregateByFunction = (
   arr: any[],
   fn: (acc: any, curr: any) => number
) => {
   return arr.reduce((acc, curr) => {
      if (typeof curr === 'number') {
         return fn(acc, curr);
      }
      return acc;
   }, 0);
};
export default { groupByIndex, aggregateByIndex, aggregateByFunction };
