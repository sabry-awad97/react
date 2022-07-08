import Card from "./Card";
import { Monster } from "../typings/Monster";
import "./card-list.css";

interface CardListProps {
  monsters: Monster[];
}

const CardList: React.FC<CardListProps> = ({ monsters }) => (
  <div className="card-list">
    {monsters.map(monster => (
      <Card key={monster.id} monster={monster} />
    ))}
  </div>
);

export default CardList;
