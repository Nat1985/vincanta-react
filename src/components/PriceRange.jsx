import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, setRangeNull } from "../redux/querySlice";
import { NoBgButton } from './buttons.jsx'

// Il range di prezzo viene calcolato da frontend
const PriceRange = ({ setUniqueCountries, setUniqueRegions }) => {
    const dispatch = useDispatch();
    const { priceRange } = useSelector(state => state.query);
    const [priceInput, setPriceInput] = useState(null);
    const [option, setOption] = useState('Tavolo')
    const handleSetOption = (event) => {
        const { value } = event.target;
        setOption(value)
    }
    const handlePriceInput = (event) => {
        const { id, value } = event.target;
        setPriceInput(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSetRange = () => {
        dispatch(setPriceRange({
            from: priceInput.from,
            to: priceInput.to,
            option: option
        }))
        setOption('Tavolo');
        setUniqueCountries([]);
        setUniqueRegions([]);
    }
    const handleRemoveRange = () => {
        dispatch(setRangeNull());
        setPriceInput(null);
        setUniqueCountries([]);
        setUniqueRegions([]);
    }
    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#782a76] items-center">
            <h5>Intervallo di prezzo</h5>
            {
                !priceRange &&
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="from">Da:</label>
                        <input type="number" id="from" className="w-24" onChange={handlePriceInput} value={priceInput ? priceInput.from : ''} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="to">a:</label>
                        <input type="number" id="to" className="w-24" onChange={handlePriceInput} value={priceInput ? priceInput.to : ''} />
                    </div>
                    <div className="flex flex-col pl-2 md:border-l-2">
                        <select name="option" id="option" onChange={handleSetOption}>
                            <option value="Tavolo">Tavolo</option>
                            <option value="Asporto">Asporto</option>
                        </select>
                    </div>
                    {priceInput && option && <div className="text-sm"><NoBgButton text="Imposta" click={handleSetRange} /></div>}
                </div>
            }
            {
                priceRange &&
                <div className="flex gap-2 border font-bold w-fit py-1 px-2">
                    <div>Range:</div>
                    <div>{priceRange.from ? priceRange.from : 0}€ - {priceRange.to ? priceRange.to : 0}€</div>
                    <div>- {priceRange.option}</div>
                    <i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer mt-[3px]" onClick={handleRemoveRange}></i>
                </div>
            }
        </div>
    )
}

export default PriceRange;