import React from "react";
import { Monster } from "../typings/Monster";
import "./card.css";

interface CardProps {
  monster: Monster;
}

const Card: React.FC<CardProps> = ({ monster }) => {
  const { id, name, email } = monster;
  return (
    <div className="card-container">
      <img
        alt="monster"
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;
