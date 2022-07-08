import React from "react";
import { Fetch } from "./Fetch";

export interface FetchProps {
  fetchUrl: string;
  data: unknown;
}

export function withFetch<P extends FetchProps>(
  Component: React.ComponentType<P>
) {
  const ComponentsWithFetch: React.FC<Omit<P, "data">> = props => {
    return (
      <Fetch
        url={props.fetchUrl}
        loadingFallback={<h1>loading...</h1>}
        onError={error => <h1>Something went wrong... {error.message}</h1>}
        onSuccess={data => <Component {...(props as P)} data={data} />}
      />
    );
  };
  return ComponentsWithFetch;
}
