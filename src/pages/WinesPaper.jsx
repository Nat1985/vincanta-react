import { useEffect, useState } from "react";
import FetchLoader from "../components/FetchLoader.jsx";
import CompanyCard from "../components/CompanyCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import wineSelection from '../static/images/wine_selection.png'
import TypeBar from "../components/TypeBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { setSearch } from "../redux/querySlice.js";

const WinesPaper = () => {
    const dispatch = useDispatch();
    // Check mode and type
    const mode = useSelector(state => state.mode);
    const { type, search } = useSelector(state => state.query);

    // Wine data fetch
    const [winesData, setWinesData] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const winesDataFetch = async () => {
        setFetchStatus('loading');
        console.log('type in fetch: ', type);
        console.log('search in fetch: ', search);
        const extendedUrl = type || search || '';
        console.log('extendedUrl: ', extendedUrl);
        const label = type ? 'type' : (search ? 'search' : '')
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
    }, [type, search])

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
    // Debug
    useEffect(() => {
        console.log('uniqueRegions: ', uniqueRegions)
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
            {!search && <TypeBar />}

            {/* Search input */}
            {search && <div className="flex flex-col gap-2 items-center">
                <h2 className="font-thin">Parola ricercata:</h2>
                <div className="flex gap-2 justify-center border-2 border-[#782a76] rounded pb-1 pt-2 px-2">
                    <div className="pt-[5px]"><i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => dispatch(setSearch(''))}></i></div>
                    <div className="font-thin">{search}</div>
                </div>
            </div>}

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