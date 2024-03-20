import { useSession } from '@clerk/clerk-expo';
import { UIFilter } from '@src/app/filters';
import { BASE_URL } from '@src/config';
import { useQuery } from '@tanstack/react-query';
const PATH = `${BASE_URL}/v1/reports/dss/explotacion`;

export const filters = async (getToken: any): Promise<UIFilter[]> => {
   const token = await getToken();
   const res = await fetch(PATH + '?filters=true', {
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

   return data.data.filters;
};

export const useExplotacionFilters = () => {
   const { session } = useSession();

   return useQuery({
      queryKey: ['explotacion.filters'],
      queryFn: () => filters(session?.getToken),
      networkMode: 'offlineFirst',
   });
};

export default {
   useExplotacionFilters,
   filters,
};
