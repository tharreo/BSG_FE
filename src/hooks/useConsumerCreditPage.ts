import { useEffect, useState } from 'react';
import { useBreadcrumb } from './useBradcrumb.ts';
import { defaultPaginationObj, defaultPaginationType, ROUTES } from '../routes/routes.ts';
import { t } from 'i18next';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { CreditActions } from '../redux/actions/credit.actions.ts';
import { IResCreditConsumer } from '../model/response/IResCreditConsumer.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { defaultPaginatedResponse, IResPaginatedData } from '../model/response/ResponseModel.ts';
import { parseQueryString } from '../helper/utils-helper.ts';

export function useConsumerCreditPage() {
  const dispatch = useAppDispatch();
  const creditActions = new CreditActions();
  const Credit = useAppSelector((state) => state.Credit);
  const navigate = useNavigate();
  const breadcrumb = useBreadcrumb();
  const location = useLocation();
  const query: any = parseQueryString(location.search);
  const [filterType, setFilterType] = useState<string | undefined>();
  const [filterSubType, setFilterSubType] = useState<string | undefined>(undefined);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [data, setData] = useState<IResCreditConsumer[]>([]);
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<IResCreditConsumer | undefined>(undefined);
  const [paginatedData, setPaginatedData] = useState<IResPaginatedData>(defaultPaginatedResponse);

  function fetchData(param?: string) {
    dispatch(creditActions.getListConsumer(param)).then();
  }

  useEffect(() => {
    if (Credit?.listConsumer?.data) {
      setData(Credit?.listConsumer?.data);
      setPaginatedData(Credit?.listConsumer?.paginated_data || defaultPaginatedResponse);
    }
    setLoadingPage(Credit?.listConsumer?.loading || false);
  }, [Credit]);

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.CONSUMER_CREDIT(e));
  }

  function onChangeFilterSubType(e?: string) {
    setSearchValue('');
    setActiveSearch(false);
    setFilterSubType(e);
    setFilterType(filterType);
    navigate(ROUTES.CONSUMER_CREDIT({ ...defaultPaginationObj, type: filterType, sub_type: e }));
  }
  function onChangeFilter(e?: string) {
    setSearchValue('');
    setActiveSearch(false);
    setFilterType(e);
    setFilterSubType(undefined);
    navigate(ROUTES.CONSUMER_CREDIT({ ...defaultPaginationObj, type: e }));
  }

  useEffect(() => {
    fetchData(location.search);
    setFilterType(query?.type ? decodeURIComponent(query.type) : undefined);
    setFilterSubType(query?.sub_type ? decodeURIComponent(query.sub_type) : undefined);
  }, [location]);

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        path: ROUTES.HOME(),
        title: t('home'),
      },
      {
        title: t('consumer-credit'),
      },
    ]);
  }, []);

  function onSearch() {
    navigate(
      ROUTES.CONSUMER_CREDIT({
        ...defaultPaginationObj,
        query: searchValue,
        type: query.type && decodeURIComponent(query.type),
      }),
    );
    setActiveSearch(true);
  }

  function onResetSearch() {
    setSearchValue('');
    setActiveSearch(false);
    navigate(
      ROUTES.CONSUMER_CREDIT({
        ...defaultPaginationObj,
        type: query.type && decodeURIComponent(query.type),
      }),
    );
  }

  return {
    data,
    onChangePagination,
    paginatedData,
    setFilterType,
    filterType,
    searchValue,
    onChangeFilter,
    onChangeFilterSubType,
    onSearch,
    onResetSearch,
    setSearchValue,
    activeSearch,
    loadingPage,
    filterSubType,
    setSelectedData,
    selectedData,
  };
}
