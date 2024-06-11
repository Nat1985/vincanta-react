import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, setRangeNull, setVolumeNull, setVolumeRange } from "../redux/querySlice.js";
import { NoBgButton } from './buttons.jsx'

const VolumeRange = () => {
    const dispatch = useDispatch();
    const [volumeInput, setVolumeInput] = useState(null);
    const handleVolumeInput = (event) => {
        const { id, value } = event.target;
        let fixedValue = value === 'Tutte' ? null : value;
        setVolumeInput(fixedValue);
    }
    useEffect(() => {
        if(volumeInput) {
            dispatch(setVolumeRange(volumeInput))
        } else {
            dispatch(setVolumeNull())
        }
    }, [volumeInput])
    return (
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#782a76] items-center">
            <h5>Volume bottiglie</h5>
            {
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex flex-col pl-2">
                        <select name="volumeRange" id="volumeRange" onChange={handleVolumeInput}>
                            <option value="Tutte">Tutte</option>
                            <option value="35 CL">35 CL</option>
                            <option value="50 CL">50 CL</option>
                            <option value="75 CL">75 CL</option>
                            <option value="1,5 L">1,5 L</option>
                            <option value="3 L">3 L</option>
                            <option value="5 L">5 L</option>
                        </select>
                    </div>
                </div>
            }
        </div>
    )
}

export default VolumeRange;