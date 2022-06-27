import * as React from "react";

interface IProps {
  isLoading: boolean;
}

const Loader = () => (
  <div className="loader-overlay">
    <div className="loader-circle-wrap">
      <div className="loader-circle" />
    </div>
  </div>
);

const withLoader =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P & IProps> =>
  ({ isLoading, ...props }: IProps) =>
    isLoading ? <Loader /> : <Component {...(props as P)} />;

export default withLoader;
