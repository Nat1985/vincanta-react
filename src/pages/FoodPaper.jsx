import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodData } from "../redux/foodDataSlice";
import FoodLine from "../components/FoodLine";
import { Link } from "react-router-dom";

const FoodPaper = () => {

    // check mode
    const { mode } = useSelector(state => state.foodData);

    // food fetch
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFoodData())
    }, [])

    // handle courses block
    const { fetchStatus, error, data } = useSelector(state => state.foodData);
    const [courses, setCourses] = useState([]);
    const checkCourses = () => {
        let coursesSet = new Set(); // si utilizza per non creare duplicati nel nuovo array
        data.forEach(element => {
            coursesSet.add(element.course)
        })
        setCourses([...coursesSet]);
    }
    useEffect(() => {
        if (data) checkCourses();
    }, [data])


    return (
        <div className="flex flex-col items-center text-center gap-8 mt-8 w-full px-4 mb-8">

            {
                mode === 'edit' &&
                <div className="flex flex-col gap-2">
                    <Link to="/add-edit-food"><div className="flex items-center gap-2 border border-[#782a76] px-3 py-2 rounded cursor-pointer">
                        <i class="fi fi-rr-add text-[#782a76] text-4xl mt-[5px]"></i>
                        Aggiungi prodotto
                    </div></Link>
                </div>

            }

            {/* Antipasti */}
            {
                data && courses.includes('Antipasto') &&
                <div className="flex flex-col gap-2 items-center w-full md:w-fit">
                    <h2 className="font-thin">Antipasti</h2>
                    <div className="flex flex-col gap-2 w-full md:w-[700px] border rounded-xl p-2">
                        {
                            data.map((element, index) => {
                                if (element.course === 'Antipasto') {
                                    return <FoodLine key={index} data={element} />
                                }
                            })
                        }
                    </div>
                </div>
            }

            {/* Primi */}
            {
                data && courses.includes('Primo') &&
                <div className="flex flex-col gap-2 items-center w-full md:w-fit">
                    <h2 className="font-thin">Primi</h2>
                    <div className="flex flex-col gap-2 w-full md:w-[700px] border rounded-xl p-2">
                        {
                            data.map((element, index) => {
                                if (element.course === 'Primo') {
                                    return <FoodLine key={index} data={element} />
                                }
                            })
                        }
                    </div>
                </div>
            }

            {/* Secondi */}
            {
                data && courses.includes('Secondo') &&
                <div className="flex flex-col gap-2 items-center w-full md:w-fit">
                    <h2 className="font-thin">Secondi</h2>
                    <div className="flex flex-col gap-2 w-full md:w-[700px] border rounded-xl p-2">
                        {
                            data.map((element, index) => {
                                if (element.course === 'Secondo') {
                                    return <FoodLine key={index} data={element} />
                                }
                            })
                        }
                    </div>
                </div>
            }

            {/* Contorni */}
            {
                data && courses.includes('Contorno') &&
                <div className="flex flex-col gap-2 items-center w-full md:w-fit">
                    <h2 className="font-thin">Contorni</h2>
                    <div className="flex flex-col gap-2 w-full md:w-[700px] border rounded-xl p-2">
                        {
                            data.map((element, index) => {
                                if (element.course === 'Contorno') {
                                    return <FoodLine key={index} data={element} />
                                }
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default FoodPaper;