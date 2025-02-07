import { useEffect, useRef, useState } from "react"

const UploadPhotos = ({ frontLabel, backLabel, setInputData }) => {
    const frontInputRef = useRef();
    const backInputRef = useRef();
    const [uploadedFront, setUploadedFront] = useState(null);
    const [uploadedBack, setUploadedBack] = useState(null);
    const [fetchStatus, setFetchStatus] = useState({
        frontInput: 'idle',
        backInput: 'idle'
    });
    const [fetchError, setFetchError] = useState({
        frontInput: null,
        backInput: null
    })
    useEffect(() => {
        console.log('fetchStatus: ', fetchStatus);
        console.log('fetchError: ', fetchError);
    }, [fetchStatus, fetchError])
    const handleUploadImage = (event) => {
        event.preventDefault();
        const { id } = event.target;
        setFetchStatus(prevState => ({ ...prevState, [id]: 'loading' }));
        const file = event.target.files[0];
        // Controllo che non ecceda il size dell'immagine
        if (file) {
            const fileSize = file.size / (1024 * 1024); // in Mb
            if (fileSize > 9) {
                setFetchStatus(prevState => ({ ...prevState, [id]: 'tooBig' }));
                setTimeout(() => {
                    inputEmpty(id);
                    setFetchStatus(prevState => ({ ...prevState, [id]: 'idle' }));
                }, 3000)
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    id === 'frontInput' ? setUploadedFront(reader.result) : setUploadedBack(reader.result);
                    setFetchStatus(prevState => ({ ...prevState, [id]: 'uploaded' }));
                }
            }
        }
    }
    // Funzione per svuotare l'input di upload
    const inputEmpty = (id) => {
        console.log(id)
        let inputElement = document.getElementById(id);
        inputElement.value = null;
        id === 'frontInput' ? setUploadedFront(null) : setUploadedBack(null);
    }
    // Funzione per annullare l'upload
    const cancelUpload = (id) => {
        inputEmpty(id);
        setFetchStatus(prevState => ({
            ...prevState,
            [id]: 'idle'
        }))
    }
    // Invio l'immagine
    const sendImage = async (id) => {
        setFetchStatus(prevState => ({ ...prevState, [id]: 'loading' }));
        const url = `${process.env.REACT_APP_SERVER_BASE_URL}/wines/upload-image`;
        const headers = { 'Content-Type': 'application/json' };
        const image = id === 'frontInput' ? uploadedFront : uploadedBack;
        const options = { method: 'POST', headers, body: JSON.stringify({ image }) }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const error = await response.json();
                throw error
            }
            const result = await response.json();
            const inputDataField = id === 'frontInput' ? 'frontLabel' : 'backLabel';
            inputEmpty(id);
            setInputData(prevState => ({
                ...prevState,
                [inputDataField]: result.payload
            }))
            setFetchStatus(prevState => ({
                ...prevState,
                [id]: 'succeeded'
            }))
        } catch (error) {
            setFetchError(prevState => ({
                ...prevState,
                [id]: error.message || "Errore del server."
            }))
            setFetchStatus(prevState => ({
                ...prevState,
                [id]: 'failed'
            }))
        }
    }

    // Elimino etichetta
    // Gestisco l'eliminazione della foto dal server
    const [deleteFetchStatus, setDeleteFetchStatus] = useState({
        frontInput: 'idle',
        backInput: 'idle'
    });
    const [deleteError, setDeleteError] = useState({
        frontInput: null,
        backInput: null
    })
    const handleDeleteImage = async (id) => {
        setDeleteFetchStatus(prevState => ({
            ...prevState,
            [id]: 'loading'
        }));

        // mando al server l'id dell'immagine da eliminare
        const publicId = id === 'frontInput' ? frontLabel.public_id : backLabel.public_id;

        try {
            const url = `${process.env.REACT_APP_SERVER_BASE_URL}/wines/delete-image`;
            const headers = {'Content-Type': 'application/json'};
            const options = {
                method: 'DELETE',
                headers,
                body: JSON.stringify({ public_id: publicId })
            }
            const response = await fetch(url, options);
            if (response.ok) {
                const result = response.json();

                // cancello l'immagine da inputData.[id]Label
                const imageField = id === 'frontInput' ? 'frontLabel' : 'backLabel';
                setInputData(prevState => ({
                    ...prevState,
                    [imageField]: null
                }))
                setDeleteFetchStatus(prevState => ({
                    ...prevState,
                    [id]: 'succeeded'
                }));
            } else {
                const error = response.json();
                throw error
            }
        } catch (error) {
            setDeleteFetchStatus(prevState => ({
                ...prevState,
                [id]: 'failed'
            }));
            setDeleteError(prevState => ({
                ...prevState,
                [id]: error.message || "Errore da parte del server"
            }))
        }
    }

    return (
        <div className="w-full border border-[#792676] flex flex-col sm:flex-row items-center gap-4 p-4 rounded">
            {/* Etichetta frontale */}
            <div className="w-full h-full flex flex-col gap-4 items-center justify-between">
                <h4>Etichetta frontale</h4>
                {/* Nessun immagine */}
                {(fetchStatus.frontInput === 'idle' || fetchStatus.frontInput === 'succeeded') && !frontLabel && !uploadedFront && <div className="h-48 w-full rounded bg-white border text-neutral-300"></div>}
                {/* Anteprima immagine da caricare */}
                {fetchStatus.frontInput === 'uploaded' && uploadedFront && <div className="w-full flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center justify-center"><div className="text-xs">anteprima</div><img src={uploadedFront} className="w-36 opacity-60" /></div>
                    <div className="w-full flex gap-4 justify-center">
                        <button className="bg-[#792676] text-[18px] text-white" onClick={() => sendImage('frontInput')}>Conferma</button>
                        <button className="border border-[#792676] text-[18px]" onClick={() => cancelUpload('frontInput')}>Annulla</button>
                    </div>
                </div>}
                {/* Immagine caricata */}
                {(fetchStatus.frontInput === 'idle' || fetchStatus.frontInput === 'succeeded') && frontLabel && <img src={frontLabel.resizedUrl} />}
                {/* Errore fetch server */}
                {fetchStatus.frontInput === 'failed' && fetchError.frontInput && <div className="text-xs">{fetchError.frontInput}</div>}
                {/* Loading */}
                {fetchStatus.frontInput === 'loading' && <div className="h-48 flex items-center"><div className="custom-loader"></div></div>}
                {/* Input nascosto */}
                <div className="h-10 flex items-center">
                    <input ref={frontInputRef} type="file" accept="image/" id="frontInput" onChange={(e) => handleUploadImage(e)} style={{ display: 'none' }} />
                    {!frontLabel && !uploadedFront && (fetchStatus.frontInput === 'idle' || fetchStatus.frontInput === 'succeeded') && <button className="bg-white border-2 border-[#792676] text-[18px]" onClick={() => frontInputRef.current.click()}>Carica etichetta anteriore</button>}
                    {frontLabel && (deleteFetchStatus.frontInput === 'idle' || deleteFetchStatus.frontInput === 'succeeded') && <button className="bg-white border-2 border-[#792676] text-[18px]" onClick={() => handleDeleteImage('frontInput')}>Elimina etichetta</button>}
                    {frontLabel && !uploadedFront && deleteFetchStatus.frontInput === 'loading' && <div className="w-full"><div className="custom-loader"></div></div>}
                    {frontLabel && !uploadedFront && deleteFetchStatus.frontInput === 'failed' && deleteError &&  <div className="text-xs">{deleteError.frontInput}</div>}
                </div>
            </div>
            {/* Etichetta posteriore */}
            <div className="w-full h-full flex flex-col gap-4 items-center justify-between">
                <h4>Etichetta posteriore</h4>
                {/* Nessun immagine */}
                {(fetchStatus.backInput === 'idle' || fetchStatus.backInput === 'succeeded') && !backLabel && !uploadedBack && <div className="h-48 w-full rounded bg-white border text-neutral-300"></div>}
                {/* Anteprima immagine da caricare */}
                {fetchStatus.backInput === 'uploaded' && uploadedBack && <div className="w-full flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center justify-center"><div className="text-xs">anteprima</div><img src={uploadedBack} className="w-36 opacity-60" /></div>
                    <div className="w-full flex gap-4 justify-center">
                        <button className="bg-[#792676] text-[18px] text-white" onClick={() => sendImage('backInput')}>Conferma</button>
                        <button className="border border-[#792676] text-[18px]" onClick={() => cancelUpload('backInput')}>Annulla</button>
                    </div>
                </div>}
                {/* Immagine caricata */}
                {(fetchStatus.backInput === 'idle' || fetchStatus.backInput === 'succeeded') && backLabel && <img src={backLabel.resizedUrl} />}
                {/* Errore fetch server */}
                {fetchStatus.backInput === 'failed' && fetchError.backInput && <div className="text-xs">{fetchError.backInput}</div>}
                {/* Loading */}
                {fetchStatus.backInput === 'loading' && <div className="h-48 flex items-center"><div className="custom-loader"></div></div>}

                {/* Input nascosto */}
                <div className="h-10 flex items-center">
                    <input ref={backInputRef} type="file" accept="image/" id="backInput" onChange={(e) => handleUploadImage(e)} style={{ display: 'none' }} />
                    {!backLabel && !uploadedBack && (fetchStatus.backInput === 'idle' || fetchStatus.backInput === 'succeeded') && <button className="bg-white border-2 border-[#792676] text-[18px]" onClick={() => backInputRef.current.click()}>Carica etichetta posteriore</button>}
                    {backLabel && (deleteFetchStatus.backInput === 'idle' || deleteFetchStatus.backInput === 'succeeded') && <button className="bg-white border-2 border-[#792676] text-[18px]" onClick={() => handleDeleteImage('backInput')}>Elimina etichetta</button>}
                    {backLabel && !uploadedBack && deleteFetchStatus.backInput === 'loading' && <div className="w-full"><div className="custom-loader"></div></div>}
                    {backLabel && !uploadedBack && deleteFetchStatus.backInput === 'failed' && deleteError &&  <div className="text-xs">{deleteError.backInput}</div>}
                </div>
            </div>
        </div>
    )
}

export default UploadPhotos