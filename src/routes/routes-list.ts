import { PageTypeEnums } from '../enum/page-type-enums.ts';
import SignInPage from '../pages/auth/signin-page.tsx';
import { ROUTES } from './routes.ts';

export interface IRoutesList {
  element: () => JSX.Element;
  type: PageTypeEnums;
  routes: string;
}

export const routeList: IRoutesList[] = [
  {
    element : SignInPage, 
    type : PageTypeEnums.FULL_PAGE,
    routes : ROUTES.SIGN_IN()
  }
];
