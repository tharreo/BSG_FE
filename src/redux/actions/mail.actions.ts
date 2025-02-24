
import { Dispatch } from 'redux';
import { MailSlice } from '../reducers/mail.slice.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponsePaginated } from '../../model/response/ResponseModel.ts';
import { IResListMail } from '../../model/response/IResListMail.ts';
import BaseActions from '../base-actions.ts';

export class MailActions extends BaseActions {
  private actions = MailSlice.actions;

  public getListMail(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getListMail({ data: undefined, loading: true }));
      await this.httpService
        .GET(ENDPOINT.LIST_MAIl() + (param || ''))
        .then((res: BaseResponsePaginated<IResListMail[]>) => {
          dispatch(
            this.actions.getListMail({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getListMail({ loading: false, data: undefined }));
        });
    };
  }
}
