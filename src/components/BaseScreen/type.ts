export interface IProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  header: boolean;
  title: string;
  noBackButton?: boolean;
  cartCount?: string;
}

export interface IPropsWithoutHeader {
  children?: React.ReactNode;
  scrollEnabled?: boolean;
  header?: boolean;
  title?: string;
  noBackButton?: boolean;
  cartCount?: string;
}
