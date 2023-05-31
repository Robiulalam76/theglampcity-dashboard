import React, { useEffect, useState } from 'react';
import MyRequestCard from './MyRequestCard';

const MyRequestOffers = ({ storeId, buyerId }) => {
    const [requests, setRequests] = useState(null)

    const handleGetOffers = () => {
        fetch(`http://localhost:5055/api/offer/${storeId}/${buyerId}/store`)
            .then(res => res.json())
            .then(data => {
                setRequests(data)
            })
    }

    useEffect(() => {
        handleGetOffers()
    }, [storeId])


    return (

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-full w-full overflow-y-auto cursor-pointer scrollBar p-2'>
            {
                requests?.map(req => <MyRequestCard data={req} refetch={handleGetOffers} />)
            }
        </div>
    );
};

export default MyRequestOffers;