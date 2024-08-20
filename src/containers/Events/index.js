import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // Filtrage des événements par catégorie
  const filteredEvents = (
    data?.events || []
  ).filter((event) => !type || event.type === type); // Filtre par type (catégorie)
    
   // Pagination des événements filtrés
   const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = Math.ceil((filteredEvents?.length || 0) / PER_PAGE); // Calcule le nombre de pages
  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
               )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {Array.from({ length: pageNumber }).map((_, n) => (
            <a 
              key={`page-${n + 1}`} // Utiliser une clé unique générée
              href="#events" 
             onClick={() => setCurrentPage(n + 1)}
              >
              {n + 1}
            </a>
           ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;