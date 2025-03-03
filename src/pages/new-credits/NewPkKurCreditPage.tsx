import { PageTitle } from '../../components/PageTitle.tsx';
import { t } from 'i18next';
import { useBreadcrumb } from '../../hooks/useBradcrumb.ts';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../routes/routes.ts';
import { MainCard } from '../../components/MainCard.tsx';
import { InputText } from '../../components/InputText.tsx';
import { IReqNewPkKur } from '../../model/request/IReqNewPkKur.ts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Alert, Button, CircularProgress } from '@mui/material';
import { InputDatePicker } from '../../components/InputDatePicker.tsx';
import { InputRupiah } from '../../components/InputRupiah.tsx';
import { InputTextarea } from '../../components/InputTextArea.tsx';
import { HttpService } from '../../service/http-service.ts';
import ErrorService from '../../service/error-service.ts';
import { UiServices } from '../../service/ui-service.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';

export function NewPkKurCreditPage() {
  const breadcrumb = useBreadcrumb();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices();

  const initState: IReqNewPkKur = {
    number: '',
    name: '',
    request_number: '',
    pk_date: '',
    plafond: undefined,
    business_type: '',
    guarantee: '',
    binding_type: '',
    notary: '',
    note: '',
  };
  const validationScheme = yup.object().shape({
    number: yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
  });

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationScheme,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CREATE_PK_KUR(), e)
        .then(() => {
          setLoadingSubmit(false);
          formik.setValues(initState);
          uiService.handleSnackbarSuccess(t('credit-commercial-pk-kur-success-created'));
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  function checkValidButton() {
    return !(
      formik.values.number &&
      formik.values.name &&
      formik.values.request_number &&
      formik.values.pk_date &&
      formik.values.plafond
    );
  }

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
        path: ROUTES.PK_KUR(),
      },
      {
        title: t('add-new'),
      },
    ]);
  }, []);
  return (
    <>
      <PageTitle title={t('new-commercial-credit-pk-kur')} />

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
          <InputText
            label={t('guarantee')}
            placeholder={t('insert-guarantee')}
            name={'guarantee'}
            value={formik.values.guarantee}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.guarantee && formik.errors.guarantee}
          />
          <InputText
            label={t('binding-type')}
            placeholder={t('insert-binding-type')}
            name={'binding_type'}
            value={formik.values.binding_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.binding_type && formik.errors.binding_type}
          />
          <InputText
            label={t('notary')}
            placeholder={t('insert-notary')}
            name={'notary'}
            value={formik.values.notary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.notary && formik.errors.notary}
          />
          <InputTextarea
            label={t('note')}
            placeholder={t('insert-note')}
            name={'note'}
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.touched.note && formik.errors.note}
          />
          <Alert severity="warning">{t('make-sure-data-alert')}</Alert>

          <Button onClick={() => formik.handleSubmit()} variant={'contained'} disabled={checkValidButton()}>
            <div className={'flex gap-4 items-center duration-200'}>
              {t('submit')} {loadingSubmit && <CircularProgress size={16} color={'inherit'} />}
            </div>
          </Button>
        </div>
      </MainCard>
    </>
  );
}
