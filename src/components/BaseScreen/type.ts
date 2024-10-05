export interface IProps {
  children: React.ReactNode;
  header: boolean;
  title: string;
}

export interface IPropsWithoutHeader {
  children: React.ReactNode;
  header?: boolean;
  title?: string;
}
