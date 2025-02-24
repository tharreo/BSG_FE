import BaseActions from '../base-actions.ts';
import { CreditSlice } from '../reducers/credit.slice.ts';
import { Dispatch } from 'redux';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponsePaginated } from '../../model/response/ResponseModel.ts';
import { IResCreditConsumer } from '../../model/response/IResCreditConsumer.ts';
import { IResBiChecking } from '../../model/response/IResBiChecking.ts';
import { IResCommercialCredit } from '../../model/response/IResCommercialCredit.ts';
import { IResListPkKur } from '../../model/response/IResListPkKur.ts';

export class CreditActions extends BaseActions {
  private actions = CreditSlice.actions;

  getListPkKur(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getListPkKur({ data: undefined, loading: true }));
      await this.httpService
        .GET(ENDPOINT.LIST_PK_KUR() + (param || ''))
        .then((res: BaseResponsePaginated<IResListPkKur[]>) => {
          dispatch(
            this.actions.getListPkKur({
              data: res.data.response_data,
              loading: false,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getListPkKur({ data: undefined, loading: false }));
        });
    };
  }

  getListCommercial(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getCommercialCredit({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.LIST_COMMERCIAL() + (param || ''))
        .then((res: BaseResponsePaginated<IResCommercialCredit[]>) => {
          dispatch(
            this.actions.getCommercialCredit({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getCommercialCredit({ loading: false, data: undefined }));
        });
    };
  }

  getListBiChecking(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getBiChecking({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.LIST_BI_CHECKING() + (param || ''))
        .then((res: BaseResponsePaginated<IResBiChecking[]>) => {
          dispatch(
            this.actions.getBiChecking({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getBiChecking({ loading: false, data: undefined }));
        });
    };
  }

  getListConsumer(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getListConsumer({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.LIST_CREDIT_CONSUMER() + (param || ''))
        .then((res: BaseResponsePaginated<IResCreditConsumer[]>) => {
          dispatch(
            this.actions.getListConsumer({
              data: res.data.response_data,
              loading: false,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getListConsumer({ loading: false, data: undefined }));
        });
    };
  }
}
