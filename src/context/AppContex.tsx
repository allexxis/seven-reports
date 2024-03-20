import * as React from 'react';

interface AppReports {
   explotacion: {
      form: any;
   };
}
export interface IAppContext {
   reports: AppReports;
   setReports: (reports: AppReports) => void;
}
export const defaultAppContext = {
   reports: {
      explotacion: {
         form: null,
      },
   },
   setReports: () => {},
};
const AppContext = React.createContext<IAppContext>(defaultAppContext);

AppContext.displayName = 'AppContext';

export default AppContext;
