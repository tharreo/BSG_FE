import { useBreadcrumb } from '../../hooks/useBradcrumb.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CreditActions } from '../../redux/actions/credit.actions.ts';
import DateHelper from '../../helper/date-helper.ts';
import { NumberFormatterHelper } from '../../helper/number-format-helper.ts';
import { useEffect, useState } from 'react';
import { defaultPaginatedResponse, IResPaginatedData } from '../../model/response/ResponseModel.ts';
import { t } from 'i18next';
import { defaultPaginationObj, defaultPaginationType, ROUTES } from '../../routes/routes.ts';
import { ITableColumnData, MainTable } from '../../components/MainTable.tsx';
import { PageTitle } from '../../components/PageTitle.tsx';
import { Button, IconButton } from '@mui/material';
import { MdAdd, MdInfo } from 'react-icons/md';
import { InputSearch } from '../../components/InputSearch.tsx';
import { CommercialCreditTabButton } from '../../components/CommercialCreditTabButton.tsx';
import MainPagination from '../../components/MainPagination.tsx';
import { PopupModal } from '../../components/PopupModal.tsx';
import { TextLabelValue } from '../../components/TextLabelValue.tsx';
import { IResCommercialCredit } from '../../model/response/IResCommercialCredit.ts';

export function CommercialCreditPage() {
  const breadcrumb = useBreadcrumb();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const creditActions = new CreditActions();
  const dateHelper = new DateHelper();
  const numberFormat = new NumberFormatterHelper();
  const credit = useAppSelector((p) => p.Credit);

  const [selectedData, setSelectedData] = useState<IResCommercialCredit | undefined>();
  const [dataList, setDataList] = useState<IResCommercialCredit[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [paginatedData, setPaginatedData] = useState<IResPaginatedData>(defaultPaginatedResponse);

  function fetchData(param?: string) {
    dispatch(creditActions.getListCommercial(param)).then();
  }

  useEffect(() => {
    setDataList(credit?.listCommercial?.data || []);
    setPaginatedData(credit?.listCommercial?.paginated_data || defaultPaginatedResponse);
    setLoadingPage(credit?.listCommercial?.loading || false);
  }, [credit.listCommercial]);

  useEffect(() => {
    fetchData(location.search);
  }, [location.search]);

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        title: t('home'),
        path: '/',
      },
      {
        title: t('commercial-credit-menu'),
        path: ROUTES.COMMERCIAL_CREDIT(),
      },
      {
        title: t('commercial-credit-pk-kur'),
      },
    ]);
  }, []);

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.COMMERCIAL_CREDIT(e));
  }

  function onSearch() {
    navigate(
      ROUTES.COMMERCIAL_CREDIT({
        ...defaultPaginationObj,
        query: searchValue,
      }),
    );
    setActiveSearch(true);
  }

  function onResetSearch() {
    setSearchValue('');
    setActiveSearch(false);
    navigate(
      ROUTES.COMMERCIAL_CREDIT({
        ...defaultPaginationObj,
      }),
    );
  }

  const tableColumnData: ITableColumnData[] = [
    {
      key: '#',
      headerTitle: '#',
      align: 'left',
      layouts: (e: IResCommercialCredit) => <div>{e.number}</div>,
    },
    {
      key: 'request-number',
      headerTitle: t('credit-agreement-number'),
      align: 'left',
      value: 'request_number',
    },

    {
      key: 'name',
      headerTitle: t('debitur-name'),
      align: 'left',
      value: 'name',
    },
    {
      key: 'date',
      headerTitle: t('pk-date'),
      align: 'left',
      layouts: (e: IResCommercialCredit) => (
        <div>{e.pk_date ? dateHelper.toFormatDate(new Date(e.pk_date), 'dd LLLL, yyyy') : '-'}</div>
      ),
    },
    {
      key: 'plafon',
      headerTitle: t('plafon'),
      align: 'left',
      layouts: (e: IResCommercialCredit) => <div>{e.plafond ? numberFormat.toRupiah(e.plafond) : '-'}</div>,
    },
    {
      key: 'actions',
      headerTitle: '',
      align: 'left',
      layouts: (e: IResCommercialCredit) => (
        <div>
          <IconButton onClick={() => setSelectedData(e)}>
            <MdInfo />
          </IconButton>
        </div>
      ),
    },
  ];

  function bodyModal() {
    return (
      <div className={'grid gap-4'}>
        <div className={'grid grid-cols-2 gap-4 min-w-[600px] mt-3'}>
          <TextLabelValue label={t('debitur-name')} value={selectedData?.name || '-'} />
          <TextLabelValue label={t('credit-agreement-number')} value={selectedData?.request_number || '-'} />

          <TextLabelValue
            label={t('pk-date')}
            value={
              selectedData?.pk_date ? dateHelper.toFormatDate(new Date(selectedData?.pk_date), 'dd LLLL, yyyy') : '-'
            }
          />
          <TextLabelValue
            label={t('plafond')}
            value={selectedData?.plafond ? numberFormat.toRupiah(selectedData.plafond) : '-'}
          />
          <TextLabelValue label={t('business-type')} value={selectedData?.business_type || '-'} />
          <TextLabelValue label={t('guarantee')} value={selectedData?.guarantee || '-'} />
          <TextLabelValue label={t('binding-type')} value={selectedData?.binding_type || '-'} />
          <TextLabelValue label={t('notary')} value={selectedData?.notary || '-'} />
          <TextLabelValue label={t('created-by')} value={selectedData?.created_by || '-'} />
          <TextLabelValue
            label={t('created-date')}
            value={
              selectedData?.created_date
                ? dateHelper.toFormatDate(new Date(selectedData?.created_date), 'dd LLLL, yyyy - HH:mm')
                : '-'
            }
          />
        </div>
        {selectedData?.note && (
          <div className={'mt-6'}>
            <TextLabelValue label={t('note')} value={selectedData?.note || '-'} />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <PopupModal
        title={<div className={'text-3xl font-semibold'}>{`#${selectedData?.number || ''}`}</div>}
        component={bodyModal()}
        open={!!selectedData}
        onClose={() => setSelectedData(undefined)}
      />
      <div className={'flex justify-between'}>
        <PageTitle title={t('commercial-credit')} />
        <Link to={ROUTES.NEW_COMMERCIAL()}>
          <Button endIcon={<MdAdd />} variant={'contained'}>
            {t('add-new')}
          </Button>
        </Link>
      </div>
      <div>
        <InputSearch
          value={searchValue}
          onSubmit={() => onSearch()}
          isActiveSearch={activeSearch}
          onChange={(e) => setSearchValue(e)}
          onResetSearch={onResetSearch}
          placeholder={t('search-debitur-name')}
        />
      </div>
      <CommercialCreditTabButton activeIndex={'SPKK'} />

      <MainTable loading={loadingPage} data={dataList} columns={tableColumnData} />
      <MainPagination onChange={onChangePagination} data={paginatedData} />
    </>
  );
}
