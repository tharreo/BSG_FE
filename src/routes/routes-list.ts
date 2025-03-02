import { PageTypeEnums } from '../enum/page-type-enums.ts';
import { AccountPage } from '../pages/AccountPage.tsx';
import SignInPage from '../pages/auth/signin-page.tsx';
import { HomePage } from '../pages/HomePage.tsx';
import { NewAccountPage } from '../pages/NewAccountPage.tsx';
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
  },
  {
    element : HomePage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.HOME()
  },
   {
    element : AccountPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.ACCOUNT()
  },
  {
    element : NewAccountPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.NEW_ACCOUNT()
  },

];
