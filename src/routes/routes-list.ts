import { PageTypeEnums } from '../enum/page-type-enums.ts';
import { AccountPage } from '../pages/AccountPage.tsx';
import SignInPage from '../pages/auth/signin-page.tsx';
import { BiCheckingPage } from '../pages/credits/BiCheckingPage.tsx';
import { CommercialCreditPage } from '../pages/credits/CommercialCreditPage.tsx';
import { ConsumerCreditPage } from '../pages/credits/ConsumerCreditPage.tsx';
import { PkKurPage } from '../pages/credits/PkKurPage.tsx';
import { HomePage } from '../pages/HomePage.tsx';
import { MailPage } from '../pages/MailPage.tsx';
import { NewBiCheckingPage } from '../pages/new-credits/NewBiCheckingPage.tsx';
import { NewCommercialCreditPage } from '../pages/new-credits/NewCommercialCreditPage.tsx';
import { NewConsumerCreditPage } from '../pages/new-credits/NewConsumerCreditPage.tsx';
import { NewPkKurCreditPage } from '../pages/new-credits/NewPkKurCreditPage.tsx';
import { NewAccountPage } from '../pages/NewAccountPage.tsx';
import { NewMailPage } from '../pages/NewMailPage.tsx';
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
    {
    element : MailPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.MAIL_PAGE()
  },
   {
    element : NewMailPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.NEW_MAIl()
  },
   {
    element : BiCheckingPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.BI_CHECKING()
  },
     {
    element : NewBiCheckingPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.NEW_BI_CHECKING()
  },
     {
    element : ConsumerCreditPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.CONSUMER_CREDIT()
  },
       {
    element : NewConsumerCreditPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.NEW_CONSUMER()
  },
         {
    element : CommercialCreditPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.COMMERCIAL_CREDIT()
  },
        {
    element : NewCommercialCreditPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.NEW_COMMERCIAL()
  },
          {
    element : PkKurPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.PK_KUR()
  },
            {
    element : NewPkKurCreditPage, 
    type : PageTypeEnums.PRIMARY,
    routes : ROUTES.NEW_PK_KUR()
  },
];
