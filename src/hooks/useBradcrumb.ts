import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/store.ts';
import { UiActions } from '../redux/actions/ui.actions.ts';
import { IBreadcrumbData } from '../components/BreadcrumbComponents.tsx';

export const useBreadcrumb = () => {
  const [listBread, setListBread] = useState<IBreadcrumbData[] | undefined>(undefined);
  const dispatch = useAppDispatch();
  const layoutActions = new UiActions();

  useEffect(() => {
    if (listBread) {
      dispatch(layoutActions.setBreadCrumb(listBread));
    }
  }, [listBread]);

  const setBreadCrumb = (data: IBreadcrumbData[]) => {
    if (data) {
      setListBread(data);
    } else {
      setListBread(undefined);
    }
  };
  return {
    setBreadCrumb,
  };
};
