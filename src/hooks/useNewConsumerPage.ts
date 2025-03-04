import { useBreadcrumb } from './useBradcrumb.ts';
import { t } from 'i18next';
import { ROUTES } from '../routes/routes.ts';
import { IReqCreateConsumerCredit } from '../model/request/IReqCreateConsumerCredit.ts';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { HttpService } from '../service/http-service.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import { UiServices } from '../service/ui-service.ts';
import ErrorService from '../service/error-service.ts';

export function useNewConsumerPage() {
  const breadcrumb = useBreadcrumb();
  const uiService = new UiServices();
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const initValue: IReqCreateConsumerCredit = {
    name: '',
    date: '',
    insurance: '',
    plafond: 0,

    pk_number: '',

    agency: '',
    number: '',
    consumer_credit_sub_type: undefined,
    consumer_credit_type: '',
  };

  const validationScheme = yup.object().shape({
    number: yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
    date: yup.date().typeError(t('validation.invalidDate')),
    plafond: yup.number(),
  });

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: validationScheme,
    onSubmit: (values) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CREATE_CREDIT_CONSUMER(), values)
        .then(() => {
          setLoadingSubmit(false);
          uiService.handleSnackbarSuccess(t('consumer-credit-success-created'));
          formik.setValues(initValue);
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  function checkValidButton() {
    const values = formik.values;
    return !(
      values.name &&
      values.date &&
      values.insurance &&
      values.plafond &&
      values.agency &&
      values.number &&
      values.consumer_credit_type
    );
  }

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        title: t('home'),
        path: ROUTES.HOME(),
      },
      {
        title: t('consumer-credit'),
        path: ROUTES.CONSUMER_CREDIT(),
      },
      {
        title: t('new-consumer-credit'),
      },
    ]);
  }, []);

  return {
    formik,
    loadingSubmit,
    checkValidButton,
  };
}
