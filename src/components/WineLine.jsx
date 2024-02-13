import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DangerButton, GreenButton, PrimaryButton, SecondaryButton } from "./buttons";
import FetchLoader from "./FetchLoader";

const WineLine = ({ wineData }) => {
    const mode = useSelector(state => state.mode);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Delete fetch
    const [deleteFetchStatus, setDeleteFetchStatus] = useState('idle');
    const sendDeleteFetch = async () => {
        try {
            setDeleteFetchStatus('loading');
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/wines/delete-wine`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ wineId: wineData._id })
            });
            if (response.ok) {
                setDeleteFetchStatus('succeeded');
                window.location.href = "/";
            } else {
                setDeleteFetchStatus('failed');
            }
        } catch (error) {
            setDeleteFetchStatus('failed');
        }
    }
    return (

        !isEditing && !isDeleting ? (
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className="flex gap-4 text-start">
                    {mode.mode === 'edit' &&
                        <div className="flex gap-4">
                            <i class="fi fi-rr-pen-square mt-[3px] text-green-500 cursor-pointer text-4xl" onClick={() => setIsEditing(true)}></i>
                            <i class="fi fi-rr-trash mt-[3px] text-red-500 cursor-pointer text-4xl" onClick={() => setIsDeleting(true)}></i>
                        </div>
                    }
                    <div className="flex flex-col">
                        <div>{wineData.name}</div>
                        <div className="text-xs">{wineData.description}</div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-[60px]">{wineData.year}</div>
                    <div className="w-[60px]">{wineData.tablePrice}</div>
                    <div className="w-[60px]">{wineData.takeAwayPrice}</div>
                </div>
            </div>
        ) : (
            <div className={`flex flex-col md:flex-row justify-center gap-2`}>
                {
                    isEditing &&
                    <div className="flex gap-2 p-1 items-center">
                        <div className="text-sm">Vuoi modificare <span className="text-green-500 font-bold">{wineData.name}</span>?</div>
                        <Link to={`/add-new-product?wineId=${wineData._id}`} ><GreenButton text="Modifica prodotto" /></Link>
                        <SecondaryButton text="Annulla" click={() => setIsEditing(false)} />
                    </div>
                }
                {
                    isDeleting &&
                    <div className="flex gap-2 p-1 items-center">
                        {deleteFetchStatus === 'idle' && <div className="text-sm">Sei sicuro di voler eliminare <span className="text-red-500 font-bold">{wineData.name}</span>?</div>}
                        {deleteFetchStatus === 'idle' && <DangerButton text="Elimina prodotto" click={sendDeleteFetch} />}
                        {deleteFetchStatus === 'idle' && <SecondaryButton text="Annulla" click={() => setIsDeleting(false)} />}
                        {deleteFetchStatus === 'loading' && <FetchLoader />}
                        {deleteFetchStatus === 'succeded' && <h4>Prodotto eliminato correttamente.</h4>}
                        {deleteFetchStatus === 'succeded' && <h5 className="text-[#782a76] mt-[-20px]">Attendi il refresh della pagina.</h5>}
                        {deleteFetchStatus === 'failed' && <h4>Qualcosa è andato storto. Ricarica la pagina e riprova.</h4>}
                    </div>
                }
            </div>
        )

    )
}

export default WineLine;