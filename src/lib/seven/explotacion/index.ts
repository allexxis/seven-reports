import { useSession } from '@clerk/clerk-expo';
import { UIFilter } from '@src/app/filters';
import { BASE_URL } from '@src/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import jpack from 'jsonpack';

const PATH = `${BASE_URL}/v1/reports/dss/explotacion`;

export const filters = async (getToken: any): Promise<UIFilter[]> => {
   const token = await getToken();
   const res = await fetch(PATH + '?filters=true', {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (!res.ok) {
      throw new Error('Network response was not ok' + `status ${res.status}`);
   }
   const data = await res.json();
   if (data.error) {
      throw new Error(data.error);
   }

   return data.data.filters;
};
export const explotacion = async (
   getToken: any,
   body: any
): Promise<{
   table: any[];
   tableHader: { label: string; key: string }[];
   hotel: string;
}> => {
   const token = await getToken();
   const res = await fetch(PATH, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
   });

   if (!res.ok) {
      throw new Error('Network response was not ok' + `status ${res.status}`);
   }
   const data = await res.json();
   if (data.error) {
      throw new Error(data.error);
   }
   try {
      return jpack.unpack(data.data);
   } catch (e: any) {
      throw new Error(e.message);
   }
};
export const useExplotacionFilters = () => {
   const { session } = useSession();

   return useMutation({
      mutationKey: ['explotacion.filters'],
      mutationFn: () => filters(session?.getToken),
      networkMode: 'offlineFirst',
   });
};
export const useExplotacion = (form: any) => {
   const { session } = useSession();

   return useMutation({
      mutationKey: ['explotacion'],
      mutationFn: () => explotacion(session?.getToken, form),
      networkMode: 'online',
   });
};
export default {
   useExplotacionFilters,
   explotacion,
   useExplotacion,
   filters,
};
