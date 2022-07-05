import React from "react";

interface Props {
  className: string;
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<Props> = ({ className, href, children }) => {
  const onClick: React.MouseEventHandler<HTMLAnchorElement> = event => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", href);

    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;
