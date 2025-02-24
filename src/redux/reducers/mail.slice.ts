import { BasePayloadPaginated, IPayloadDataPaginated } from '../../model/response/ResponseModel.ts';
import { IResListMail } from '../../model/response/IResListMail.ts';
import { createSlice } from '@reduxjs/toolkit';

const initState: IMailSlice = {};

export const MailSlice = createSlice({
  name: 'mail',
  initialState: initState,
  reducers: {
    getListMail: (state: IMailSlice, action: BasePayloadPaginated<IResListMail[]>) => {
      state.listMail = action.payload;
    },
  },
});

export interface IMailSlice {
  listMail?: IPayloadDataPaginated<IResListMail[]>;
}
