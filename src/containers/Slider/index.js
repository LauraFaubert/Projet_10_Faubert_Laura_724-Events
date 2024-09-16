import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date croissante
  const byDateDesc = data?.focus
    ? data?.focus.sort(
        (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
      )
    : [];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) =>
        current < byDateDesc.length - 1 ? current + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [byDateDesc.length]);

  const handleOptionChange = (selectedIndex) => {
    setIndex(selectedIndex); // Met à jour l'index à la position sélectionnée
  };

 

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id || `event-${idx}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id || `radio-${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleOptionChange(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;