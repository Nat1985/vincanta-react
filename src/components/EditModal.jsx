import { useEffect, useState } from "react";

const EditModal = ({ data }) => {

    /* // Disable scroll
    useEffect(() => {
        const handleScroll = (event) => {
            event.preventDefault();
        };
        document.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []); */

    // Handle input
    const [inputData, setInputData] = useState({
        country: 'italy',
        region: data.region,
        city: data.city,
        company: data.company,
        type: data.type,
        name: data.name,
        year: data.year,
        tablePrice: data.tablePrice,
        takeAwayPrice: data.takeAwayPrice,
        description: data.description,
    })
    const handleInputData = (event) => {
        const { id, value } = event.target;
        setInputData(prevData => ({
            ...prevData,
            [id]: value
        }))
    }

    // Handle send fetch
    const [inputError, setInputError] = useState(false);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <>
            {/* <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex flex-col items-center justify-center"></div> */}
            <div className="w-[320px] md:w-[600px] rounded-xl bg-white flex flex-col items-center text-center gap-8 mt-8">
                <h2>Modifica <span className="text-[#782a76]">{data.name}</span></h2>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="region">Regione</label>
                    <select name="region" id="region" className="w-60" onChange={handleInputData} value={inputData.region}>
                        <option value="" disabled selected hidden></option>
                        <option value="Abruzzo">Abruzzo</option>
                        <option value="Basilicata">Basilicata</option>
                        <option value="Calabria">Calabria</option>
                        <option value="Campania">Campania</option>
                        <option value="Emilia Romagna">Emilia Romagna</option>
                        <option value="Friuli Venezia Giulia">Friuli Venezia Giulia</option>
                        <option value="Lazio">Lazio</option>
                        <option value="Liguria">Liguria</option>
                        <option value="Lombardia">Lombardia</option>
                        <option value="Marche">Marche</option>
                        <option value="Molise">Molise</option>
                        <option value="Piemonte">Piemonte</option>
                        <option value="Puglia">Puglia</option>
                        <option value="Sardegna">Sardegna</option>
                        <option value="Sicilia">Sicilia</option>
                        <option value="Toscana">Toscana</option>
                        <option value="Trentino Alto Adige">Trentino Alto Adige</option>
                        <option value="Umbria">Umbria</option>
                        <option value="Valle d'Aosta">Valle d'Aosta</option>
                        <option value="Veneto">Veneto</option>
                    </select>
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.region !== '' ? 'hidden' : ''}`}>Inserisci la regione</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="city">Paese</label>
                    <input type="text" id="city" onChange={handleInputData} value={inputData.city} />
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.city !== '' ? 'hidden' : ''}`}>Inserisci il paese</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="company">Nome azienda</label>
                    <input type="text" id="company" onChange={handleInputData} value={inputData.company} />
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.company !== '' ? 'hidden' : ''}`}>Inserisci il nome dell'azienda</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="type">Genere</label>
                    <select name="type" id="type" className="w-60" onChange={handleInputData} value={inputData.type}>
                        <option value="" disabled selected hidden></option>
                        <option value="red">Rosso</option>
                        <option value="white">Bianco</option>
                        <option value="rosé">Rosé</option>
                        <option value="bubbles">Bolle</option>
                    </select>
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.type !== '' ? 'hidden' : ''}`}>Inserisci il genere</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="name">Nome vino</label>
                    <input type="text" id="name" className="md:w-[400px]" onChange={handleInputData} value={inputData.name} />
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.name !== '' ? 'hidden' : ''}`}>Inserisci il nome del vino</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="year">Annata</label>
                    <input type="number" id="year" className="w-36" onChange={handleInputData} value={inputData.year} />
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.year ? 'hidden' : ''}`}>Inserisci l'annata</h4>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || (inputData.year && inputData.year.length === 4) ? 'hidden' : ''}`}>L'anno deve avere 4 cifre</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="price">Prezzo</label>
                    <div className="flex gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="tablePrice" className="text-[#782a76] text-[14pt]">Al tavolo</label>
                            <input type="number" id="tablePrice" className="w-24" onChange={handleInputData} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="takeAwayPrice" className="text-[#782a76] text-[14pt]">Asporto</label>
                            <input type="number" id="takeAwayPrice" className="w-24" onChange={handleInputData} />
                        </div>
                    </div>
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || (inputData.tablePrice && inputData.takeAwayPrice) ? 'hidden' : ''}`}>Inserisci entrambi i prezzi</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="description">Note</label>
                    <textarea name="description" id="description" cols="30" rows="10" placeholder="opzionale" onChange={handleInputData} />
                </div>
            </div>
        </>
    )
}

export default EditModal;