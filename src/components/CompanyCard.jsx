import { useEffect, useState } from "react";
import WineLine from "./WineLine";
import { useSelector } from "react-redux";
import CatLabel from "./CatLabel.jsx";

const CompanyCard = ({ data }) => {
    const { priceRange } = useSelector(state => state.query);

    // Imposto la categoria champagne se presente nel WineLine (prendendo soltanto il primo)
    const [champagneCategory, setChampagneCategory] = useState(null);
    useEffect(() => {
        if(data) {
            // Catturo la champagneCategory solo del primo
            for(let wine of data.data) {
                if(wine.champagneCategory) {
                    setChampagneCategory(wine.champagneCategory);
                    break;
                }
            }
        }
    }, [data])
    return (
        <div className="w-[320px] md:w-full flex flex-col gap-2 p-4 border-2 rounded">

            {/* Azienda e paese */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 text-start border-b">
                <div className="flex items-center"><h3>{data.company}</h3></div>
                <div className="flex items-center italic"><span className="hidden md:block">-</span><h4 className="ml-2">{data.data[0].city}</h4></div>
                {champagneCategory && <CatLabel cat={champagneCategory} />}
            </div>

            {/* Elenco vini */}
            <div className="w-full flex flex-col">
                <div className="w-full hidden md:flex gap-4 justify-end text-xs text-red-500">
                    {/* <div>q.tà</div> */}
                    <div className="w-[60px]">annata</div>
                    <div className="w-[60px]">
                        <div>tavolo e</div>
                        <div>aperitivo</div>
                    </div>
                    <div className="w-[60px]">asporto</div>
                </div>
                {
                    data && data.data && data.data.map((wine, index) => (
                        <WineLine key={index} wineData={wine} />
                    ))
                }
            </div>

        </div>
    )
}

export default CompanyCard;