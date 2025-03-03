import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';
import { t } from 'i18next';

export function CommercialCreditTabButton(props: IProps) {
  return (
    <div className={'grid grid-cols-2'}>
      <Link to={ROUTES.COMMERCIAL_CREDIT()}>
        <CardActionArea>
          <div
            className={` border px-4 flex items-center justify-center py-2 rounded-l-xl ${props.activeIndex === 'SPKK' ? 'bg-red-100/30 text-primary-dark font-semibold border-red-800' : 'bg-white'}`}
          >
            <h1>{t('KMP')}</h1>
          </div>
        </CardActionArea>
      </Link>
      <Link to={ROUTES.PK_KUR()}>
        <CardActionArea>
          <div
            className={`bg-white border px-4 flex items-center justify-center py-2 rounded-r-xl ${props.activeIndex === 'PK KUR' ? 'bg-red-100/30 text-primary-dark font-semibold border-red-800' : 'bg-white'}`}
          >
            <h1>{t('KUR')}</h1>
          </div>
        </CardActionArea>
      </Link>
    </div>
  );
}

interface IProps {
  activeIndex?: string;
}
