export type ButtonVariant = 'text' | 'outlined' | 'contained';
export type ColorType = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';
export type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify';
export type DateTypeFormat =
  | 'yyyy-MM-dd'
  | 'do MMM yyyy'
  | 'yyyy - MM - dd'
  | 'do MMM'
  | 'LLL dd, yyyy'
  | 'dd LLLL, yyyy'
  | 'dd LLLL, yyyy - HH:mm'
  | 'dd MMMM yyyy'
  | 'dd MMM'
  | 'MMM dd, yyyy'
  | 'dd LLL yyyy'
  | 'dd MMMM'
  | 'yyyy-MM-dd HH:mm:ss';

export interface ILabelValue<T> {
  value: T;
  label: string;
  icon?: string;
}
