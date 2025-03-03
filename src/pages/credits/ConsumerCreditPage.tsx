
import { ITableColumnData, MainTable } from '../../components/MainTable.tsx';
import { t } from 'i18next';
import DateHelper from '../../helper/date-helper.ts';
import { NumberFormatterHelper } from '../../helper/number-format-helper.ts';
import { InputSearch } from '../../components/InputSearch.tsx';
import { Button, Chip, IconButton } from '@mui/material';
import { MdAdd, MdInfo } from 'react-icons/md';
import { IResCreditConsumer } from '../../model/response/IResCreditConsumer.ts';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';
import MainPagination from '../../components/MainPagination.tsx';
import { creditTypeList } from '../../constants/data-constants.ts';
import { ILabelValue } from '../../model/type.ts';
import { PopupModal } from '../../components/PopupModal.tsx';
import { TextLabelValue } from '../../components/TextLabelValue.tsx';
import { useConsumerCreditPage } from '../../hooks/useConsumerCreditPage.ts';

export function ConsumerCreditPage() {
  const page = useConsumerCreditPage();
  const dateHelper = new DateHelper();
  const numberFormat = new NumberFormatterHelper();

  const dataFilterType: ILabelValue<string | undefined>[] = [
    {
      label: t('all'),
      value: undefined,
    },
    ...creditTypeList.map((item) => {
      return {
        value: item,
        label: item,
      };
    }),
  ];

  const tableColumnData: ITableColumnData[] = [
    {
      key: '#',
      headerTitle: '#',
      align: 'left',
      layouts: (e: IResCreditConsumer) => <div>{e.number}</div>,
    },
    {
      key: 'name',
      headerTitle: t('debitur-name'),
      align: 'left',
      value: 'name',
    },
    {
      key: 'date',
      headerTitle: t('date'),
      align: 'left',
      layouts: (e: IResCreditConsumer) => (
        <div>{e.date ? dateHelper.toFormatDate(new Date(e.date), 'dd LLLL, yyyy') : '-'}</div>
      ),
    },
    {
      key: 'plafon',
      headerTitle: t('plafon'),
      align: 'left',
      layouts: (e: IResCreditConsumer) => <div>{e.plafond ? numberFormat.toRupiah(e.plafond) : '-'}</div>,
    },
    {
      key: 'assurance',
      headerTitle: t('assurance'),
      align: 'left',
      value: 'insurance',
    },
    {
      key: 'agency',
      headerTitle: t('agency'),
      align: 'left',
      value: 'agency',
    },
    {
      key: 'type',
      headerTitle: t('type'),
      align: 'left',
      value: 'consumer_credit_type',
    },
    {
      key: 'sub_type',
      headerTitle: t('sub_type'),
      align: 'left',
      value: 'consumer_credit_sub_type',
    },
    {
      key: 'actions',
      headerTitle: '',
      align: 'left',
      layouts: (e: IResCreditConsumer) => (
        <div>
          <IconButton onClick={() => page.setSelectedData(e)}>
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
          <TextLabelValue label={t('debitur-name')} value={page?.selectedData?.name || '-'} />

          <TextLabelValue
            label={t('date')}
            value={
              page?.selectedData?.date
                ? dateHelper.toFormatDate(new Date(page?.selectedData?.date), 'dd LLLL, yyyy')
                : '-'
            }
          />
          <TextLabelValue
            label={t('plafond')}
            value={page?.selectedData?.plafond ? numberFormat.toRupiah(page?.selectedData.plafond) : '-'}
          />
          <TextLabelValue label={t('insurance')} value={page?.selectedData?.insurance || '-'} />
          <TextLabelValue label={t('created-by')} value={page?.selectedData?.created_by || '-'} />
          <TextLabelValue label={t('agency')} value={page?.selectedData?.agency || '-'} />
          <TextLabelValue
            label={t('type')}
            value={
              (page?.selectedData?.consumer_credit_type || '') +
                (page?.selectedData?.consumer_credit_sub_type
                  ? ` (${page?.selectedData?.consumer_credit_sub_type})`
                  : '') || '-'
            }
          />
          <TextLabelValue
            label={t('created-date')}
            value={
              page?.selectedData?.created_date
                ? dateHelper.toFormatDate(new Date(page?.selectedData?.created_date), 'dd LLLL, yyyy - HH:mm')
                : '-'
            }
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <PopupModal
        title={<div className={'text-3xl font-semibold'}>{`#${page.selectedData?.number || ''}`}</div>}
        component={bodyModal()}
        open={!!page.selectedData}
        onClose={() => page.setSelectedData(undefined)}
      />
      <div className={'flex justify-between'}>
        <InputSearch
          value={page.searchValue}
          onSubmit={() => page.onSearch()}
          isActiveSearch={page.activeSearch}
          onChange={(e) => page.setSearchValue(e)}
          onResetSearch={page.onResetSearch}
          placeholder={t('search-debitur-name')}
        />

        <Link to={ROUTES.NEW_CONSUMER()}>
          <Button endIcon={<MdAdd />} variant={'contained'}>
            {t('add_new')}
          </Button>
        </Link>
      </div>
      <div className={'flex items-center gap-2'}>
        {dataFilterType.map((item, i) => (
          <Chip
            onClick={() => page.onChangeFilter(item.value)}
            clickable
            color={item.value === page.filterType ? 'primary' : 'default'}
            key={i}
            label={item.label}
            variant="outlined"
          />
        ))}
      </div>

      <MainTable loading={page.loadingPage} data={page.data} columns={tableColumnData} />
      <MainPagination onChange={page.onChangePagination} data={page.paginatedData} />
    </>
  );
}
