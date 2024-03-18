import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DangerButton, GreenButton, PrimaryButton, SecondaryButton } from "./buttons";
import FetchLoader from "./FetchLoader";

import redIcon from '../static/images/red.png';
import whiteIcon from '../static/images/white.png';
import bubblesIcon from '../static/images/bubbles.png';
import roseIcon from '../static/images/rose.png';
import champagneIcon from '../static/images/champagne.png';
import bubblesRoseIcon from '../static/images/bubbles_rose.png';
import champagneRoseIcon from '../static/images/champagne_rose.png';
import cakeIcon from '../static/images/cake_slice.png';

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
            <div className={`flex flex-col md:flex-row justify-between gap-2 mt-8 md:mt-0 border rounded md:border-0 p-2 md:p-0 ${mode.mode === 'edit' ? 'bg-fuchsia-50 md:p-2' : ''}`}>
                <div className="flex gap-4 text-start">
                    {mode.mode === 'edit' &&
                        <div className="flex gap-4">
                            <i class="fi fi-rr-pen-square mt-[3px] text-green-500 cursor-pointer text-4xl" onClick={() => setIsEditing(true)}></i>
                            <i class="fi fi-rr-trash mt-[3px] text-red-500 cursor-pointer text-4xl" onClick={() => setIsDeleting(true)}></i>
                        </div>
                    }
                    <div className="flex flex-col">
                        <div className="flex gap-1">
                            <div className="pt-[5px]">
                                {wineData && wineData.type === 'red' && <img src={redIcon} className="w-6 h-6" />}
                                {wineData && wineData.type === 'white' && <img src={whiteIcon} className="w-6 h-6" />}
                                {wineData && wineData.type === 'bubbles' && <img src={bubblesIcon} className="w-6 h-6" />}
                                {wineData && wineData.type === 'bubbles-rosé' && <img src={bubblesRoseIcon} className="w-6 h-6" />}
                                {wineData && wineData.type === 'rosé' && <img src={roseIcon} className="w-6 h-6" />}
                                {wineData && wineData.type === 'dessert' && <img src={champagneRoseIcon} className="w-6 h-6" />}
                                {wineData && wineData.type === 'champagne' && <img src={champagneIcon} className="w-6 h-6" />}
                                {wineData && wineData.type === 'champagne-rosé' && <img src={champagneRoseIcon} className="w-6 h-6" />}
                            </div>
                            <div>{wineData.name}</div>
                            <div className="pt-[5px]">
                                {wineData && wineData.award && <i className="fi fi-rs-award text-yellow-500"></i>}
                                {wineData && wineData.favourite && <i class="fi fi-sr-heart text-red-500"></i>}
                            </div>
                        </div>
                        <div className="text-xs ml-2 md:ml-7">{wineData.description}</div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        {/* <div className="md:hidden text-xs text-red-500 mb-[-5px]">q.tà</div> */}
                        <div className="text-xs flex mt-5 md:mt-3">{wineData.volume}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="md:hidden text-xs text-red-500 mb-[-5px]">Annata</div>
                        <div className="w-[60px]">{wineData.year}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="md:hidden text-xs text-red-500 mb-[-5px]">Tavolo</div>
                        <div className="w-[60px]">{wineData.tablePrice}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="md:hidden text-xs text-red-500 mb-[-5px]">Asporto</div>
                        <div className="w-[60px]">{wineData.takeAwayPrice}</div>
                    </div>
                </div>
            </div>
        ) : (
            <div className={`flex flex-col md:flex-row justify-center gap-2 mt-8 md:mt-0 border rounded md:border-0 p-2 md:p-0`}>
                {
                    isEditing &&
                    <div className="flex flex-col md:flex-row gap-2 p-1 items-center">
                        <div className="text-sm">Vuoi modificare <span className="text-green-500 font-bold">{wineData.name}</span>?</div>
                        <Link to={`/add-new-product?wineId=${wineData._id}`} ><GreenButton text="Modifica prodotto" /></Link>
                        <SecondaryButton text="Annulla" click={() => setIsEditing(false)} />
                    </div>
                }
                {
                    isDeleting &&
                    <div className="flex flex-col md:flex-row gap-2 p-1 items-center">
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