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
        <div className={`fixed ${isActive ? 'top-2 bg-fuchsia-50 py-2 px-4 ' : 'top-1 left-1 bg-[#782a76] py-1 px-3 '} flex gap-2 items-center rounded-lg`}>
            {!isActive && <div className="pt-[5px]"><i class="fi fi-br-search  text-white cursor-pointer" onClick={() => setIsActive(true)}></i></div>}
            {
                isActive &&
                <div className="flex gap-2 items-center">
                    <div className="pt-[8px]"><i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => setIsActive(false)}></i></div>
                    <h4 className="font-thin">Ricerca vino</h4>
                    <div className="flex flex-col">
                    <input type="text" className="rounded border" onChange={handleInput}/>
                    </div>
                    <div className="pt-[5px] ml-2"><i class="fi fi-br-search text-[#782a76] cursor-pointer"></i></div>
                </div>
            }
        </div>
    )
}

export default SearchBar;
