import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBreadcrumbData } from '../../components/BreadcrumbComponents.tsx';

const initState: IUiSlice = {};

export const UiSlice = createSlice({
  name: 'ui',
  initialState: initState,
  reducers: {
    breadcrumb: (state: IUiSlice, action: PayloadAction<IBreadcrumbData[] | undefined>) => {
      state.subheader = action.payload;
    },
    loadingPage: (state: IUiSlice, action: PayloadAction<boolean>) => {
      state.loadingHeader = action.payload;
      state.loadingPage = action.payload;
    },
    loadingHeader: (state: IUiSlice, action: PayloadAction<boolean>) => {
      state.loadingHeader = action.payload;
    },
    showSidebar: (state: IUiSlice, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export interface IUiSlice {
  subheader?: IBreadcrumbData[];
  loadingHeader?: boolean;
  loadingPage?: boolean;
  showSidebar?: boolean;
}
