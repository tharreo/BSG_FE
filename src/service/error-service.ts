import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import AuthServices from './auth-service.ts';
import { t } from 'i18next';

export default class ErrorService {
  private authService = new AuthServices();

  private handleSnackbar(message: string) {
    toast.error(message);
  }

  public fetchApiError(error: AxiosError<any>) {
    if (error?.response?.status === 401) {
      this.authService.Logout().then();
    } else {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        message = error?.response?.data?.errors?.message
          ? this.checkMessageError(error?.response?.data?.errors?.message)
          : 'Internal Server Error';
      } else message = String(error);
      return this.handleSnackbar(message);
    }
  }

  private checkMessageError(msg: string) {
    return t(`response.${msg}`);
  }
}
