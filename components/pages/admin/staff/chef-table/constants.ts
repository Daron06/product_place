import { ProductLocationType } from '../../../../../redux/ducks/products/types/contracts';

export const countOfPeoplesTemp = {
  chefTable: [
    {
      name: '4',
      id: '4',
    },
    {
      name: '6',
      id: '6',
    },
    {
      name: '10',
      id: '10',
    },
    {
      name: '12',
      id: '12',
    },
    {
      name: '20',
      id: '20',
    },
  ],

  masterClass: {
    online: [
      {
        name: '18',
        id: '18',
      },
      {
        name: '32',
        id: '32',
      },
      {
        name: '100',
        id: '100',
      },
      {
        name: '200',
        id: '200',
      },
      {
        name: '295',
        id: '295',
      },
    ],
    offline: [
      {
        name: '14',
        id: '14',
      },
      {
        name: '16',
        id: '16',
      },
    ],
  },
};

export const getCountOfPeople = (
  productType: 'chefTable' | 'masterClass' | 'masterClasses',
  eventType: ProductLocationType,
): Array<{ name: string; id: string }> => {
  if (productType === 'chefTable') {
    return countOfPeoplesTemp.chefTable;
  }
  if (eventType === 'at-home') {
    return countOfPeoplesTemp.masterClass.online;
  }
  return countOfPeoplesTemp.masterClass.offline;
};

export const languages = [
  {
    name: 'English',
    value: 'English',
  },
  {
    name: 'Arabic',
    value: 'Arabic',
  },
];

export const defaultValues = {
  countOfPeople: ['4', '18'],
  duration: 60,
  language: 'English',
};
