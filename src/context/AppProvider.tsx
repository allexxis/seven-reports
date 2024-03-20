import { useState } from 'react';
import AppContex, { IAppContext } from './AppContex';

type Props = {
   value: IAppContext;
   children: React.ReactNode;
};

export default function AppProvider({ value, children }: Props) {
   const [reports, setReports] = useState(value.reports);
   const newValue = { reports, setReports };
   return <AppContex.Provider value={newValue}>{children}</AppContex.Provider>;
}
