import { useEffect } from "react";
import WineLine from "./WineLine";

const CompanyCard = ({ data }) => {
    return (
        <div className="w-[320px] md:w-full flex flex-col gap-2 p-4 border border-neutral-300 rounded">

            {/* Azienda e paese */}
            <div className="flex flex-col md:flex-row gap-2 text-start border-b">
                <div className="flex items-center"><h3>{data.company}</h3></div>
                <div className="flex items-center italic"><span className="hidden md:block">-</span><h4 className="ml-2">{data.data[0].city}</h4></div>
            </div>

            {/* Elenco vini */}
            <div className="w-full flex flex-col">
                <div className="w-full hidden md:flex gap-4 justify-end text-xs text-red-500">
                    {/* <div>q.tà</div> */}
                    <div className="w-[60px]">annata</div>
                    <div className="w-[60px]">
                        <div>tavolo</div>
                        <div>aperitivo</div>
                    </div>
                    <div className="w-[60px]">asporto</div>
                </div>
                {
                    data && data.data && data.data.map((wine, index) => (
                        <WineLine wineData={wine} />
                    ))
                }
            </div>

        </div>
    )
}

export default CompanyCard;