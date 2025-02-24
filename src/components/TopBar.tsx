import { IconButton } from '@mui/material';
import { MdMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';
import PageContainer from './PageContainer.tsx';
import { BrandLogo } from './BrandLogo.tsx';
import { BreadcrumbComponents } from './BreadcrumbComponents.tsx';
import { ProfileMenu } from './ProfileMenu.tsx';
import { PageTypeEnums } from '../enum/page-type-enums.ts';

export function TopBar(props: IProps) {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    document.body.classList.toggle('disable-scroll', show);
    document.documentElement.classList.toggle('disable-scroll', show);
  }, [show]);

  return (
    <div
      className={'bg-white z-[888] lg:w-screen  fixed border-b flex w-full '}
      style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}
    >
      <div
        className="hidden lg:block  "
        style={{ width: props.type === PageTypeEnums.PRIMARY ? STYLE_VARIABLE.SIZE.SIDEBAR_WIDTH : 0 }}
      ></div>
      <div className={'flex-1 h-full w-full'}>
        <PageContainer>
          <div className={'flex justify-between  items-center h-full w-full '}>
            <div className="hidden lg:grid">
              <BreadcrumbComponents />
            </div>
            <div className="flex items-center lg:hidden gap-3">
              <IconButton onClick={() => setShow(true)}>
                <MdMenu />
              </IconButton>
            </div>
            <BrandLogo className={'w-[120px] lg:hidden'} />

            <div>
              <ProfileMenu />
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

interface IProps {
  type: PageTypeEnums;
}
