import { useEffect, useState } from 'react';

import { t } from 'i18next';
import { HttpService } from '../service/http-service.ts';
import ErrorService from '../service/error-service.ts';
import { IResSummary } from '../model/response/IResSummary.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import { BaseResponse } from '../model/response/ResponseModel.ts';
import { MainCard } from '../components/MainCard.tsx';
import { NumberFormatterHelper } from '../helper/number-format-helper.ts';
import { useBreadcrumb } from '../hooks/useBradcrumb.ts';

export function HomePage() {
  const breadcrumbs = useBreadcrumb();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const numberFormat = new NumberFormatterHelper();

  const [data, setData] = useState<IResSummary | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    httpService
      .GET(ENDPOINT.GET_SUMMARY())
      .then((res: BaseResponse<IResSummary>) => {
        setData(res.data.response_data);
        setLoading(false);
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    breadcrumbs.setBreadCrumb([
      {
        title: t('home'),
      },
    ]);
  }, []);
  return (
    <div>
      <div className={'grid grid-cols-2 gap-4'}>
        <MainCard>
          <div className={' text-xl text-slate-500'}>{t('total-outgoing-mail')}</div>
          <div className={'text-4xl mt-4 font-semibold'}>
            {data?.total_outgoing_mail ? numberFormat.thousandSeparator(data.total_outgoing_mail) : '-'} {t('mail')}
          </div>
        </MainCard>
        <MainCard>
          <div className={' text-xl text-slate-500'}>{t('total-incoming-mail')}</div>
          <div className={'text-4xl mt-4 font-semibold'}>
            {data?.total_incoming_mail ? numberFormat.thousandSeparator(data.total_incoming_mail) : '-'} {t('mail')}
          </div>
        </MainCard>
        <MainCard>
          <div className={' text-xl text-slate-500'}>{t('total_plafond_credit_consumer')}</div>
          <div className={'text-4xl mt-4 font-semibold'}>
            {data?.total_outgoing_mail ? numberFormat.toRupiah(data.total_plafond_consumer) : '-'}
          </div>
        </MainCard>
        <MainCard>
          <div className={' text-xl text-slate-500'}>{t('total_plafond_credit_commercial')}</div>
          <div className={'text-4xl mt-4 font-semibold'}>
            {data?.total_outgoing_mail ? numberFormat.toRupiah(data.total_plafond_commercial) : '-'}
          </div>
        </MainCard>
      </div>
    </div>
  );
}
