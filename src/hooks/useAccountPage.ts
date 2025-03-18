import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { AccountActions } from '../redux/actions/account.actions.ts';
import { IResListAccount } from '../model/response/IResListAccount.ts';
import { BaseResponse, defaultPaginatedResponse, IResPaginatedData } from '../model/response/ResponseModel.ts';
import { defaultPaginationType, ROUTES } from '../routes/routes.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { HttpService } from '../service/http-service.ts';
import { UiServices } from '../service/ui-service.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import ErrorService from '../service/error-service.ts';
import { t } from 'i18next';
import { UtilsHelper } from '../helper/utils-helper.ts';

interface iResResetPassword{
  name : string;
  password : string;
  username : string;
}

export function useAccountPage() {
  const Account = useAppSelector((state) => state.Account);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const accountActions = new AccountActions();
  const httpService = new HttpService();
  const uiService = new UiServices();
  const errorService = new ErrorService();
  const utilsHelper = new UtilsHelper();

  const [dataList, setDataList] = useState<IResListAccount[]>([]);
  const [loading, setLoading] = useState<boolean | undefined>();
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<IResListAccount | undefined>(undefined);
  const [paginatedData, setPaginatedData] = useState<IResPaginatedData>(defaultPaginatedResponse);
  const [popupLoading, setPopupLoading] = useState<boolean>(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState<boolean>(false)
  const [ResponseResetPassword, setResponseResetPassword] = useState<iResResetPassword | undefined>()


  useEffect(() => {
    fetchData(location.search);
  }, [location?.search]);

  useEffect(() => {
    setDataList(Account?.getListAccount?.data || []);
    setLoading(Account?.getListAccount?.loading);
    setPaginatedData(Account?.getListAccount?.paginated_data || defaultPaginatedResponse);
  }, [Account?.getListAccount]);

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.ACCOUNT(e));
  }

  function fetchData(param?: string) {
    dispatch(accountActions.getListAccount(param)).then();
  }

  function onClickDeleteAccount(data: IResListAccount) {
    setDataSelected(data);
    setOpenModalDelete(true);
  }

  function onCancelModal() {
    setDataSelected(undefined);
    setOpenModalDelete(false);
  }

  function onSubmitDelete() {
    if (dataSelected?.id) {
      setPopupLoading(true);
      httpService
        .DELETE(ENDPOINT.DELETE_ACCOUNT(dataSelected.id))
        .then(() => {
          uiService.handleSnackbarSuccess(t('account-successfully-delete'));
          setPopupLoading(false);
          setOpenModalDelete(false);
          fetchData(location.search);
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setPopupLoading(false);
        });
    }
  }

  function onClickResetPassword(id : string) {
    setLoadingResetPassword(true)
    httpService.PATCH(ENDPOINT.RESET_PASSWORD(id)).then((res : BaseResponse<iResResetPassword>) => {
      setLoadingResetPassword(false)
      setResponseResetPassword(res.data.response_data)
    }).catch(e => {
      setLoading(false)
      errorService.fetchApiError(e)
    })
  }

  function copyPassword() {
    if(ResponseResetPassword?.password){
      utilsHelper.copyToClipboard(ResponseResetPassword.password)
      setResponseResetPassword(undefined)
    }
  }

  return {
    dataList,
    loading,
    paginatedData,
    openModalDelete,
    dataSelected,
    popupLoading,
    onCancelModal,
    onChangePagination,
    onSubmitDelete,
    onClickDeleteAccount,
    onClickResetPassword,
    loadingResetPassword,
    ResponseResetPassword,
    setResponseResetPassword,
    copyPassword,
  };
}
