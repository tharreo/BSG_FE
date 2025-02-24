import { Dispatch } from 'redux';
import { UiSlice } from '../reducers/ui.slice.ts';
import { IBreadcrumbData } from '../../components/BreadcrumbComponents.tsx';

export class UiActions {
  private actions = UiSlice.actions;
  public setBreadCrumb(data?: IBreadcrumbData[]) {
    return (dispatch: Dispatch) => {
      dispatch(UiSlice.actions.breadcrumb(data));
    };
  }

  public loadingPage(data: boolean) {
    return (dispatch: Dispatch) => {
      dispatch(this.actions.loadingPage(data));
    };
  }

  public showSidebar(data: boolean) {
    return (dispatch: Dispatch) => {
      dispatch(this.actions.showSidebar(data));
    };
  }
}
