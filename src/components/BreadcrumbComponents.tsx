import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/store.ts';

export function BreadcrumbComponents() {
  const [listBreadcrumb, setListBreadcrumb] = useState<IBreadcrumbData[]>([]);
  const { t } = useTranslation();
  const Ui = useAppSelector((state) => state.Ui);

  useEffect(() => {
    if (Ui?.subheader?.length) {
      setListBreadcrumb(Ui?.subheader);
    }
  }, [Ui?.subheader]);

  return (
    <div className={'flex items-center gap-4 breadcrumb__ '}>
      <Breadcrumbs aria-label="breadcrumb" separator={'/'}>
        {listBreadcrumb.map((item, i) => {
          if (i !== listBreadcrumb.length - 1) {
            return (
              <div key={item.title} className={'text-slate-600 uppercase'}>
                <Link className={'hover:border-b border-gray-400'} to={item.path ?? '#'}>
                  {t(item.title)}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={item.title} className={'text-primary-main font-bold uppercase'}>
                {t(item.title)}
              </div>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
}

export interface IBreadcrumbData {
  title: string;
  path?: string;
}
