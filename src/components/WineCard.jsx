import WineLine from "./WineLine";

const WineCard = () => {
    return (
        <div className="w-[320px] md:w-full flex flex-col gap-2 p-4">

            {/* Azienda e paese */}
            <div className="flex flex-col md:flex-row gap-2 text-start">
                <div className=""><h4>Tenuta Perano - Frescobaldi</h4></div>
                <div className=" flex items-center"><span className="hidden md:block">-</span><h4 className="ml-2">Castiglione della Patagonia</h4></div>
            </div>

            {/* Elenco vini */}
            <div className="w-full flex flex-col">
                <WineLine />
                <WineLine />
                <WineLine />
                <WineLine />
                <WineLine />
            </div>

        </div>
    )
}

export default WineCard;