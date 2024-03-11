import { useEffect, useState } from "react";

const SearchBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const handleInput = (event) => {
        const { value } = event.target
        setSearchInput(value)
    }
    useEffect(() => {
        console.log('searchInput: ', searchInput )
    }, [searchInput])
    return (
        <div className="fixed top-0 left-0 flex gap-2 items-center py-2 px-4 rounded bg-fuchsia-50">
            {!isActive && <div className="pt-[5px]"><i class="fi fi-br-search text-[#782a76] cursor-pointer" onClick={() => setIsActive(true)}></i></div>}
            {
                isActive &&
                <div className="flex gap-2 items-center">
                    <div className="pt-[8px]"><i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => setIsActive(false)}></i></div>
                    <h4 className="font-thin">Ricerca vino</h4>
                    <input type="text" className="rounded border" onChange={handleInput}/>
                    <div className="pt-[5px] ml-2"><i class="fi fi-br-search text-[#782a76] cursor-pointer"></i></div>
                </div>
            }
        </div>
    )
}

export default SearchBar;
