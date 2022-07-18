import "./App.css";

interface PersonProps {
  img: string;
  name: string;
  occupation: string;
  children?: React.ReactNode;
}

const Person: React.FC<PersonProps> = ({ img, name, occupation, children }) => (
  <div className="person">
    <img
      src={`https://randomuser.me/api/portraits/thumb/men/${img}.jpg`}
      alt="person img"
    />
    <div>
      <h4>{name}</h4>
      <h4>{occupation}</h4>
      {children}
    </div>
  </div>
);

const PersonList = () => (
  <section>
    <Person img="11" name="john" occupation="developer" />
    <Person img="22" name="bob" occupation="designer">
      <p>Lorem ipsum, dolor.</p>
    </Person>
    <Person img="33" name="david" occupation="the boss" />
  </section>
);

const App = () => <PersonList />;

export default App;
