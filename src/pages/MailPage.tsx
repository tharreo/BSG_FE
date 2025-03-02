
import { ITableColumnData, MainTable } from '../components/MainTable.tsx';
import MainPagination from '../components/MainPagination.tsx';
import { t } from 'i18next';
import DateHelper from '../helper/date-helper.ts';
import { IResListMail } from '../model/response/IResListMail.ts';
import { Button, Chip, IconButton } from '@mui/material';
import { MdInfo } from 'react-icons/md';
import { PageTitle } from '../components/PageTitle.tsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';
import { PopupModal } from '../components/PopupModal.tsx';
import { TextLabelValue } from '../components/TextLabelValue.tsx';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { ILabelValue } from '../model/type.ts';
import { useMailPage } from '../hooks/useMailPage.ts';
import { MailSubTypeList, MailTypeList } from '../constants/data-constants.ts';

export function MailPage() {
  const page = useMailPage();
  const dateHelper = new DateHelper();

  const dataFilterSubType: ILabelValue<string | undefined>[] = [
    {
      label: t('all'),
      value: undefined,
    },
    ...MailSubTypeList.map((e) => {
      return {
        value: e,
        label: e,
      };
    }),
  ];

  const tableColumns: ITableColumnData[] = [
    {
      headerTitle: '#',
      value: 'count',
      key: 'count',
      align: 'left',
    },
    {
      key: 'date',
      headerTitle: t('date'),
      align: 'left',
      layouts: (e: IResListMail) => (
        <div>{e.date ? dateHelper.toFormatDate(new Date(e.date), 'dd LLLL, yyyy') : '-'}</div>
      ),
    },
    {
      key: 'sender',
      headerTitle: t('sender'),
      align: 'left',
      value: 'sender',
    },
    {
      key: 'recipient',
      headerTitle: t('recipient'),
      align: 'left',
      value: 'recipient',
    },
    {
      key: 'name',
      headerTitle: t('mail-name'),
      align: 'left',
      value: 'name',
    },
    {
      key: 'sub-type',
      headerTitle: t('sub-type'),
      align: 'left',
      value: 'subType',
    },
    {
      key: 'type',
      headerTitle: t('type'),
      align: 'left',
      layouts: (e: IResListMail) => (
        <div className={`font-semibold uppercase ${e.type === 'INCOMING' ? 'text-green-700' : 'text-red-800'}`}>
          {t(e.type.toLowerCase())}
        </div>
      ),
    },
    {
      key: 'actions',
      headerTitle: '',
      align: 'left',
      layouts: (e: IResListMail) => (
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
        <div
          className={`font-semibold px-6 py-3 border flex items-center justify-between rounded-sm  ${page.selectedData?.type === 'INCOMING' ? 'text-green-700 border-green-700 bg-green-50' : 'text-red-800 border-red-800 bg-red-50'}`}
        >
          {page.selectedData?.type}
          {page.selectedData?.type !== 'INCOMING' ? <IoArrowForward /> : <IoArrowBack />}
        </div>
        <div className={'grid grid-cols-2 gap-4 min-w-[600px] mt-10'}>
          <TextLabelValue
            label={t('date')}
            value={
              page?.selectedData?.date
                ? dateHelper.toFormatDate(new Date(page.selectedData?.date), 'dd LLLL, yyyy')
                : '-'
            }
          />
          <TextLabelValue label={t('mail-name')} value={page?.selectedData?.name || '-'} />
          <TextLabelValue label={t('sender')} value={page?.selectedData?.sender || '-'} />
          <TextLabelValue label={t('recipient')} value={page?.selectedData?.recipient || '-'} />
          <TextLabelValue label={t('type')} value={page?.selectedData?.type || '-'} />
          <TextLabelValue label={t('sub_type')} value={page?.selectedData?.subType || '-'} />
          <TextLabelValue label={t('created-by')} value={page?.selectedData?.createdBy || '-'} />
          <TextLabelValue
            label={t('created-date')}
            value={
              page?.selectedData?.createdDate
                ? dateHelper.toFormatDate(new Date(page.selectedData?.createdDate), 'dd LLLL, yyyy')
                : '-'
            }
          />
        </div>
        {page.selectedData?.note && (
          <div className={'mt-6'}>
            <TextLabelValue label={t('note')} value={page?.selectedData?.note || '-'} />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <PopupModal
        title={<div className={'text-3xl font-semibold'}>{`#${page.selectedData?.count || ''}`}</div>}
        component={bodyModal()}
        open={!!page.selectedData}
        onClose={() => page.setSelectedData(undefined)}
      />
      <div className={'flex justify-between'}>
        <PageTitle title={t('mail')} />
        <Link to={ROUTES.NEW_MAIl()}>
          <Button variant={'contained'}>{t('new-mail')}</Button>
        </Link>
      </div>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-2'}>
          {MailTypeList.map((item, i) => (
            <Chip
              onClick={() => page.onChangeFilter(item.value)}
              clickable
              color={item.value === page.filterType ? 'primary' : 'default'}
              key={i}
              label={t(item.label)}
              variant="outlined"
            />
          ))}
        </div>
        <div className={'flex items-center gap-2'}>
          {dataFilterSubType.map((item, i) => (
            <Chip
              onClick={() => page.onChangeFilterSubType(item.value)}
              clickable
              color={item.value === page.filterSubType ? 'primary' : 'default'}
              key={i}
              label={item.label}
              variant="outlined"
            />
          ))}
        </div>
      </div>

      <MainTable loading={page.loadingPage} data={page.data} columns={tableColumns} />
      <MainPagination onChange={page.onChangePagination} data={page.paginatedData} />
    </>
  );
}
