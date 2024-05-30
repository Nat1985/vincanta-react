import { useEffect, useState } from "react";

function useScrollPosition() {
    // Stato per memorizzare la posizione dello scroll
    const [scrollPosition, setScrollPosition] = useState(0);

    // Funzione per aggiornare la posizione dello scroll
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        // Aggiungi l'evento di scroll quando il componente viene montato
        window.addEventListener('scroll', handleScroll);

        // Pulisci l'evento di scroll quando il componente viene smontato
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
}

export default useScrollPosition;