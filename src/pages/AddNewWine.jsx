import { useEffect, useState } from "react";

const AddNewWine = () => {

    // Handle input data
    const [inputData, setInputData] = useState({
        country: '',
        region: '',
        company: '',
        type: '',
        name: '',
        year: null,
        tablePrice: null,
        takeAwayPrice: null,
        description: '',
    })

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
    const sendFetch = () => {
        setInputError(false);
        if (
            inputData.country === '' ||
            inputData.region === '' ||
            inputData.company === '' ||
            inputData.type === '' ||
            inputData.name === '' ||
            inputData.year === null ||
            inputData.tablePrice === null ||
            inputData.tablePrice === '' ||
            inputData.takeAwayPrice === null ||
            inputData.takeAwayPrice === ''
        ) {
            setInputError(true)
        } else {
            try {
                setFetchStatus('succeeded');
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000)
            } catch (error) {
                setFetchStatus('failed')
            }
        }
    }
    useEffect(() => {
        console.log('inputData: ', inputData);
        console.log('inputError: ', inputError);
    }, [inputData, inputError])
    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8">
            <h1>Inserisci nuovo prodotto</h1>
            <div className="w-full flex flex-col gap-8 border rounded p-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <label htmlFor="country">Paese</label>
                    <select name="country" id="country" className="w-60" onChange={handleInputData}>
                        <option value="" disabled selected hidden></option>
                        <option value="italy">Italia</option>
                        <option value="france">Francia</option>
                    </select>
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.country !== '' ? 'hidden' : ''}`}>Inserisci il paese</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="region">Regione</label>
                    <select name="region" id="region" className="w-60" onChange={handleInputData}>
                        <option value="" disabled selected hidden></option>
                        <option value="abruzzo">Abruzzo</option>
                        <option value="basilicata">Basilicata</option>
                        <option value="calabria">Calabria</option>
                        <option value="campania">Campania</option>
                        <option value="emilia-romagna">Emilia Romagna</option>
                        <option value="friuli-venezia-giulia">Friuli Venezia Giulia</option>
                        <option value="lazio">Lazio</option>
                        <option value="liguria">Liguria</option>
                        <option value="lombardia">Lombardia</option>
                        <option value="lazio">Lazio</option>
                        <option value="molise">Molise</option>
                        <option value="piemonte">Piemonte</option>
                        <option value="puglia">Puglia</option>
                        <option value="sardegna">Sardegna</option>
                        <option value="sicilia">Sicilia</option>
                        <option value="toscana">Toscana</option>
                        <option value="trentino-alto-adige">Trentino Alto Adige</option>
                        <option value="umbria">Umbria</option>
                        <option value="val-d-aosta">Val d'Aosta</option>
                        <option value="veneto">Veneto</option>
                    </select>
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.region !== '' ? 'hidden' : ''}`}>Inserisci la regione</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="company">Nome azienda</label>
                    <input type="text" id="company" onChange={handleInputData} />
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.company !== '' ? 'hidden' : ''}`}>Inserisci il nome dell'azienda</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="type">Genere</label>
                    <select name="type" id="type" className="w-60" onChange={handleInputData}>
                        <option value="" disabled selected hidden></option>
                        <option value="red">Rosso</option>
                        <option value="white">Bianco</option>
                        <option value="rosé">Rosé</option>
                    </select>
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.type !== '' ? 'hidden' : ''}`}>Inserisci il genere</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="name">Nome vino</label>
                    <input type="text" id="name" onChange={handleInputData} />
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.name !== '' ? 'hidden' : ''}`}>Inserisci il nome del vino</h4>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="year">Annata</label>
                    <input type="number" id="year" className="w-36" onChange={handleInputData} />
                </div>
                <h4 className={`self-end mt-[-30px] text-sm text-red-400 ${!inputError || inputData.year ? 'hidden' : ''}`}>Inserisci l'annata</h4>

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

                {inputError && <h4 className="mt-8">Dati mancanti, ricontrolla e riprova.</h4>}
                {!inputError && fetchStatus === 'succeeded' && <h4 className="mt-8">Prodotto salvato correttamente.</h4>}
                {fetchStatus === 'idle' && <button className="self-center" onClick={sendFetch}>Salva prodotto</button>}

            </div>
        </div>
    )
}

export default AddNewWine;

