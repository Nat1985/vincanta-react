import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/buttons.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { sendLogin } from '../redux/userSlice.js';
import { useEffect, useState } from 'react';
import FetchLoader from '../components/FetchLoader.jsx';

const LoginPage = () => {
    const { fetchStatus, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState({
        email: null,
        password: null
    });
    const handleInputData = (event) => {
        const { id, value } = event.target;
        setInputData(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const sendData = () => {
        dispatch(sendLogin(inputData))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (fetchStatus === 'succeeded') {
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }
    }, [fetchStatus])
    return (
        <div className="flex w-full h-screen justify-center">
            <div className="mt-32 h-fit w-full md:w-[500px] flex flex-col gap-8 md:border-2 md:border-[#782a76] bg-white bg-opacity-90 p-8 rounded-xl">
                <h2>Esegui il login</h2>
                {
                    (fetchStatus === 'idle' || fetchStatus === 'failed') &&
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" onChange={handleInputData} value={inputData.email} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" onChange={handleInputData} value={inputData.password} />
                        </div>
                        <Link to="/reset-password"><h5 className='text-[#782a76] underline self-end'>Reimposta password</h5></Link>
                    </div>
                }
                {fetchStatus === 'loading' && <FetchLoader />}
                {fetchStatus === 'failed' && <h5 className='p-2 border rounded border-red-500'>{'errore: ' + error.message}</h5>}
                {(fetchStatus === 'idle' || fetchStatus === 'failed') && <PrimaryButton text="Accedi" click={(sendData)} />}
                {fetchStatus === 'succeeded' && <h3>Login effettuato con successo! Attendi il refresh della pagina.</h3>}
            </div>
        </div>
    )
}

export default LoginPage;