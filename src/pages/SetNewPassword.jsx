import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/buttons";
import { useState } from "react";
import FetchLoader from "../components/FetchLoader";

const SetNewPassword = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get('email');
    const token = queryParams.get('token');
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const sendNewPassword = async () => {
        setFetchStatus('loading');
        const url = `${process.env.REACT_APP_SERVER_BASE_URL}/users/set-new-password`;
        const headers = {
            'Content-Type': 'application/json',
        };
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify({ email, token, newPassword: inputData })
        };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const result = await response.json();
                console.log('setNewPassword result: ', result);
                setFetchStatus('succeeded');
                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000)
            } else {
                const error = await response.jspon();
                console.log('setNewPassword error: ', error);
                setError(error);
                setFetchStatus('failed');
            }
        } catch (error) {
            console.error('setNewPassword error: ', error);
            setError(error);
            setFetchStatus('failed');
        }
    }

    const [inputData, setInputData] = useState(null);
    const handleInputData = (event) => {
        const { value } = event.target;
        setInputData(value);
    }
    return (
        <div className="flex w-full h-screen justify-center">
            <div className="mt-32 h-fit w-full md:w-[800px] flex flex-col gap-8 md:border-2 md:border-[#782a76] bg-white bg-opacity-90 p-8 rounded-xl">
                <h3>Scrivi la nuova password</h3>
                {
                    fetchStatus === 'idle' &&
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col">
                            <label htmlFor="email">Nuova password</label>
                            <input type="password" onChange={handleInputData} value={inputData} />
                        </div>
                        <div><PrimaryButton text="Imposta nuova password" click={sendNewPassword} /></div>
                    </div>
                }
                {
                    fetchStatus === 'succeeded' &&
                    <h4 className="text-[#782a76]">Reset della password completato. Attendi il refresh della pagina.</h4>
                }
                {
                    fetchStatus === 'failed' &&
                    <div className="flex flex-col gap-4">
                        <h5 className='p-2 border rounded border-red-500'>{'errore: ' + error.message}</h5>
                        <div><PrimaryButton text="Riprova" click={() => setFetchStatus('idle')} /></div>
                    </div>
                }
                {
                    fetchStatus === 'loading' &&
                    <FetchLoader />
                }
            </div>
        </div>
    )
}

export default SetNewPassword;