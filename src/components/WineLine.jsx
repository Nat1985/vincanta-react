import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DangerButton, GreenButton, PrimaryButton, SecondaryButton } from "./buttons";

const WineLine = ({ wineData }) => {
    const mode = useSelector(state => state.mode);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
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
                        <GreenButton text="Modifica prodotto" />
                        <SecondaryButton text="Annulla" click={() => setIsEditing(false)} />
                    </div>
                }
                {
                    isDeleting &&
                    <div className="flex gap-2 p-1 items-center">
                        <div className="text-sm">Sei sicuro di voler eliminare <span className="text-red-500 font-bold">{wineData.name}</span>?</div>
                        <DangerButton text="Elimina prodotto" />
                        <SecondaryButton text="Annulla" click={() => setIsDeleting(false)} />
                    </div>
                }
            </div>
        )

    )
}

export default WineLine;