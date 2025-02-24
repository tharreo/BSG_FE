import { createSlice } from '@reduxjs/toolkit';
import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadData,
  IPayloadDataPaginated,
} from '../../model/response/ResponseModel.ts';
import { IResGetMe } from '../../model/response/IResGetMe.ts';
import { IResListAccount } from '../../model/response/IResListAccount.ts';

const initState: IAccountSlice = {};

export const AccountSlice = createSlice({
  name: 'account',
  initialState: initState,
  reducers: {
    getMe: (state: IAccountSlice, action: BasePayload<IResGetMe>) => {
      state.getMe = action.payload;
    },
    getListAccount: (state: IAccountSlice, action: BasePayloadPaginated<IResListAccount[]>) => {
      state.getListAccount = action.payload;
    },
  },
});

interface IAccountSlice {
  getMe?: IPayloadData<IResGetMe>;
  getListAccount?: IPayloadDataPaginated<IResListAccount[]>;
}
