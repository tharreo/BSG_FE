import { PageTypeEnums } from '../enum/page-type-enums.ts';

export interface IRoutesList {
  element: () => JSX.Element;
  type: PageTypeEnums;
  routes: string;
}

export const routeList: IRoutesList[] = [];
