import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodData, setFoodMode } from "../redux/foodDataSlice";
import FoodLine from "../components/FoodLine";
import { Link } from "react-router-dom";

import starter1 from '../static/images/food/starter1.png';
import starter2 from '../static/images/food/starter2.png';
import starter3 from '../static/images/food/starter3.png';
import first1 from '../static/images/food/first1.png';
import first2 from '../static/images/food/first2.png';
import first3 from '../static/images/food/first3.png';
import second1 from '../static/images/food/second1.png';
import second2 from '../static/images/food/second2.png';
import second3 from '../static/images/food/second3.png';
import side1 from '../static/images/food/side1.png';
import side2 from '../static/images/food/side2.png';
import side3 from '../static/images/food/side3.png';

const FoodPaper = () => {

    // check mode
    const { mode } = useSelector(state => state.foodData);
    // check query
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const mode = params.get('mode');
        if(mode) {
            dispatch(setFoodMode(mode))
        }
    }, [])

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

    // Handle init scroll ater edit
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const scroll = params.get('scroll');
    useEffect(() => {
        const targetElement = document.getElementById(scroll);
        if (data && targetElement) {
            const scrollYOffset = -300;
            const scrollY = targetElement.getBoundingClientRect().top + window.pageYOffset + scrollYOffset;
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }
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
                    <div className="flex gap-2 mb-4">
                        <img src={starter1} className="w-12" />
                        {/* <img src={starter2} className="w-12" />
                        <img src={starter3} className="w-12" /> */}
                    </div>
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
                    <div className="flex gap-2 mb-4">
                        <img src={first1} className="w-12" />
                        {/* <img src={first2} className="w-12" />
                        <img src={first3} className="w-12" /> */}
                    </div>
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
                    <div className="flex gap-2 mb-4">
                        {/* <img src={second1} className="w-12" /> */}
                        <img src={second2} className="w-12" />
                        {/* <img src={second3} className="w-12" /> */}
                    </div>
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
                    <div className="flex gap-2 mb-4">
                        {/* <img src={side1} className="w-12" /> */}
                        <img src={side2} className="w-12" />
                        {/* <img src={side3} className="w-12" /> */}
                    </div>
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