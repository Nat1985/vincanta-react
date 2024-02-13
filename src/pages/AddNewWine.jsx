import { useEffect, useState } from "react";
import FetchLoader from '../components/FetchLoader.jsx';
import { PrimaryButton } from "../components/buttons.jsx";

const AddNewWine = () => {

    // Check new or edit and fetch values
    const [wineToEdit, setWineToEdit] = useState(null);
    const [wineData, setWineData] = useState(null);
    const [wineDataFetchStatus, setWineDataFetchStatus] = useState('idle');
    useEffect(() => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const wineId = params.get('wineId');
        if (wineId) setWineToEdit(wineId);
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setWineDataFetchStatus('loading');
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/wines/get-wine?wineId=${wineToEdit}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    setWineData(result.payload);
                    setWineDataFetchStatus('succeeded');
                } else {
                    setWineDataFetchStatus('failed');
                }
            } catch (error) {
                setWineDataFetchStatus('failed')
            }
        }
        if (wineToEdit) { fetchData() }
    }, [wineToEdit])

    // Handle input data
    const [inputData, setInputData] = useState({
        country: 'italy',
        region: '',
        city: '',
        company: '',
        type: '',
        name: '',
        year: null,
        tablePrice: null,
        takeAwayPrice: null,
        description: null,
    })
    useEffect(() => {
        if (wineToEdit) {
            if (wineData) {
                setInputData({
                    country: wineData.country,
                    region: wineData.region,
                    city: wineData.city,
                    company: wineData.company,
                    type: wineData.type,
                    name: wineData.name,
                    year: wineData.year,
                    tablePrice: wineData.tablePrice,
                    takeAwayPrice: wineData.takeAwayPrice,
                    description: wineData.description,
                })
            }
        }
    }, [wineToEdit, wineData])

    const handleInputData = (event) => {
        const { id, value } = event.target;
        setInputData(prevData => ({
            ...prevData,
            [id]: value
        }))
    }

    // Send fetch
    const [inputError, setInputError] = useState(false);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState(null);
    const sendFetch = async () => {
        setInputError(false);
        if (
            inputData.country === '' ||
            inputData.region === '' ||
            inputData.company === '' ||
            inputData.type === '' ||
            inputData.name === '' ||
            inputData.year === null ||
            (inputData && inputData.year.toString().length !== 4) ||
            inputData.tablePrice === null ||
            inputData.tablePrice === '' ||
            inputData.takeAwayPrice === null ||
            inputData.takeAwayPrice === ''
        ) {
            setInputError(true)
        } else {
            try {
                setFetchStatus('loading');
                const fetchUrl = wineToEdit ? `${process.env.REACT_APP_SERVER_BASE_URL}/wines/edit-wine` : `${process.env.REACT_APP_SERVER_BASE_URL}/wines/add-new-wine`
                const fetchMethod = wineToEdit ? 'PATCH' : 'POST';
                const setBody = wineToEdit ? {id: wineToEdit, data: inputData} : inputData
                const response = await fetch(fetchUrl, {
                    method: fetchMethod,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(setBody)
                })
                if (response.ok) {
                    setFetchStatus('succeeded');
                    window.location.href = "/";
                } else {
                    const error = await response.json();
                    setErrorMessage(error.message);
                    setFetchStatus('failed');
                }
            } catch (error) {
                setErrorMessage(error.message);
                setFetchStatus('failed');
            }
        }
    }
    useEffect(() => {
        console.log('inputData: ', inputData)
    }, [inputData])
    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8">
            {
                wineDataFetchStatus === 'loading' ? (
                    <FetchLoader />
                ) : (
                    <>
                        
                        {!wineToEdit && <h2>Inserisci nuovo prodotto</h2>}
                        {wineToEdit && wineData && <h3>Modifica <span className="text-[#782a76]">{wineData.name}</span></h3>}
                        {wineToEdit && wineData && <h3 className="mt-[-30px]">di <span className="text-[#782a76]">{wineData.company}</span></h3>}
                        <div className="min-w-[340px] md:w-[600px] flex flex-col gap-8 border rounded-xl p-8">
                            {/* <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <label htmlFor="country">Paese</label>
                    <select name="country" id="country" className="w-60" onChange={handleInputData} value={inputData.country}>
                        <option value="" disabled selected hidden></option>
                        <option value="italy">Italia</option>
                        <option value="france">Francia</option>
                    </select>
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.country !== '' ? 'hidden' : ''}`}>Inserisci il paese</h4> */}

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
                                <select name="type" id="type" className="w-60" onChange={handleInputData} value={inputData.type} >
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
                            <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || (inputData.year && inputData.year.toString().length === 4) ? 'hidden' : ''}`}>L'anno deve avere 4 cifre</h4>

                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                                <label htmlFor="price">Prezzo</label>
                                <div className="flex gap-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="tablePrice" className="text-[#782a76] text-[14pt]">Al tavolo</label>
                                        <input type="number" id="tablePrice" className="w-24" onChange={handleInputData} value={inputData.tablePrice} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="takeAwayPrice" className="text-[#782a76] text-[14pt]">Asporto</label>
                                        <input type="number" id="takeAwayPrice" className="w-24" onChange={handleInputData} value={inputData.takeAwayPrice} />
                                    </div>
                                </div>
                            </div>
                            <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || (inputData.tablePrice && inputData.takeAwayPrice) ? 'hidden' : ''}`}>Inserisci entrambi i prezzi</h4>

                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                                <label htmlFor="description">Note</label>
                                <textarea name="description" id="description" cols="30" rows="10" placeholder="opzionale" onChange={handleInputData} value={inputData.description} />
                            </div>

                            {fetchStatus === 'loading' && <FetchLoader />}
                            {inputError && <h4 className="mt-8">Dati mancanti, ricontrolla e riprova.</h4>}
                            {!inputError && fetchStatus === 'succeeded' && !wineToEdit && <h4 className="mt-8">Prodotto salvato correttamente.</h4>}
                            {!inputError && fetchStatus === 'succeeded' && wineToEdit && <h4 className="mt-8">Prodotto modificato correttamente.</h4>}
                            {!inputError && fetchStatus === 'succeeded' && <h5 className="text-[#782a76] mt-[-20px]">Attendi il refresh della pagina.</h5>}
                            {fetchStatus === 'failed' && <h4 className="mt-8">Qualcosa è andato storto. Ricarica la pagina e riprova.</h4>}
                            {fetchStatus === 'idle' && <PrimaryButton text="Salva prodotto" click={sendFetch} />}
                        </div>
                        
                    </>
                )
            }
        </div>
    )
}

export default AddNewWine;

