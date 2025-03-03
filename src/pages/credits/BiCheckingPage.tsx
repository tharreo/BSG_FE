import { PageTitle } from '../../components/PageTitle.tsx';
import { t } from 'i18next';
import { Button, IconButton } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { defaultPaginationObj, defaultPaginationType, ROUTES } from '../../routes/routes.ts';
import { useBreadcrumb } from '../../hooks/useBradcrumb.ts';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { CreditActions } from '../../redux/actions/credit.actions.ts';
import { IResBiChecking } from '../../model/response/IResBiChecking.ts';
import { defaultPaginatedResponse, IResPaginatedData } from '../../model/response/ResponseModel.ts';
import { ITableColumnData, MainTable } from '../../components/MainTable.tsx';
import DateHelper from '../../helper/date-helper.ts';
import MainPagination from '../../components/MainPagination.tsx';
import { MdInfo } from 'react-icons/md';
import { InputSearch } from '../../components/InputSearch.tsx';
import { parseQueryString } from '../../helper/utils-helper.ts';
import { PopupModal } from '../../components/PopupModal.tsx';
import { TextLabelValue } from '../../components/TextLabelValue.tsx';

export function BiCheckingPage() {
  const breadcrumb = useBreadcrumb();
  const dispatch = useAppDispatch();
  const Credit = useAppSelector((state) => state.Credit);
  const creditActions = new CreditActions();
  const dateHelper = new DateHelper();
  const navigate = useNavigate();
  const location = useLocation();
  const query: any = parseQueryString(location.search);

  const [searchValue, setSearchValue] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [data, setData] = useState<IResBiChecking[]>([]);
  const [paginatedData, setPaginatedData] = useState<IResPaginatedData>(defaultPaginatedResponse);
  const [selectedData, setSelectedData] = useState<IResBiChecking | undefined>();

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        title: t('home'),
        path: '/',
      },
      {
        title: t('bi-checking'),
      },
    ]);
  }, []);

  function onSearch() {
    navigate(
      ROUTES.BI_CHECKING({
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
      ROUTES.BI_CHECKING({
        ...defaultPaginationObj,
        type: query.type && decodeURIComponent(query.type),
      }),
    );
  }

  useEffect(() => {
    fetchData(location.search);
  }, [location?.search]);

  useEffect(() => {
    setData(Credit?.listBiChecking?.data || []);
    setLoadingPage(Credit?.listBiChecking?.loading || false);
    setPaginatedData(Credit?.listBiChecking?.paginated_data || defaultPaginatedResponse);
  }, [Credit?.listBiChecking]);

  function fetchData(param?: string) {
    dispatch(creditActions.getListBiChecking(param)).then();
  }

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.BI_CHECKING(e));
  }

  const tableData: ITableColumnData[] = [
    {
      headerTitle: '#',
      value: 'number',
      key: 'number',
      align: 'left',
    },
    {
      key: 'date',
      headerTitle: t('date'),
      align: 'left',
      layouts: (e: IResBiChecking) => (
        <div>{e.request_date ? dateHelper.toFormatDate(new Date(e.request_date), 'dd LLLL, yyyy') : '-'}</div>
      ),
    },
    {
      headerTitle: t('name'),
      value: 'name',
      key: 'name',
      align: 'left',
    },
    {
      headerTitle: t('ktp-number'),
      value: 'ktp_number',
      key: 'ktp',
      align: 'left',
    },
    {
      headerTitle: t('date-of-birth'),
      key: 'birth',
      align: 'left',
      layouts: (e: IResBiChecking) => (
        <div>{`${e.place_of_birth}, ${e.date_of_birth ? dateHelper.toFormatDate(new Date(e.date_of_birth), 'dd LLL yyyy') : '-'}`}</div>
      ),
    },
    {
      headerTitle: t('objective'),
      value: 'objective',
      key: 'objective',
      align: 'left',
    },
    {
      key: 'actions',
      headerTitle: '',
      align: 'left',
      layouts: (e: IResBiChecking) => (
        <div>
          <IconButton onClick={() => setSelectedData(e)}>
            <MdInfo />
          </IconButton>
        </div>
      ),
    },
  ];

  function componentModal() {
    return (
      <div>
        <div className={'grid grid-cols-2 gap-6 min-w-[600px]'}>
          <TextLabelValue
            label={t('request-date')}
            value={
              selectedData?.request_date
                ? dateHelper.toFormatDate(new Date(selectedData?.request_date), 'dd LLLL, yyyy')
                : '-'
            }
          />
          <TextLabelValue label={t('name')} value={selectedData?.name || '-'} />
          <TextLabelValue
            label={t('date-of-birth')}
            value={`${selectedData?.place_of_birth}, ${selectedData?.date_of_birth ? dateHelper.toFormatDate(new Date(selectedData.date_of_birth), 'dd LLL yyyy') : '-'}`}
          />
          <TextLabelValue label={t('ktp-number')} value={selectedData?.ktp_number || '-'} />
          <TextLabelValue
            label={t('created-date')}
            value={
              selectedData?.created_date
                ? dateHelper.toFormatDate(new Date(selectedData?.created_date), 'dd LLLL, yyyy')
                : '-'
            }
          />
          <TextLabelValue label={t('created-by')} value={selectedData?.created_by || '-'} />

          <TextLabelValue label={t('objective')} value={selectedData?.objective || '-'} />
        </div>
        <div className={'mt-8'}>
          {selectedData?.note && <TextLabelValue label={t('note')} value={selectedData?.note} />}
        </div>
      </div>
    );
  }

  return (
    <>
      <PopupModal
        component={componentModal()}
        onClose={() => setSelectedData(undefined)}
        open={!!selectedData}
        title={<div className={'text-3xl font-semibold'}>{`#${selectedData?.number || ''}`}</div>}
      />
      <div className={'flex  justify-between'}>
        <PageTitle title={t('bi-checking')} />
        <Link to={ROUTES.NEW_BI_CHECKING()}>
          <Button variant={'contained'}>{t('add-new')}</Button>
        </Link>
      </div>
      <div>
        <InputSearch
          value={searchValue}
          placeholder={t('search-name')}
          isActiveSearch={activeSearch}
          onChange={(e) => setSearchValue(e)}
          onResetSearch={onResetSearch}
          onSubmit={onSearch}
        />
      </div>
      <MainTable loading={loadingPage} data={data} columns={tableData} />
      <MainPagination onChange={onChangePagination} data={paginatedData} />
    </>
  );
}
