export function TextLabelValue(props: IProps) {
  return (
    <div>
      <div className={'italic text-slate-400 '}>{props.label}</div>
      <div className={'font-semibold'}>{props.value}</div>
    </div>
  );
}

interface IProps {
  label: string;
  value: string;
}
