import { useEffect, useState } from "react";
import FetchLoader from "../components/FetchLoader";
import { useDispatch } from 'react-redux';
import { setFoodMode } from '../redux/foodDataSlice.js';

const AddEditFood = () => {

    // handle inputData
    const [inputData, setInputData] = useState({
        name: null,
        course: null,
        price: null,
        allergens: [],
        notes: null
    })
    useEffect(() => {
        console.log('inputData: ', inputData)
    }, [inputData])
    const handleInputData = (event) => {
        const { id, value, type, checked } = event.target;
        let fixedValue = type === "checkbox" ? checked : value;
        setInputData(prevState => ({
            ...prevState,
            [id]: fixedValue
        }))
    }
    const handleAllergensInput = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setInputData(prevState => ({
                ...prevState,
                allergens: [...prevState.allergens, id]
            }))
        } else {
            let newArray = inputData.allergens.filter(element => element !== id);
            setInputData(prevStat => ({
                ...prevStat,
                allergens: newArray
            }))
        }
    }

    // Check edit query
    const [editId, setEditId] = useState(null);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            setEditId(id);
        }
    }, []);
    useEffect(() => {
        if (editId) {
            getFoodToEdit();
        }
    }, [editId])
    const getFoodToEdit = async () => {
        let url = `${process.env.REACT_APP_SERVER_BASE_URL}/food/${editId}`;
        console.log('url: ', url)
        let headers = { 'Content-Type': 'application/json' };
        let options = { method: 'GET', headers };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const result = await response.json();
                console.log('payload: ', result.payload)
                setInputData(result.payload)
            } else {
                const error = await response.json();
                console.log('Fetch error: ', error)
            }
        } catch (error) {
            console.log('Catch error: ', error)
        }
    }

    // Send food data
    const dispatch = useDispatch();
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [error, setError] = useState(null);
    const sendFood = async () => {
        try {
            setFetchStatus('loading');
            let method = editId ? 'PATCH' : 'POST'
            let url;
            if (editId) {
                url = `${process.env.REACT_APP_SERVER_BASE_URL}/food/edit/${editId}`;
            } else {
                url = `${process.env.REACT_APP_SERVER_BASE_URL}/food/new-food`;
            }
            let headers = {
                'Content-Type': 'application/json'
            };
            let options = {
                method,
                headers,
                body: JSON.stringify(inputData)
            };
            const response = await fetch(url, options);
            if (response.ok) {
                const result = response.json();
                setFetchStatus('succeeded');
                setTimeout(() => {
                    window.location.href = "/food?mode=edit";
                }, 3000)
            } else {
                const error = response.json();
                setError(error);
                setFetchStatus('failed');
            }
        } catch (error) {
            setError(error);
            setFetchStatus('failed');
        }
    }

    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8 w-full px-4">

            <div className="flex flex-col gap-2 items-center w-full md:w-fit">
                <h2 className="font-thin">{editId ? 'Modifica' : 'Inserisci nuovo'} piatto</h2>
                <div className="flex flex-col gap-4 p-2 w-full md:w-[700px] border">

                    {/* Nome piatto */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="name" className="text-sm">Nome piatto:</label>
                        <input type="text" id="name" className="w-[400px]" onChange={handleInputData} value={inputData.name} />
                    </div>

                    {/* Portata */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="Course" className="text-sm">Seleziona portata:</label>
                        <select name="course" id="course" className="w-96" onChange={handleInputData} value={inputData.course}>
                            <option value=""></option>
                            <option value="Antipasto">Antipasto</option>
                            <option value="Primo">Primo</option>
                            <option value="Secondo">Secondo</option>
                            <option value="Contorno">Contorno</option>
                        </select>
                    </div>

                    {/* Prezzo */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="price" className="text-sm">Prezzo:</label>
                        <input type="number" id="price" className="w-24" onChange={handleInputData} value={inputData.price} />
                    </div>

                    {/* Elenco allergeni */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="allergens" className="text-sm">Allergeni:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Glutine" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Glutine') ? true : false} />
                            <label htmlFor="Glutine" className="text-[12pt]">Glutine</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Crostacei" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Crostacei') ? true : false} />
                            <label htmlFor="Crostacei" className="text-[12pt]">Crostacei</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Uova" onChange={handleAllergensInput} valcheckedue={inputData.allergens && inputData.allergens.includes('Uova') ? true : false} />
                            <label htmlFor="Uova" className="text-[12pt]">Uova</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Pesce" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Pesce') ? true : false} />
                            <label htmlFor="Pesce" className="text-[12pt]">Pesce</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Arachidi" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Arachidi') ? true : false} />
                            <label htmlFor="Arachidi" className="text-[12pt]">Arachidi</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Soia" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Soia') ? true : false} />
                            <label htmlFor="Soia" className="text-[12pt]">Soia</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Latte" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Latte') ? true : false} />
                            <label htmlFor="Latte" className="text-[12pt]">Latte</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Frutta a guscio" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Frutta a guscio') ? true : false} />
                            <label htmlFor="Frutta a guscio" className="text-[12pt]">Frutta a guscio</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Sedano" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Sedano') ? true : false} />
                            <label htmlFor="Sedano" className="text-[12pt]">Sedano</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Senape" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Senape') ? true : false} />
                            <label htmlFor="Senape" className="text-[12pt]">Senape</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Sesamo" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Sesamo') ? true : false} />
                            <label htmlFor="Sesamo" className="text-[12pt]">Sesamo</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Anidride solforosa" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Anidride solforosa') ? true : false} />
                            <label htmlFor="Anidride solforosa" className="text-[12pt]">Anidride solforosa</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Lupini" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Lupini') ? true : false} />
                            <label htmlFor="Lupini" className="text-[12pt]">Lupini</label>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Molluschi" onChange={handleAllergensInput} checked={inputData.allergens && inputData.allergens.includes('Molluschi') ? true : false} />
                            <label htmlFor="Molluschi" className="text-[12pt]">Molluschi</label>
                        </div>
                    </div>

                    {/* Congelato all'origine */}
                    <div className="flex gap-2">
                        <input type="checkbox" id="isFrozen" onChange={handleInputData} checked={inputData.isFrozen} />
                        <div className="flex items-center gap-2 border rounded w-fit py-1 px-2">
                            <i className="fi fi-rr-snowflakes text-blue-400"></i>
                            <label htmlFor="isFrozen" className="text-[12pt]">Congelato all'origine</label>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="name" className="text-sm">Note:</label>
                        <textarea name="" id="notes" className="w-full" onChange={handleInputData} value={inputData.notes}></textarea>
                    </div>

                    <div className="mb-8">
                        {fetchStatus === 'idle' && <button className="bg-[#782a76] p-2 text-white" onClick={sendFood}>Salva</button>}
                        {fetchStatus === 'loading' && <FetchLoader />}
                        {fetchStatus === 'failed' && <h4>Qualcos è andato storto. Ricarica la pagina e riprova.</h4>}
                        {fetchStatus === 'succeeded' && <h4>Nuovo piatto {editId ? 'modificato' : 'inserito'}. Attendi il refresh della pagina.</h4>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEditFood;