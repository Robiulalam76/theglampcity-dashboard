import React from 'react';
import { useContext } from 'react';
import { MessageContext } from '../../context/MessageContext';

const StoreCard = ({ store }) => {
    const { setStore } = useContext(MessageContext)
    return (

        <div onClick={() => setStore(store)}
            className='cursor-pointer w-fit h-fit flex justify-center items-center mx-auto rounded-full hover:border-primary duration-150 relative overflow-hidden'>
            <img draggable="false" className='w-40 h-40 rounded-full border-[8px] md:border-[14px] border-blue-gray-50' src={store?.logo} alt="" />
            <div className='absolute w-full h-8 md:h-10 bg-white flex justify-center items-center object-cover'>
                <span className='text-black font-semibold text-sm'>{store?.name}</span>
            </div>
        </div>
    );
};

export default StoreCard;