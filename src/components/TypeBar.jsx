import allIcon from '../static/images/all.png';
import redIcon from '../static/images/red.png';
import whiteIcon from '../static/images/white.png';
import bubblesIcon from '../static/images/bubbles.png';
import roseIcon from '../static/images/rose.png';
import champagneIcon from '../static/images/champagne.png';
import bubblesRoseIcon from '../static/images/bubbles_rose.png';
import champagneRoseIcon from '../static/images/champagne_rose.png';
import cakeIcon from '../static/images/cake_slice.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectType } from '../redux/querySlice.js';

const TypeBar = () => {
    const dispatch = useDispatch();
    // check type from Redux
    const currentType = useSelector(state => state.query.type);
    const setType = (type) => {
        dispatch(selectType(type))
    };
    return (
        <div className="flex flex-col gap-2 items-center">
            <h2 className="font-thin">Generi:</h2>
            <div className="flex flex-wrap gap-2 justify-center">
                <div onClick={() => setType('')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === '' ? 'border-2 border-[#782a76]' : ''}`}><img src={allIcon} className='w-[32px] h-[32px]' />Tutti</div>
                <div onClick={() => setType('red')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'red' ? 'border-2 border-[#782a76]' : ''}`}><img src={redIcon} className='w-[32px] h-[32px]' />Rossi</div>
                <div onClick={() => setType('white')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'white' ? 'border-2 border-[#782a76]' : ''}`}><img src={whiteIcon} className='w-[32px] h-[32px]' />Bianchi</div>
                <div onClick={() => setType('rosé')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'rosé' ? 'border-2 border-[#782a76]' : ''}`}><img src={roseIcon} className='w-[32px] h-[32px]' />Rosé</div>
                <div onClick={() => setType('bubbles')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'bubbles' ? 'border-2 border-[#782a76]' : ''}`}><img src={bubblesIcon} className='w-[32px] h-[32px]' />Spumanti</div>
                <div onClick={() => setType('bubbles-rosé')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'bubbles-rosé' ? 'border-2 border-[#782a76]' : ''}`}><img src={bubblesRoseIcon} className='w-[32px] h-[32px]' />Spumanti rosé</div>
                <div onClick={() => setType('dessert')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'dessert' ? 'border-2 border-[#782a76]' : ''}`}><img src={cakeIcon} className='w-[24px] h-[24px] mt-[5px]' />Vini da dessert</div>
                <div onClick={() => setType('champagne')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'champagne' ? 'border-2 border-[#782a76]' : ''}`}><img src={champagneIcon} className='w-[32px] h-[32px]' />Champagne</div>
                <div onClick={() => setType('champagne-rosé')} className={`pb-1 pt-2 px-2 border rounded font-thin cursor-pointer flex gap-2 ${currentType === 'champagne-rosé' ? 'border-2 border-[#782a76]' : ''}`}><img src={champagneRoseIcon} className='w-[32px] h-[32px]' />Champagne Rosé</div>
            </div>
        </div>
    )
}

export default TypeBar;