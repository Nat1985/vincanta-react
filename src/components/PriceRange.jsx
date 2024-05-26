import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, setRangeNull } from "../redux/querySlice";
import { NoBgButton } from './buttons.jsx'

// Il range di prezzo viene calcolato da frontend
const PriceRange = () => {
    const dispatch = useDispatch();
    const { priceRange } = useSelector(state => state.query);
    const [priceInput, setPriceInput] = useState(null);
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
            to: priceInput.to
        }))
    }
    const handleRemoveRange = () => {
        dispatch(setRangeNull());
        setPriceInput(null);
    }
    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#782a76] items-center">
            <h4>Imposta un range di prezzo</h4>
            <div className="flex gap-2 items-center">
                <label htmlFor="from">Da:</label>
                <input type="number" id="from" className="w-24" onChange={handlePriceInput} value={priceInput ? priceInput.from : ''} />
                <label htmlFor="to">a:</label>
                <input type="number" id="to" className="w-24" onChange={handlePriceInput} value={priceInput ? priceInput.to : ''} />
            <NoBgButton text="Imposta" click={handleSetRange} />
            </div>
            {
                priceRange &&
                <div className="flex gap-2 border font-bold w-fit py-1 px-2">
                    <div>Range:</div>
                    <div>{priceRange.from} - {priceRange.to}</div>
                    <i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer mt-[3px]" onClick={handleRemoveRange}></i>
                </div>
            }
        </div>
    )
}

export default PriceRange;