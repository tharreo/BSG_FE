import { ROUTES } from '../routes/routes.ts';
import { IconType } from 'react-icons';
import { GoHomeFill } from 'react-icons/go';
import { MdFiberSmartRecord, MdGroups, MdMail } from 'react-icons/md';

export interface INavbarData {
  path: string;
  icon?: IconType;
  title: string;
}

export const navbarData: INavbarData[] = [
  {
    path: ROUTES.HOME(),
    title: 'home',
    icon: GoHomeFill,
  },
  {
    path: ROUTES.ACCOUNT(),
    title: 'account',
    icon: MdGroups,
  },

  {
    path: ROUTES.MAIL_PAGE(),
    title: 'mail',
    icon: MdMail,
  },

    {
    path: ROUTES.BI_CHECKING(),
    title: 'bi-checking',
    icon: MdFiberSmartRecord,
  },

  {
    path: ROUTES.CONSUMER_CREDIT(),
    title: 'consumer-credit',
    icon: MdFiberSmartRecord,
  },
  {
    path: ROUTES.COMMERCIAL_CREDIT(),
    title: 'commercial-credit-menu',
    icon: MdFiberSmartRecord,
  },

];
