import { useEffect, useState } from "react";
import FetchLoader from "../components/FetchLoader.jsx";
import CompanyCard from "../components/CompanyCard.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import wineSelection from '../static/images/wine_selection.png'

const WinesPaper = () => {
    // Wine data fetch
    const [winesData, setWinesData] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const winesDataFetch = async () => {
        setFetchStatus('loading');
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/wines/get-all-wines`, {
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
    }, [])

    // Check mode
    const mode = useSelector(state => state.mode)

    // Handle region for scroll button
    const [uniqueRegions, setUniqueRegions] = useState([]);
    useEffect(() => {
        if (winesData) {
            const regions = Array.from(new Set(winesData.map(element => element.region)));
            setUniqueRegions(regions);
        }
    }, [winesData])
    const scrollToRegion = (region) => {
        const regionRef = document.getElementById(region);
        if (regionRef) {
            regionRef.scrollIntoView({ behavior: 'smooth' })
        }
    }

    //Debug
    useEffect(() => {
        console.log('winesData: ', winesData)
    }, [winesData])
    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8 w-full px-4">
            {mode.mode === 'edit' && <h2>Gestisci prodotti</h2>}
            {mode.mode === 'show' && <img src={wineSelection} />}

                {/* Region buttons */}
                <div className="flex gap-2 flex-wrap justify-center">
                    {
                        uniqueRegions.map(element => (
                            <div className="py-1 px-2 bg-fuchsia-50 rounded font-thin cursor-pointer" onClick={() => scrollToRegion(element)}>{element}</div>
                        ))
                    }
                </div>

            {
                mode.mode === 'edit' &&
                <Link to="/add-new-product"><div className="flex items-center gap-2 border border-[#782a76] px-3 py-2 rounded cursor-pointer">
                    <i class="fi fi-rr-add text-[#782a76] text-4xl mt-[5px]"></i>
                    Aggiungi prodotto
                </div></Link>
            }
            <div className="flex flex-col items-center gap-8 border rounded-xl p-8 w-full max-w-[900px]">
                {fetchStatus === 'loading' && <FetchLoader />}
                {fetchStatus === 'failed' && <h3>Qualcosa è andato storto, ricaria la pagina.</h3>}
                {
                    fetchStatus === 'succeeded' &&
                    winesData &&
                    winesData.map((element, index) => (
                        <div key={index} className="w-full flex flex-col gap-2 items-center" id={element.region}>
                            <h2>{element.region}</h2>
                            {
                                element.data.map((company, companyIndex) => (
                                    <CompanyCard key={companyIndex} data={company} />
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