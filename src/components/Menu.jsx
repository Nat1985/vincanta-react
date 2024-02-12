import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { selectMode } from '../redux/modeSlice';

const Menu = () => {
    const mode = useSelector(state => state.mode)
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(0);
    const handleMode = (mode) => {
        dispatch(selectMode(mode))
    }
    return (
        <div className='fixed top-2 right-2'>
            {
                showMenu ? (
                    <div className="flex flex-col gap-2 border-2 border-[#782a76] bg-white p-2 rounded-xl">
                        <i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => setShowMenu(0)}></i>
                        <ul className="list-none text-end mx-4 text-[#782a76] leading-[50px]">
                            <Link to="/"><li className="cursor-pointer bg-[#782a76] text-white px-2 rounded" onClick={() => {handleMode('show'); setShowMenu(0)}}>Carta dei vini</li></Link>
                            <Link to="/"><li className="cursor-pointer" onClick={() => {handleMode('edit'); setShowMenu(0)}}>Modifica</li></Link>
                            <Link to="add-new-product"><li className="cursor-pointer" onClick={() => setShowMenu(0)}>Aggiungi</li></Link>
                        </ul>
                    </div>
                ) : (
                    <i class="fi fi-sr-apps text-[#782a76] cursor-pointer text-4xl" onClick={() => setShowMenu(1)}></i>
                )
            }
        </div>
    )
}

export default Menu;