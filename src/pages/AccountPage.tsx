import { useEffect } from 'react';
import { useBreadcrumb } from '../hooks/useBradcrumb.ts';
import { ROUTES } from '../routes/routes.ts';
import { t } from 'i18next';
import { ITableColumnData, MainTable } from '../components/MainTable.tsx';
import { Avatar, Button, Card, CardContent, IconButton, Tooltip, Zoom } from '@mui/material';
import { PageTitle } from '../components/PageTitle.tsx';
import { MdAdd, MdClose, MdFileCopy, MdLockReset } from 'react-icons/md';
import DateHelper from '../helper/date-helper.ts';
import { IResListAccount } from '../model/response/IResListAccount.ts';
import { Link } from 'react-router-dom';
import MainPagination from '../components/MainPagination.tsx';
import { PopupModal } from '../components/PopupModal.tsx';
import { ASSETS } from '../constants/assets.ts';
import { useAccountPage } from '../hooks/useAccountPage.ts';
import { MainCard } from '../components/MainCard.tsx';

export function AccountPage() {
  const breadcrumb = useBreadcrumb();
  const page = useAccountPage();
  const dateHelper = new DateHelper();

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        title: t('home'),
        path: ROUTES.HOME(),
      },
      {
        title: t('account'),
      },
    ]);
  }, []);

  const tableData: ITableColumnData[] = [
    {
      key: 'name',
      headerTitle: t('name'),
      align: 'left',
      layouts: (e: IResListAccount) => (
        <div className={'flex items-center gap-2'}>
          <Avatar src={e.avatar} />
          <p>{e.name}</p>
        </div>
      ),
    },
    {
      key: 'username',
      headerTitle: t('username'),
      align: 'left',
      value: 'username',
    },
    {
      key: 'created_at',
      headerTitle: t('created_date'),
      align: 'left',
      layouts: (e: IResListAccount) => (
        <p>{e.created_date ? dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm') : '-'}</p>
      ),
    },
    {
      key: 'created_by',
      headerTitle: t('created_by'),
      align: 'left',
      value: 'created_by',
    },
    {
      key: 'action',
      layouts: uiAction,
    },
  ];

  function uiAction(e: IResListAccount) {
    return (
      <div className={'flex gap-2 items-center'}>
        {/*<Tooltip TransitionComponent={Zoom} title={`${t('delete_account')} ${e.name}`}>*/}
        {/*  <IconButton onClick={() => page.onClickDeleteAccount(e)}>*/}
        {/*    <MdDelete />*/}
        {/*  </IconButton>*/}
        {/*</Tooltip>*/}
        <Tooltip TransitionComponent={Zoom} title={`${t('reset_password')} ${e.name}`}>
          <IconButton onClick={() => page.onClickResetPassword(e.id)}>
            <MdLockReset />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  function bodyDeleteAccount() {
    return (
      <div className={'w-[600px] flex items-center justify-center flex-col gap-8 py-2'}>
        <h4 className={'font-semibold text-2xl'}>{page.dataSelected?.name || ''}</h4>
        <img src={ASSETS.ILLUSTRATION.IL_DELETE} alt={'delete'} className={'h-48'} />
        <p className={'text-xl'}>{t('delete-account-description')}</p>
      </div>
    );
  }

  return (
    <>
      <PopupModal
        onClose={page.onCancelModal}
        loading={page.popupLoading}
        footerCard={
          <div className={'gap-4 items-center w-full grid grid-cols-2'}>
            <Button variant={'contained'} color={'inherit'} onClick={page.onCancelModal}>
              {t('cancel')}
            </Button>
            <Button variant={'contained'} color={'primary'} onClick={page.onSubmitDelete}>
              {t('submit')}
            </Button>
          </div>
        }
        component={bodyDeleteAccount()}
        title={<div className={' text-xl font-semibold'}>{t('delete-account')}</div>}
        open={page.openModalDelete}
      />
      <div className={'flex justify-between'}>
        <PageTitle title={t('account')} description={t('account_page_description')} />
        <div>
          <Link to={ROUTES.NEW_ACCOUNT()}>
            <Button endIcon={<MdAdd />} variant={'contained'}>
              {t('new_account')}
            </Button>
          </Link>
        </div>
      </div>
      {page?.ResponseResetPassword && (
        <MainCard>
          <div className="flex justify-between w-full">
            <div>
              <div className="font-semibold"> password baru untuk {page?.ResponseResetPassword.name}</div>
              <div className="flex items-center gap-2 py-2 px-7 mt-4 bg-gray-100 rounded-md w-fit">
                <div>{page.ResponseResetPassword?.password}</div>
                <div>
                  <IconButton onClick={page.copyPassword}> 
                    <MdFileCopy />
                  </IconButton>
                </div>
              </div>
            </div>
            <div>
              <IconButton onClick={() => page.setResponseResetPassword(undefined)}>
                <MdClose />
              </IconButton>
            </div>
          </div>
        </MainCard>
      )}
      <MainTable loading={page?.loading || page?.loadingResetPassword} data={page.dataList} columns={tableData} />
      <MainPagination loading={page.loading} data={page.paginatedData} onChange={(e) => page.onChangePagination(e)} />
    </>
  );
}
