
import {
  Alert,
  Button,
  CircularProgress
} from '@mui/material';
import { t } from 'i18next';
import { InputDatePicker } from '../../components/InputDatePicker.tsx';
import { InputRupiah } from '../../components/InputRupiah.tsx';
import { InputSelect } from '../../components/InputSelect.tsx';
import { InputText } from '../../components/InputText.tsx';
import { InputTextarea } from '../../components/InputTextArea.tsx';
import { MainCard } from '../../components/MainCard.tsx';
import { PageTitle } from '../../components/PageTitle.tsx';
import { creditTypeList } from '../../constants/data-constants.ts';
import { useNewConsumerPage } from '../../hooks/useNewConsumerPage.ts';

export function NewConsumerCreditPage() {
  const page = useNewConsumerPage();
  const formik = page.formik;


  return (
    <>
      <PageTitle title={t('new-consumer-credit')} />
      <MainCard>
        <div className={'grid gap-7'}>

          <InputSelect
            label={t('type')}
            value={formik.values.consumer_credit_type}
            onChange={(e) => formik.setFieldValue('consumer_credit_type', e)}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.consumer_credit_type && formik.errors.consumer_credit_type}
            placeholder={t('insert-credit-type')}
            required
            name={'type'}
            options={creditTypeList
              .filter((v) => v !== 'All')
              .map((e) => {
                return { label: e, value: e };
              })}
          />

          <>
            <InputText
              label={t('phone-number')}
              placeholder={t('insert-phone-number')}
              required
              name={'phone_number'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={'phone_number'}
              value={formik.values.phone_number || ''}
              errorMessage={formik.touched.phone_number && formik.errors.phone_number}
            />
            <InputText
              label={t('pk_number')}
              placeholder={t('insert-pk-number')}
              required
              name={'pk_number'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={'text'}
              value={formik.values.pk_number || ''}
            />
            <InputTextarea
              label={t('address')}
              placeholder={t('insert-address')}
              required
              name={'address'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={'address'}
              value={formik.values.address || ''}
              errorMessage={formik.touched.address && formik.errors.address}
            />
          </>
          <InputText
            label={t('debitur-name')}
            placeholder={t('insert-debitur-name')}
            required
            name={'name'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            errorMessage={formik.touched.name && formik.errors.name}
          />
          <InputDatePicker
            label={t('date')}
            required
            name={'date'}
            onChange={(e) => formik.setFieldValue('date', e.target.value)}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            errorMessage={formik.touched.date && formik.errors.date}
          />
          <InputText
            label={t('insurance')}
            placeholder={t('insert-insurance')}
            required
            name={'insurance'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.insurance}
            errorMessage={formik.touched.insurance && formik.errors.insurance}
          />
          <InputText
            label={t('agency')}
            placeholder={t('insert-agency')}
            required
            name={'agency'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.agency}
            errorMessage={formik.touched.agency && formik.errors.agency}
          />
          <InputRupiah
            label={t('plafond')}
            placeholder={t('insert-plafond')}
            required
            name={'plafond'}
            onChange={(e) => formik.setFieldValue('plafond', e?.target?.value ? parseInt(e.target.value) : null)}
            onBlur={formik.handleBlur}
            value={formik.values.plafond}
            errorMessage={formik.touched.plafond && formik.errors.plafond}
          />

          <Alert severity="warning">{t('make-sure-data-alert')}</Alert>
          <Button disabled={page.checkValidButton()} onClick={() => formik.handleSubmit()} variant={'contained'}>
            <div className={'flex gap-4 items-center duration-200'}>
              {t('submit')} {page.loadingSubmit && <CircularProgress size={16} color={'inherit'} />}
            </div>
          </Button>
        </div>
      </MainCard>
    </>
  );
}
