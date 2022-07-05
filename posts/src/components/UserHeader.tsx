import { useEffect, memo } from "react";
import { useActions, useAppSelector } from "../hooks";

interface Props {
  userId: number;
}

const UserHeader: React.FC<Props> = ({ userId }) => {
  const user = useAppSelector(state =>
    state.users.find(user => user.id === userId)
  );

  if (!user) {
    return null;
  }

  return <div className="header">{user.name}</div>;
};

export default UserHeader;
