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
                        <div className="list-none text-center mx-4 text-[#782a76] leading-[50px]">
                            <Link to="/"><div className="cursor-pointer bg-[#782a76] text-white px-2 rounded" onClick={() => {handleMode('show'); setShowMenu(0)}}>Carta dei vini</div></Link>
                            <Link to="/"><div className="cursor-pointer" onClick={() => {handleMode('edit'); setShowMenu(0)}}>Gestisci prodotti</div></Link>
                        </div>
                    </div>
                ) : (
                    <i class="fi fi-sr-apps text-[#782a76] cursor-pointer text-4xl" onClick={() => setShowMenu(1)}></i>
                )
            }
        </div>
    )
}

export default Menu;