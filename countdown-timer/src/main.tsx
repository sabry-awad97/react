import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function formatTime(time: number) {
    return time < 10 ? `0${time}` : time;
}

const newYear = `1 Jan ${new Date().getFullYear() + 1}`;

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const countdown = () => {
    
    const newYearsDate = new Date(newYear);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate.valueOf() - currentDate.valueOf()) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }

  useEffect(() => {
    countdown()
    const id = setInterval(countdown, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <h1>New Years Eve</h1>
      <div className="countdown-container">
          <div className="countdown-el days-c">
              <p className="big-text">{days}</p>
              <span>days</span>
          </div>
          <div className="countdown-el hours-c">
              <p className="big-text">{formatTime(hours)}</p>
              <span>hours</span>
          </div>
          <div className="countdown-el mins-c">
              <p className="big-text">{formatTime(minutes)}</p>
              <span>mins</span>
          </div>
          <div className="countdown-el seconds-c">
              <p className="big-text">{formatTime(seconds)}</p>
              <span>seconds</span>
          </div>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(<App />);
