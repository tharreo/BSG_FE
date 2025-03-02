import { ILabelValue } from '../model/type.ts';

export const creditTypeList = ['KPNS', 'Pra Purnabakti', 'KPS'];
export const creditSubTypeList = ['PK', 'SPPK'];

export const MailTypeList: ILabelValue<string | undefined>[] = [
  {
    value: undefined,
    label: 'all',
  },
  {
    value: 'INCOMING',
    label: 'incoming',
  },
  {
    value: 'OUTGOING',
    label: 'outgoing',
  },
];

export const MailSubTypeList = ['INTERN', 'EXTERN'];
