import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  if (!data || !data.focus || data.focus.length === 0){
    return <div>No events available</div>;
  }
  const [index, setIndex] = useState(0);

  // Tri des événements par date descendante
  const byDateDesc = data.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  // Si byDateDesc est undefined, retourner null ou un loader
  if(!byDateDesc || byDateDesc.length === 0 ){
    return null;
  }

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setIndex(prevIndex => (prevIndex + 1) % byDateDesc.length);
  };

  // Utilisation d'un effet pour gérer l'intervalle de changement de slide
  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000);
    return () => clearInterval(intervalId);
  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
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
            key={event.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;