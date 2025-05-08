import { useBreadcrumb } from '../../hooks/useBradcrumb.ts';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { ROUTES } from '../../routes/routes.ts';
import { MainCard } from '../../components/MainCard.tsx';
import { InputText } from '../../components/InputText.tsx';
import { InputDatePicker } from '../../components/InputDatePicker.tsx';
import { InputTextarea } from '../../components/InputTextArea.tsx';
import { Alert, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { IReqCreateBiChecking } from '../../model/request/IReqCreateBiChecking.ts';
import { HttpService } from '../../service/http-service.ts';
import ErrorService from '../../service/error-service.ts';
import { UiServices } from '../../service/ui-service.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import * as yup from 'yup';

export function NewBiCheckingPage() {
  const breadcrumb = useBreadcrumb();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices();

  const initValue: IReqCreateBiChecking = {
    name: '',
    date_of_birth: '',
    note: '',
    ktp_number: '',
    objective: '',
    place_of_birth: '',
    request_date: '',
    number: undefined,
  };

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  function checkDisableButton() {
    console.log(formik.values)
    if (formik.values.request_date && formik.values.name && formik.values.ktp_number && formik.values.place_of_birth && formik.values.date_of_birth && formik.values.objective && formik.values.note ){
       return false 
    } else {
      return true
    }
  }

  const validationScheme = yup.object().shape({
    number: yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
  });

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: validationScheme,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CREATE_BI_CHECKING(), e)
        .then(() => {
          uiService.handleSnackbarSuccess(t('bi-checking-success-created'));
          setLoadingSubmit(false);
          formik.setValues(initValue);
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        title: t('home'),
        path: '/',
      },
      {
        title: t('bi-checking'),
        path: ROUTES.BI_CHECKING(),
      },
      {
        title: t('add-new-bi-checking'),
      },
    ]);
  }, []);
  return (
    <>
      <h1>NEW BI CHECKING</h1>
      <MainCard>
        <div className={'grid gap-6'}>
  
          <InputDatePicker
            label={t('request-date')}
            required
            name={'date'}
            onChange={(e) => formik.setFieldValue('request_date', e.target.value)}
            onBlur={formik.handleBlur}
            value={formik.values.request_date}
            errorMessage={formik.touched.request_date && formik.errors.request_date}
          />
          <InputText
            label={t('name')}
            required
            placeholder={t('insert-name')}
            name={'name'}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <InputText
            label={t('ktp-number')}
            required
            placeholder={t('insert-ktp-number')}
            name={'ktp_number'}
            value={formik.values.ktp_number}
            onChange={formik.handleChange}
          />

          <div className={'grid grid-cols-2 gap-5'}>
            <InputText
              label={t('place-of-birth')}
              required
              placeholder={t('insert-place-of-birth')}
              name={'place_of_birth'}
              value={formik.values.place_of_birth}
              onChange={formik.handleChange}
            />

            <InputDatePicker
              label={t('date-of-birth')}
              required
              name={'date'}
              onChange={(e) => formik.setFieldValue('date_of_birth', e.target.value)}
              onBlur={formik.handleBlur}
              value={formik.values.date_of_birth}
            />
          </div>
          <InputText
            label={t('objective')}
            required
            placeholder={t('insert-objective')}
            name={'objective'}
            value={formik.values.objective}
            onChange={formik.handleChange}
          />
          <InputTextarea
            label={t('note')}
            required
            placeholder={t('insert-note')}
            name={'note'}
            value={formik.values.note}
            onChange={formik.handleChange}
          />
          <Alert severity="warning">{t('make-sure-data-alert')}</Alert>

          <Button disabled={checkDisableButton()} onClick={() => formik.handleSubmit()} variant={'contained'}>
            <div className={'flex gap-4 items-center duration-200'}>
              {t('submit')} {loadingSubmit && <CircularProgress size={16} color={'inherit'} />}
            </div>
          </Button>
        </div>
      </MainCard>
    </>
  );
}
