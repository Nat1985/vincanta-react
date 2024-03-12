import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/querySlice.js";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const handleInput = (event) => {
        const { value } = event.target
        setSearchInput(value)
    }
    useEffect(() => {
        console.log('searchInput: ', searchInput)
    }, [searchInput])
    const sendSearch = () => {
        dispatch(setSearch(searchInput))
    }

    // check search in Redux
    const { search } = useSelector(state => state.query);
    useEffect(() => {
        search && setIsActive(false)
    }, [search])
    return (
        <div className={`fixed top-1 left-1 ${isActive ? 'border-2 border-[#782a76] bg-white bg-opacity-90 py-1 px-3' : 'bg-[#782a76] py-1 px-3 '} flex gap-2 items-center rounded-lg`}>
            {!isActive && <div className="pt-[5px]"><i class="fi fi-br-search  text-white cursor-pointer" onClick={() => setIsActive(true)}></i></div>}
            {
                isActive &&
                <div className="flex gap-2 items-center">
                    <div className="pt-[8px]"><i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => setIsActive(false)}></i></div>
                    <input type="text" className="rounded border h-10 w-48" onChange={handleInput} />
                    <div className="pt-[5px] ml-2"><i class="fi fi-br-search text-[#782a76] cursor-pointer" onClick={sendSearch}></i></div>
                </div>
            }
        </div>
    )
}

export default SearchBar;
