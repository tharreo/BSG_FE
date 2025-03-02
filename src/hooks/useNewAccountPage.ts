import { useBreadcrumb } from './useBradcrumb.ts';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { ROUTES } from '../routes/routes.ts';
import { IReqCreateNewUser } from '../model/request/IReqCreateNewUser.ts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { HttpService } from '../service/http-service.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import { BaseResponse } from '../model/response/ResponseModel.ts';
import { IResCreateAccount } from '../model/response/IResCreateAccount.ts';
import ErrorService from '../service/error-service.ts';
import { useNavigate } from 'react-router-dom';
import { UtilsHelper } from '../helper/utils-helper.ts';

export function useNewAccountPage() {
  const breadcrumb = useBreadcrumb();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const utilsHelper = new UtilsHelper();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checkForm, setCheckForm] = useState<boolean>(false);
  const [dataSuccess, setDataSuccess] = useState<IResCreateAccount | undefined>();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean | undefined>();

  const initForm: IReqCreateNewUser = {
    name: '',
    username: '',
  };

  const validationScheme = yup.object().shape({
    username: yup.string().required(t('validation.required', { name: t('username') })),
    name: yup.string().required(t('validation.required', { name: t('full-name') })),
  });

  const formik = useFormik({
    initialValues: initForm,
    validationSchema: validationScheme,
    onSubmit: (values) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CREATE_NEW_ACCOUNT(), values)
        .then((res: BaseResponse<IResCreateAccount>) => {
          setDataSuccess(res?.data.response_data);
          setLoadingSubmit(false);
          setOpenModal(true);
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
        path: ROUTES.HOME(),
      },
      {
        title: t('account'),
        path: ROUTES.ACCOUNT(),
      },
      {
        title: t('new-account'),
        path: ROUTES.NEW_ACCOUNT(),
      },
    ]);
  }, []);

  function onCloseModal() {
    setOpenModal(false);
    setDataSuccess(undefined);
    navigate(ROUTES.ACCOUNT());
  }

  function checkDisableButton() {
    if (formik.values.name && formik.values.username) {
      return !checkForm;
    } else {
      return true;
    }
  }

  async function copyPassword() {
    if (dataSuccess?.password) {
      await utilsHelper.copyToClipboard(dataSuccess?.password);
    }
  }

  return {
    checkForm,
    formik,
    copyPassword,
    openModal,
    loadingSubmit,
    dataSuccess,
    setLoadingSubmit,
    setCheckForm,
    onCloseModal,
    checkDisableButton,
  };
}
