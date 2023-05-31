import React, { useEffect, useState } from 'react';
import MyRequestCard from './MyRequestCard';

const BuyerOfferRequest = ({ offers, refetch }) => {

    return (

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-full w-full overflow-y-auto scrollBar cursor-pointer p-2'>
            {
                offers?.map(req => <MyRequestCard data={req} refetch={refetch} />)
            }
        </div>
    );
};

export default BuyerOfferRequest;