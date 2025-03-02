import { PageTitle } from '../components/PageTitle.tsx';
import { t } from 'i18next';
import { MainCard } from '../components/MainCard.tsx';
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
import { MailSubTypeList, MailTypeList } from '../constants/data-constants.ts';
import { InputText } from '../components/InputText.tsx';
import { InputTextarea } from '../components/InputTextArea.tsx';
import { useNewMailPage } from '../hooks/useNewMailPage.ts';
import { InputDatePicker } from '../components/InputDatePicker.tsx';

export function NewMailPage() {
  const page = useNewMailPage();
  const formik = page.formik;
  return (
    <>
      <PageTitle title={t('new-mail')} />
      <MainCard className={'w-full'}>
        <div className={'grid gap-7'}>
          {!page.loadingSubmit && (
            <FormControl>
              <FormLabel className={'mb-2'} id="demo-row-radio-buttons-group-label">
                {t('type')}
              </FormLabel>
              <RadioGroup
                onChange={(_, i) => formik.setFieldValue('type', i)}
                className={'flex gap-4'}
                classes={{ row: 'justify-between' }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label "
                name="row-radio-buttons-group"
              >
                {MailTypeList.filter((v) => v.value !== undefined).map((e) => (
                  <FormControlLabel
                    classes={{
                      root: 'w-[49%] p-0 m-0 border border-gray-400 rounded-[4px]',
                      label: 'p-0 m-0',
                    }}
                    key={e.value}
                    value={e.value}
                    control={<Radio />}
                    label={t(e.label)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          {!page.loadingSubmit && (
            <FormControl>
              <FormLabel className={'mb-2'} id="demo-row-radio-buttons-group-label">
                {t('sub-type')}
              </FormLabel>
              <RadioGroup
                onChange={(_, i) => formik.setFieldValue('sub_type', i)}
                className={'flex gap-4'}
                classes={{ row: 'justify-between' }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label "
                name="row-radio-buttons-group"
              >
                {MailSubTypeList.filter((v) => v !== undefined).map((e) => (
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
          {formik.values.sub_type && formik.values.type && (
            <>
              {formik.values.type === 'INCOMING' && (
                <InputText
                  label={t('mail-number')}
                  placeholder={t('insert-mail-number')}
                  name={'name'}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.name && formik.errors.name}
                />
              )}
              <InputText
                label={t('number')}
                placeholder={t('insert-number')}
                name={'count'}
                value={formik.values.count || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.count && formik.errors.count}
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
                label={t('sender')}
                placeholder={t('insert-mail-sender')}
                required={true}
                name={'sender'}
                value={formik.values.sender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.sender && formik.errors.sender}
              />
              {formik.values.type === 'OUTGOING' && (
                <InputText
                  label={t('recipient')}
                  placeholder={t('insert-mail-recipient')}
                  required={true}
                  name={'recipient'}
                  value={formik.values.recipient}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.recipient && formik.errors.recipient}
                />
              )}
              <InputTextarea
                label={t('note')}
                placeholder={t('insert-note')}
                name={'note'}
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.note && formik.errors.note}
              />
            </>
          )}
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
