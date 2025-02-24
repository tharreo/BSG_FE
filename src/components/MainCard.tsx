import { ReactNode } from 'react';

export function MainCard(props: IProps) {
  return (
    <div className={'bg-white rounded-lg overflow-hidden border'}>
      {(props.header || props.title) && (
        <div className={'flex justify-between bg-white shadow-sm border-b items-center  p-6'}>
          {props.title && <div className={'  text-2xl text-slate-700 font-semibold uppercase'}>{props.title}</div>}
          {props.header && props.header}
        </div>
      )}
      <div className={'p-6'}>{props.children}</div>
    </div>
  );
}

interface IProps {
  title?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  header?: ReactNode;
}
