import { Color } from '@material-ui/lab/Alert/Alert';
import React, { useContext } from 'react';

export type AlertContextProps = {
  alertInfo: { text: React.ReactNode; status: Color; opened: boolean };
  openAlert: (text: React.ReactNode, status?: Color) => void;
  closeAlert: () => void;
};

export const AlertContext = React.createContext({} as AlertContextProps);

export const useAlert = (): AlertContextProps => {
  return useContext(AlertContext);
};
