import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/buttons";
import { useEffect, useState } from "react";
import FetchLoader from "../components/FetchLoader";

const PasswordReset = () => {
    const [inputData, setInputData] = useState(null);
    const handleInputData = (event) => {
        const { value } = event.target;
        setInputData(value);
    }
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const sendEmail = async () => {
        setFetchStatus('loading');
        const url = `${process.env.REACT_APP_SERVER_BASE_URL}/users/reset-password-request`;
        const headers = {
            'Content-Type': 'application/json'
        },
            options = {
                method: 'POST',
                headers,
                body: JSON.stringify({ email: inputData })
            }
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const result = await response.json();
                console.log('sendEmail result: ', result);
                setFetchStatus('succeeded');
            } else {
                const error = await response.json();
                console.log('sendEmail error: ', error);
                setError(error);
                setFetchStatus('failed');
            }
        } catch (error) {
            console.log('sendEmail Catch error: ', error);
            setError(error);
            setFetchStatus('failed');
        }
    }
    return (
        <div className="flex w-full h-screen justify-center">
            <div className="mt-32 h-fit w-full md:w-[800px] flex flex-col gap-8 md:border-2 md:border-[#782a76] bg-white bg-opacity-90 p-8 rounded-xl">
                <h3>Reimposta la password</h3>
                {
                    fetchStatus === 'idle' &&
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col">
                            <label htmlFor="email">Inserisci la tua email</label>
                            <input type="text" onChange={handleInputData} value={inputData} />
                        </div>
                        <p className="text-[#782a76] text-lg">Ti verrà inviato un link per impostare una nuova password</p>
                        <div><PrimaryButton text="Mandami l'email" click={sendEmail} /></div>
                    </div>
                }
                {
                    fetchStatus === 'succeeded' &&
                    <h4 className="text-[#782a76]">Se l'indirizzo email è corretto, ti è stata inviata un'email con le istruzioni per il reset della password</h4>
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

export default PasswordReset;