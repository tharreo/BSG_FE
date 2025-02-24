export interface IReqNewCommercialCredit {
  number: string;
  date?: string;
  name: string;
  plafond?: number;
  credit_type: string;
  business_type: string;
  assurance: string;
  pk_date: string;
  request_number: string;
}
