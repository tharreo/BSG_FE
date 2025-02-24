export interface IReqCreateConsumerCredit {
  name: string;
  date: string;
  insurance: string;
  plafond: number;
  agency: string;
  number?: string;
  phone_number?: string;
  address?: string;
  consumer_credit_type: string;
  consumer_credit_sub_type?: string;
}
