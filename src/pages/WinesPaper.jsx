import { useEffect, useRef, useState } from "react";
import FetchLoader from "../components/FetchLoader.jsx";
import CompanyCard from "../components/CompanyCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import wineSelection from '../static/images/wine_selection.png'
import TypeBar from "../components/TypeBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { getFavourites, setSearch } from "../redux/querySlice.js";
import PriceRange from "../components/PriceRange.jsx";
import VolumeRange from "../components/VolumeRange.jsx";

const WinesPaper = () => {

    const dispatch = useDispatch();
    // Check for login
    const { isLogged } = useSelector(state => state.user);
    // Check mode and type
    const mode = useSelector(state => state.mode);
    const { type, search, favourites, priceRange, volumeRange } = useSelector(state => state.query);
    // Wine data fetch
    const [winesData, setWinesData] = useState(null);
    useEffect(() => {
        console.log('winesData: ', winesData)
    }, [winesData])
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const winesDataFetch = async () => {
        setFetchStatus('loading');
        const extendedUrl = type || search || favourites || '';
        const label = type ? 'type' : (search ? 'search' : (favourites ? 'favourites' : ''));
        const rangeFrom = priceRange ? priceRange.from : '';
        const rangeTo = priceRange ? priceRange.to : '';
        const option = priceRange ? priceRange.option : '';
        const volume = volumeRange ? volumeRange : '';
        try {
            const url = `${process.env.REACT_APP_SERVER_BASE_URL}/wines/get-all-wines?${label}=${extendedUrl}&from=${rangeFrom}&to=${rangeTo}&option=${option}&volume=${volume}`
            console.log('url: ', url)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setWinesData(data.payload);
                setFetchStatus('succeeded');
            } else {
                const error = await response.json();
                setFetchStatus('failed');
                setError(error)
            }
        } catch (error) {
            setFetchStatus('failed');
            setError(error)
        }
    }
    useEffect(() => {
        winesDataFetch();
    }, [type, search, favourites, priceRange, volumeRange])

    // Handle NATION and REGION for scroll button
    const [uniqueContries, setUniqueCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [uniqueRegions, setUniqueRegions] = useState([]);
    useEffect(() => {
        if (winesData) {
            // Imposto nazioni
            let countries = [];
            let isChampagne;
            winesData.map(element => {
                if (element.country !== 'Champagne') {
                    countries.push(element.country)
                } else {
                    isChampagne = true;
                }
            });
            if (isChampagne) countries.push('Champagne');
            setUniqueCountries(countries);
        }
    }, [winesData])

    // Imposto regioni dopo che è selezionato country
    useEffect(() => {
        if (selectedCountry) {
            if (selectedCountry === 'Italia' || selectedCountry === 'Francia' || selectedCountry === 'Champagne') {
                // Se selezionate Italia, Francia o Champagne
                let countryData = winesData.filter(element => element.country === selectedCountry);
                let regionsData = countryData[0].data;
                let regions = regionsData.map(element => { return element.region });
                setUniqueRegions(regions);
            } else {
                scrollToRegion(selectedCountry);
            }
        }
    }, [selectedCountry])

    const scrollToRegion = (region) => { // agisce sia su nazioni che su regioni
        const regionRef = document.getElementById(region);
        if (regionRef) {
            regionRef.scrollIntoView({ behavior: 'smooth' })
            // dopo 1 secondo dallo scroll, azzero selectedCountry e uniqueRegions
            setTimeout(() => {
                setSelectedCountry(null);
                setUniqueRegions([]);
            }, 1000)
        }
    }

    // Init scroll (if user come from edit mode) - this start when last state update is finish

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const scroll = params.get('scroll');

    useEffect(() => {
        const targetElement = document.getElementById(scroll);
        if (winesData && targetElement) {
            const scrollYOffset = -300;
            const scrollY = targetElement.getBoundingClientRect().top + window.pageYOffset + scrollYOffset;
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }
    }, [uniqueRegions, winesData])

    //Debug
    useEffect(() => {
        console.log('winesData: ', winesData)
    }, [winesData])

    // counter vini
    const [wineCounter, setWineCounter] = useState(null);
    const requestCounter = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/wines/count-wines`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const result = await response.json();
                setWineCounter(result.payload);
            } else {
                const error = await response.json();
                console.log('count fetch error: ', error)
            }
        } catch (error) {
            console.log('count catch error: ', error)
        }
    }
    useEffect(() => {
        requestCounter();
    }, [])
    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8 w-full px-4">
            {mode.mode === 'edit' && <h2>Gestisci prodotti</h2>}
            {mode.mode === 'show' && <img src={wineSelection} />}

            {/* Search Bar */}
            <SearchBar />

            {/* Type select */}
            {!search && !favourites && <TypeBar />}

            {/* Search input */}
            {search &&
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2 justify-center border-2 border-[#782a76] rounded pb-1 pt-2 px-2">
                        <div className="mt-[8px]"><i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => dispatch(setSearch(''))}></i></div>
                        <div className="font-thin text-4xl">{search}</div>
                    </div>
                </div>
            }

            {/* Favourites */}
            {
                favourites &&
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2 justify-center border-2 border-[#782a76] rounded pb-1 pt-2 px-2">
                        <div className="mt-[8px]"><i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => dispatch(getFavourites(false))}></i></div>
                        <div className="font-thin text-4xl">Preferiti </div>
                    </div>
                </div>
            }

            {/* Seleziona priceRange */}
            <PriceRange setUniqueCountries={setUniqueCountries} setUniqueRegions={setUniqueRegions} />

            {/* Seleziona volumeRange */}
            <VolumeRange />

            {/* Selezione NAZIONI */}
            <div className="flex flex-col gap2">
                <h2 className="font-thin">Nazione:</h2>
                <select name="regions" id="regions" onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry ? selectedCountry : ''}>
                    <option value=""></option>
                    {
                        uniqueContries.map((element, index) => (
                            <option key={index} value={element}>{element}</option>
                        ))
                    }
                </select>
            </div>
            {/* Selezione REGIONI */}
            {
                (selectedCountry === 'Italia' || selectedCountry === 'Francia' || selectedCountry === 'Champagne') &&
                <div className="flex flex-col gap2">
                    <h2 className="font-thin">Regione:</h2>
                    <select name="regions" id="regions" onChange={(e) => scrollToRegion(e.target.value)}>
                        <option value=""></option>
                        {
                            uniqueRegions.map((element, index) => (
                                <option key={index} value={element}>{element}</option>
                            ))
                        }
                    </select>
                </div>}

            {
                isLogged && // && mode.mode === 'edit' togliere il tasto da carta vini
                <div className="flex flex-col gap-2">
                    <Link to="/add-new-product"><div className="flex items-center gap-2 border border-[#782a76] px-3 py-2 rounded cursor-pointer">
                        <i class="fi fi-rr-add text-[#782a76] text-4xl mt-[5px]"></i>
                        Aggiungi prodotto
                    </div></Link>
                    {wineCounter && <div className="text-sm">(<span className="text-[#782a76] font-bold">{wineCounter}</span> vini totali)</div>}
                </div>

            }
            <div className="flex flex-col items-center gap-8 border rounded-xl p-8 w-full max-w-[900px]">
                {fetchStatus === 'loading' && <FetchLoader />}
                {fetchStatus === 'failed' && <h3>Qualcosa è andato storto, ricarica la pagina.</h3>}
                {
                    fetchStatus === 'succeeded' &&
                    winesData &&
                    winesData.map((element, index) => (
                        <div key={index} className="w-full p-2 border-1 border-red flex flex-col gap-4 items-center" id={element.country}>
                            {index !== 0 && <hr className="w-full" />}
                            <h1>{element.country}</h1>
                            {
                                element.data.map((region, regionIndex) => (
                                    <div key={regionIndex} className="w-full flex flex-col gap-2 items-center" id={region.region}>
                                        <h2>{region.region}</h2>
                                        {
                                            region.data.map((company, companyIndex) => (

                                                <CompanyCard key={companyIndex} data={company} />
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default WinesPaper;