import { ASSETS } from '../constants/assets.ts';

export function BrandLogo(props: IProps) {
  return <img className={props.className} src={ASSETS.IMG.BSG_LOGO} alt={'bsg-logo'} />;
}

interface IProps {
  className?: string;
}
