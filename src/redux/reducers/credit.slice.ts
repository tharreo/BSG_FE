import { BasePayloadPaginated, IPayloadDataPaginated } from '../../model/response/ResponseModel.ts';
import { IResCreditConsumer } from '../../model/response/IResCreditConsumer.ts';
import { createSlice } from '@reduxjs/toolkit';
import { IResBiChecking } from '../../model/response/IResBiChecking.ts';
import { IResCommercialCredit } from '../../model/response/IResCommercialCredit.ts';
import { IResListPkKur } from '../../model/response/IResListPkKur.ts';

const initState: ICreditSlice = {};

export const CreditSlice = createSlice({
  name: 'credit',
  initialState: initState,
  reducers: {
    getListConsumer: (state: ICreditSlice, action: BasePayloadPaginated<IResCreditConsumer[]>) => {
      state.listConsumer = action.payload;
    },
    getBiChecking: (state: ICreditSlice, actions: BasePayloadPaginated<IResBiChecking[]>) => {
      state.listBiChecking = actions.payload;
    },
    getCommercialCredit: (state: ICreditSlice, action: BasePayloadPaginated<IResCommercialCredit[]>) => {
      state.listCommercial = action.payload;
    },
    getListPkKur: (state: ICreditSlice, action: BasePayloadPaginated<IResListPkKur[]>) => {
      state.listPkKur = action.payload;
    },
  },
});

export interface ICreditSlice {
  listConsumer?: IPayloadDataPaginated<IResCreditConsumer[]>;
  listBiChecking?: IPayloadDataPaginated<IResBiChecking[]>;
  listCommercial?: IPayloadDataPaginated<IResCommercialCredit[]>;
  listPkKur?: IPayloadDataPaginated<IResListPkKur[]>;
}
