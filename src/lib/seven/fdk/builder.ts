import { BASE_URL } from '@src/config';
import { useQuery } from '@tanstack/react-query';

const builder = (sufix: string, model: string, key?: string) => {
   const query: any = {};
   const PATH = `${BASE_URL}/v1/fdk${sufix}`;
   query[key || model] = async () => {
      const res = await fetch(PATH);
      if (!res.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await res.json();
      if (data.error) {
         throw new Error(data.error);
      }
      return data.data[model];
   };
   query[`fdk.${key || model}`] = async (token: string) => {
      const res = await fetch(PATH + '?select=true', {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      if (!res.ok) {
         throw new Error('Network response was not ok');
      }
      const data = await res.json();
      if (data.error) {
         throw new Error(data.error);
      }
      return data.data.select;
   };
   query[`use${model}`] = () => {
      return useQuery({
         queryKey: [`fdk.${key || model}`],
         queryFn: query[key || model],
         networkMode: 'online',
      });
   };

   return query;
};

export default builder;
