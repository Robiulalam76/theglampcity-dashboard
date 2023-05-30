import React, { useEffect, useState } from 'react';
import MyRequestCard from './MyRequestCard';

const MyOffers = ({ storeId, buyerId, setTotalOffers }) => {
    const [offers, setOffers] = useState(null)

    const handleGetOffers = () => {
        fetch(`http://localhost:5055/api/offer/myrequest/${storeId}/${buyerId}/store/true`)
            .then(res => res.json())
            .then(data => {
                setOffers(data)
                setTotalOffers(data?.length)
            })
    }

    useEffect(() => {
        handleGetOffers()
    }, [storeId])

    console.log(storeId, buyerId, setTotalOffers);


    return (

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[500px] max-h-[700px] overflow-y-auto scrollBar cursor-pointer p-2'>
            {
                offers?.map(req => <MyRequestCard data={req} refetch={handleGetOffers} />)
            }
        </div>
    );
};

export default MyOffers;