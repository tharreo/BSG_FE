import { Container } from '@mui/material';
import { ReactNode } from 'react';

function PageContainer(props: IProps) {
  if (props.size === 'normal') {
    return <div className="max-w-4xl mx-auto flex-1 h-full lg:w-full w-screen">{props.children}</div>;
  } else if (props.size === 'sm') {
    return <Container>{props.children}</Container>;
  } else {
    return <div className="max-w-4xl mx-auto flex-1 h-full lg:w-full w-screen ">{props.children}</div>;
  }
}

export default PageContainer;

interface IProps {
  size?: 'sm' | 'normal';
  children?: ReactNode;
}
