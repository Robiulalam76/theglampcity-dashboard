import React, { useEffect, useState } from 'react';
import MyRequestCard from './MyRequestCard';

const MyRequestOffers = ({ storeId, buyerId }) => {
    const [requests, setRequests] = useState(null)


    const handleGetOffers = () => {
        fetch(`http://localhost:5055/api/offer/myrequest/${storeId}/${buyerId}/buyer/true`)
            .then(res => res.json())
            .then(data => {
                setRequests(data)
            })
    }

    useEffect(() => {
        handleGetOffers()
    }, [storeId])

    console.log(requests, storeId, buyerId);


    return (

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[500px] max-h-[700px] overflow-y-auto cursor-pointer scrollBar p-2'>
            {
                requests?.map(req => <MyRequestCard data={req} refetch={handleGetOffers} />)
            }
        </div>
    );
};

export default MyRequestOffers;