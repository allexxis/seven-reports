import * as React from 'react';

interface AppReports {
   explotacion: any;
}
export interface IAppContext {
   reports: AppReports;
   setReports: (reports: any) => void;
}
export const defaultAppContext = {
   reports: {
      explotacion: null,
   },
   setReports: () => {},
};
const AppContext = React.createContext<IAppContext>(defaultAppContext);

AppContext.displayName = 'AppContext';

export default AppContext;
