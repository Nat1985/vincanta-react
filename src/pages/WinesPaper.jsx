import { useEffect, useState } from "react";
import FetchLoader from "../components/FetchLoader";
import WineCard from "../components/WineCard";

const WinesPaper = () => {
    const [winesData, setWinesData] = useState(null);
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const winesDataFetch = () => {
        //
    }
    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8 w-full px-4">
            <h2>Carta dei vini</h2>
            <div className="flex flex-col items-center gap-8 border rounded-xl p-8 w-full max-w-[900px]">
                <WineCard />
                <WineCard />
                <WineCard />
                {fetchStatus === 'loading' && <FetchLoader />}
            </div>
        </div>
    )
}

export default WinesPaper;