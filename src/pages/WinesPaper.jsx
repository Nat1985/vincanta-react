import { useEffect, useRef, useState } from "react";
import FetchLoader from "../components/FetchLoader.jsx";
import CompanyCard from "../components/CompanyCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import wineSelection from '../static/images/wine_selection.png'
import TypeBar from "../components/TypeBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { getFavourites, setSearch } from "../redux/querySlice.js";

const WinesPaper = () => {

    const dispatch = useDispatch();
    // Check mode and type
    const mode = useSelector(state => state.mode);
    const { type, search, favourites } = useSelector(state => state.query);

    // Wine data fetch
    const [winesData, setWinesData] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const winesDataFetch = async () => {
        setFetchStatus('loading');
        const extendedUrl = type || search || favourites || '';
        const label = type ? 'type' : (search ? 'search' : (favourites ? 'favourites' : ''))
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/wines/get-all-wines?${label}=${extendedUrl}`, {
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
    }, [type, search, favourites])

    // Handle region for scroll button
    const [uniqueRegions, setUniqueRegions] = useState([]);
    useEffect(() => {
        const extractRegions = (data) => {
            return data.flatMap((element => {
                if (element.data) {
                    return element.region ? [element.region, ...extractRegions(element.data)] : extractRegions(element.data);
                }
                return element.region ? [element.region] : [];
            }))
        }
        if (winesData) {
            const regions = Array.from(new Set(winesData.flatMap(element => extractRegions(element.data))));
            setUniqueRegions(regions);
        }
    }, [winesData])
    const scrollToRegion = (region) => {
        const regionRef = document.getElementById(region);
        if (regionRef) {
            regionRef.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Init scroll (if user come from edit mode) - this start when last state update is finish

        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const scroll = params.get('scroll');
        const idTargetRef = useRef();
    
    useEffect(() => {
        const targetElement = document.getElementById(scroll);
        if (targetElement) {
            const scrollYOffset = -300;
            const scrollY = targetElement.getBoundingClientRect().top + window.pageYOffset + scrollYOffset;
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }
    }, [uniqueRegions])

    //Debug
    useEffect(() => {
        console.log('winesData: ', winesData)
    }, [winesData])
    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8 w-full px-4">
            {mode.mode === 'edit' && <h2>Gestisci prodotti</h2>}
            {mode.mode === 'show' && <img src={wineSelection} />}

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

            {/* Region buttons */}
            <div className="flex flex-col gap-2 items-center">
                <h2 className="font-thin">Regioni:</h2>
                <div className="flex flex-wrap gap-2 justify-center">
                    {
                        uniqueRegions.map(element => (
                            <div className="py-1 px-2 bg-fuchsia-50 rounded font-thin cursor-pointer" onClick={() => scrollToRegion(element)}>{element}</div>
                        ))
                    }
                </div>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {
                mode.mode === 'edit' &&
                <Link to="/add-new-product"><div className="flex items-center gap-2 border border-[#782a76] px-3 py-2 rounded cursor-pointer">
                    <i class="fi fi-rr-add text-[#782a76] text-4xl mt-[5px]"></i>
                    Aggiungi prodotto
                </div></Link>
            }
            <div className="flex flex-col items-center gap-8 border rounded-xl p-8 w-full max-w-[900px]">
                {fetchStatus === 'loading' && <FetchLoader />}
                {fetchStatus === 'failed' && <h3>Qualcosa è andato storto, ricarica la pagina.</h3>}
                {
                    fetchStatus === 'succeeded' &&
                    winesData &&
                    winesData.map((element, index) => (
                        <div className="w-full p-2 border-1 border-red flex flex-col gap-4 items-center">
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