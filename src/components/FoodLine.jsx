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
                    window.location.href = "/food?mode=edit"
                }, 2000)
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
        <div id={data._id} className={`w-full flex gap-2 justify-between items-center p-2 border rounded ${mode === 'edit' ? 'bg-red-50' : ''}`}>

            {/* edit */}
            <div className="flex flex-col items-start">
                <div className="flex flex-col md:flex-row gap-4">
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

                    <div className="flex flex-col items-start text-start gap-3">
                        <h4>{data.name} {data.isFrozen && <span><i className="fi fi-rr-snowflakes text-blue-400"></i></span>}</h4>
                        <div className="md:mt-[-5px] flex flex-row gap-2 text-sm">
                            {data.allergens.length > 0 && <div className="underline text-[#782a76]">Allergeni:</div>}
                            <div className="flex gap-1 flex-row">
                                {data.allergens.map((element, index) => (<div key={index} className="bg-fuchsia-100 px-1 font-thin rounded" >{element}</div>))}
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