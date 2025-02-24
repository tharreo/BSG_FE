import BaseActions from '../base-actions.ts';
import { AccountSlice } from '../reducers/account.slice.ts';
import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse, BaseResponsePaginated } from '../../model/response/ResponseModel.ts';
import { IResGetMe } from '../../model/response/IResGetMe.ts';
import { IResListAccount } from '../../model/response/IResListAccount.ts';

export class AccountActions extends BaseActions {
  private actions = AccountSlice.actions;

  public getMe() {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getMe({ data: undefined, loading: true }));
      this.httpService
        .GET(ENDPOINT.GET_ME())
        .then((res: BaseResponse<IResGetMe>) => {
          dispatch(this.actions.getMe({ data: res.data.response_data, loading: false }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getMe({ loading: false, data: undefined }));
        });
    };
  }

  public getListAccount(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getListAccount({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.LIST_ACCOUNT() + (param || ''))
        .then((res: BaseResponsePaginated<IResListAccount[]>) => {
          dispatch(
            this.actions.getListAccount({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getListAccount({ loading: false, data: undefined }));
        });
    };
  }
}
