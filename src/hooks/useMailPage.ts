import { useBreadcrumb } from './useBradcrumb.ts';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { MailActions } from '../redux/actions/mail.actions.ts';
import { IResListMail } from '../model/response/IResListMail.ts';
import { defaultPaginatedResponse, IResPaginatedData } from '../model/response/ResponseModel.ts';
import { defaultPaginationObj, defaultPaginationType, ROUTES } from '../routes/routes.ts';
import { useLocation, useNavigate } from 'react-router-dom';

export function useMailPage() {
  const breadcrumb = useBreadcrumb();
  const dispatch = useAppDispatch();
  const mailActions = new MailActions();
  const location = useLocation();
  const navigate = useNavigate();
  const Mail = useAppSelector((state) => state.Mail);

  const [selectedData, setSelectedData] = useState<IResListMail | undefined>();
  const [data, setData] = useState<IResListMail[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [paginatedData, setPaginatedData] = useState<IResPaginatedData>(defaultPaginatedResponse);
  const [filterType, setFilterType] = useState<string | undefined>();
  const [filterSubType, setFilterSubType] = useState<string | undefined>();
  function fetchData(param?: string) {
    dispatch(mailActions.getListMail(param)).then();
  }

  function onChangeFilter(e?: string) {
    navigate(ROUTES.MAIL_PAGE({ ...defaultPaginationObj, type: e }));
    setFilterType(e);
  }

  function onChangeFilterSubType(e?: string) {
    navigate(ROUTES.MAIL_PAGE({ ...defaultPaginationObj, type: filterType, sub_type: e }));
    setFilterSubType(e);
  }

  useEffect(() => {
    if (Mail?.listMail?.data) {
      setData(Mail?.listMail?.data);
    }
    setPaginatedData(Mail?.listMail?.paginated_data || defaultPaginatedResponse);
    setLoadingPage(Mail.listMail?.loading || false);
  }, [Mail]);

  useEffect(() => {
    fetchData(location?.search);
  }, [location.search]);

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.CONSUMER_CREDIT(e));
  }

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        path: '/',
        title: t('home'),
      },
      {
        title: t('mail'),
      },
    ]);
  }, []);
  return {
    data,
    paginatedData,
    onChangeFilter,
    filterType,
    onChangeFilterSubType,
    filterSubType,
    loadingPage,
    onChangePagination,
    selectedData,
    setSelectedData,
  };
}
