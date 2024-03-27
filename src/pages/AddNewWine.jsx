import { useEffect, useState } from "react";
import FetchLoader from '../components/FetchLoader.jsx';
import { PrimaryButton } from "../components/buttons.jsx";
import { useSelector } from "react-redux";

const AddNewWine = () => {

    // Check new or edit and fetch values and check scroll
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
                    console.log('payload: ', result.payload)
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
        country: '',
        region: '',
        city: '',
        company: '',
        type: '',
        name: '',
        year: null,
        volume: "75 CL",
        tablePrice: null,
        takeAwayPrice: null,
        award: false,
        sboccatura: false,
        sboccaturaDate: '',
        favourite: false,
        description: null,
    })
    // debug
    useEffect(() => {
        console.log('inputData: ', inputData);
    }, [inputData])
    useEffect(() => {
        if (wineToEdit) {
            if (wineData) {
                setInputData({
                    country: wineData.country === "Champagne" ? "Francia" : wineData.country,
                    region: wineData.region,
                    city: wineData.city,
                    company: wineData.company,
                    type: wineData.type,
                    name: wineData.name,
                    year: wineData.year,
                    volume: wineData.volume,
                    tablePrice: wineData.tablePrice,
                    takeAwayPrice: wineData.takeAwayPrice,
                    award: wineData.award,
                    sboccatura: wineData.sboccatura.isTrue,
                    sboccaturaDate: wineData.sboccatura.date,
                    favourite: wineData.favourite,
                    description: wineData.description,
                })
            }
        }
    }, [wineToEdit, wineData])

    const handleInputData = (event) => {
        const { id, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setInputData(prevData => ({
            ...prevData,
            [id]: inputValue
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
            ((inputData.country === 'Italia' || inputData.country === 'Francia') && inputData.region === '') ||
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
                const setBody = wineToEdit ? { id: wineToEdit, data: inputData } : inputData
                const response = await fetch(fetchUrl, {
                    method: fetchMethod,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(setBody)
                })
                if (response.ok) {
                    setFetchStatus('succeeded');
                    if (wineToEdit) {
                        window.location.href = `/?scroll=${wineToEdit}`
                    } else {
                        window.location.href = "/"
                    }
                } else {
                    const error = await response.json();
                    setErrorMessage(error.message);
                    console.log('fetch error message: ', error);
                    setFetchStatus('failed');
                }
            } catch (error) {
                setErrorMessage(error.message);
                console.log('fetch error message: ', error);
                setFetchStatus('failed');
            }
        }
    }
    // Scroll to bottom after fetch
    useEffect(() => {
        if (fetchStatus === "succeeded") {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [fetchStatus])

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

                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                <label htmlFor="country">Nazione</label>
                                <select name="country" id="country" className="w-60" onChange={handleInputData} value={inputData.country}>
                                    <option value="" disabled selected hidden></option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Italia">Italia</option>
                                    <option value="Francia">Francia</option>
                                    <option value="Germania">Germania</option>
                                    <option value="Grecia">Grecia</option>
                                    <option value="Portogallo">Portogallo</option>
                                    <option value="Spagna">Spagna</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                            <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.country !== '' ? 'hidden' : ''}`}>Inserisci il paese</h4>


                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                                <label htmlFor="type">Genere</label>
                                <select name="type" id="type" className="w-60" onChange={handleInputData} value={inputData.type} >
                                    <option value="" disabled selected hidden></option>
                                    <option value="red">Rosso</option>
                                    <option value="white">Bianco</option>
                                    <option value="rosé">Rosé</option>
                                    <option value="bubbles">Spumanti</option>
                                    <option value="bubbles-rosé">Spumanti rosé</option>
                                    <option value="dessert">Vini da dessert</option>
                                    {inputData.country === 'Francia' && <option value="champagne">CHAMPAGNE</option>}
                                    {inputData.country === 'Francia' && <option value="champagne-rosé">CHAMPAGNE ROSE'</option>}
                                </select>
                            </div>
                            <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.type !== '' ? 'hidden' : ''}`}>Inserisci il genere</h4>

                            {(inputData.country === 'Italia' || inputData.country === 'Francia') && <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                                <label htmlFor="region">Regione</label>
                                <select name="region" id="region" className="w-60" onChange={handleInputData} value={inputData.region}>
                                    <option value="" disabled selected hidden></option>
                                    {inputData && inputData.country === "Italia" && <option value="Abruzzo">Abruzzo</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Alto Adige">Alto Adige</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Basilicata">Basilicata</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Calabria">Calabria</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Campania">Campania</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Emilia Romagna">Emilia Romagna</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Friuli Venezia Giulia">Friuli Venezia Giulia</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Lazio">Lazio</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Liguria">Liguria</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Lombardia">Lombardia</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Marche">Marche</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Molise">Molise</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Piemonte">Piemonte</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Puglia">Puglia</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Sardegna">Sardegna</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Sicilia">Sicilia</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Toscana">Toscana</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Trentino">Trentino</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Umbria">Umbria</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Valle d'Aosta">Valle d'Aosta</option>}
                                    {inputData && inputData.country === "Italia" && <option value="Veneto">Veneto</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type !== 'champagne' && inputData.type !== 'champagne-rosé') && <option value="Alsace">Alsace</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type !== 'champagne' && inputData.type !== 'champagne-rosé') && <option value="Bordeaux">Bordeaux</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type !== 'champagne' && inputData.type !== 'champagne-rosé') && <option value="Borgogna">Borgogna</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type !== 'champagne' && inputData.type !== 'champagne-rosé') && <option value="Cote Du Rhone">Cote Du Rhone</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type !== 'champagne' && inputData.type !== 'champagne-rosé') && <option value="Loira">Loira</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type !== 'champagne' && inputData.type !== 'champagne-rosé') && <option value="Provence">Provence</option>}

                                    {inputData && inputData.country === "Francia" && (inputData.type === 'champagne' || inputData.type === 'champagne-rosé') && <option value="Montagne de Reims">Montagne de Reims</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type === 'champagne' || inputData.type === 'champagne-rosé') && <option value="Côte des Blancs">Côte des Blancs</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type === 'champagne' || inputData.type === 'champagne-rosé') && <option value="Vallée de la Marne">Vallée de la Marne</option>}
                                    {inputData && inputData.country === "Francia" && (inputData.type === 'champagne' || inputData.type === 'champagne-rosé') && <option value="Côte Des Bar e Aube">Côte Des Bar e Aube</option>}
                                </select>
                            </div>}
                            {(inputData.country === 'italy' || inputData.country === 'france') && <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.region !== '' ? 'hidden' : ''}`}>Inserisci la regione</h4>}

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
                                <label htmlFor="volume">Volume</label>
                                <select name="volume" id="volume" className="w-60" onChange={handleInputData} value={inputData.volume} >
                                    <option value="" disabled selected hidden></option>
                                    <option value="35 CL" >35 CL</option>
                                    <option value="50 CL">50 CL</option>
                                    <option value="75 CL">75 CL</option>
                                    <option value="1,5 L">1,5 L</option>
                                    <option value="3 L">3 L</option>
                                    <option value="5 L">5 L</option>
                                </select>
                            </div>

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

                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-start items-center">
                                <i className="fi fi-rs-award text-yellow-500"></i><label htmlFor="awards">Award</label>
                                <input type="checkbox" id="award" className="w-6 h-6" onChange={handleInputData} checked={inputData.award} />
                            </div>

                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-start items-center">
                                <i class="fi fi-sr-heart text-red-500"></i><label htmlFor="favourite">Preferiti</label>
                                <input type="checkbox" id="favourite" className="w-6 h-6" onChange={handleInputData} checked={inputData.favourite} />
                            </div>

                            <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-start items-center">
                                <div className="flex gap-2 items-center mt-5">
                                    <label htmlFor="sboccatura">Sboccatura</label>
                                    <input type="checkbox" id="sboccatura" className="w-6 h-6" onChange={handleInputData} checked={inputData.sboccatura} />
                                </div>
                                {
                                    inputData.sboccatura &&
                                    <div className="flex gap-2 items-end">
                                        <label htmlFor="sboccaturaDate">Data:</label>
                                        <input type="text" id="sboccaturaDate" onChange={handleInputData} value={inputData.sboccaturaDate} />
                                    </div>
                                }
                            </div>


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

