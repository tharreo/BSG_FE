import { useBreadcrumb } from '../../hooks/useBradcrumb.ts';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { ROUTES } from '../../routes/routes.ts';
import { PageTitle } from '../../components/PageTitle.tsx';
import { MainCard } from '../../components/MainCard.tsx';
import { InputText } from '../../components/InputText.tsx';
import { useFormik } from 'formik';
import { IReqNewCommercialCredit } from '../../model/request/IReqNewCommercialCredit.ts';
import { InputDatePicker } from '../../components/InputDatePicker.tsx';
import { InputRupiah } from '../../components/InputRupiah.tsx';
import { Alert, Button, CircularProgress } from '@mui/material';
import { HttpService } from '../../service/http-service.ts';
import ErrorService from '../../service/error-service.ts';
import { UiServices } from '../../service/ui-service.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import * as yup from 'yup';

export function NewCommercialCreditPage() {
  const breadcrumb = useBreadcrumb();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices();

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const initState: IReqNewCommercialCredit = {
    name: '',
    number: '',
    credit_type: '',
    date: undefined,
    plafond: undefined,
    assurance: '',
    request_number: '',
    pk_date: '',
    business_type: '',
  };

  const validationScheme = yup.object().shape({
    number: yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
    date: yup.date().typeError(t('validation.invalidDate')),
    plafond: yup.number(),
  });

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationScheme,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CRETE_COMMERCIAL(), e)
        .then(() => {
          setLoadingSubmit(false);
          uiService.handleSnackbarSuccess(t('commercial-credit-success-created'));
          formik.setValues(initState);
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  function checkValidButton() {
    return !(
      formik.values.name &&
      formik.values.number &&
      formik.values.plafond &&
      formik.values.request_number &&
      formik.values.pk_date &&
      formik.values.business_type
    );
  }

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        title: t('home'),
        path: '/',
      },
      {
        title: t('commercial-credit'),
        path: ROUTES.COMMERCIAL_CREDIT(),
      },
      {
        title: t('add-new-commercial-credit'),
      },
    ]);
  }, []);
  return (
    <>
      <PageTitle title={t('add-new-commercial-credit')} />
      <MainCard>
        <div className={'grid gap-6'}>
          <InputText
            label={t('number')}
            placeholder={t('insert-number')}
            required
            name={'number'}
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.number && formik.errors.number}
          />
          <InputText
            label={t('debitur-name')}
            placeholder={t('insert-debitur-name')}
            required
            name={'name'}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.name && formik.errors.name}
          />
          <InputText
            label={t('request-number')}
            placeholder={t('insert-request-number')}
            required
            name={'request_number'}
            value={formik.values.request_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.request_number && formik.errors.request_number}
          />
          <InputDatePicker
            label={t('pk_date')}
            required
            name={'pk_date'}
            onChange={(e) => formik.setFieldValue('pk_date', e.target.value)}
            onBlur={formik.handleBlur}
            value={formik.values.pk_date}
            errorMessage={formik.touched.pk_date && formik.errors.pk_date}
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
          <InputText
            label={t('business-type')}
            placeholder={t('insert-business-type')}
            name={'business_type'}
            value={formik.values.business_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.business_type && formik.errors.business_type}
          />


          <Alert severity="warning">{t('make-sure-data-alert')}</Alert>
          <Button disabled={checkValidButton()} onClick={() => formik.handleSubmit()} variant={'contained'}>
            <div className={'flex gap-4 items-center duration-200'}>
              {t('submit')} {loadingSubmit && <CircularProgress size={16} color={'inherit'} />}
            </div>
          </Button>
        </div>
      </MainCard>
    </>
  );
}
