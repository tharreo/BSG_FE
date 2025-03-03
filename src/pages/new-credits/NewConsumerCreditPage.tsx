
import { MainCard } from '../../components/MainCard.tsx';
import { InputText } from '../../components/InputText.tsx';
import { t } from 'i18next';
import { InputDatePicker } from '../../components/InputDatePicker.tsx';
import { InputRupiah } from '../../components/InputRupiah.tsx';
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { InputSelect } from '../../components/InputSelect.tsx';
import { creditSubTypeList, creditTypeList } from '../../constants/data-constants.ts';
import { InputTextarea } from '../../components/InputTextArea.tsx';
import { PageTitle } from '../../components/PageTitle.tsx';
import { useNewConsumerPage } from '../../hooks/useNewConsumerPage.ts';

export function NewConsumerCreditPage() {
  const page = useNewConsumerPage();
  const formik = page.formik;

  function checkSubType() {
    if (formik.values.consumer_credit_type) {
      if (formik.values.consumer_credit_type === 'PENSIUN') {
        return false;
      } else return formik.values.consumer_credit_type !== 'KBPS';
    } else {
      return false;
    }
  }

  return (
    <>
      <PageTitle title={t('new-consumer-credit')} />
      <MainCard>
        <div className={'grid gap-7'}>
          <InputText
            label={t('number')}
            placeholder={t('insert-number')}
            required
            name={'number'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number || ''}
            errorMessage={formik.touched.number && formik.errors.number}
          />
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

          {checkSubType() && (
            <FormControl>
              <FormLabel className={'mb-2'} id="demo-row-radio-buttons-group-label">
                {t('sub-type')}
              </FormLabel>
              <RadioGroup
                onChange={(_, i) => formik.setFieldValue('consumer_credit_sub_type', i)}
                className={'flex gap-4'}
                classes={{ row: 'justify-between' }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label "
                name="row-radio-buttons-group"
              >
                {creditSubTypeList.map((e) => (
                  <FormControlLabel
                    classes={{
                      root: 'w-[49%] p-0 m-0 border border-gray-400 rounded-[4px]',
                      label: 'p-0 m-0',
                    }}
                    key={e}
                    value={e}
                    control={<Radio />}
                    label={e}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          {formik.values.consumer_credit_sub_type === 'SPPK' && (
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
          )}
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
