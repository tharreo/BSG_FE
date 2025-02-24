export function PageTitle(props: IProps) {
  return (
    <div>
      <h1 className={'italic  text-3xl font-semibold  '}>{props.title}</h1>
      <div className={'text-slate-500 italic'}>{props.description}</div>
    </div>
  );
}

interface IProps {
  title: string;
  description?: string;
}
