import { useEffect, useState } from 'react';
import { useBreadcrumb } from './useBradcrumb.ts';
import { ROUTES } from '../routes/routes.ts';
import { t } from 'i18next';
import { IReqNewMail } from '../model/request/IReqNewMail.ts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { HttpService } from '../service/http-service.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import { UiServices } from '../service/ui-service.ts';
import ErrorService from '../service/error-service.ts';

export function useNewMailPage() {
  const breadcrumb = useBreadcrumb();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const httpService = new HttpService();
  const uiService = new UiServices();
  const errorService = new ErrorService();

  const initState: IReqNewMail = {
    count: undefined,
    type: '',
    date: '',
    sub_type: '',
    note: '',
    name: '',
    sender: '',
    recipient: '',
  };
  const validationSchema = yup.object().shape({
    count: yup.string().matches(/^[0-9]+$/, 'Only numbers are allowed'),
  });

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationSchema,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.NEW_MAIL(), e)
        .then(() => {
          setLoadingSubmit(false);
          formik.setValues(initState);
          uiService.handleSnackbarSuccess(t('mail-success-created'));
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  function checkValidButton() {
    
      if (formik.values.type==="INCOMING"){
        if (formik.values.type && formik.values.sub_type && formik.values.name && formik.values.date && formik.values.sender ){
          return false
      } else {
        return true
      }
    } else if (formik.values.type==="OUTGOING"){
       if (formik.values.type && formik.values.sub_type && formik.values.date && formik.values.sender && formik.values.recipient ){
          return false
      } else {
        return true
      }
    }
     else {
      return true
    }
  }

  useEffect(() => {
    breadcrumb.setBreadCrumb([
      {
        path: ROUTES.HOME(),
        title: t('home'),
      },
      {
        path: ROUTES.MAIL_PAGE(),
        title: t('mail'),
      },
      {
        title: t('new-mail'),
      },
    ]);
  }, []);
  return {
    loadingSubmit,
    formik,
    checkValidButton,
  };
}
