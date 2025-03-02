import { useNewAccountPage } from '../hooks/useNewAccountPage.ts';
import { MainCard } from '../components/MainCard.tsx';
import { PageTitle } from '../components/PageTitle.tsx';
import { t } from 'i18next';
import { InputText } from '../components/InputText.tsx';
import { Avatar, Button, Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { PopupModal } from '../components/PopupModal.tsx';
import { MdCheckCircleOutline, MdFileCopy } from 'react-icons/md';

export function NewAccountPage() {
  const page = useNewAccountPage();
  const formik = page.formik;

  function modalSuccessComponent() {
    return (
      <div className={'flex flex-col w-full justify-center items-center gap-6 min-w-[520px]'}>
        <div className={'text-center flex items-center justify-center flex-col gap-2'}>
          <p className={'text-xl font-semibold'}>{page?.dataSuccess?.name}</p>
          <p className={'text-slate-600'}>( {page?.dataSuccess?.username} )</p>
          <Avatar src={page.dataSuccess?.avatar} sx={{ width: 120, height: 120 }} />
        </div>
        <div className={'flex items-center w-full  justify-center border px-6 py-2 rounded-md bg-slate-200 gap-3'}>
          <p>{page.dataSuccess?.password}</p>
          <Tooltip title={t('copy-password')}>
            <IconButton onClick={page.copyPassword}>
              <MdFileCopy />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <>
      <PopupModal
        onClose={page.onCloseModal}
        title={
          <div className={'text-green-700 font-semibold flex items-center gap-3'}>
            <MdCheckCircleOutline className={'text-3xl'} />
            <h1 className={'text-xl  '}>{t('account-successfully-created')}</h1>
          </div>
        }
        footerCard={
          <Button onClick={page.onCloseModal} sx={{ width: '100%' }} variant={'contained'}>
            {t('oke')}
          </Button>
        }
        component={modalSuccessComponent()}
        open={page.openModal}
      />
      <div>
        <PageTitle title={t('create-new-account')} description={t('create-new-account-description-page')} />
      </div>
      <MainCard>
        <div className={'grid gap-8'}>
          <InputText
            required={true}
            placeholder={t('insert-full-name')}
            className={''}
            label={t('full-name')}
            name={'name'}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.name && formik.errors.name}
          />
          <InputText
            required={true}
            className={''}
            label={t('username')}
            placeholder={t('insert-username')}
            name={'username'}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.username && formik.errors.username}
          />
          <FormControlLabel
            control={<Checkbox checked={page.checkForm} onChange={(_, e) => page.setCheckForm(e)} />}
            label={t('validation.checkbox-form')}
          />
          <Button onClick={() => formik.handleSubmit()} disabled={page.checkDisableButton()} variant={'contained'}>
            {t('submit')}
          </Button>
        </div>
      </MainCard>
    </>
  );
}
