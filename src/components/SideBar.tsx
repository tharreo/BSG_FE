import { STYLE_VARIABLE } from '../constants/style-variable.ts';
import { CardActionArea } from '@mui/material';
import { BrandLogo } from './BrandLogo.tsx';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { navbarData } from '../constants/navbar-data.ts';
import { PageTypeEnums } from '../enum/page-type-enums.ts';

export function SideBar(props: IProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [currentPathSplit, setCurrentPathSplit] = useState<string>('/');

  function checkActiveNav(item: string) {
    const data = item.split('/')[1];
    return data.split('?')[0] === currentPathSplit;
  }

  useEffect(() => {
    const data = location.pathname.split('/')[1];
    const split = data.split('?')[0];
    setCurrentPathSplit(split);
  }, [location.pathname]);
  return (
    <div className={'lg:flex hidden '}>
      <div
        className="lg:block hidden h-32 bg-red-800 "
        style={{ width: props.type === PageTypeEnums.PRIMARY ? STYLE_VARIABLE.SIZE.SIDEBAR_WIDTH : 0, height: 0 }}
      ></div>
      <div className={`flex duration-300 z-[999]  lg:fixed `}>
        <nav
          className={`h-[100dvh] lg:fixed   bg-white border-r  py-10 flex flex-col justify-between  ${props.type === PageTypeEnums.PRIMARY ? '-translate-x-0' : '-translate-x-96'} `}
          style={{ width: STYLE_VARIABLE.SIZE.SIDEBAR_WIDTH }}
        >
          <div className=" pb-10 mb-5  px-7  w-full">
            <BrandLogo className={'w-[80px]'} />
          </div>
          <div className={'h-full '}>
            <div className="grid gap-2 px-5 h-fit ">
              {navbarData.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.path}>
                    <CardActionArea>
                      <Link
                        to={item.path}
                        className={`flex flex-col items-center gap-1 w-full  px-4 py-3 rounded-md   hover:bg-slate-100  ${checkActiveNav(item.path) ? 'text-primary-main border border-primary-main/20 bg-primary-main/5' : ' text-slate-600 border-transparent'} duration-300 border `}
                      >
                        {Icon && (
                          <div className="w-6  ">
                            <Icon className="h-full w-full text-4xl" />
                          </div>
                        )}
                        <div className={` text-xs text-center ${Icon ? '' : 'font-semibold'}`}>{t(item.title)}</div>
                      </Link>
                    </CardActionArea>
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

interface IProps {
  type: PageTypeEnums;
}
