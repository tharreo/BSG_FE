import { ReactNode, useEffect } from 'react';
import { PageTypeEnums } from '../enum/page-type-enums.ts';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';
import { SideBar } from './SideBar.tsx';
import { TopBar } from './TopBar.tsx';
import PageContainer from './PageContainer.tsx';
import { useAppDispatch } from '../redux/store.ts';
import { AccountActions } from '../redux/actions/account.actions.ts';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';

function BasePage(props: IProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const accountActions = new AccountActions();

  useEffect(() => {
    if (location.pathname !== ROUTES.SIGN_IN()) {
      dispatch(accountActions.getMe()).then();
    }
  }, [location.pathname]);

  if (props.type === PageTypeEnums.FULL_PAGE) {
    return <>{props.children}</>;
  } else if (props.type === PageTypeEnums.SECONDARY) {
    return (
      <main className={'flex w-full relative'}>
        <TopBar type={props.type} />
        <SideBar type={props.type} />
        <div className={'overflow-y-hidden mt-6 w-full'}>
          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
          <PageContainer>
            <div className={'grid gap-8 mt-5'}>{props.children}</div>
          </PageContainer>
          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
        </div>
      </main>
    );
  } else {
    return (
      <main className={'flex w-full relative'}>
        <TopBar type={props.type} />

        <SideBar type={props.type} />

        <div className={'overflow-y-hidden mt-6 w-full'}>
          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
          <PageContainer>
            <div className={'grid gap-8 mt-5'}>{props.children}</div>
          </PageContainer>
          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
        </div>
      </main>
    );
  }
}

export default BasePage;

interface IProps {
  children: ReactNode;
  type: PageTypeEnums;
}
