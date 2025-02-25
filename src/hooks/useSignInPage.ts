import { useEffect, useState } from 'react';
import { IReqSignIn } from '../model/request/IReqSignIn.ts';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { t } from 'i18next';
import { UiActions } from '../redux/actions/ui.actions.ts';
import { HttpService } from '../service/http-service.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import { BaseResponse } from '../model/response/ResponseModel.ts';
import { useAppDispatch } from '../redux/store.ts';
import AuthServices from '../service/auth-service.ts';
import ErrorService from '../service/error-service.ts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';

export function useSignInPage() {
  const initState: IReqSignIn = {
    password: '',
    username: '',
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const uiActions = new UiActions();
  const httpService = new HttpService();
  const authService = new AuthServices();
  const errorService = new ErrorService();

  const validationScheme = yup.object().shape({
    username: yup.string().required(t('validation.required', { name: t('username') })),
    password: yup.string().required(t('validation.required', { name: t('password') })),
  });

  useEffect(() => {
    if (authService.authCheck()) {
      navigate(ROUTES.HOME());
    }
  }, []);

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationScheme,
    onSubmit: (values) => {
      uiActions.loadingPage(true);
      setLoading(true);
      httpService
        .POST(ENDPOINT.SIGN_IN(), { ...values, data: values.username })
        .then((res: BaseResponse<any>) => {
          dispatch(uiActions.loadingPage(false));
          setLoading(false);

          authService.successLogin(res?.data?.response_data?.token);
        })
        .catch((e) => {
          dispatch(uiActions.loadingPage(false));
          setLoading(false);
          errorService.fetchApiError(e);
        });
    },
  });

  return { showPassword, setShowPassword, formik, loading };
}
