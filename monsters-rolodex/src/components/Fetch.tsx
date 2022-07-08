import { useFetch } from "../hooks/useFetch";

interface FetchProps {
  url: string;
  loadingFallback: JSX.Element;
  onError: (error: Error) => JSX.Element;
  onSuccess: (dta: any) => JSX.Element;
}

export const Fetch: React.FC<FetchProps> = ({
  url,
  onSuccess: renderSuccess,
  loadingFallback,
  onError: renderError,
}) => {
  const { data, error } = useFetch({ url });
  if (!data) return loadingFallback;
  if (error) return renderError(error);
  return renderSuccess(data);
};
