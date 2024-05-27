import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { selectMode } from '../redux/modeSlice';
import { getFavourites, setSearch } from '../redux/querySlice';
import { getUnlogged } from '../redux/userSlice';
import { setShow } from '../redux/menuSlice';

const Menu = () => {
    const { isLogged } = useSelector(state => state.user);
    const mode = useSelector(state => state.mode)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* const [showMenu, setShowMenu] = useState(0); */
    const { isShow } = useSelector(state => state.menu);
    useEffect(() => {
        console.log('isShow: ', isShow);
    }, [isShow])

    const handleMode = (mode) => {
        let currentScrollHeight;
        dispatch(selectMode({ mode }))
    }

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem('vincanta-token');
        dispatch(getUnlogged());
        window.location.href = "/"
    }

    return (
        <div className='fixed top-2 right-2'>
            {
                isShow ? (
                    <div className="flex flex-col gap-2 border-2 border-[#782a76] bg-white bg-opacity-90 p-2 rounded-xl">
                        <i class="fi fi-ss-circle-xmark text-end text-[#782a76] cursor-pointer" onClick={() => dispatch(setShow(false))}></i>
                        <div className="list-none mx-4 text-[#782a76] leading-[50px] flex flex-col items-end gap-2">
                            <div className="cursor-pointer bg-[#782a76] text-white px-2 rounded" onClick={() => { dispatch(getFavourites(false)); handleMode('show'); dispatch(setShow(false)); navigate("/") }}>Carta dei vini</div>
                            {/* <div className="cursor-pointer flex gap-2" onClick={() => { dispatch(getFavourites(true)); dispatch(setShow(false)) }}>Preferiti <div className='mt-[3px]'><i class="fi fi-sr-heart text-red-500"></i></div></div> */}
                            {isLogged && <div className="cursor-pointer" onClick={() => { handleMode('edit'); dispatch(setShow(false)); navigate("/") }}>Gestisci prodotti</div>}
                            {isLogged && <div className="cursor-pointer px-3 border rounded w-fit" onClick={() => { handleLogout(); dispatch(setShow(false)) }}>Logout</div>}
                            {!isLogged && <div className="cursor-pointer px-3 border rounded w-fit" onClick={() => { dispatch(setShow(false)); navigate("/login") }}>Login</div>}
                        </div>
                    </div>
                ) : (
                    <div>
                        {isLogged && <i className="fi fi-sr-apps text-[#782a76] cursor-pointer text-4xl" onClick={() => dispatch(setShow(true))}></i>}
                        {!isLogged && <i className="fi fi-rr-apps text-[#782a76] cursor-pointer text-4xl" onClick={() => dispatch(setShow(true))}></i>}
                    </div>
                )
            }
        </div>
    )
}

export default Menu;