import { useEffect, useState } from "react";
import useEventListener from "../hooks/useEventListener";

interface Props {
  path: string;
  children: React.ReactNode;
}

const Route = ({ path, children }: Props) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEventListener("popstate", () => {
    setCurrentPath(window.location.pathname);
  });

  // useEffect(() => {
  //   const onLocationChange = () => {
  //     setCurrentPath(window.location.pathname);
  //   };

  //   window.addEventListener('popstate', onLocationChange);

  //   return () => {
  //     window.removeEventListener('popstate', onLocationChange);
  //   };
  // }, []);

  return currentPath === path ? <>{children}</> : null;
};

export default Route;
