const AddNewWine = () => {
    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8">
            <h1>Inserisci nuovo prodotto</h1>
            <div className="w-full flex flex-col gap-8 border rounded p-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <label htmlFor="country">Paese</label>
                    <select name="country" id="country" className="w-60">
                        <option value="italy">Italia</option>
                        <option value="france">Francia</option>
                    </select>
                </div>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="region">Regione</label>
                    <select name="region" id="region" className="w-60">
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

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="company">Nome azienda</label>
                    <input type="text" />
                </div>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="type">Genere</label>
                    <select name="type" id="type" className="w-60">
                        <option value="red">Rosso</option>
                        <option value="white">Bianco</option>
                        <option value="rosé">Rosé</option>
                    </select>
                </div>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="name">Nome vino</label>
                    <input type="text" />
                </div>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="year">Annata</label>
                    <input type="number" className="w-36" />
                </div>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="price">Prezzo</label>
                    <div className="flex gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="tablePrice" className="text-[#782a76] text-[14pt]">Al tavolo</label>
                            <input type="number" className="w-24" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="takeAwayPrice" className="text-[#782a76] text-[14pt]">Asporto</label>
                            <input type="number" className="w-24" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between items-center">
                    <label htmlFor="description">Descrizione</label>
                    <textarea name="description" id="description" cols="30" rows="10" placeholder="opzionale"></textarea>
                </div>

                <button className="self-center mt-8">Salva prodotto</button>

            </div>
        </div>
    )
}

export default AddNewWine;

