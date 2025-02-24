export const ROUTES = {
  HOME: () => `/`,
  SIGN_IN: () => `/sign-in`,
  ACCOUNT: (param?: defaultPaginationType) => '/account' + (param ? convertObjToQueryParam(param) : ''),
  CONSUMER_CREDIT: (param?: defaultPaginationType) => `/consumer` + (param ? convertObjToQueryParam(param) : ''),
  COMMERCIAL_CREDIT: (param?: defaultPaginationType) => `/commercial` + (param ? convertObjToQueryParam(param) : ''),

  BI_CHECKING: (param?: defaultPaginationType) => `/bi-checking` + (param ? convertObjToQueryParam(param) : ''),
  NEW_ACCOUNT: () => `/account/new-account`,
  NEW_CONSUMER: () => `/consumer/new`,
  NEW_COMMERCIAL: () => `/commercial/new`,
  NEW_MAIl: () => `/mail/new`,
  NEW_BI_CHECKING: () => `/bi-checking/new`,
  MAIL_PAGE: (param?: defaultPaginationType) => `/mail` + (param ? convertObjToQueryParam(param) : ''),
  PK_KUR: (param?: defaultPaginationType) => `/commercial/pk-kur` + (param ? convertObjToQueryParam(param) : ''),
  NEW_PK_KUR: () => `/commercial/pk-kur/new`,
};

export function convertObjToQueryParam(obj: { [key: string]: any }): string {
  return (
    '?' +
    Object.keys(obj)
      .filter((key) => key !== undefined && key !== null && obj[key] !== undefined && obj[key] !== null) // Exclude keys and values that are undefined or null
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&')
  );
}

export interface defaultPaginationType {
  page: number;
  size: number;
  type?: string;
  sub_type?: string;
  query?: string;
}

export const defaultPaginationObj: defaultPaginationType = {
  size: 10,
  page: 0,
};
