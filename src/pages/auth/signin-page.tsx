import { MainCard } from '../../components/MainCard.tsx';
import { VersionText } from '../../components/version-text.tsx';
import { InputText } from '../../components/InputText.tsx';
import { t } from 'i18next';
import { Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import { useSignInPage } from '../../hooks/useSignInPage.ts';
import { BrandLogo } from '../../components/BrandLogo.tsx';
import { ASSETS } from '../../constants/assets.ts';

export default function SignInPage() {
  const page = useSignInPage();
  const formik = page.formik;

  return (
    <div className={'grid grid-cols-2 h-screen'}>
      <div className={'h-screen w-full '}>
        <img src={ASSETS.IMG.IMG_LOGIN} alt={'login '} className={'h-full object-cover'} />
      </div>
      <div className={'w-full h-[90%] flex items-center justify-between my-auto  flex-col'}>
        <div className={'flex flex-col justify-center items-center gap-2'}>
          <BrandLogo className={'w-40'} />
          <p className={'font-semibold text-3xl'}>Cabang Bitung</p>
          <h3 className={'text-2xl font-semibold'}>E Registration</h3>
        </div>
        <MainCard>
          <div className={'grid gap-4 min-w-[300px]'}>
            <InputText
              label={t('username')}
              placeholder={t('insert-username')}
              required
              name={'username'}
              value={formik.values.username}
              onEnter={() => formik.handleSubmit()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formik.touched.username && formik.errors.username}
            />
            <InputText
              label={t('password')}
              placeholder={t('insert-password')}
              onEnter={() => formik.handleSubmit()}
              required
              type={page?.showPassword ? 'text' : 'password'}
              name={'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox checked={page.showPassword} onChange={(_, e) => page.setShowPassword(e)} />}
              label={t('show-password')}
            />
            <Button
              endIcon={page.loading && <CircularProgress color={'inherit'} size={16} />}
              onClick={() => formik.handleSubmit()}
              variant={'contained'}
            >
              {t('sign-in')}
            </Button>
          </div>
        </MainCard>
        <VersionText />
      </div>
    </div>
  );
}
