import { ENV } from '../constants/env.ts';

export function VersionText() {
  return <p className={'text-slate-500 text-sm'}>{`V  ${ENV.VERSION}`}</p>;
}
