import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DangerButton, GreenButton } from "./buttons";
import { useEffect, useState } from "react";
import FetchLoader from "./FetchLoader";

const FoodLine = ({ data }) => {
    const { mode } = useSelector(state => state.foodData);

    // handle edit click
    const navigate = useNavigate();
    const handleGoToEdit = () => {
        navigate(`/add-edit-food?id=${data._id}`)
    }

    // handle isDeleting
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {console.log('isDeleting: ', isDeleting)})

    // fetchDelete
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const sendDelete = async () => {
        try {
            setFetchStatus('loading')
            let url = `${process.env.REACT_APP_SERVER_BASE_URL}/food/delete/${data._id}`
            let headers = {'Content-Type': 'application/json'};
            let options = {method: 'DELETE', headers};
            const response = await fetch(url, options);
            if(response.ok) {
                const result = await response.json();
                console.log('Fetch result: ', result);
                setFetchStatus('succeeded');
                setTimeout(() => {
                    window.location.href = "/food"
                }, 3000)
            } else {
                const error = await response.json();
                setError(error);
                console.log('Fetch error: ', error);
                setFetchStatus('failed');
            }
        } catch (error) {
            setError(error);
                console.log('Catch error: ', error);
                setFetchStatus('failed');
        }
    }

    return (
        <div className={`w-full flex gap-2 justify-between items-center p-2 border rounded ${mode === 'edit' ? 'bg-red-50' : ''}`}>

            {/* edit */}
            <div className="flex flex-col items-start">
                <div className="flex gap-4">
                    {
                        mode === 'edit' && !isDeleting && fetchStatus === 'idle' &&
                        <div className="flex gap-4 items-center">
                            <i class="fi fi-rr-pen-square mt-[3px] text-green-500 cursor-pointer text-4xl" onClick={handleGoToEdit}></i>
                            <i class="fi fi-rr-trash mt-[3px] text-red-500 cursor-pointer text-4xl" onClick={() => setIsDeleting(true)} ></i>
                        </div>
                    }
                    {
                        mode === 'edit' && isDeleting && fetchStatus === 'idle' &&
                        <div className="flex gap-4 items-center">
                            <DangerButton text="Elimina" click={sendDelete} />
                            <GreenButton text="Annulla" click={() => setIsDeleting(false)} />
                        </div>
                    }
                    {
                        mode === 'edit' && isDeleting && fetchStatus === 'loading' &&
                        <div className="flex gap-4 items-center">
                            <FetchLoader />
                        </div>
                    }
                    {
                        mode === 'edit' && isDeleting && fetchStatus === 'failed' &&
                        <div className="flex gap-4 items-center">
                            <h4>{error.message}</h4>
                        </div>
                    }
                    {
                        mode === 'edit' && isDeleting && fetchStatus === 'succeeded' &&
                        <div className="flex gap-4 items-center">
                            <h4>Elemento eliminato. Attendi il refresh della pagina.</h4>
                        </div>
                    }

                    <div className="flex flex-col items-start">
                        <h3>{data.name}</h3>
                        <div className="mt-[-10px] text-neutral-400 flex gap-2 text-sm">
                            {data.allergens.length > 0 && <div>Allergeni:</div>}
                            <div className="flex gap-1">
                                {data.allergens.map((element, index) => (<div key={index} >{element}</div>))}
                            </div>
                        </div>
                        <h5>{data.notes}</h5>
                    </div>
                </div>
            </div>
            <div>{data.price}</div>
        </div>
    )
}

export default FoodLine;