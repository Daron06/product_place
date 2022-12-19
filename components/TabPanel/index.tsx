import React from 'react';

interface TabPanelProps {
  tab: string | number;
  active: string | number;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, tab, active }): React.ReactElement => {
  return (
    <div role="tabpanel" hidden={active !== tab} className="mt-30">
      {active === tab && children}
    </div>
  );
};
